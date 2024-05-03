import { Wifi } from "@mui/icons-material";
import {
  Box,
  Chip,
  Divider,
  MenuItem,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";

import { PLACE_TYPES } from "data/placesTypes";
import { useEffect, useState } from "react";
import GoogleMap from "./GoogleMap";
import { TextField2 } from "./ui-component/customizedComponents";
import { DISTANCE_LIMITS } from "data/distanceLimit";
import NearbyPlacesMap from "./NearbyPlacesMap";

export default function NearbyPlaces({
  placeCoordinate,
}: {
  placeCoordinate: { latitude: number; longitude: number };
}) {
  const theme = useTheme();

  const [placeType, setPlaceType] = useState<string>("Super Market");
  const [distanceLimit, setDistanceLimit] = useState<number>(500);
  const [nearbyPlaces, setNearbyPlaces] = useState<
    google.maps.places.PlaceResult[] | null
  >([]);

  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
    isQueryPredictionsLoading,
    placesAutocompleteService,
  } = useGoogle({
    libraries: ["places"],
    debounce: 200,
    language: "en",
    options: {
      region: "lk",
      input: "",
    },
    apiKey: `${process.env.REACT_APP_GOOGLE_API_KEY!}`,
  });

  useEffect(() => {
    placesService?.nearbySearch(
      {
        location: {
          lat: placeCoordinate.latitude,
          lng: placeCoordinate.longitude,
        },
        radius: distanceLimit,
        type: placeType,
      },
      (results, status) => {
        if (status === "OK") {
          if (results) setNearbyPlaces(results?.slice(0, 15));
          return results;
        } else {
          console.error(`Places request failed: ${status}`);
        }
      }
    );
  }, [placeType, distanceLimit]);

  return (
    <Paper variant="outlined" sx={{ padding: "15px", mt: "15px" }}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h5" py={"15px"}>
          Nearby Places
        </Typography>

        <Box>
          <TextField2
            select
            sx={{ width: "200px", mr: 1 }}
            value={distanceLimit}
            onChange={(e) => setDistanceLimit(parseInt(e.target.value))}
          >
            {DISTANCE_LIMITS.map((limit) => (
              <MenuItem key={limit.id} value={limit.value}>
                {limit.label}
              </MenuItem>
            ))}
          </TextField2>
          <ToggleButtonGroup
            value={placeType}
            exclusive
            onChange={(e, value) => setPlaceType(value)}
            sx={{ height: "40px" }}
          >
            {PLACE_TYPES.map((type) => (
              <Tooltip key={type.id} title={type.name} arrow placement="top">
                <ToggleButton
                  value={type.value}
                  sx={{
                    "&.Mui-selected": {
                      color: theme.palette.primary.main,
                      borderColor: theme.palette.primary.main,
                      backgroundColor: "#fff",
                    },
                  }}
                >
                  <type.icon />
                </ToggleButton>
              </Tooltip>
            ))}
          </ToggleButtonGroup>
        </Box>
      </Box>
      <Divider />
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        gap={2}
        mt={"15px"}
        height={"500px"}
      >
        <NearbyPlacesMap
          nearByPlaces={nearbyPlaces}
          placeCoordinate={placeCoordinate}
        />
      </Box>
    </Paper>
  );
}
