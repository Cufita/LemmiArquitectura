// Writes the server-rendered page into dist/index.html so crawlers (and people
// on slow connections) get real content before any JavaScript runs.
// Runs after `vite build` and `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
import { readFile, writeFile, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = process.cwd();
const htmlPath = path.join(root, 'dist', 'index.html');
const ssrDir = path.join(root, 'dist-ssr');

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const html = await readFile(htmlPath, 'utf8');
const app = render();

if (!html.includes('<div id="app"></div>')) {
  throw new Error('prerender: <div id="app"></div> not found in dist/index.html');
}
await writeFile(htmlPath, html.replace('<div id="app"></div>', `<div id="app">${app}</div>`));
await rm(ssrDir, { recursive: true, force: true });
console.log(`prerender: wrote ${(app.length / 1024).toFixed(1)} KB of HTML into dist/index.html`);
