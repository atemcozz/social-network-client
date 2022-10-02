import React from "react";
import Map from "./Map";
import MapPicker from "./MapPicker";
import { useState, useEffect } from "react";
const Test = () => {
  const [position, setPosition] = useState();
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
  const [locations, setLocations] = useState();
  useEffect(() => {
    setLocations(generateLocations(1000));
  }, []);
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xl font-bold">Clusters</div>
      {locations && (
        <Map center={{ lat: 0, lng: 0 }} zoom={2} locations={locations} />
      )}

      <div className="text-xl font-bold">Выбор места</div>
      {position && (
        <div>
          {position.lat} {position.lng}
        </div>
      )}
      <MapPicker
        center={{ lat: 0, lng: 0 }}
        zoom={2}
        onPositionSet={(pos) => setPosition(pos)}
        position={position}
      />
    </div>
  );
};

export default Test;
