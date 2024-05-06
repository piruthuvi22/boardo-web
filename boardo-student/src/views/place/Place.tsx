import {
  AccessTime,
  Bathtub,
  CheckCircle,
  Favorite,
  FavoriteBorder,
  FavoriteOutlined,
  Hotel,
  LocationOn,
  Map,
  NightShelter,
  Wifi,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { IconMinusVertical } from "@tabler/icons-react";
import CommentSection, { Comment } from "components/Comment";
import CreateFeedback from "components/CreateFeedback";
import ImageCarousel from "components/ImageCarousel";
import { LoaderText } from "components/LoaderText";
import MapDrawer from "components/MapDrawer";
import { useEffect, useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { useLocation } from "react-router";
import { useSearchParams } from "react-router-dom";
import { useLazyGetPlaceByIdQuery } from "store/api/placeApi";
import NearbyPlaces from "components/NearbyPlaces";
import Enquiry from "components/Enquiry";
import { useLazyGetReservationsDateRangeQuery } from "store/api/reservationApi";
import moment from "moment";
import {
  useAddRemoveWishListMutation,
  useLazyGetStatusQuery,
} from "store/api/wishlistApi";
import { useLazyGetFeedbackByUserQuery } from "store/api/feedbackApi";
import { Feedback } from "data/dataModels";

const Place = () => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();

  const placeId = searchParams.get("id")!;

  const matchDownLg = useMediaQuery(theme.breakpoints.down("lg"));

  const [
    getPlace,
    { data: place, isLoading: isPlaceLoading, isError: isPlaceError },
  ] = useLazyGetPlaceByIdQuery();

  const [
    getReservationsDateRange,
    {
      data: reservationsDateRange,
      isLoading: isReservationsLoading,
      isError: isReservationsError,
    },
  ] = useLazyGetReservationsDateRangeQuery();

  const [getStatus, { isFetching, data: status }] = useLazyGetStatusQuery();

  const [addRemoveWishList, { isLoading, data }] =
    useAddRemoveWishListMutation();

  const [
    getFeedbackOfUser,
    { isFetching: isFetchingUserFeedback, data: userFeedback },
  ] = useLazyGetFeedbackByUserQuery();
  // const { ref } = usePlacesWidget({
  //   apiKey: `${process.env.REACT_APP_GOOGLE_API_KEY!}`,
  //   onPlaceSelected: (place) => console.log(place),
  // });

  const [openMapDrawer, setOpenMapDrawer] = useState(false);
  const [openEnquiryDrawer, setOpenEnquiryDrawer] = useState(false);
  const [openFeedback, setOpenFeedback] = useState(false);
  const [editFeedback, setEditFeedback] = useState<Feedback>();

  useEffect(() => {
    getPlace(placeId);
    getStatus({ userId: "663527fd3e66c6dcce652b57", placeId });
    getFeedbackOfUser({ userId: "663527fd3e66c6dcce652b57", placeId });
  }, []);

  const handleEnquiry = (placeId: string) => {
    getReservationsDateRange(placeId);
  };

  const handleAddToWishlist = (placeId: string) => {
    addRemoveWishList({ userId: "663527fd3e66c6dcce652b57", placeId });
  };

  const handleEdit = (feedback: Feedback) => {
    setOpenFeedback(true);
    setEditFeedback(feedback);
  };

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
                  <ImageCarousel imagesList={place.imageUrls} />
                </Box>

                <Box display={"flex"} justifyContent={"space-between"}>
                  <Box>
                    <Typography variant="h6">{place.name}</Typography>
                    <Typography variant="body1" sx={{ display: "flex" }}>
                      {place.rating} <IconMinusVertical />
                      {place.status}
                    </Typography>
                    <Typography
                      variant="body2"
                      display={"flex"}
                      alignItems={"center"}
                      gap={1}
                      color={theme.palette.grey[500]}
                    >
                      <LocationOn sx={{ fontSize: "18px" }} />
                      {place.address}
                    </Typography>
                    <Typography
                      variant="body2"
                      display={"flex"}
                      alignItems={"center"}
                      gap={1}
                    >
                      <LocationOn sx={{ fontSize: "18px" }} />
                      0.6 Km from University of Moratuwa
                    </Typography>
                    <Typography
                      variant="body2"
                      display={"flex"}
                      alignItems={"center"}
                      gap={1}
                    >
                      <AccessTime sx={{ fontSize: "18px" }} />
                      3min
                    </Typography>

                    <Box display={"flex"} alignItems={"center"} gap={2}>
                      <Typography
                        variant="subtitle2"
                        display={"flex"}
                        alignItems={"center"}
                        gap={1}
                        color={theme.palette.grey[500]}
                      >
                        <Hotel sx={{ fontSize: "18px" }} />
                        {place?.facilities.noOfBeds}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        display={"flex"}
                        alignItems={"center"}
                        gap={1}
                        color={theme.palette.grey[500]}
                      >
                        <NightShelter sx={{ fontSize: "18px" }} />
                        {place?.facilities.roomType}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        display={"flex"}
                        alignItems={"center"}
                        gap={1}
                        color={theme.palette.grey[500]}
                      >
                        <Bathtub sx={{ fontSize: "18px" }} />
                        {place?.facilities.washRoomType}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    {isLoading || isFetching ? (
                      <CircularProgress size={20} thickness={2} />
                    ) : (
                      <IconButton
                        title={
                          status ? "Remove from wishlist" : "Add to wishlist"
                        }
                        color="primary"
                        size="small"
                        sx={{ zIndex: 50 }}
                        onClick={() => handleAddToWishlist(place._id)}
                      >
                        {status ? <Favorite /> : <FavoriteBorder />}
                      </IconButton>
                    )}
                    <Button
                      sx={{ ml: 2 }}
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
            </Paper>
            {/* Description */}
            <Paper variant="outlined" sx={{ padding: "15px", mt: "15px" }}>
              <Typography variant="h5" py={"15px"}>
                Description
              </Typography>
              <Divider />
              <Typography variant="body1" py={"15px"}>
                {place.description}
              </Typography>
            </Paper>
            {/* What will you get? */}
            <Paper variant="outlined" sx={{ padding: "15px", mt: "15px" }}>
              <Typography variant="h5" py={"15px"}>
                What will you get?
              </Typography>
              <Divider />
              <Box display={"flex"} flexWrap={"wrap"} gap={2} mt={"15px"}>
                {place.facilities.facilities.map((item) => (
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

            {/* Nearby Places */}
            <NearbyPlaces placeCoordinate={place.coordinates} />

            {/* Reviews */}
            <Paper variant="outlined" sx={{ padding: "15px", mt: "15px" }}>
              <Typography variant="h5" py={"15px"}>
                Reviews
              </Typography>
              <Divider />
              <Box
                display={"flex"}
                flexDirection={"column"}
                gap={2}
                mt={"15px"}
              >
                <CommentSection placeId={placeId} />
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
                mb: "10px",
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
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleEnquiry(place._id)}
                  >
                    Enquiry
                  </Button>
                </AccordionSummary>
                <AccordionDetails sx={{ paddingX: 0 }}>
                  {isReservationsLoading ? (
                    <Box display={"flex"} justifyContent={"center"}>
                      <CircularProgress size={20} thickness={2} />
                    </Box>
                  ) : (
                    <List dense={true}>
                      {reservationsDateRange?.length != 0 && (
                        <ListItem>
                          <ListItemText
                            primary="Reservations"
                            secondary="You can not reserve this place on these dates."
                          />
                        </ListItem>
                      )}
                      {reservationsDateRange?.map((item) => (
                        <ListItem key={item._id}>
                          <ListItemIcon>
                            <CheckCircle color="success" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography
                                variant="subtitle2"
                                display={"flex"}
                                justifyContent={"space-between"}
                              >
                                <span
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <span style={{ fontSize: "12px" }}>From</span>
                                  {moment(item.checkIn).format("YYYY-MM-DD")}
                                </span>
                                <span
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <span style={{ fontSize: "12px" }}>To</span>
                                  {moment(item.checkOut).format("YYYY-MM-DD")}
                                </span>
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))}
                      <Button
                        variant="text"
                        fullWidth
                        onClick={() => setOpenEnquiryDrawer(true)}
                      >
                        Enquire Now
                      </Button>
                    </List>
                  )}
                </AccordionDetails>
              </Accordion>
            </Box>

            {!userFeedback || openFeedback ? (
              <Box
                component={Paper}
                sx={{
                  padding: "10px",
                  mb: "10px",
                }}
              >
                <CreateFeedback
                  placeId={placeId}
                  userFeedback={editFeedback}
                  onCancel={() => {
                    setOpenFeedback(false);
                    setEditFeedback(undefined);
                  }}
                />
              </Box>
            ) : (
              <Box
                component={Paper}
                sx={{
                  padding: "10px",
                  mb: "10px",
                }}
                display="flex"
                flexDirection="column"
                gap={1}
              >
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography variant="h6">Your feedback</Typography>
                  <Button
                    variant="text"
                    onClick={() => handleEdit(userFeedback)}
                  >
                    Edit
                  </Button>
                </Box>
                <Comment feedback={userFeedback} />
              </Box>
            )}
          </Box>
        </Box>

        <MapDrawer
          open={openMapDrawer}
          place={place}
          closeDrawer={() => {
            setOpenMapDrawer(false);
          }}
        />

        <Enquiry
          place={place}
          open={openEnquiryDrawer}
          closeDrawer={() => {
            setOpenEnquiryDrawer(false);
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
