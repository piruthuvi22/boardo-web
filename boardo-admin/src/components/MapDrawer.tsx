import {
  Box,
  Divider,
  Drawer,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import GoogleMap from "./GoogleMap";

import { useState } from "react";
import { Place } from "data/dataModels";
import PlaceSearch from "./PlaceSearch";
import {
  DirectionsBike,
  DirectionsBus,
  DirectionsCar,
  DirectionsWalk,
  FormatAlignLeft,
  Route,
} from "@mui/icons-material";

export default function MapDrawer({
  open,
  place,
  closeDrawer,
}: {
  open: boolean;
  place: Place;
  closeDrawer: () => () => void;
}) {
  const theme = useTheme();

  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  // selectedPlace?.geometry?.location.lat();
  const onPlaceSelected = (placeDetails: any) => {
    setSelectedPlace(placeDetails);
  };

  const [travelMode, setTravelMode] = useState<string>("WALKING");

  const handleTravelMode = (
    event: React.MouseEvent<HTMLElement>,
    travelMode: string
  ) => {
    setTravelMode(travelMode);
  };

  return (
    <>
      <Drawer
        open={open}
        onClose={closeDrawer()}
        anchor="right"
        variant="temporary"
        sx={{
          "& .MuiDrawer-paper": {
            width: "80%",
            maxWidth: "80%",
            height: "100%",
            maxHeight: "100%",
            [theme.breakpoints.up("md")]: {
              width: "60%",
              maxWidth: "60%",
            },
          },
        }}
      >
        <Box
          bgcolor={theme.palette.grey[50]}
          height={"100%"}
          width={"100%"}
          p={"10px"}
          display={"flex"}
          flexDirection={"column"}
        >
          <Paper variant="elevation" sx={{ padding: "10px" }}>
            <Typography variant="h6">{place.PlaceTitle}</Typography>
            <Typography variant="body2" color={theme.palette.grey[400]}>
              Bandaranayake Mawatha, Moratuwa
            </Typography>
            <Divider sx={{ marginTop: "10px" }} />
            <Box py={2} display={"flex"} alignItems={"center"} gap={2}>
              <PlaceSearch onPlaceSelected={onPlaceSelected} />
              {selectedPlace && (
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontSize: 14 }}
                    // pb={2}
                  >
                    Distance from {selectedPlace?.name}
                  </Typography>
                  <Box display={"flex"} alignItems={"center"}>
                    <ToggleButtonGroup
                      value={travelMode}
                      exclusive
                      onChange={handleTravelMode}
                      aria-label="text alignment"
                      sx={{ height: "40px" }}
                    >
                      <ToggleButton value="WALKING">
                        <DirectionsWalk />
                      </ToggleButton>
                      <ToggleButton value="BICYCLING">
                        <DirectionsBike />
                      </ToggleButton>
                      <ToggleButton value="DRIVING">
                        <DirectionsCar />
                      </ToggleButton>
                      <ToggleButton value="TRANSIT">
                        <Route />
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Box>
                </Box>
              )}
            </Box>
          </Paper>
          <GoogleMap
            selectedPlace={place}
            placeFrom={{
              lat: selectedPlace?.geometry?.location.lat(),
              lng: selectedPlace?.geometry?.location.lng(),
              name: selectedPlace?.name,
              address: selectedPlace?.formatted_address,
            }}
            travelMode={travelMode}
          />
        </Box>
      </Drawer>
    </>
  );
}

{
  /* <ListItem>
<ListItemAvatar>
  <Avatar>
    <Image />
  </Avatar>
</ListItemAvatar>
<ListItemText primary="Photos" secondary="Jan 9, 2014" />
</ListItem> */
}
