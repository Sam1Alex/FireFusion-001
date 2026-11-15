/**
 * All map-specific configuration lives here so additional wildfire data layers
 * can be added without changing the map's initialization code.
 */
export const NORTH_AMERICA_BOUNDS = [
  [7, -169],
  [84, -52],
];

export const INITIAL_VIEW_BOUNDS = [
  [8, -168],
  [76, -52],
];

export const TILE_URL =
  import.meta.env.VITE_TILE_URL ||
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

export const TILE_ATTRIBUTION =
  import.meta.env.VITE_TILE_ATTRIBUTION ||
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export const MAP_OPTIONS = {
  minZoom: 2,
  maxZoom: 18,
  zoomSnap: 1,
  zoomDelta: 1,
  zoomControl: false,
  attributionControl: true,
  worldCopyJump: false,
  maxBoundsViscosity: 1,
  preferCanvas: true,
};

export const TILE_OPTIONS = {
  minZoom: 0,
  maxZoom: 18,
  tileSize: 256,
  // Download only visible tiles plus a small margin, not whole regions.
  keepBuffer: 1,
  updateWhenIdle: true,
  updateWhenZooming: false,
  // No retina 4x tile request multiplication; conserve bandwidth by default.
  detectRetina: false,
  crossOrigin: false,
  attribution: TILE_ATTRIBUTION,
};
