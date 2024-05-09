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
import theme from "themes/theme";
// import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  Coordinates,
  getUserLocationCoordinates,
  setUserLocationCoordinates,
} from "store/userLocationSlice";
import { useDispatch, useSelector } from "react-redux";
import { LoaderText } from "components/LoaderText";
import Loader from "components/ui-component/Loader";
import { Place } from "data/dataModels";
import PlaceForm from "./place/PlaceForm";

setKey(process.env.REACT_APP_GOOGLE_API_KEY!); //AIzaSyCjMc0oT2ZkiOh2-DuvmBE4tjazA7Av39M
setDefaults({
  language: "en",
  region: "lk",
  outputFormat: OutputFormat.JSON,
});
export default function MyPlaces() {
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
  const [openDrawer, setOpenDrawer] = useState(false);
  const [editPlace, setEditPlace] = useState<Place | undefined>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      dispatch(setUserLocationCoordinates(position.coords));
    });
  }, [dispatch]);

  useEffect(() => {
    // getAddress(coordinates);
    console.log("UseEff");

    getAllPlaces("663527ba9315da53fae26633");
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

  const handleEditPlace = (place: Place) => {
    setEditPlace(place);
    setOpenDrawer(true);
  };
if(isPlacesError){
  return <LoaderText message="Something went wrong" isError onRetry={()=>getAllPlaces("663527ba9315da53fae26633")} />
}
  if (isPlacesLoading) {
    return <LoaderText isLoading />;
  } else if ((allPlaces?.length ?? 0) > 0) {
    return (
      <>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          height={"80px"}
          py={"10px"}
        >
          <Box>
            <Typography variant="body1">
              Showing{" "}
              <span style={{ fontWeight: "700" }}>{allPlaces?.length}</span>{" "}
              places
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={() => setOpenDrawer(true)}
            sx={{ width: "150px" }}
          >
            Add New Place
          </Button>
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
                <PlaceCard place={place} handleEditPlace={handleEditPlace} />
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

        <PlaceForm
          open={openDrawer}
          place={editPlace}
          closeDrawer={() => {
            setEditPlace(undefined);
            setOpenDrawer(false);
          }}
        />
      </>
    );
  } else {
    return (
      <>
        <LoaderText isNotFound onRetry={() => getAllPlaces("663527ba9315da53fae26633")}>
          <Button
            variant="contained"
            onClick={() => setOpenDrawer(true)}
            sx={{ width: "150px" }}
          >
            Add New Place
          </Button>
        </LoaderText>

        <PlaceForm open={openDrawer} closeDrawer={() => setOpenDrawer(false)} />
      </>
    );
  }
}
