import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';
import './index.css';

// Catch errors that happen OUTSIDE React's render (e.g. inside the canvas
// animation loop, GSAP callbacks, resize handlers). React's ErrorBoundary
// cannot catch these, and without this handler they just crash silently
// to a blank page on iOS Safari.
function showFatalOverlay(message: string, stack?: string) {
  if (document.getElementById('fatal-error-overlay')) return; // don't stack multiple
  const el = document.createElement('div');
  el.id = 'fatal-error-overlay';
  el.style.cssText =
    'position:fixed;inset:0;background:#0a0a0b;color:#e5e7eb;font-family:monospace;' +
    'font-size:12px;padding:20px;overflow:auto;z-index:999999;white-space:pre-wrap;';
  el.innerHTML =
    '<h1 style="color:#f87171;font-size:16px;margin-bottom:12px;">Runtime error</h1>' +
    `<p style="margin-bottom:8px;">${message}</p>` +
    (stack ? `<pre style="opacity:0.7;">${stack}</pre>` : '');
  document.body.appendChild(el);
}

window.addEventListener('error', (e) => {
  showFatalOverlay(e.message, e.error?.stack);
});

window.addEventListener('unhandledrejection', (e) => {
  showFatalOverlay(String(e.reason?.message || e.reason), e.reason?.stack);
});

// Opt-in on-device console for debugging on a phone without a computer.
// Visit the site with ?debug=1 appended to the URL to enable it.
if (new URLSearchParams(window.location.search).has('debug')) {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/eruda';
  script.onload = () => (window as any).eruda?.init();
  document.body.appendChild(script);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
