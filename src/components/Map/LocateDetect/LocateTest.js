import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import locate from "leaflet.locatecontrol";
import "leaflet.locatecontrol/src/L.Control.Locate.scss";

const LocateTest = () => {
  const map = useMap();
  useEffect(() => {
    // const locateOptions = {
    //   position: 'topright',
    //   maxZoom: 19,
    //   strings: {
    //     title: 'Show me where I am, yo!'
    //   },
    //   onActivate: () => {
    //   } // callback before engine starts retrieving locations
    // };
    //
    // const lc = new Locate(locateOptions);
    // lc.addTo(map);
    // return () => lc.remove();

    L.control.locate().addTo(map);
  }, [map]);
  return <div></div>;
};

export default LocateTest;
