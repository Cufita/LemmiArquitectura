import type { Plugin } from 'vite';
import { brand } from '../src/data/brand';
import { faqItems } from '../src/data/faq';
import { serviceLines } from '../src/data/services';
import { site } from '../src/data/site';

/** Where the site lives. Set SITE_URL, or let Vercel provide its production host. */
export function resolveSiteUrl(env: Record<string, string | undefined> = process.env): string {
  const explicit = env.SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, '');
  const vercel = env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ?? env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, '').replace(/\/+$/, '')}`;
  return 'http://localhost:5173';
}

const esc = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const e164 = (phone: string) => `+54${phone.replace(/\D/g, '')}`;

/** schema.org graph: the business, its services and the FAQ as structured data. */
export function buildJsonLd(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'ProfessionalService'],
        '@id': `${siteUrl}/#organization`,
        name: site.name,
        alternateName: site.shortName,
        url: siteUrl,
        description: site.description,
        image: `${siteUrl}${site.ogImage}`,
        logo: `${siteUrl}/favicon.png`,
        slogan: brand.tagline,
        telephone: brand.phones.map(e164),
        areaServed: { '@type': 'City', name: brand.city, containedInPlace: { '@type': 'Country', name: 'Argentina' } },
        address: { '@type': 'PostalAddress', addressLocality: brand.city, addressCountry: 'AR' },
        sameAs: [brand.instagram],
        knowsAbout: site.keywords,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `Servicios de arquitectura en ${brand.city}`,
          itemListElement: serviceLines.map((line) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: line.label, description: line.hook },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: site.shortName,
        inLanguage: site.language,
        publisher: { '@id': `${siteUrl}/#organization` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/#faq`,
        inLanguage: site.language,
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  };
}

/** Everything that goes in <head> for search and sharing. */
export function buildSeoHead(siteUrl: string): string {
  const image = `${siteUrl}${site.ogImage}`;
  const tags = [
    `<title>${esc(site.title)}</title>`,
    `<meta name="description" content="${esc(site.description)}" />`,
    `<meta name="keywords" content="${esc(site.keywords.join(', '))}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<meta name="theme-color" content="${site.themeColor}" />`,
    `<link rel="canonical" href="${siteUrl}/" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="${site.locale}" />`,
    `<meta property="og:site_name" content="${esc(site.shortName)}" />`,
    `<meta property="og:url" content="${siteUrl}/" />`,
    `<meta property="og:title" content="${esc(site.title)}" />`,
    `<meta property="og:description" content="${esc(site.description)}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(site.ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(site.title)}" />`,
    `<meta name="twitter:description" content="${esc(site.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<link rel="icon" type="image/png" href="/favicon.png" />`,
    `<link rel="apple-touch-icon" href="/apple-touch-icon.png" />`,
    `<link rel="manifest" href="/site.webmanifest" />`,
    `<script type="application/ld+json">${JSON.stringify(buildJsonLd(siteUrl)).replace(/</g, '\u003c')}</script>`,
  ];
  return tags.join('\n    ');
}

export const robotsTxt = (siteUrl: string) => `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;

export const sitemapXml = (siteUrl: string, lastmod = new Date().toISOString().slice(0, 10)) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`;

export function seoPlugin(): Plugin {
  let siteUrl = resolveSiteUrl();
  return {
    name: 'lemmi-seo',
    configResolved() {
      siteUrl = resolveSiteUrl();
    },
    transformIndexHtml(html) {
      return html.replace('<!--seo-head-->', buildSeoHead(siteUrl));
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsTxt(siteUrl) });
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml(siteUrl) });
    },
  };
}
