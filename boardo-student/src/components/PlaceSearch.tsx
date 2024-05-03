import { List, ListItem, ListItemText, Typography } from "@mui/material";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import React, { useState } from "react";
import { TextField2 } from "components/ui-component/customizedComponents";
import { DistanceMatrixService } from "@react-google-maps/api";

export default function PlaceSearch({
  isLabelHidden = false,
  label = "Search for a place..",
  placeHolder = "Search for a place..",
  style,
  onPlaceSelected,
}: {
  isLabelHidden?: boolean;
  label?: string;
  placeHolder?: string;
  style?: React.CSSProperties; // Define prop type for styles
  onPlaceSelected: (placeDetails: google.maps.places.PlaceResult) => void;
}) {
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
    isQueryPredictionsLoading,
    placesAutocompleteService,
  } = useGoogle({
    debounce: 200,
    language: "en",
    options: {
      region: "lk",
      input: "", // Add the 'input' property with an empty string value
    },
    apiKey: `${process.env.REACT_APP_GOOGLE_API_KEY!}`,
  });

  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);

  return (
    <div className="eag-mb-20" style={{ alignSelf: "flex-end" }}>
      {!isLabelHidden && (
        <Typography
          variant="subtitle1"
          sx={{ fontSize: 14 }}
          // pb={2}
        >
          View Distance from
        </Typography>
      )}
      <TextField2
        sx={{
          ...style,
          "& input": {
            height: "20px",
          },
        }}
        size="small"
        placeholder={placeHolder}
        value={search}
        onChange={(e) => {
          setShow(true);
          setSearch(e.target.value);
          getPlacePredictions({
            input: e.target.value,
          });
        }}
        // onFocus={() => setShow(true)}
        // onBlur={() => setShow(false)}
      />

      {show && !isPlacePredictionsLoading && (
        <List
          sx={{
            width: "400px",
            bgcolor: "background.paper",
            position: "absolute",
            zIndex: "1000 !important",
          }}
        >
          {/* {placePredictions?.length === 0 && (
            <ListItem>
              <ListItemText primary="No results found" />
            </ListItem>
          )} */}
          {placePredictions?.map((item) => (
            <ListItem
              key={item.place_id}
              sx={{
                cursor: "pointer",
                "&:hover": { background: "#f5f5f5" },
                py: "5px",
              }}
              onClick={() => {
                placesService?.getDetails(
                  { placeId: item.place_id },
                  (placeDetails) => {
                    setSearch(placeDetails?.name!);
                    onPlaceSelected(placeDetails!);
                    setShow(false);
                  }
                );
              }}
            >
              <ListItemText
                primary={item.description}
                // secondary="Jan 9, 2014"
                sx={{
                  "& span": {
                    fontSize: "0.85rem",
                  },
                  "& p": {
                    fontSize: "0.7rem",
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}
