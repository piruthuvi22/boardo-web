import {
  Bathtub,
  Clear,
  Group,
  Hotel,
  NightShelter,
  Schedule,
} from "@mui/icons-material";
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
import { Place, Reservation, ReservationsOfUser } from "data/dataModels";
import moment from "moment";
import { useNavigate } from "react-router";

export default function ReservationCard({
  reservation,
}: {
  reservation: ReservationsOfUser;
}) {
  const theme = useTheme();
  const navigate = useNavigate();

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
      >
        <CardHeader
          sx={{ padding: 2 }}
          action={
            <IconButton aria-label="settings">
              <Clear />
            </IconButton>
          }
          title={reservation?.placeId?.name}
          subheader={
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <Rating
                name="read-only"
                size="small"
                value={reservation?.placeId.rating}
                readOnly
              />
              <span style={{ fontSize: 15 }}>
                {reservation?.placeId.rating}
              </span>
            </Box>
          }
        />
        <CardMedia
          component="img"
          sx={{ height: 140, objectFit: "cover" }}
          image={reservation?.placeId.imageUrls[0].url}
          alt="place image"
        />
        <CardContent
          sx={{
            pb: "16px !important",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography
            variant="body2"
            gap={1}
            display={"flex"}
            alignItems={"center"}
          >
            <Group /> <span>{reservation.noOfGuests} people</span>
          </Typography>
          <Typography
            variant="body2"
            display={"flex"}
            alignItems={"center"}
            gap={1}
          >
            <Schedule sx={{ fontSize: 18 }} />
            <span>&nbsp; Request at</span>
            <span>
              {moment(reservation.timestamp).format("DD MMM YYYY hh:mm A")}
            </span>
          </Typography>

          <Typography
            variant="body2"
            display={"flex"}
            alignItems={"center"}
            gap={1}
          >
            <Schedule sx={{ fontSize: 18 }} />
            <span>&nbsp; Check-in</span>
            {moment(reservation?.checkIn).format("DD MMM YYYY")}
          </Typography>
          <Typography
            variant="body2"
            display={"flex"}
            alignItems={"center"}
            gap={1}
          >
            <Schedule sx={{ fontSize: 18 }} />
            <span>&nbsp; Check-out</span>
            {moment(reservation?.checkOut).format("DD MMM YYYY")}
          </Typography>

          <Typography
            variant="body1"
            fontWeight={600}
            color={
              reservation.status === "PENDING"
                ? theme.palette.success.main
                : theme.palette.grey[500]
            }
          >
            {reservation.status}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
