import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

// routing
import Routes from "./routes/MainRoutes";

// defaultTheme
import themes from "./themes/theme";

// project imports
import NavigationScroll from "./layout/NavigationScroll";
import { ToastContainer } from "react-toastify";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserLocationCoordinates } from "store/userLocationSlice";
import { setSearchPlaceData } from "store/searchSlice";

// ==============================|| APP ||============================== //

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      dispatch(
        setUserLocationCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      );
      dispatch(
        setSearchPlaceData({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          address: "your location",
          placeName: "Current Location",
          radius: 35000,
        })
      );
    });
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes()}>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
