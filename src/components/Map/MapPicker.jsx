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

import LocateTest from "./LocateTest";
import useStore from "../../hooks/useStore";
import useTheme from "../../hooks/useTheme";
import classNames from "classnames";
const MapPicker = ({
  center = { lat: 0, lng: 0 },
  zoom = 0,
  onPositionSet,
  position,
  className,
}) => {
  const store = useStore();
  const { getTheme } = useTheme();
  const accessToken =
    "2vT72l92FFVGlmkE95lAV5v3Ipiu70TOCcl9eysYedIe7aIyiX6AHxUrHNJQ648o";

  return (
    <div>
      <MapContainer
        className={classNames(`w-full h-96 z-01`, className)}
        center={center}
        zoom={zoom}
        attributionControl={false}
        worldCopyJump
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={
            getTheme() === "theme-dark"
              ? `https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=${accessToken}`
              : `https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=${accessToken}`
          }
        />
        <AttributionControl position="bottomright" prefix={false} />
        {/* <LocateButton />
        <LocationDetect /> */}
        <LocateTest />
        <PickMarker position={position} onPositionSet={onPositionSet} />
      </MapContainer>
    </div>
  );
};

const PickMarker = ({ position, onPositionSet }) => {
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
          <div>
            {position.lat} {position.lng}
          </div>
        </Popup>
      </Marker>
    )
  );
};
export default React.memo(MapPicker);
