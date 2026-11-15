import { createMap } from './map/createMap.js';

const app = document.querySelector('#app');

app.innerHTML = `
  <main class="workspace" aria-label="FireFusion interactive map">
    <div id="map" class="map" aria-label="Interactive street map of North America" role="application"></div>

    <header class="topbar">
      <a class="brand" href="./" aria-label="FireFusion home">
        <span class="brand-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none"><path d="M13.4 2.5c.5 4.4-3.4 5.9-2.4 9.2-2-1-2.6-3.1-2.5-4.6C5.5 10.2 4 12.9 4 16a8 8 0 0 0 16 0c0-5-3.7-8.6-6.6-13.5Z" fill="currentColor"/><path d="M12.7 11c-.1 2.5-3.4 3.6-3.4 6A3.2 3.2 0 0 0 15.7 17c0-2.4-1.2-4.2-3-6Z" fill="#101b24"/></svg>
        </span>
        <span>Fire<span class="brand-accent">Fusion</span></span>
      </a>
      <div class="topbar-separator" aria-hidden="true"></div>
      <div class="topbar-label">North America <span class="topbar-label-muted">/ Map Explorer</span></div>
      <span class="prototype-tag">MAP FOUNDATION</span>
    </header>

    <section class="intro-panel" aria-label="Map information">
      <div class="eyebrow"><span class="live-dot"></span> GEOSPATIAL VIEWER</div>
      <h1>North America</h1>
      <p>Explore the continent with an interactive, detailed street map.</p>
      <div class="panel-divider"></div>
      <div class="panel-foot"><span class="panel-icon" aria-hidden="true">▧</span> OpenStreetMap base layer</div>
    </section>

    <nav class="map-tools" aria-label="Map controls">
      <button type="button" class="tool-button" id="zoom-in" title="Zoom in" aria-label="Zoom in">+</button>
      <button type="button" class="tool-button" id="zoom-out" title="Zoom out" aria-label="Zoom out">−</button>
      <div class="tools-rule"></div>
      <button type="button" class="tool-button home-button" id="reset-view" title="Reset to North America" aria-label="Reset view">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9"/><path d="M9 20v-7h6v7"/></svg>
      </button>
    </nav>

    <footer class="statusbar" aria-label="Map status">
      <span class="status-title"><span class="status-dot"></span> MAP READY</span>
      <span class="status-separator"></span>
      <span id="coordinates">—</span>
      <span class="status-separator"></span>
      <span id="zoom-level">ZOOM —</span>
      <span class="status-hint">Scroll to zoom · Drag to explore</span>
    </footer>
  </main>
`;

const coordsLabel = document.querySelector('#coordinates');
const zoomLabel = document.querySelector('#zoom-level');

try {
  const viewer = createMap(document.querySelector('#map'), {
    onViewChange: ({ lat, lng, zoom }) => {
      coordsLabel.textContent = `${Math.abs(lat).toFixed(2)}° ${lat >= 0 ? 'N' : 'S'}  ·  ${Math.abs(lng).toFixed(2)}° ${lng >= 0 ? 'E' : 'W'}`;
      zoomLabel.textContent = `ZOOM ${zoom}`;
    },
  });
  document.querySelector('#zoom-in').addEventListener('click', viewer.zoomIn);
  document.querySelector('#zoom-out').addEventListener('click', viewer.zoomOut);
  document.querySelector('#reset-view').addEventListener('click', viewer.resetView);
} catch (error) {
  console.error('FireFusion map initialization failed:', error);
  document.querySelector('#map').innerHTML = '<div class="map-error" role="alert">Map unavailable. Check your internet connection and reload this page.</div>';
  document.querySelector('.status-title').textContent = 'MAP UNAVAILABLE';
}
