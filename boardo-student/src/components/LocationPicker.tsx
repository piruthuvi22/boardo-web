import React, { useEffect, useRef, useState } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  InfoWindow,
  Marker,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Place } from "data/dataModels";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import { Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { getUserLocationCoordinates } from "store/userLocationSlice";

const containerStyle = {
  width: "100%",
  height: "100%",
};

function LocationPicker({
  currentCoordinates,
  setAddress,
  setCoordinates,
}: {
  currentCoordinates: { latitude: number; longitude: number } | undefined;
  setAddress: (address: string) => void;
  setCoordinates: (coordinates: { lat: number; lng: number }) => void;
}) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_API_KEY!}`,
    // AIzaSyCYvxXwzodXqEh2AKD8Re3nVIHcht8FZtI
  });
  const coordinates = useSelector(getUserLocationCoordinates);

  const [map, setMap] = useState<google.maps.Map>();
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral>({
      lat: coordinates.latitude,
      lng: coordinates.longitude,
    });

  useEffect(() => {
    if (currentCoordinates) {
      setMarkerPosition({
        lat: currentCoordinates.latitude,
        lng: currentCoordinates.longitude,
      });
    } else {
      setMarkerPosition({
        lat: coordinates.latitude,
        lng: coordinates.longitude,
      });
    }
  }, [coordinates, currentCoordinates]);

  const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newPosition = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      setMarkerPosition(newPosition);
      setCoordinates(newPosition);
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(
        {
          location: newPosition,
        },
        (results, status) => {
          if (status === "OK") {
            results?.length && setAddress(results[0].formatted_address);
          } else {
            console.error(
              "Geocode was not successful for the following reason: " + status
            );
          }
        }
      );
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return isLoaded ? (
    <GoogleMap
      // ref={}
      mapContainerStyle={containerStyle}
      center={markerPosition ? markerPosition : { lat: 0, lng: 0 }}
      zoom={18}
      onLoad={(map) => setMap(map)}
      onUnmount={() => setMap(undefined)}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
      }}
    >
      <MarkerF
        position={markerPosition}
        draggable
        onDragEnd={handleMarkerDragEnd}
      />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(LocationPicker);

const MapApp = () => {
  const mapRef = useMap();
  const mapRef2 = useRef();
  return (
    <APIProvider apiKey={`${process.env.REACT_APP_GOOGLE_API_KEY!}`}>
      <Map
        onCameraChanged={(viewState) => {}}
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        defaultZoom={3}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      />
    </APIProvider>
  );
};
