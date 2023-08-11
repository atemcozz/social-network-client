import React, {useEffect, useRef, useState} from 'react';
import {YMaps, Map, Placemark} from "@pbe/react-yandex-maps";


const MapRouteView = ({locations}) => {
  const mapRef = useRef(null);
  const ymapsRef = useRef(null);

  const setupYmaps = (ymaps) => {
    console.log(locations);
    ymapsRef.current = ymaps;
    const multiRoute = new ymapsRef.current.multiRouter.MultiRoute(
      {
        referencePoints: locations,
        params: {
          routingMode: "pedestrian",
          results: 1,
        },
      },
      {
        boundsAutoApply: true,
      },
    );
    if (mapRef.current) {
      mapRef.current.geoObjects.add(multiRoute);
    }


  };


  return (

    <Map
      defaultState={{center: [60, 30], zoom: 5}}
      width={"100%"} height={"540px"}
      onLoad={setupYmaps}
      instanceRef={mapRef}

    >
    </Map>
  );
};

export default MapRouteView;