/**
 * Visual QA harness. Drives the real Chrome on this machine so scroll-triggered
 * reveals, hover states and the overlays actually run.
 *
 *   node scripts/shots.mjs <outDir> [url]
 */
import puppeteer from 'puppeteer-core';
import process from 'node:process';
import { mkdir } from 'node:fs/promises';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const OUT = process.argv[2];
const URL = process.argv[3] ?? 'http://localhost:5175/';

if (!OUT) {
  console.error('Usage: node scripts/shots.mjs <outDir> [url]');
  process.exit(1);
}
await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars', '--disable-gpu', '--force-color-profile=srgb'],
});

const errors = [];

async function openPage(width, height) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`console: ${m.text()}`);
  });
  page.on('requestfailed', (r) => errors.push(`request failed: ${r.url()}`));
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });
  return page;
}

/** Walk the whole page so every IntersectionObserver reveal fires. */
async function settle(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.75;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
}

async function shotSection(page, id, name) {
  const found = await page.evaluate((sectionId) => {
    const el = document.getElementById(sectionId);
    if (!el) return false;
    el.scrollIntoView({ block: 'start', behavior: 'instant' });
    window.scrollBy(0, -90); // clear the fixed header
    return true;
  }, id);
  if (!found) {
    errors.push(`missing section id: #${id}`);
    return;
  }
  await new Promise((r) => setTimeout(r, 700));
  await page.screenshot({ path: `${OUT}/${name}.png` });
}

// ---------- desktop ----------
const desktop = await openPage(1440, 900);
await settle(desktop);

await desktop.screenshot({ path: `${OUT}/01-hero.png` });

for (const [id, name] of [
  ['servicios', '02-servicios'],
  ['obras', '04-obras'],
  ['reels', '06-reels'],
  ['testimonios', '07-clientes'],
  ['equipo', '08-equipo'],
  ['faq', '09-faq'],
  ['contacto', '10-contacto'],
]) {
  await shotSection(desktop, id, name);
}

// The three paths are static blocks now; confirm all three rendered with a CTA.
const paths = await desktop.$$('#servicios li a[href*="whatsapp"]');
if (paths.length !== 3) errors.push(`expected 3 path CTAs, found ${paths.length}`);

// Open the first project to check the gallery overlay.
await shotSection(desktop, 'obras', '04b-obras-pre');
const card = await desktop.$('#obras button[aria-label^="Ver la galería"]');
if (card) {
  await card.click();
  await new Promise((r) => setTimeout(r, 900));
  await desktop.screenshot({ path: `${OUT}/05-galeria.png` });
  await desktop.keyboard.press('Escape');
  await new Promise((r) => setTimeout(r, 400));
} else {
  errors.push('no project card found in #obras');
}

// Drag the before/after handle.
const handle = await desktop.$('#obras [role="slider"]');
if (handle) {
  const box = await handle.boundingBox();
  if (box) {
    await desktop.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await desktop.mouse.down();
    await desktop.mouse.move(box.x - 260, box.y + box.height / 2, { steps: 12 });
    await desktop.mouse.up();
    await new Promise((r) => setTimeout(r, 400));
    await desktop.screenshot({ path: `${OUT}/04c-antes-despues.png` });
  }
} else {
  errors.push('before/after slider not found');
}

// Contrast probe on the two surfaces that sit over photography.
const contrast = await desktop.evaluate(() => {
  const srgb = (c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  const lum = ([r, g, b]) => 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
  const parse = (s) => (s.match(/\d+(\.\d+)?/g) ?? []).slice(0, 3).map(Number);
  const out = [];
  for (const sel of ['h1', '#servicios [aria-expanded="true"]']) {
    const el = document.querySelector(sel);
    if (!el) continue;
    out.push({ sel, color: getComputedStyle(el).color });
  }
  return out.map((o) => ({ ...o, lum: lum(parse(o.color)).toFixed(3) }));
});

// ---------- mobile ----------
const mobile = await openPage(390, 844);
await settle(mobile);
await mobile.screenshot({ path: `${OUT}/m1-hero.png` });
for (const [id, name] of [
  ['servicios', 'm2-servicios'],
  ['obras', 'm3-obras'],
  ['reels', 'm4-reels'],
  ['faq', 'm5-faq'],
]) {
  await shotSection(mobile, id, name);
}

// Horizontal overflow is the classic small-screen failure.
const overflow = await mobile.evaluate(() => ({
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
  // Only count elements that actually widen the document. A horizontal
  // carousel legitimately has cards past the fold; that is not overflow.
  offenders: [...document.querySelectorAll('body *')]
    .filter((el) => !el.closest('[data-hscroll]'))
    .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1)
    .slice(0, 6)
    .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)}`),
}));

await browser.close();

console.log('\n--- contrast probe ---');
console.log(JSON.stringify(contrast, null, 2));
console.log('\n--- mobile overflow ---');
console.log(JSON.stringify(overflow, null, 2));
console.log('\n--- page errors ---');
console.log(errors.length ? [...new Set(errors)].join('\n') : 'none');
