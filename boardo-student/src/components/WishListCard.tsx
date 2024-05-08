import { Bathtub, Clear, Hotel, NightShelter } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";
import { Place } from "data/dataModels";
import { useNavigate } from "react-router";
import { useAddRemoveWishListMutation } from "store/api/wishlistApi";

export default function WishListCard({ place }: { place: Place }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const userStore= localStorage.getItem("userInfo");
  const userId = JSON.parse(userStore!)._id;

  const [addRemoveWishList, { isLoading, data }] =
    useAddRemoveWishListMutation();

  const handleRemove = (placeId: string) => {
    addRemoveWishList({ userId, placeId });
  };
  return (
    <>
      <Card
        variant="outlined"
        sx={{
          borderRadius: "10px",
          padding: "5px",
          cursor: "pointer",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
            border: `1px solid ${theme.palette.primary.light}`,
            // transform: "scale(1.003)",
            transition: "all 0.3s ease-in-out",
          },
        }}
        onClick={() => navigate(`/app/place?id=${place._id}`, {})}
      >
        <CardHeader
          sx={{ padding: 2 }}
          action={
            <IconButton
              aria-label="settings"
              onClick={() => handleRemove(place._id)}
            >
              <Clear />
            </IconButton>
          }
          title={place?.name}
          subheader={
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <Rating
                name="read-only"
                size="small"
                value={place?.rating}
                readOnly
              />
              <span style={{ fontSize: 15 }}>{place?.rating}</span>
            </Box>
          }
        />
        <CardMedia
          component="img"
          sx={{ height: 140, objectFit: "cover" }}
          image={place?.imageUrls[0].url}
          alt="place image"
        />
        <CardContent sx={{ pb: "16px !important", p: 2 }}>
          <Typography variant="h6">{place?.name}</Typography>
          {/* <Typography variant="body2">{place?.address}</Typography> */}
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Typography
              variant="subtitle2"
              display={"flex"}
              alignItems={"center"}
              gap={1}
              color={theme.palette.grey[400]}
            >
              <Hotel sx={{ fontSize: "18px" }} />
              {place?.facilities.noOfBeds}
            </Typography>
            <Typography
              variant="subtitle2"
              display={"flex"}
              alignItems={"center"}
              gap={1}
              color={theme.palette.grey[400]}
            >
              <NightShelter sx={{ fontSize: "18px" }} />
              {place?.facilities.roomType}
            </Typography>
            <Typography
              variant="subtitle2"
              display={"flex"}
              alignItems={"center"}
              gap={1}
              color={theme.palette.grey[400]}
            >
              <Bathtub sx={{ fontSize: "18px" }} />
              {place?.facilities.washRoomType}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
