import {
  AccessTime,
  Bathtub,
  Bookmark,
  Favorite,
  Hotel,
  LocationOn,
  NightShelter,
  Star,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Place } from "data/dataModels";
import { useNavigate } from "react-router";
import { capitalizeText } from "utils/capitalizeText";

export default function PlaceCard({ place }: { place: Place }) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          display: "flex",
          //flexWrap: "wrap",
          borderRadius: "10px",
          padding: "5px",
          height: "200px",
          cursor: "pointer",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
            border: `1px solid ${theme.palette.primary.light}`,
            zIndex: 5,
            // transform: "scale(1.003)",
            transition: "all 0.3s ease-in-out",
          },
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "200px",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              padding: "5px",
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "#fff",
              borderRadius: "10px 0px 10px 0px",
            }}
          >
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <Star />
              <span>{place?.rating}</span>
            </Box>
          </Box>
          <CardMedia
            component="img"
            sx={{
              height: "100%",
              width: "200px",
              objectFit: "cover",
              borderRadius: "10px 0 0 10px",
            }}
            image={place?.imageUrls[0].url}
            alt="boarding"
            onClick={() => navigate(`/app/place?id=${place._id}`, {})}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            position: "relative",
          }}
        >
          <CardContent
            sx={{
              padding: "10px !important",
              flex: "1 0 auto",
            }}
            onClick={() => navigate(`/app/place?id=${place._id}`, {})}
          >
            <Typography variant="h6">{place?.name}</Typography>
            {/* <Typography variant="body2">{place?.address}</Typography> */}
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
                {capitalizeText(place?.facilities.roomType)}
              </Typography>
              <Typography
                variant="subtitle2"
                display={"flex"}
                alignItems={"center"}
                gap={1}
                color={theme.palette.grey[500]}
              >
                <Bathtub sx={{ fontSize: "18px" }} />
                {capitalizeText(place?.facilities.washRoomType)}
              </Typography>
            </Box>
            {/* <Box display={"flex"} alignItems={"center"} gap={1} mb={1}>
              <LocationOn
                sx={{ color: theme.palette.grey[400], fontSize: 20 }}
              />
              <Typography variant="body2" textOverflow={"ellipsis"}>
                0.6 Km from University of Moratuwa
              </Typography>
            </Box>

            <Box display={"flex"} alignItems={"center"} gap={1} mb={1}>
              <AccessTime
                sx={{ color: theme.palette.grey[400], fontSize: 20 }}
              />
              <Typography variant="body2" textOverflow={"ellipsis"}>
                3min
              </Typography>
            </Box> */}

            <Typography
              variant="h5"
              color={theme.palette.primary.main}
              sx={{ fontWeight: "500" }}
            >
              {place?.cost} LKR
            </Typography>
          </CardContent>
        </Box>
      </Paper>
    </>
  );
}
