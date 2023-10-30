// const key = "AIzaSyBAZYUQCy2QTGBr10KsuiGd1AqOgmFicqc"
import { React, useEffect, useMemo, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

export const Map = ({ shop }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBAZYUQCy2QTGBr10KsuiGd1AqOgmFicqc",
  });

  //   const [map, setMap] = useState(null);
  const [shopLat, setShopLat] = useState(null);
  const [shopLong, setShopLong] = useState(null);
  const [center, setCenter]= useState(null);

  useEffect(()=> {
    setCenter({lat: shopLat, lng: shopLong})
  },[shopLat, shopLong])

  useEffect(() => {
    setShopLat(shop.coordinates?.latitude);
  }, [shop]);

  useEffect(() => {
    setShopLong(shop.coordinates?.longitude);
  }, [shop]);

  if (isLoaded && shopLat && shopLong) {
    return (
      <GoogleMap
        zoom={12}
        googleMapsAPIKey={"AIzaSyBAZYUQCy2QTGBr10KsuiGd1AqOgmFicqc"}
        center={{ lat: shopLat, lng: shopLong }}
        mapContainerClassName="map-container"
      >
        <Marker position={center} />
      </GoogleMap>
    );
  } else {
    return <div>Loading...</div>;
  }
};
