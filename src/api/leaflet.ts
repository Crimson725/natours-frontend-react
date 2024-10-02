import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

/**
 * Check if the map with given ID is already created
 * @param mapId The ID of the map element
 * @returns A boolean indicating if the map is already created
 */
const isMapCreated = (mapId: string): boolean => {
  const mapEl = document.getElementById(mapId);
  return mapEl !== null && mapEl.innerHTML.trim() !== "";
};
/**
 * Initialized and displays the map if it hasn't been created yet
 * @param mapId The ID of the map element.
 * @returns The Leaflet map object if it was created, otherwise undefined
 */
const showMap = (mapId: string): L.Map | undefined => {
  if (isMapCreated(mapId)) {
    return;
  }
  const map: L.Map = L.map(mapId).setView([51.505, -0.09], 8);
  L.tileLayer("https://.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    updateWhenZooming: false,
    maxZoom: 18,
    minZoom: 4,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  return map;
};
/**
 * Set a marker on the map with a popup
 * @param map The Leaflet map object
 * @param coordinates The coordinates of the marker
 * @param title The title of the popup
 */
const setMarker = (
  map: L.Map,
  coordinates: L.LatLngExpression,
  title: string,
): void => {
  const marker = L.marker(coordinates);
  const popup = L.popup()
    .setLatLng(coordinates)
    .setContent(`<div>${title}</div>`);
  marker.bindPopup(popup);
  marker.addTo(map);
  map.addLayer(marker);
};
export { showMap, setMarker };
