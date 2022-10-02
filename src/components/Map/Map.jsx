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
import { useState, useRef } from "react";
import { useEffect } from "react";
import L from "leaflet";
import useSupercluster from "use-supercluster";
const Map = ({ center, zoom = 20, locations }) => {
  const { store } = useContext(Context);
  const mapRef = useRef();
  const [mapZoom, setMapZoom] = useState(zoom);
  const accessToken =
    "2vT72l92FFVGlmkE95lAV5v3Ipiu70TOCcl9eysYedIe7aIyiX6AHxUrHNJQ648o";
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
    zoom: mapZoom,
    options: { radius: 150, maxZoom: 20 },
  });
  const [mapLoaded, setMapLoaded] = useState(false);
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.on("zoomend", (e) => {
        setMapZoom(e.target._zoom);
      });
    }
  }, [mapLoaded]);
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
              >
                <Popup>
                  <div className="p-2">Popup</div>
                </Popup>
              </Marker>
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
                <div className="p-2">Popup</div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default React.memo(Map);
