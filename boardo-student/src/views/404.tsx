import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100vh"}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h6">Page not found</Typography>
      <p>Sorry, we couldn't find the page you're looking for</p>
      <Link to="/" className="mt-4 text-indigo-500">
        Go back home
      </Link>
    </Box>
  );
}
