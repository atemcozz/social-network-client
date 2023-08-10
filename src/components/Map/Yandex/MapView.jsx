import React from 'react';
import {API_KEY} from "./consts";
import {Map, Placemark, YMaps} from "@pbe/react-yandex-maps";

const MapView = ({location, zoom}) => {
  return (
    <YMaps
      query={{
        load: "package.full",
        apikey: API_KEY,
      }}
    >
      <div className={"flex justify-center relative"}>
        <Map

          defaultState={{center: location, zoom: zoom}}
          width={"100%"} height={"540px"}

        >
          <Placemark
            geometry={location}
            options={{
              iconImageSize: [30, 30],
              preset: "islands#blueIcon",
              hideIconOnBalloonOpen: false,
              openEmptyHint: true,
            }}
          />
        </Map>
      </div>
    </YMaps>
  );
};

export default MapView;