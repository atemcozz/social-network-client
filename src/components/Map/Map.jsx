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
import markerIconPng from "../../assets/marker.png";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import { useContext } from "react";
import { Context } from "../..";
import { useState, useRef } from "react";
import { useEffect } from "react";
import L from "leaflet";
import LocateButton from "./LocateButton";
import LocationDetect from "./LocationDetect";
import useSupercluster from "use-supercluster";

const Map = ({
  center = { lat: 0, lng: 0 },
  zoom = 20,
  locations,
  className,
}) => {
  const { store } = useContext(Context);

  const accessToken =
    "2vT72l92FFVGlmkE95lAV5v3Ipiu70TOCcl9eysYedIe7aIyiX6AHxUrHNJQ648o";

  return (
    <div>
      <MapContainer
        className={`w-full h-96 z-0 ${className}`}
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
        <LocationDetect zoom={20} panOnLoad={false} />
        <LocateButton />
        <LocationsCluster locations={locations} startZoom={zoom} />
        <AttributionControl position="bottomright" prefix={false} />
      </MapContainer>
    </div>
  );
};

const LocationsCluster = ({ locations, radius = 150, startZoom }) => {
  const map = useMap();
  const [zoom, setZoom] = useState(startZoom);
  useMapEvents({
    zoomend(e) {
      setZoom(e.target._zoom);
    },
  });
  const clusterIcon = (count) => {
    const icon = L.divIcon({
      html: `<div class="cluster-marker">
            ${count}
          </div>`,
    });
    return icon;
  };
  const points = locations.map((location) => ({
    type: "Feature",
    properties: { cluster: false },
    geometry: {
      type: "Point",
      coordinates: [location.lng, location.lat],
    },
  }));
  const { clusters, supercluster } = useSupercluster({
    points: points,
    bounds: [-180, -90, 180, 90],
    zoom: zoom,
    options: { radius, maxZoom: 20 },
  });
  return (
    <>
      {clusters?.map((cluster) => {
        const [lng, lat] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount } =
          cluster.properties;
        if (isCluster) {
          return (
            <Marker
              position={{ lat, lng }}
              key={lat + lng}
              icon={clusterIcon(pointCount, 32)}
              eventHandlers={{
                click(e) {
                  map.flyTo(
                    { lng, lat },
                    supercluster.getClusterExpansionZoom(cluster.id),
                    {
                      duration: 0.5,
                    }
                  );
                },
              }}
            />
          );
        }
        return (
          <Marker
            position={{ lat, lng }}
            key={lat + lng}
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
              <div className="p-2">
                {lat} {lng}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};
export default React.memo(Map);
