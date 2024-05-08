import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import PlaceCard from "components/PlaceCard";
import { useEffect } from "react";
import { LoaderText } from "components/LoaderText";
import { useLazyGetWishListQuery } from "store/api/wishlistApi";
import WishListCard from "components/WishListCard";

export default function WishList() {
  const theme = useTheme();
  const matchDownLg = useMediaQuery(theme.breakpoints.down("lg"));

  const [getAllWishlist, { data: wishlist, isLoading, isError }] =
    useLazyGetWishListQuery();

  const userStore = localStorage.getItem("userInfo");
  const userId = JSON.parse(userStore!)._id;

  useEffect(() => {
    getAllWishlist(userId);
  }, [getAllWishlist]);

  if (isLoading) {
    return <LoaderText isLoading />;
  } else if ((wishlist?.length ?? 0) > 0) {
    return (
      <>
        <Box height={"80px"} py={"10px"}>
          <Typography variant="body1">
            Showing{" "}
            <span style={{ fontWeight: "700" }}>{wishlist?.length}</span> places
          </Typography>
        </Box>

        <Box className="container">
          <Box
            className="scrollable-section"
            pr={matchDownLg ? 0 : "10px"}
            sx={{
              flex: "2 !important",
            }}>
            <Grid container spacing={2}>
              {wishlist?.map((place) => (
                <Grid key={place._id} item xs={12} sm={6} md={4} lg={3}>
                  <WishListCard place={place} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </>
    );
  } else {
    return <LoaderText isNotFound onRetry={() => getAllWishlist(userId)} />;
  }
}
