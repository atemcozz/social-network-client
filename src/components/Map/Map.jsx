import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  OverlayView,
  MarkerClusterer,
  Marker,
} from "@react-google-maps/api";
import PlaceMarker from "./PlaceMarker";
const Map = ({ center }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAYmfnr8oPsGLxPS0QjI0UcwhHadjV_-QE",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  const locations = [
    { lat: -31.56391, lng: 147.154312 },
    { lat: -33.718234, lng: 150.363181 },
    { lat: -33.727111, lng: 150.371124 },
    { lat: -33.848588, lng: 151.209834 },
    { lat: -33.851702, lng: 151.216968 },
    { lat: -34.671264, lng: 150.863657 },
    { lat: -35.304724, lng: 148.662905 },
    { lat: -36.817685, lng: 175.699196 },
    { lat: -36.828611, lng: 175.790222 },
    { lat: -37.75, lng: 145.116667 },
    { lat: -37.759859, lng: 145.128708 },
    { lat: -37.765015, lng: 145.133858 },
    { lat: -37.770104, lng: 145.143299 },
    { lat: -37.7737, lng: 145.145187 },
    { lat: -37.774785, lng: 145.137978 },
    { lat: -37.819616, lng: 144.968119 },
    { lat: -38.330766, lng: 144.695692 },
    { lat: -39.927193, lng: 175.053218 },
    { lat: -41.330162, lng: 174.865694 },
    { lat: -42.734358, lng: 147.439506 },
    { lat: -42.734358, lng: 147.501315 },
    { lat: -42.735258, lng: 147.438 },
    { lat: -43.999792, lng: 170.463352 },
  ];
  const options = {
    streetViewControl: false,
  };
  return (
    isLoaded && (
      <div className="w-full h-[85vh] rounded-lg overflow-hidden relative">
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "100%",
          }}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={options}
        >
          <MarkerClusterer>
            {(clusterer) =>
              locations.map((location) => (
                <OverlayView
                  key={location.lat + location.lng}
                  position={location}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                  <PlaceMarker
                    src={require("../../assets/image_notfound.png")}
                  />
                </OverlayView>

                // <Marker
                //   key={location.lat + location.lng}
                //   position={location}
                //   clusterer={clusterer}
                // />
              ))
            }
          </MarkerClusterer>
        </GoogleMap>
      </div>
    )
  );
};

export default React.memo(Map);
