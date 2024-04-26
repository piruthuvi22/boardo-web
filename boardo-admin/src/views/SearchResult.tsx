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
import { useLazyGetAllPlacesQuery } from "store/api/placeApi";
import GoogleMap from "components/GoogleMap";
import PlaceCard from "components/PlaceCard";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import theme from "themes";
// import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  Coordinates,
  getUserLocationCoordinates,
  setUserLocationCoordinates,
} from "store/userLocationSlice";
import { getCountValue, increment } from "store/counterClice";
import { useDispatch, useSelector } from "react-redux";
import { LoaderText } from "components/LoaderText";
import Loader from "components/ui-component/Loader";
import { Place } from "data/dataModels";

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
  const dispatch = useDispatch();

  const [
    getAllPlaces,
    { data: allPlaces, isLoading: isPlacesLoading, isError: isPlacesError },
  ] = useLazyGetAllPlacesQuery();

  const [selectedPlace, setSelectedPlace] = useState<Place | undefined>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      dispatch(setUserLocationCoordinates(position.coords));
    });
  }, [dispatch]);

  useEffect(() => {
    getAddress(coordinates);
    getAllPlaces(coordinates);
  }, [getAllPlaces, coordinates]);

  const getAddress = async (coordinates: Coordinates) => {
    console.log("aaa");
    let aa = { latitude: 6.7966944, longitude: 79.9002024 };
    // Get address from latitude & longitude.
    fromLatLng(6.7966944, 79.9002024)
      .then(({ results }: { results: any }) => {
        // const { lat, lng } = results[0].geometry.location;
        console.log(results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isPlacesLoading) {
    return <LoaderText isLoading />;
  } else if ((allPlaces?.length ?? 0) > 0) {
    return (
      <>
        <Box
          height={"80px"}
          py={"10px"}
          onClick={() => getAddress({ latitude: 0, longitude: 0 })}
        >
          <Typography variant="body1">
            Accommodations near{" "}
            <span style={{ fontWeight: "700" }}>University of Moratuwa</span>
          </Typography>
          <Typography variant="body1">
            Showing{" "}
            <span style={{ fontWeight: "700" }}>{allPlaces?.length}</span>{" "}
            places
          </Typography>
        </Box>

        <Box className="container">
          <Box
            className="scrollable-section"
            pr={matchDownLg ? 0 : "10px"}
            sx={{
              flex: "2 !important",
              height: "calc(100vh - 128px - 80px) !important",
            }}
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
              height: "calc(100vh - 128px - 80px) !important",
            }}
            display={matchDownLg ? "none" : "block"}
          >
            <GoogleMap allPlaces={allPlaces} selectedPlace={selectedPlace} />
          </Box>
        </Box>
      </>
    );
  } else {
    return <LoaderText isNotFound onRetry={() => getAllPlaces(coordinates)} />;
  }
}
