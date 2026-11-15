# FireFusion

North America interactive OpenStreetMap foundation inspired by NASA FIRMS.

## GitHub Pages

This is a **static website**. There is no required build or local development server.

In repository **Settings → Pages**, choose **Deploy from a branch**, then select **main** and **/(root)**. Visit:

https://spacedivee.github.io/FireFusion/

GitHub Pages serves `index.html` directly. It loads Leaflet 1.9.4 from the official documented CDN and our own JavaScript/CSS with relative URLs that work under the `/FireFusion/` project path.

## Files

- `src/config/map.js` — bounds, map options and OSM tile URL.
- `src/map/createMap.js` — map instance, controls, and a future home for overlays.
- `src/main.js` — layout and event wiring.
- `src/styles.css` — responsive presentation.

Tile requests are limited to the visible viewport with a one-tile buffer. The community OSM tile endpoint is intended for testing and light use; for public production traffic, use a licensed dedicated provider or self-hosted tiles and update the tile URL and attribution in `src/config/map.js`. Do not bulk-download map tiles.

Sources: https://leafletjs.com/download and https://operations.osmfoundation.org/policies/tiles/
