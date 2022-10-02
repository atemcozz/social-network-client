import { Marker, Popup, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import { Icon } from "leaflet";
import hereIcon from "../../assets/heremarker.png";
import { useEffect } from "react";
function LocationDetect({ zoom = 20, panOnLoad = true }) {
  const [position, setPosition] = useState(null);
  const userIcon = () => {
    const icon = L.divIcon({
      html: `<div class="here-marker">
          </div>`,
    });
    return icon;
  };

  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      if (panOnLoad) {
        map.setView(e.latlng, zoom);
      }
    },
  });
  useEffect(() => {
    map.locate();
  }, [map]);
  return position === null ? null : (
    <Marker
      position={position}
      icon={
        new Icon({
          iconUrl: hereIcon,
          iconSize: [24, 37],
          iconAnchor: [12, 37],
          popupAnchor: [0, -37],
        })
      }
      eventHandlers={{
        click() {
          map.setView(position, zoom);
        },
      }}
    ></Marker>
  );
}
export default LocationDetect;
