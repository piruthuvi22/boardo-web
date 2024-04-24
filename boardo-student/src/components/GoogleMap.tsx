import React, { useEffect, useRef, useState } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  InfoBox,
  InfoBoxF,
  InfoWindow,
  LoadScript,
  Marker,
  StandaloneSearchBox,
  useJsApiLoader,
  useLoadScript,
} from "@react-google-maps/api";
import { Place } from "data/dataModels";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import { TextField2 } from "components/ui-component/customizedComponents";
import { Typography, useTheme } from "@mui/material";

const containerStyle = {
  width: "100%",
  height: "100%",
};

function MyComponent({
  allPlaces,
  // coordinates,
  placeFrom,
  selectedPlace,
  travelMode,
}: {
  allPlaces?: Place[] | undefined;
  // coordinates?: { Latitude: number; Longitude: number };
  placeFrom?: { lat: number; lng: number; name: string; address: string };
  selectedPlace?: Place | undefined;
  travelMode?: string;
}) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_API_KEY!}`,
    // AIzaSyCYvxXwzodXqEh2AKD8Re3nVIHcht8FZtI
  });

  const mapRef = useRef();
  const theme = useTheme();
  const [map, setMap] = useState<google.maps.Map>();

  const [initialCenter, setInitialCenter] = useState<google.maps.LatLngLiteral>(
    {
      lat: 0,
      lng: 0,
    }
  );
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult>();

  useEffect(() => {
    // Only execute once when the map is loaded
    if (isLoaded && map) {
      allPlaces?.length && zoomToFit();
      selectedPlace &&
        setInitialCenter({
          lat: selectedPlace.coordinates?.latitude,
          lng: selectedPlace.coordinates?.longitude,
        });
      placeFrom?.lat && zoomToFitTwoCoordinate();
      placeFrom?.lat && calculateRoute();
    }
  }, [isLoaded, map, placeFrom, travelMode]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  const zoomToFit = async () => {
    const bounds = new window.google.maps.LatLngBounds();
    allPlaces?.forEach((palce) => {
      bounds.extend({
        lat: palce.coordinates?.latitude,
        lng: palce.coordinates?.longitude,
      });
    });
    map?.fitBounds(bounds);

    setInitialCenter({
      lat: bounds?.getCenter()?.lat() ?? 0,
      lng: bounds?.getCenter()?.lng() ?? 0,
    });
  };

  const zoomToFitTwoCoordinate = async () => {
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend({
      lat: placeFrom?.lat ?? 0,
      lng: placeFrom?.lng ?? 0,
    });
    bounds.extend({
      lat: selectedPlace?.coordinates?.latitude ?? 0,
      lng: selectedPlace?.coordinates?.longitude ?? 0,
    });
    map?.fitBounds(bounds);

    setInitialCenter({
      lat: bounds?.getCenter()?.lat() ?? 0,
      lng: bounds?.getCenter()?.lng() ?? 0,
    });
  };

  const calculateRoute = async () => {
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: {
        lat: placeFrom?.lat ?? 0,
        lng: placeFrom?.lng ?? 0,
      },
      destination: {
        lat: selectedPlace?.coordinates?.latitude ?? 0,
        lng: selectedPlace?.coordinates?.longitude ?? 0,
      },
      travelMode: travelMode as google.maps.TravelMode,
    });
    // results.available_travel_modes
    // Above line gives available travel modes. But sometimes it gives error
    setDirectionsResponse(results);
  };

  return isLoaded ? (
    <GoogleMap
      // ref={}
      mapContainerStyle={containerStyle}
      center={
        selectedPlace
          ? placeFrom
            ? initialCenter
            : {
                lat: selectedPlace.coordinates?.latitude,
                lng: selectedPlace.coordinates?.longitude,
              }
          : initialCenter
      }
      zoom={selectedPlace ? 18 : 16}
      onLoad={(map) => setMap(map)}
      onUnmount={() => setMap(undefined)}
      options={{}}
    >
      {selectedPlace && (
        <InfoWindow
          position={{
            lat: selectedPlace.coordinates?.latitude,
            lng: selectedPlace.coordinates?.longitude,
          }}
          options={{
            pixelOffset: new window.google.maps.Size(0, -50),
          }}
        >
          <div>
            <Typography variant="subtitle1">{selectedPlace.name}</Typography>
            <Typography variant="subtitle2">
              {selectedPlace.cost} LKR
            </Typography>
          </div>
        </InfoWindow>
      )}
      {placeFrom?.lat && (
        <InfoWindow
          position={{
            lat: placeFrom.lat,
            lng: placeFrom.lng,
          }}
          options={{
            pixelOffset: new window.google.maps.Size(0, -50),
          }}
        >
          <div>
            <Typography variant="subtitle1">{placeFrom.name}</Typography>
            <Typography variant="subtitle2">{placeFrom.address}</Typography>
          </div>
        </InfoWindow>
      )}
      <>
        {placeFrom?.lat && (
          <Marker
            position={{
              lat: placeFrom.lat,
              lng: placeFrom.lng,
            }}
            icon={{
              url: "https://cdn2.iconfinder.com/data/icons/iconslandgps/PNG/256x256/Pinpoints/NeedleLeftYellow2.png",
              // scale: 0.1,
              scaledSize: new window.google.maps.Size(50, 50),
            }}
          />
        )}
        {selectedPlace && (
          <Marker
            position={{
              lat: selectedPlace.coordinates?.latitude,
              lng: selectedPlace.coordinates?.longitude,
            }}
            icon={{
              url: "https://cdn-icons-png.freepik.com/256/5785/5785102.png?semt=ais_hybrid",
              // scale: 0.1,
              scaledSize: new window.google.maps.Size(50, 50),
            }}
          />
        )}
        {allPlaces?.map((place) => (
          <Marker
            position={{
              lat: place.coordinates?.latitude,
              lng: place.coordinates?.longitude,
            }}
            key={place._id}
            title={place.name}
            icon={{
              url: "https://cdn-icons-png.freepik.com/256/5785/5785102.png?semt=ais_hybrid",
              // scale: 0.1,
              scaledSize: new window.google.maps.Size(50, 50),
            }}
            children={
              <>
                <h1>{place.name}</h1>
                <p>{place.cost}</p>
              </>
            }
          />
        ))}
        {directionsResponse && (
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
        )}
      </>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);

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
