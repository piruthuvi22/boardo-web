import { AccessTime, LocationOn, Map, Wifi } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { IconMinusVertical } from "@tabler/icons-react";
import { LoaderText } from "components/LoaderText";
import MapDrawer from "components/MapDrawer";
import { useEffect, useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { useLocation } from "react-router";
import { useLazyGetPlaceByIdQuery } from "store/api/placeApi";

const Place = () => {
  const theme = useTheme();
  const location = useLocation();
  const placeId = location.state.placeId;

  const matchDownLg = useMediaQuery(theme.breakpoints.down("lg"));

  const [
    getPlace,
    { data: place, isLoading: isPlaceLoading, isError: isPlaceError },
  ] = useLazyGetPlaceByIdQuery();

  const { ref } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    onPlaceSelected: (place) => console.log(place),
  });

  const [openMapDrawer, setOpenMapDrawer] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getPlace(placeId);
  }, []);
  if (isPlaceLoading) {
    return <LoaderText isLoading />;
  } else if (place?._id)
    return (
      <>
        <Box className="container">
          <Box className="scrollable-section" pr={matchDownLg ? 0 : "10px"}>
            {/* Image and title */}

            <Paper variant="outlined" sx={{ padding: "15px" }}>
              <Box display={"flex"} flexDirection={"column"} gap={1}>
                <Box sx={{}}>
                  <img
                    src={place.ImageUrl}
                    alt="hotel"
                    style={{
                      width: "100%",
                      maxHeight: "400px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                </Box>
                <Box
                  sx={
                    {
                      // backgroundColor: theme.palette.grey[50],
                    }
                  }
                >
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <Box>
                      <Typography variant="h6">{place.PlaceTitle}</Typography>
                      <Typography variant="body1" sx={{ display: "flex" }}>
                        {place.Rating} <IconMinusVertical />
                        {place.status}
                      </Typography>
                      <Typography
                        variant="body2"
                        display={"flex"}
                        alignItems={"center"}
                        gap={1}
                      >
                        <LocationOn
                          sx={{ color: theme.palette.secondary.light }}
                        />
                        0.6 Km from University of Moratuwa
                      </Typography>
                      <Typography
                        variant="body2"
                        display={"flex"}
                        alignItems={"center"}
                        gap={1}
                      >
                        <AccessTime
                          sx={{ color: theme.palette.secondary.light }}
                        />
                        3min
                      </Typography>
                    </Box>
                    <Box>
                      <Button
                        startIcon={<Map />}
                        variant="contained"
                        color="primary"
                        onClick={() => setOpenMapDrawer(true)}
                      >
                        View on Map
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>

            {/* Description */}
            <Paper variant="outlined" sx={{ padding: "15px", mt: "15px" }}>
              <Typography variant="h5" py={"15px"}>
                Description
              </Typography>
              <Divider />
              <Typography variant="body1" py={"15px"}>
                {place.PlaceDescription}
              </Typography>
            </Paper>

            {/* What will you get? */}

            <Paper variant="outlined" sx={{ padding: "15px", mt: "15px" }}>
              <Typography variant="h5" py={"15px"}>
                What will you get?
              </Typography>
              <Divider />
              <Box display={"flex"} flexWrap={"wrap"} gap={2} mt={"15px"}>
                {place.Facilities.Facilities.map((item) => (
                  <Chip
                    icon={<Wifi />}
                    label={item}
                    variant="filled"
                    size="small"
                    sx={{ background: theme.palette.success.main }}
                  />
                ))}
              </Box>
            </Paper>
          </Box>
          <Box
            className="non-scrollable-section"
            pl={"10px"}
            display={matchDownLg ? "none" : "block"}
          >
            <Box
              component={Paper}
              sx={{
                padding: "10px",
              }}
              display="flex"
              flexDirection="column"
              gap={1}
            >
              <Accordion>
                <AccordionSummary
                  aria-controls="panel1-content"
                  id="panel1-header"
                  sx={styles.accordion}
                >
                  <Button variant="contained" fullWidth>
                    Enquiry
                  </Button>
                </AccordionSummary>
                <AccordionDetails sx={{ paddingX: 0 }}>
                  <Box display={"flex"}>
                    <Typography variant="subtitle1">Enquiry</Typography>
                    <Typography variant="subtitle1">Enquiry</Typography>
                  </Box>
                </AccordionDetails>
              </Accordion>
              <Accordion
                sx={{
                  "::before": {
                    display: "none",
                  },
                }}
              >
                <AccordionSummary
                  aria-controls="panel2-content"
                  id="panel2-header"
                  sx={styles.accordion}
                >
                  <Button variant="outlined" fullWidth>
                    Enquiry
                  </Button>
                </AccordionSummary>
                <AccordionDetails sx={{ paddingX: 0 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
        </Box>

        <MapDrawer
          open={openMapDrawer}
          place={place}
          closeDrawer={() => () => {
            setOpenMapDrawer(false);
          }}
        />
      </>
    );
  else {
    return <LoaderText isNotFound onRetry={() => getPlace(placeId)} />;
  }
};

export default Place;

const styles = {
  accordion: {
    padding: 0,
    margin: 0,
    "& .MuiAccordionSummary-content": {
      margin: 0,
    },
  },
};