import {useMap} from 'react-leaflet';
import {OpenStreetMapProvider, GeoSearchControl} from 'leaflet-geosearch';
import {useEffect} from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";

const MapSearch = () => {
  const provider = new OpenStreetMapProvider();
  const searchControl = new GeoSearchControl({
    provider: provider,
    showMarker: false, // optional: true|false  - default true
    showPopup: false, //
    autoComplete: true, // optional: true|false  - default true
    autoCompleteDelay: 0,
    style: 'button',
    position: "topright",
  });
  const map = useMap();
  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, []);

  return null;
};
export default MapSearch;