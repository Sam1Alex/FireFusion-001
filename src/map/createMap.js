import {
  INITIAL_VIEW_BOUNDS,
  MAP_OPTIONS,
  NORTH_AMERICA_BOUNDS,
  TILE_OPTIONS,
  TILE_URL,
} from '../config/map.js';

/**
 * Initialize a single Leaflet map. Caller owns the instance and should call
 * destroy() before removing the map container.
 *
 * Future overlays (wildfire detections, weather, boundaries) can be added via
 * map.createPane(...) and map.addLayer(...). They are deliberately absent now.
 */
export function createMap(container, { onViewChange } = {}) {
  const L = window.L;
  if (!L) throw new Error('Map library failed to load. Check your network connection.');
  const bounds = L.latLngBounds(NORTH_AMERICA_BOUNDS);
  const initialBounds = L.latLngBounds(INITIAL_VIEW_BOUNDS);

  const map = L.map(container, {
    ...MAP_OPTIONS,
    // maxBounds disabled to allow infinite horizontal scrolling
  });

  L.tileLayer(TILE_URL, TILE_OPTIONS).addTo(map);

  const resetView = () => map.fitBounds(initialBounds, { animate: true, padding: [18, 18] });

  // Fit after container layout is ready. Clamp the zoom so the whole area
  // remains viewable without loading high-detail tiles on startup.
  map.fitBounds(initialBounds, { animate: false, padding: [18, 18] });
  map.setMinZoom(Math.min(map.getZoom(), MAP_OPTIONS.minZoom));

  const publishView = () => {
    if (!onViewChange) return;
    const center = map.getCenter();
    onViewChange({
      lat: center.lat,
      lng: center.lng,
      zoom: map.getZoom(),
    });
  };

  map.on('moveend zoomend', publishView);
  publishView();

  return {
    map,
    zoomIn: () => map.zoomIn(),
    zoomOut: () => map.zoomOut(),
    resetView,
    destroy: () => {
      map.off('moveend zoomend', publishView);
      map.remove();
    },
  };
}
