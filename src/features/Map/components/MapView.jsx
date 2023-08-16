import React from 'react';
import {Map, Placemark} from "@pbe/react-yandex-maps";

export const MapView = ({location, zoom}) => {
  return (


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

  );
};
