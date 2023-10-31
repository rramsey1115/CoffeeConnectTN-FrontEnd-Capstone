// const key = "AIzaSyBAZYUQCy2QTGBr10KsuiGd1AqOgmFicqc"

import "./Map.css";
import { React, useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  DirectionsRenderer,
  DirectionsService
} from "@react-google-maps/api";

export const MapDisplay = ({ shop, userLocation }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBAZYUQCy2QTGBr10KsuiGd1AqOgmFicqc",
  });

  const [shopLat, setShopLat] = useState(null);
  const [shopLong, setShopLong] = useState(null);
  const [shopLocation, setShopLocation] = useState(null);
  const [userLocationLatLong, setUserLocationLatLong] = useState({});
  const [showDirections, setShowDirections] = useState(false);
  const [directionsRes, setDirectionsRes] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const calculateRoute = async () => {
    if (shopLat && shopLong && userLocationLatLong) {
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: userLocationLatLong,
        destination: { lat: shopLat, lng: shopLong },
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      });
      setDirectionsRes(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
    }
  };

  //   const clearRoute = () => {
  //     setDirectionsRes(null);
  //     setDistance("");
  //     setDuration("");
  //   };

  useEffect(() => {
    setShopLocation({ lat: shopLat, lng: shopLong });
  }, [shopLat, shopLong]);

  useEffect(() => {
    setShopLat(shop.coordinates?.latitude);
  }, [shop]);

  useEffect(() => {
    setShopLong(shop.coordinates?.longitude);
  }, [shop]);

  useEffect(() => {
    setUserLocationLatLong({
      lat: userLocation?.latitude,
      lng: userLocation?.longitude,
    });
  }, [userLocation]);

  useEffect(() => {
    calculateRoute();
  }, [shopLocation, userLocationLatLong]);

  if (isLoaded && shopLat && shopLong && userLocationLatLong && directionsRes) {
    return (
      <>
        <div className="directions">
          <button
            id="directions-button"
            className="button"
            onClick={(e) => {
              setShowDirections(!showDirections);
            }}
          >{showDirections ? "Close" : "Get Directions"}
          </button>
          <div className="directions-details">
            {showDirections ? <><h3>Distance: {distance}</h3>
            <h3>Duration: {duration}</h3></> : ""}
            
          </div>
        </div>
        {showDirections ? (
          <GoogleMap
            zoom={14}
            googleMapsAPIKey={"AIzaSyBAZYUQCy2QTGBr10KsuiGd1AqOgmFicqc"}
            center={{ lat: shopLat, lng: shopLong }}
            mapContainerClassName="map-container"
            
          >
            <Marker position={shopLocation} />
            <Marker position={userLocationLatLong} />
            <DirectionsRenderer directions={directionsRes} />
          </GoogleMap>
        ) : (
          <GoogleMap
            zoom={14}
            googleMapsAPIKey={"AIzaSyBAZYUQCy2QTGBr10KsuiGd1AqOgmFicqc"}
            center={{ lat: shopLat, lng: shopLong }}
            mapContainerClassName="map-container"
          >
            <Marker position={shopLocation} />
            <Marker position={userLocationLatLong} />
          </GoogleMap>
        )}
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
};
