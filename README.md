# LEMMI arquitectura

[![CI](https://github.com/Cufita/LemmiArquitectura/actions/workflows/ci.yml/badge.svg)](https://github.com/Cufita/LemmiArquitectura/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/Cufita/LemmiArquitectura/badge.svg?branch=main)](https://coveralls.io/github/Cufita/LemmiArquitectura?branch=main)

Sitio web de LEMMI arquitectura, estudio de arquitectura en Mar del Plata: vender, comprar o construir un inmueble.

React 18 + Vite + Tailwind. La página se prerenderiza en el build (HTML real para buscadores) y se hidrata en el navegador.

## Comandos

```
npm install
npm run dev            # desarrollo
npm run build          # build + render del servidor + prerender en dist/
npm run preview        # servir dist/
npm test               # tests
npm run test:coverage  # tests con cobertura (coverage/lcov.info)
```

## SEO

- Metadatos, Open Graph, Twitter y JSON-LD (negocio local, servicios y FAQ) los genera `scripts/seo-plugin.ts` desde `src/data/`. Se editan en los datos, no en `index.html`.
- `robots.txt` y `sitemap.xml` se emiten en el build.
- La URL absoluta sale de `SITE_URL`, o de `VERCEL_PROJECT_PRODUCTION_URL` en Vercel. Con dominio propio, definí `SITE_URL=https://tudominio.com.ar` en Vercel y redeployá.

## Fotos de obra

Cada proyecto tiene su carpeta en `src/assets/proyectos/<slug>/` (`01.webp`, `02.webp`…; la primera es la portada) y se lista en `src/data/projects.ts`.

## Deploy

Vercel, conectado a este repositorio: cada push a `main` publica en producción y cada PR genera una vista previa. La configuración está en `vercel.json`.
