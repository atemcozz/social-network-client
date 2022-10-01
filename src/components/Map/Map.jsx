import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  AttributionControl,
} from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import { useContext } from "react";
import { Context } from "../..";
const Map = ({ center, zoom = 20 }) => {
  const { store } = useContext(Context);
  const accessToken =
    "2vT72l92FFVGlmkE95lAV5v3Ipiu70TOCcl9eysYedIe7aIyiX6AHxUrHNJQ648o";
  function generateLocations(count) {
    let locations = [];
    for (let i = 0; i < count; i++) {
      locations.push({
        lat: Math.random() * 180 - 90,
        lng: Math.random() * 360 - 180,
      });
    }
    return locations;
  }
  const locations = generateLocations(1000);
  return (
    <div>
      <MapContainer center={center} zoom={zoom} attributionControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={
            store.appTheme === "theme-dark"
              ? `https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=${accessToken}`
              : `https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=${accessToken}`
          }
        />
        <AttributionControl position="bottomright" prefix={false} />
        <MarkerClusterGroup>
          {locations.map((location) => (
            <Marker
              position={location}
              key={location.lat + location.lng}
              icon={
                new Icon({
                  iconUrl: markerIconPng,
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [0, -41],
                })
              }
            >
              <Popup>Popup</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default React.memo(Map);
