import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  AttributionControl,
  useMapEvents,
  useMap,
} from "react-leaflet";
import LocationDetect from "./LocationDetect";
import markerIconPng from "../../assets/marker.png";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import { useContext } from "react";
import { Context } from "../..";
import LocateButton from "./LocateButton";
const MapPicker = ({ center, zoom = 20, onPositionSet, position }) => {
  const { store } = useContext(Context);
  const accessToken =
    "2vT72l92FFVGlmkE95lAV5v3Ipiu70TOCcl9eysYedIe7aIyiX6AHxUrHNJQ648o";

  return (
    <div>
      <MapContainer
        center={center}
        zoom={zoom}
        attributionControl={false}
        worldCopyJump
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
        <LocateButton />
        <PickMarker position={position} onPositionSet={onPositionSet} />
        <LocationDetect zoom={15} panOnLoad />
      </MapContainer>
    </div>
  );
};

const PickMarker = ({ position, onPositionSet }) => {
  const map = useMap();
  useMapEvents({
    click(e) {
      if (e.latlng.lng >= -180 && e.latlng.lng <= 180) onPositionSet(e.latlng);
    },
  });
  return (
    position && (
      <Marker
        draggable
        position={position}
        icon={
          new Icon({
            iconUrl: markerIconPng,
            iconSize: [24, 37],
            iconAnchor: [12, 37],
            popupAnchor: [0, -37],
          })
        }
        eventHandlers={{
          dragend(e) {
            if (e.target._latlng.lng >= -180 && e.target._latlng.lng <= 180)
              onPositionSet(e.target._latlng);
          },
        }}
      >
        <Popup>
          <div className="p-2">
            {position.lat} {position.lng}
          </div>
        </Popup>
      </Marker>
    )
  );
};
export default React.memo(MapPicker);
