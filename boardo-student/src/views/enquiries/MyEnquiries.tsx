import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import PlaceCard from "components/PlaceCard";
import { useEffect } from "react";
import { LoaderText } from "components/LoaderText";
import { useLazyGetReservationsByUserQuery } from "store/api/reservationApi";
import WishListCard from "components/WishListCard";
import ReservationCard from "components/ReservationCard";

export default function Enquiries() {
  const theme = useTheme();
  const matchDownLg = useMediaQuery(theme.breakpoints.down("lg"));

  const [getUserRervationsByUser, { data: userReservations, isLoading, isError }] =
    useLazyGetReservationsByUserQuery();

  useEffect(() => {
    getUserRervationsByUser("663527fd3e66c6dcce652b57");
  }, [getUserRervationsByUser]);

  if (isLoading) {
    return <LoaderText isLoading />;
  } else if ((userReservations?.length ?? 0) > 0) {
    return (
      <>
        <Box height={"80px"} py={"10px"}>
          <Typography variant="body1">
            Showing{" "}
            <span style={{ fontWeight: "700" }}>
              {userReservations?.length}
            </span>{" "}
            results
          </Typography>
        </Box>

        <Box className="container">
          <Box
            className="scrollable-section"
            pr={matchDownLg ? 0 : "10px"}
            sx={{
              flex: "2 !important",
            }}
          >
            <Grid container spacing={2}>
              {userReservations?.map((reservation) => (
                <Grid key={reservation._id} item xs={12} sm={6} md={4} lg={3}>
                  <ReservationCard reservation={reservation} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </>
    );
  } else {
    return (
      <LoaderText
        isNotFound
        onRetry={() => getUserRervationsByUser("663527fd3e66c6dcce652b57")}
      />
    );
  }
}
