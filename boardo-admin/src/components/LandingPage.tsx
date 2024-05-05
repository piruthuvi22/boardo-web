import { Box, Typography, useTheme, Button } from "@mui/material";
import { useNavigate } from "react-router";
import LandingAppBar from "./AppBar";
import landingHome from "assets/images/home/landingHome.svg";

export default function LandingPage() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <>
      <LandingAppBar />
      <Box display="flex" height={`calc(100vh - 10vh)`} overflow="hidden"> {/* Set overflow to hidden */}
        <Box width="50%" height="100%" overflow="hidden"> {/* Set overflow to hidden */}
          <img
            src={`${landingHome}`}
            alt="logo"
            style={{ width: "100%", height: "100%", objectFit: "cover", paddingTop: "7px" }}
          />
        </Box>

        <Box textAlign="center" mt={4} width="50%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Typography variant="h4" color={theme.palette.text.primary} mb={2}>
            Find Your Boarding Quickly
          </Typography>
          <Typography variant="body1" color={theme.palette.text.secondary} mb={4}>
          Are you struggling to find student accommodations near your university? Boardo helps you discover and book boarding places, even from your hometown.          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate("/auth/signup")} size="large">
            Get Started
          </Button>
        </Box>
      </Box>
    </>
  );
}
