import { describe, expect, it } from 'vitest';
import { faqItems } from '../../src/data/faq';
import { buildJsonLd, buildSeoHead, resolveSiteUrl, robotsTxt, sitemapXml } from '../seo-plugin';

const URL = 'https://lemmi.example';

describe('resolveSiteUrl', () => {
  it('prefers SITE_URL and drops the trailing slash', () => {
    expect(resolveSiteUrl({ SITE_URL: 'https://a.com/' })).toBe('https://a.com');
  });

  it('falls back to the Vercel host', () => {
    expect(resolveSiteUrl({ VERCEL_PROJECT_PRODUCTION_URL: 'lemmi.vercel.app' })).toBe('https://lemmi.vercel.app');
  });

  it('uses localhost when nothing is set', () => {
    expect(resolveSiteUrl({})).toBe('http://localhost:5173');
  });
});

describe('buildJsonLd', () => {
  const graph = buildJsonLd(URL)['@graph'];

  it('describes a local business serving Mar del Plata', () => {
    const business = graph.find((n) => Array.isArray(n['@type']) && n['@type'].includes('LocalBusiness'));
    expect(business).toBeDefined();
    expect(JSON.stringify(business)).toContain('Mar del Plata');
    expect(business).toMatchObject({ '@id': `${URL}/#organization`, url: URL });
  });

  it('writes phones in international format', () => {
    const business = graph[0] as { telephone: string[] };
    expect(business.telephone.every((t) => /^\+54\d+$/.test(t))).toBe(true);
  });

  it('turns every FAQ item into a question', () => {
    const faq = graph.find((n) => n['@type'] === 'FAQPage') as { mainEntity: { name: string }[] };
    expect(faq.mainEntity).toHaveLength(faqItems.length);
    expect(faq.mainEntity[0].name).toBe(faqItems[0].question);
  });
});

describe('buildSeoHead', () => {
  const head = buildSeoHead(URL);

  it('sets canonical and absolute share image', () => {
    expect(head).toContain(`<link rel="canonical" href="${URL}/" />`);
    expect(head).toContain(`<meta property="og:image" content="${URL}/og-image.jpg" />`);
  });

  it('is indexable and has a Twitter card', () => {
    expect(head).toContain('index, follow');
    expect(head).toContain('summary_large_image');
  });

  it('embeds parsable JSON-LD that cannot close the script tag', () => {
    const match = head.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(match).not.toBeNull();
    expect(() => JSON.parse(match![1])).not.toThrow();
    expect(match![1]).not.toContain('</');
  });
});

describe('robots and sitemap', () => {
  it('points crawlers at the sitemap', () => {
    expect(robotsTxt(URL)).toContain(`Sitemap: ${URL}/sitemap.xml`);
  });

  it('lists the home page', () => {
    const xml = sitemapXml(URL, '2026-01-01');
    expect(xml).toContain(`<loc>${URL}/</loc>`);
    expect(xml).toContain('<lastmod>2026-01-01</lastmod>');
  });
});
