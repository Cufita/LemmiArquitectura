import { brand } from './brand';

/**
 * What search engines and link previews are told about the studio. Pure data,
 * shared by the build-time SEO plugin (scripts/seo-plugin.ts) and the tests.
 * The absolute URL is not here: it depends on where the site is deployed and
 * is resolved at build time (see resolveSiteUrl in the plugin).
 */
export const site = {
  name: brand.legalName,
  shortName: `${brand.name} ${brand.nameSub}`,
  city: brand.city,
  locale: 'es_AR',
  language: 'es-AR',
  title: `Estudio de arquitectura en ${brand.city} | ${brand.name} ${brand.nameSub}`,
  description: `Estudio de arquitectura en ${brand.city}. Te acompañamos a vender, comprar o construir tu inmueble: informe técnico firmado, planos al día y obra a presupuesto cerrado.`,
  ogImage: '/og-image.jpg',
  ogImageAlt: `Obra de ${brand.name} ${brand.nameSub}, estudio de arquitectura en ${brand.city}`,
  themeColor: '#dadada',
  keywords: [
    `estudio de arquitectura ${brand.city}`,
    `empresa de arquitectura ${brand.city}`,
    `arquitectos en ${brand.city}`,
    `construir una casa en ${brand.city}`,
    `informe técnico de propiedad ${brand.city}`,
  ],
} as const;
