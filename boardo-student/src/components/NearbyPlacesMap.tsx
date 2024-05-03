import React, { useEffect, useRef, useState } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Place } from "data/dataModels";
import { Typography, useTheme } from "@mui/material";

const containerStyle = {
  width: "100%",
  height: "100%",
};

function NearbyPlacesMap({
  nearByPlaces,
  placeCoordinate,
}: {
  nearByPlaces: google.maps.places.PlaceResult[] | null;
  placeCoordinate: { latitude: number; longitude: number };
}) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_API_KEY!}`,
    // AIzaSyCYvxXwzodXqEh2AKD8Re3nVIHcht8FZtI
  });

  const theme = useTheme();
  const [map, setMap] = useState<google.maps.Map>();

  const [initialCenter, setInitialCenter] = useState<google.maps.LatLngLiteral>(
    {
      lat: placeCoordinate.latitude,
      lng: placeCoordinate.longitude,
    }
  );
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult>();

  useEffect(() => {
    // Only execute once when the map is loaded
    if (isLoaded && map) {
      nearByPlaces?.length && zoomToFit();
    }
  }, [isLoaded, map]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  const zoomToFit = async () => {
    const bounds = new window.google.maps.LatLngBounds();
    nearByPlaces?.forEach((place) => {
      bounds.extend({
        lat: place.geometry?.location?.lat()!,
        lng: place.geometry?.location?.lng()!,
      });
    });
    map?.fitBounds(bounds);

    setInitialCenter({
      lat: bounds?.getCenter()?.lat() ?? 0,
      lng: bounds?.getCenter()?.lng() ?? 0,
    });
  };

  //   const calculateRoute = async () => {
  //     const directionsService = new window.google.maps.DirectionsService();
  //     const results = await directionsService.route({
  //       origin: {
  //         lat: placeFrom?.lat ?? 0,
  //         lng: placeFrom?.lng ?? 0,
  //       },
  //       destination: {
  //         lat: selectedPlace?.coordinates?.latitude ?? 0,
  //         lng: selectedPlace?.coordinates?.longitude ?? 0,
  //       },
  //       travelMode: travelMode as google.maps.TravelMode,
  //     });
  //     // results.available_travel_modes
  //     // Above line gives available travel modes. But sometimes it gives error
  //     setDirectionsResponse(results);
  //   };

  return isLoaded ? (
    <GoogleMap
      // ref={}
      mapContainerStyle={containerStyle}
      center={initialCenter}
      zoom={15}
      onLoad={(map) => setMap(map)}
      onUnmount={() => setMap(undefined)}
      options={{
        disableDefaultUI: true,
        streetViewControl: false,
        clickableIcons: false,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      }}
    >
      <>
        <Marker
          position={{
            lat: placeCoordinate.latitude,
            lng: placeCoordinate.longitude,
          }}
          key={placeCoordinate.latitude}
          title={"Your Location"}
          icon={{
            url: "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi3_hdpi.png",
            // scale: 0.1,
            scaledSize: new window.google.maps.Size(20,30),
          }}
          children={
            <>
              {/* <h1>{place.name}</h1> */}
              {/* <p>{place.cost}</p> */}
            </>
          }
        />
        {nearByPlaces?.map((place) => (
          <Marker
            position={{
              lat: place.geometry?.location?.lat()!,
              lng: place.geometry?.location?.lng()!,
            }}
            key={place.place_id}
            title={place.name}
            icon={{
              url: "https://clipart-library.com/image_gallery/81109.png",
              // scale: 0.1,
              scaledSize: new window.google.maps.Size(20,30),
            }}
            children={
              <>
                <h1>{place.name}</h1>
                {/* <p>{place.cost}</p> */}
              </>
            }
          />
        ))}
        {/* {directionsResponse && (
          <DirectionsRenderer
            directions={directionsResponse}
            options={{
              polylineOptions: {
                strokeColor: theme.palette.primary.main,
                strokeOpacity: 0.5,
                strokeWeight: 5,
                clickable: false,
              },
              suppressMarkers: true,
            }}
          />
        )} */}
      </>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(NearbyPlacesMap);
