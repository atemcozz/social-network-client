import React, {useEffect, useRef, useState} from 'react';
import {YMaps, Map, Placemark} from "@pbe/react-yandex-maps";
import {API_KEY} from "../consts/consts";
import Button from "../../../ui/Button/Button";


export const MapRoutePicker = ({content, onChange}) => {
  const mapRef = useRef(null);
  const ymapsRef = useRef(null);
  const setupYmaps = (ymaps) => {
    ymapsRef.current = ymaps;


    const buttonEditor = new ymapsRef.current.control.Button({
      data: {
        content: "Сбросить маршрут",
      },
      options: {
        selectOnClick: false,
        float: "none",
        position: {
          top: '45px',
          left: '10px',
        },
        maxWidth: "200px",
      },
    });

    buttonEditor.events.add("click", function () {
      onChange([]);
    });
    mapRef.current.controls.add(buttonEditor);
  };

  useEffect(() => {

    if (ymapsRef.current) {


      const multiRoute = new ymapsRef.current.multiRouter.MultiRoute(
        {
          referencePoints: content,
          params: {
            routingMode: "pedestrian",
            results: 1,
          },
        }, {

          wayPointDraggable: true,
          viaPointDraggable: true,
        },
      );
      mapRef.current.geoObjects.removeAll();
      mapRef.current.geoObjects.add(multiRoute);
    }

  }, [content]);

  return (
    <div>
      <div className={"flex justify-center"}>
        <Map
          instanceRef={mapRef}
          onLoad={setupYmaps}
          defaultState={{center: [55.75, 37.57], zoom: 4}}
          width={"100%"}
          height={"540px"}
          onClick={(event) => {
            const coords = event.get("coords");
            onChange([...content, coords]);
          }}

        >

        </Map>
      </div>
      <div className={"p-2 bg-secondary"}>
        <Button onClick={() => onChange([])}>Сбросить маршрут</Button>
      </div>
    </div>
  );
};
