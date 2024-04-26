import { Paper, useTheme } from "@mui/material";

export default function Dashboard() {
  const theme = useTheme();

  return (
    <Paper
      elevation={1}
      sx={{
        width: "600px",
        marginTop: "100px",
      }}
    >Dashboard</Paper>
  );
}
