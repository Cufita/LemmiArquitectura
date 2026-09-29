import { renderToString } from 'react-dom/server';
import App from './App';

/** Static HTML of the page, used at build time by scripts/prerender.mjs. */
export function render(): string {
  return renderToString(<App />);
}
