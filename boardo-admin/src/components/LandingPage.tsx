import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router";

export default function LandingPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <>
      <Box
        height={"100vh"}
        sx={{
          background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, rgba(255,255,255,1) 100%)`,
        }}
      >
        <Box height={"100%"} className="pattern pattern-vertical-lines-md">
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100%"}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              textAlign={"center"}
            >
              <Typography fontSize={"4rem"} color={"#222"} fontWeight={"600"}>
                Welcome to Boardo..
              </Typography>
              <Typography fontSize={"1.5rem"} color={"#555"} fontWeight={"400"}>
                A place to book student accommodations near top universities
              </Typography>
              <Box>
                {/* <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                /> */}
                <Button
                  variant="contained"
                  onClick={() => navigate("/auth/login")}
                >
                  Login
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
