import React, {useEffect, useRef, useState} from 'react';
import {YMaps, Map, Placemark} from "@pbe/react-yandex-maps";
import {API_KEY} from "./consts";


const MapPicker = ({content, onChange}) => {
  const placemarkRef = useRef();

  return (
    <div className={"flex justify-center"}>
      <Map
        defaultState={{center: [55.75, 37.57], zoom: 4}}
        width={"100%"}
        height={"540px"}
        onClick={(event) => {
          const coords = event.get("coords");
          onChange(coords);
        }}

      >
        <Placemark
          instanceRef={placemarkRef}
          onDragEnd={(event) => {
            const coords = placemarkRef.current.geometry._coordinates;
            onChange(coords);

          }}
          geometry={content}
          options={{
            iconImageSize: [30, 30],
            draggable: true,
            preset: "islands#greenIcon",
            hideIconOnBalloonOpen: false,
            openEmptyHint: true,
          }}

        />
      </Map>
    </div>
  );
};

export default MapPicker;