# FireFusion

A lightweight, expandable **North America map viewer**, inspired by the map-first layout of NASA FIRMS. The current milestone is **only an interactive OpenStreetMap basemap**; no fire detections, NASA APIs, alerts, or overlays are implemented yet.

## Getting started

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

For a deployable static build:

```bash
npm run build
npm run preview
```

Deploy the generated `dist/` directory to any static hosting service.

## Architecture

- `src/config/map.js` — North America bounds, default views, and replaceable tile provider.
- `src/map/createMap.js` — Leaflet map lifecycle, interactions, viewport callbacks, and a future home for overlays.
- `src/main.js` — minimal UI shell and button wiring.
- `src/styles.css` — responsive, map-first visual design.

## Map behavior and performance

The app uses **Leaflet 1.9.4** and raster tiles derived from **OpenStreetMap**. Tiles are **requested per visible viewport and zoom level**, so zooming toward a city naturally requests detailed tiles without downloading North America in bulk. Drag to pan, scroll/pinch or use +/- to zoom, and click Home to reset. Bounds restrict exploration to North America (including Central America, Greenland and Alaska).

Performance settings: `keepBuffer: 1`, `updateWhenIdle: true`, `updateWhenZooming: false`, and `detectRetina: false`. The browser caches tiles according to the provider's HTTP response headers. No prefetching, background regional downloads, local tile archive, custom cache-busting, or offline map feature is used.

The default public OSM tile endpoint is **for low-traffic development and evaluation only**. It is a community-funded, best-effort service, not a production map CDN. Before a public rollout, choose a properly licensed OSM-derived tile host or self-host, then configure `VITE_TILE_URL` and `VITE_TILE_ATTRIBUTION` in an `.env` file (see `.env.example`). Ensure your deployment permits Referer headers, respects caching headers and maintains visible attribution. Never place private provider API keys in `VITE_*` variables.

- [OpenStreetMap tile usage policy](https://operations.osmfoundation.org/policies/tiles/)
- [OpenStreetMap copyright and attribution](https://www.openstreetmap.org/copyright)
- [NASA FIRMS map — visual inspiration](https://firms.modaps.eosdis.nasa.gov/map/)

## Next features

The `createMap` module exposes its Leaflet `map` instance so future features can add independent data layers (NASA FIRMS detections, smoke, weather, boundaries, measurement tools) without replacing the map foundation. No NASA data or NASA-branded assets are redistributed.
