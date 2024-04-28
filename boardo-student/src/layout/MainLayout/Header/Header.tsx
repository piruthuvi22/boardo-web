import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  IconButton,
  Typography,
} from "@mui/material";

// project imports
import SearchSection from "./SearchSection";
import ProfileSection from "./ProfileSection";

// assets
import { IconMenu2 } from "@tabler/icons-react";
import Logo from "components/ui-component/Logo";
import {
  getUserLocationCoordinates,
  setUserLocationCoordinates,
} from "store/userLocationSlice";
import { useDispatch, useSelector } from "react-redux";
import { Replay } from "@mui/icons-material";

import auth from "../../../config/firebase"
import { useNavigate } from "react-router";

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({
  handleLeftDrawerToggle,
}: {
  handleLeftDrawerToggle: any;
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const coordinates = useSelector(getUserLocationCoordinates);
  const navigate = useNavigate();

  const setLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      dispatch(
        setUserLocationCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      );
    });
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/auth/login");
    });
  };


  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: "flex",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}>
        <Box
          component="span"
          sx={{ display: { xs: "none", lg: "block" }, flexGrow: 1 }}>
          <Logo />
        </Box>
        <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
          <Avatar
            variant="rounded"
            sx={{
              transition: "all .2s ease-in-out",
              background: theme.palette.primary.light,
              color: theme.palette.primary.dark,
              "&:hover": {
                background: theme.palette.primary.main,
                color: theme.palette.primary.light,
              },
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit">
            <IconMenu2 stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Box>

      {/* header search */}
      <SearchSection />
      <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
        {/* <Typography>Hello</Typography> */}
        <IconButton size="small" color="secondary" onClick={setLocation}>
          <Replay />
        </IconButton>
      </Box>
      <Box sx={{ flexGrow: 1 }} />

      {/* <ProfileSection /> */}

      <Box>
        <Button
        onClick={handleLogout}
        >Log out</Button>
      </Box>
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func,
};

export default Header;
