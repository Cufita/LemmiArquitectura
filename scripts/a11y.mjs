/**
 * Accessibility and reduced-motion checks against the production preview.
 *   node scripts/a11y.mjs [url]
 */
import puppeteer from 'puppeteer-core';
import process from 'node:process';

const URL = process.argv[2] ?? 'http://localhost:4180/';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--disable-gpu'] });

// ---------- reduced motion ----------
const rm = await browser.newPage();
await rm.setViewport({ width: 1440, height: 900 });
await rm.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
await rm.goto(URL, { waitUntil: 'networkidle2' });
await rm.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += innerHeight * 0.8) {
    scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 70));
  }
  scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 600));
});

const reducedReport = await rm.evaluate(() => {
  // Anything still transparent after the page settled would be content the
  // visitor can never read.
  const invisible = [...document.querySelectorAll('main *')]
    .filter((el) => {
      const s = getComputedStyle(el);
      return parseFloat(s.opacity) < 0.05 && el.getBoundingClientRect().height > 12;
    })
    .slice(0, 8)
    .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 50)}`);

  const video = document.querySelector('#reels video');
  return {
    invisibleAfterSettle: invisible,
    reelIsVideoElement: Boolean(video),
    reelPaused: video ? video.paused : 'n/a (poster shown instead)',
  };
});

// ---------- keyboard + semantics ----------
const kb = await browser.newPage();
await kb.setViewport({ width: 1440, height: 900 });
await kb.goto(URL, { waitUntil: 'networkidle2' });

// The three paths are plain links now — check each one carries a distinct
// prefilled WhatsApp message so the studio knows which path the person took.
await kb.evaluate(() => document.getElementById('servicios').scrollIntoView());
const pathCtas = await kb.$$eval('#servicios li a[href*="whatsapp"]', (els) =>
  els.map((el) => decodeURIComponent(new URL(el.href).searchParams.get('text') ?? '').slice(0, 44))
);

// Tab order reaches every interactive control.
const tabStops = await kb.evaluate(() => {
  const focusable = document.querySelectorAll(
    'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );
  return focusable.length;
});

const semantics = await kb.evaluate(() => {
  const imgs = [...document.querySelectorAll('img')];
  return {
    h1Count: document.querySelectorAll('h1').length,
    headingOrder: [...document.querySelectorAll('h1,h2,h3')].map((h) => h.tagName).slice(0, 14),
    imagesMissingAlt: imgs.filter((i) => i.getAttribute('alt') === null).length,
    totalImages: imgs.length,
    lang: document.documentElement.lang,
    sectionsWithId: [...document.querySelectorAll('section[id]')].map((s) => s.id),
    buttonsWithoutName: [...document.querySelectorAll('button')].filter(
      (b) => !b.textContent.trim() && !b.getAttribute('aria-label')
    ).length,
    externalLinksUnsafe: [...document.querySelectorAll('a[target="_blank"]')].filter(
      (a) => !a.rel.includes('noopener')
    ).length,
  };
});

// The before/after slider must be operable from the keyboard.
await kb.evaluate(() => document.getElementById('obras').scrollIntoView());
await kb.focus('#obras [role="slider"]');
const before = await kb.$eval('#obras [role="slider"]', (el) => el.getAttribute('aria-valuenow'));
await kb.keyboard.press('ArrowLeft');
await kb.keyboard.press('ArrowLeft');
await new Promise((r) => setTimeout(r, 200));
const after = await kb.$eval('#obras [role="slider"]', (el) => el.getAttribute('aria-valuenow'));

await browser.close();

console.log('--- reduced motion ---');
console.log(JSON.stringify(reducedReport, null, 1));
console.log('\n--- prefilled WhatsApp message per path ---');
console.log(JSON.stringify(pathCtas, null, 1));
console.log('\n--- before/after slider via keyboard ---');
console.log(`aria-valuenow ${before} -> ${after}`);
console.log('\n--- semantics ---');
console.log(JSON.stringify({ ...semantics, tabStops }, null, 1));
