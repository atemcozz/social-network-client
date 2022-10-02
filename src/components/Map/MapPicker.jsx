import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  AttributionControl,
  useMapEvents,
} from "react-leaflet";
import markerIconPng from "../../assets/marker.png";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import { useContext } from "react";
import { Context } from "../..";
import { useState } from "react";
import { useEffect, useRef } from "react";
const MapPicker = ({ center, zoom = 20, onPositionSet, position }) => {
  const { store } = useContext(Context);
  const accessToken =
    "2vT72l92FFVGlmkE95lAV5v3Ipiu70TOCcl9eysYedIe7aIyiX6AHxUrHNJQ648o";
  const mapRef = useRef();

  const [mapLoaded, setMapLoaded] = useState(false);
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.on("click", (e) => {
        onPositionSet(e.latlng);
      });
    }
  }, [mapLoaded, onPositionSet]);

  return (
    <div>
      <MapContainer
        center={center}
        zoom={zoom}
        attributionControl={false}
        ref={mapRef}
        whenReady={() => setMapLoaded(true)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={
            store.appTheme === "theme-dark"
              ? `https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=${accessToken}`
              : `https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=${accessToken}`
          }
        />
        <AttributionControl position="bottomright" prefix={false} />
        {position && (
          <Marker
            position={position}
            icon={
              new Icon({
                iconUrl: markerIconPng,
                iconSize: [24, 37],
                iconAnchor: [12, 37],
                popupAnchor: [0, -37],
              })
            }
          >
            <Popup>
              <div className="p-2">Popup</div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};
export default React.memo(MapPicker);
