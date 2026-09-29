# LEMMI arquitectura

[![CI](https://github.com/Cufita/LemmiArquitectura/actions/workflows/ci.yml/badge.svg)](https://github.com/Cufita/LemmiArquitectura/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/Cufita/LemmiArquitectura/badge.svg?branch=main)](https://coveralls.io/github/Cufita/LemmiArquitectura?branch=main)

Landing page de **LEMMI arquitectura**, estudio de arquitectura en Mar del Plata que ayuda a **vender, comprar o construir** un inmueble. Una sola página, en español, pensada para convertir visitas en consultas por WhatsApp.

## Qué tiene la página

Hero, servicios, obras (carrusel infinito con galería), reels de Instagram, clientes y testimonios, equipo, preguntas frecuentes y contacto por WhatsApp.

## Stack

- React 18 + Vite 6 + TypeScript
- Tailwind CSS 3
- Motion (animaciones, con soporte de `prefers-reduced-motion`)
- Vitest + Testing Library + jsdom, cobertura con V8
- GitHub Actions → Coveralls
- Deploy en Vercel

## Empezar

Requiere Node 22.

```
npm install
npm run dev
```

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build del cliente + render de servidor + prerender en `dist/` |
| `npm run preview` | Sirve `dist/` |
| `npm test` | Corre los tests |
| `npm run test:coverage` | Tests con cobertura (`coverage/lcov.info`) |
| `npm run a11y` | Chequeos de accesibilidad y reduced-motion sobre el preview |
| `npm run qa` | Capturas para revisión visual |
| `npm run media` | Optimiza fotos a WebP y prepara reels (ver abajo) |

## Tests y cobertura

El coverage mide todo `src/` (excepto `index.tsx` y `entry-server.tsx`) más `scripts/seo-plugin.ts`. Está cerca del 99 % de líneas.

En cada push a `main` y en cada PR, el CI hace `npm ci`, `npm run build`, `npm run test:coverage` y sube `coverage/lcov.info` a Coveralls.

Los tests están junto al código en carpetas `__tests__/`, más `src/App.test.tsx` para las secciones y el layout. Los mocks de jsdom (IntersectionObserver, `play()`, `scrollTo`…) están en `src/test/setup.ts`.

## Estructura

```
src/
  components/
    layout/      Header, Footer
    sections/    una por sección de la página
    ui/          Button, BeforeAfter, ProjectGallery, TestimonialCarousel…
  data/          todo el contenido (textos, obras, equipo, FAQ, reels, marca)
  hooks/  lib/   reduced motion, tokens de animación, helpers del carrusel
  assets/        fotos, logos y reels
scripts/         plugin de SEO, prerender, pipeline de medios, QA
```

El contenido se edita en `src/data/`, no en los componentes.

## SEO

- Metadatos, Open Graph, Twitter y JSON-LD (negocio local, servicios y FAQ) los genera `scripts/seo-plugin.ts` desde `src/data/`.
- `robots.txt` y `sitemap.xml` se emiten en el build.
- La página se prerenderiza en el build (HTML real para buscadores) y se hidrata en el navegador.
- La URL absoluta sale de `SITE_URL`, o de `VERCEL_PROJECT_PRODUCTION_URL` en Vercel. Con dominio propio, definí `SITE_URL=https://tudominio.com.ar` en Vercel y redeployá.

## Contenido

**Obras.** Cada proyecto tiene su carpeta en `src/assets/proyectos/<slug>/` (`01.webp`, `02.webp`…; la primera es la portada) y se lista en `src/data/projects.ts`. Más detalle en `src/assets/proyectos/README.md`.

**Reels.** Nunca se usan tal cual salen de Instagram. `npm run media reel <archivo> <slug>` genera el loop corto, el video completo con `faststart` y el póster, que se referencian en `src/data/instagram.ts`.

**Testimonios.** Los de `src/data/testimonials.ts` son de ejemplo: hay que reemplazarlos por reales, con autorización del cliente, antes de publicar.

## Deploy

Vercel, conectado a este repositorio: cada push a `main` publica en producción y cada PR genera una vista previa. La configuración (headers de seguridad y cache) está en `vercel.json`.
