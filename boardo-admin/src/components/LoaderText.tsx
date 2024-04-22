import { Box, Button, CircularProgress, Typography } from "@mui/material";

export function LoaderText({
  isLoading = false,
  isError = false,
  isNotFound = false,
  onRetry = () => {},
  message = "No records found",
}: {
  isLoading?: boolean;
  isError?: boolean;
  isNotFound?: boolean;
  onRetry?: () => void;
  message?: string;
}) {
  return (
    <Box
      sx={{
        height: "calc(100% - 120px) !important",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading && <CircularProgress color="secondary" />}
      {isError && (
        <>
          <Typography>{message}</Typography>
          <Button variant="contained" onClick={onRetry}>
            Retry
          </Button>
        </>
      )}
      {isNotFound && (
        <>
          <Typography variant="h6">{message}</Typography>
          <Button variant="text" onClick={onRetry}>
            Retry
          </Button>
        </>
      )}
    </Box>
  );
}
