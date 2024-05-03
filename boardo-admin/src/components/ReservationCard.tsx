import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Paper } from "@mui/material";

export default function ReservationCard({
  homeName,
  homeImage,
  studentName,
  requestedTime,
}: {
  homeName: string;
  homeImage: string;
  studentName: string;
  requestedTime: string;
}) {
  const theme = useTheme();

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: "10px",
        cursor: "pointer",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
          border: `1px solid ${theme.palette.primary.light}`,
          transform: "scale(1.003)",
          transition: "all 0.3s ease-in-out",
        },
      }}>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderRadius: "10px",
        }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {homeName}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div">
              {studentName}
            </Typography>
            <Typography
              variant="subtitle1"
              color={theme.palette.grey[400]}
              component="div"
              sx={{ mt: "18px" }}>
              {requestedTime}
            </Typography>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={homeImage}
          alt="Live from space album cover"
        />
      </Card>
    </Paper>
  );
}
