import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
  OutputFormat,
} from "react-geocode";
import {
  useLazyGetAllPlacesQuery,
  useLazyGetNearestPlacesQuery,
} from "store/api/placeApi";
import GoogleMap from "components/GoogleMap";
import PlaceCard from "components/PlaceCard";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Coordinates,
  getUserLocationCoordinates,
  setUserLocationCoordinates,
} from "store/userLocationSlice";
import { useDispatch, useSelector } from "react-redux";
import { LoaderText } from "components/LoaderText";
import { Place } from "data/dataModels";
import { getSearchPlaceData } from "store/searchSlice";

setKey(process.env.REACT_APP_GOOGLE_API_KEY!); //AIzaSyCjMc0oT2ZkiOh2-DuvmBE4tjazA7Av39M
setDefaults({
  language: "en",
  region: "lk",
  outputFormat: OutputFormat.JSON,
});
export default function SearchResult() {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const matchDownLg = useMediaQuery(theme.breakpoints.down("lg"));

  const coordinates = useSelector(getUserLocationCoordinates);
  const searchPlaceData = useSelector(getSearchPlaceData);
  const dispatch = useDispatch();

  const [
    getNearestPlaces,
    {
      data: allPlaces,
      isFetching,
      isLoading: isPlacesLoading,
      isError: isPlacesError,
    },
  ] = useLazyGetNearestPlacesQuery();

  const [selectedPlace, setSelectedPlace] = useState<Place | undefined>();
  const [address, setAddress] = useState<string | undefined>();

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     dispatch(setUserLocationCoordinates(position.coords));
  //   });
  // }, [dispatch]);

  // console.log("coordinates", coordinates);

  // useEffect(() => {
  //   getAddress(coordinates);
  //   getNearestPlaces({ ...coordinates, radius: 30000 });
  // }, [getNearestPlaces, coordinates]);

  useEffect(() => {
    getNearestPlaces({
      latitude: searchPlaceData.latitude,
      longitude: searchPlaceData.longitude,
      radius: searchPlaceData.radius!,
    });
    setAddress(searchPlaceData.address);
  }, [getNearestPlaces, searchPlaceData]);

  const onRetry = () => {
    getNearestPlaces({
      latitude: searchPlaceData.latitude,
      longitude: searchPlaceData.longitude,
      radius: searchPlaceData.radius!,
    });
  };
  const getAddress = async (coordinates: Coordinates) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      {
        location: { lat: coordinates.latitude, lng: coordinates.longitude },
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
  };
  if (isPlacesError) {
    return (
      <LoaderText
        isNotFound
        message="No places found for the given location"
        onRetry={onRetry}
      />
    );
  }
  if (isFetching) {
    return <LoaderText isLoading />;
  } else if ((allPlaces?.length ?? 0) > 0) {
    return (
      <>
        <Box height={"80px"} py={"10px"}>
          <Typography variant="body2">
            Accommodations near{" "}
            <span style={{ fontWeight: "600" }}>{address && address}</span>
          </Typography>
          <Typography variant="body1">
            Showing{" "}
            <span style={{ fontWeight: "600" }}>{allPlaces?.length}</span>{" "}
            places
          </Typography>
        </Box>

        <Box className="container">
          <Box
            className="scrollable-section"
            pr={matchDownLg ? 0 : "10px"}
            onMouseLeave={() => setSelectedPlace(undefined)}
          >
            {allPlaces?.map((place) => (
              <Box
                key={place._id}
                mb={2}
                onMouseEnter={() => setSelectedPlace(place)}
              >
                <PlaceCard place={place} />
              </Box>
            ))}
          </Box>
          <Box
            className="non-scrollable-section"
            pl={"10px"}
            sx={{
              flex: "3 !important",
            }}
            display={matchDownLg ? "none" : "block"}
          >
            <GoogleMap allPlaces={allPlaces} selectedPlace={selectedPlace} />
          </Box>
        </Box>
      </>
    );
  } else {
    return (
      <LoaderText
        isNotFound
        onRetry={() => getNearestPlaces({ ...coordinates, radius: 5000 })}
      />
    );
  }
}
