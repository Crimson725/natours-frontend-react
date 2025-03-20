import { useEffect } from "react";
import { setMarker, showMap } from "../../../api/leaflet";
import { Location } from "../../../types/Tour";
import L from "leaflet";

interface TourMapProps {
  locationData: Location[];
  mapId: string;
}

const init = (locationData: Location[], mapId: string) => {
  // Create a map
  const map = showMap(mapId);

  if (!map) return;

  // Adding location markers to map
  locationData.forEach((location) => {
    const [lng, lat] = location.coordinates;
    setMarker(map, [lat, lng], location.description);
  });

  // Focusing location of all tours using the polygon created by all location points
  const destinationLocations = locationData.map((location) => {
    const [lng, lat] = location.coordinates;
    return L.latLng(lat, lng);
  });
  map.fitBounds(L.latLngBounds(destinationLocations), { padding: [140, 140] });
};

const TourMap = ({ locationData, mapId }: TourMapProps) => {
  useEffect(() => init(locationData, mapId), []);

  return <div id={mapId}></div>;
};

export default TourMap;
