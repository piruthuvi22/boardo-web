import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import PlaceCard from "components/PlaceCard";
import { useEffect } from "react";
import { LoaderText } from "components/LoaderText";
import { useLazyGetWishListQuery } from "store/api/wishlistApi";

export default function WishList() {
  const theme = useTheme();
  const matchDownLg = useMediaQuery(theme.breakpoints.down("lg"));

  const [getAllWishlist, { data: wishlist, isLoading, isError }] =
    useLazyGetWishListQuery();

  useEffect(() => {
    getAllWishlist("");
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
              height: "calc(100vh - 128px - 80px) !important",
            }}
          >
            {wishlist?.map((place) => (
              <Box key={place._id} mb={2}>
                <PlaceCard place={place} />
              </Box>
            ))}
          </Box>
        </Box>
      </>
    );
  } else {
    return <LoaderText isNotFound onRetry={() => getAllWishlist("")} />;
  }
}
