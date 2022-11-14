import Button from "../UI/Button/Button";
import { BiCurrentLocation } from "react-icons/bi";
import Control from "react-leaflet-custom-control";
import { useState } from "react";
import { useMapEvents } from "react-leaflet";
import React from "react";
const LocateButton = ({ zoom = 20 }) => {
  const [position, setPosition] = useState();
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
    },
  });
  return (
    <Control prepend position="bottomright">
      <Button
        onClick={() => {
          map.locate();
          if (position) map.setView(position, zoom);
        }}
      >
        <BiCurrentLocation size={"24px"} />
      </Button>
    </Control>
  );
};
export default React.memo(LocateButton);
