import { Box, Button, Paper, TextField } from "@mui/material";
import { TextField2 } from "components/ui-component/customizedComponents";

export default function Dashboard() {
  return (
    <Paper
      elevation={1}
      sx={{
        width: "600px",
        marginTop: "100px",
      }}
    >
      <Box p={2}>
        <TextField2 label="Place Name" />
        <TextField />
        <Button>Submit</Button>
      </Box>
    </Paper>
  );
}
