import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = document.getElementById('app')!;

// The build ships the page pre-rendered (scripts/prerender.mjs); hydrate it
// instead of rebuilding it. In dev the root is empty, so render normally.
if (root.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    root,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
