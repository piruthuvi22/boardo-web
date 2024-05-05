import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import boardo from "../assets/images/icons/boardo-logo.svg";

export default function LandingAppBar() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }} height={"10vh"}>
      <AppBar position="static">
        <Toolbar sx={{p:0}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}>
            <img src={`${boardo}`} alt="boardo" width="50px" />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Boardo
          </Typography>
          <Button color="inherit" onClick={() => navigate("/auth/login")}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
