import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { TextField2 } from "components/ui-component/customizedComponents";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Upload from "rc-upload";

interface Inputs {
  name: string;
  description: string;
}

const initialValues: Inputs = {
  name: "",
  description: "",
};

const schema = z.object({
  name: z.string().min(1, "Place name is required"),
  description: z.string().min(1, "Place description is required"),
});

export default function Dashboard() {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: initialValues,
    resolver: zodResolver(schema),
  });
  const onSubmit: any = (data: Inputs) => {
    console.log(data);
  };

  return (
    <Paper
      elevation={1}
      sx={{
        width: "600px",
        marginTop: "100px",
      }}
    >
      <Box p={2}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField2
            label="Place Name"
            sx={{ mb: 2 }}
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name")}
          />
          <TextField2
            label="Place Description"
            sx={{ mb: 2 }}
            rows={4}
            multiline
            fullWidth
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

          <Box width={"300px"}>
            <Typography>Upload Place Image</Typography>
            <Upload
              style={{}}
              action={() => {
                return new Promise((resolve, reject) => {
                  setTimeout(() => {
                    resolve("http://localhost:3000");
                  }, 1000);
                });
              }}
              // multiple={true}
              onStart={(file: any) => {}}
              onSuccess={(ret: any) => {}}
              onError={(err: any) => {}}
              accept="image/png, image/jpg, image/jpeg, application/pdf"
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  // width: "100%",
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                  },
                }}
              >
                <Typography
                  color={theme.palette.grey[400]}
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span>Click to upload images </span>
                  <span>or</span>
                  <span>Drag and drop images here</span>
                </Typography>
              </Box>
            </Upload>
          </Box>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </Paper>
  );
}
