import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import ClearIcon from "@mui/icons-material/Clear";
import { Paper } from "@mui/material";

export default function ReservationCard({
  homeName,
  homeImage,
  status,
  studentName,
  requestedTime,
}: {
  homeName: string;
  homeImage: string;
  status: string;
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
          // transform: "scale(1.003)",
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
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <Typography variant="subtitle1" color="text.secondary">
                {studentName}
              </Typography>
              {status === "PENDING" ? (
                <LockOpenIcon sx={{ fontSize: "16px" }} color="primary" />
              ) : status === "ACCEPTED" ? (
                <LockIcon sx={{ fontSize: "16px" }} color="success" />
              ) : (
                <ClearIcon sx={{ fontSize: "16px" }} color="error" />
              )}
            </Box>
            <Typography
              variant="subtitle1"
              color={theme.palette.grey[400]}
              component="div"
              sx={{ mt: 2 }}>
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
