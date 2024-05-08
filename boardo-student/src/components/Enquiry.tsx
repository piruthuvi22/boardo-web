import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import GenericDrawer from "./GenericDrawer";
import { Box } from "@mui/system";
import { z } from "zod";
import moment from "moment";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField2 } from "./ui-component/customizedComponents";
import { useReservePlaceMutation } from "store/api/reservationApi";
import { Place } from "data/dataModels";
import { toast } from "react-toastify";

interface Inputs {
  //   name: string;
  //   email: string;
  //   phone: string;
  checkIn: string;
  checkOut: string;
  noOfGuests: number;
  message: string;
}

const defaultValues: Inputs = {
  //   name: "",
  //   email: "",
  //   phone: "",
  checkIn: "",
  checkOut: "",
  noOfGuests: 1,
  message: "",
};

console.log("moment = ", moment().format("YYYY-MM-DD"));

const schema = z.object({
  //   name: z.string().min(1, "Name is required"),
  //   email: z
  //     .string()
  //     .min(1, "Email is required")
  //     .email("Please enter a valid email address"),
  //   phone: z.string().min(1, "Phone number is required"),
  checkIn: z.string().min(1, "Check-in date is required"),
  checkOut: z.string().min(1, "Check-out date is required"),
  noOfGuests: z.number().min(1, "Number of guests is required"),
  message: z.string().min(1, "Message is required"),
});

export default function Enquiry({
  open,
  place,
  closeDrawer,
}: {
  open: boolean;
  place: Place;
  closeDrawer: () => void;
}) {
  const theme = useTheme();

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const watchCheckIn = watch("checkIn");
  const watchCheckOut = watch("checkOut");

  const userStore= localStorage.getItem("userInfo");
  const userId = JSON.parse(userStore!)._id;

  const [reservePlace, { data, error, isLoading, isSuccess, isError }] =
    useReservePlaceMutation();

  const onSubmit = async (data: Inputs) => {
    reservePlace({
      ...data,
      placeId: place._id,
      adminId: place.userId,
      userId,
    })
      .unwrap()
      .then((res) => {
        console.log("res = ", res);
        toast.success("Your enquiry has been submitted successfully");
        reset();
        closeDrawer();
      })
      .catch((err) => {
        console.log("err = ", err);
        toast.error(err.data);
      });
  };
  return (
    <GenericDrawer open={open} closeDrawer={closeDrawer} width="40%">
      <Box
        bgcolor={theme.palette.grey[50]}
        height={"100%"}
        width={"100%"}
        p={"15px"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Typography variant="h6">Enquiry Now</Typography>
        <Typography variant="body2" mb={1}>
          Please fill out the form below to enquire about this property.
        </Typography>
        <Divider />
        <Box mt={2}>
          <Card
            sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5">
                  {place.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {place.cost} LKR/Month
                </Typography>
              </CardContent>
            </Box>
            <CardMedia
              component="img"
              sx={{ width: 150 }}
              image={place.imageUrls[0].url}
              alt={place.imageUrls[0].name}
            />
          </Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
              sx={{
                mb: 2,
              }}
            >
              <Grid item xs={12} md={6}>
                <TextField2
                  label="Check-in"
                  type="date"
                  fullWidth
                  {...register("checkIn")}
                  error={errors.checkIn ? true : false}
                  helperText={errors.checkIn?.message}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    '& input[type="date"]::-webkit-calendar-picker-indicator': {
                      filter: "invert(0.5)",
                    },
                  }}
                  inputProps={{
                    max: "9999-12-31",
                    min: moment().add("days", 1).format("YYYY-MM-DD"),
                  }}
                  onKeyDown={(e) => {
                    e.key === "Enter" && e.preventDefault();
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField2
                  label="Check-out"
                  type="date"
                  fullWidth
                  {...register("checkOut")}
                  error={errors.checkOut ? true : false}
                  helperText={errors.checkOut?.message}
                  disabled={!watchCheckIn}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    '& input[type="date"]::-webkit-calendar-picker-indicator': {
                      filter: "invert(0.5)",
                    },
                  }}
                  inputProps={{
                    max: "9999-12-31",
                    min: moment(watchCheckIn)
                      .add("days", 1)
                      .format("YYYY-MM-DD"),
                  }}
                  onKeyDown={(e) => {
                    e.key === "Enter" && e.preventDefault();
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField2
                  label="No of Guests"
                  type="number"
                  fullWidth
                  inputProps={{ min: 1 }}
                  {...register("noOfGuests", { valueAsNumber: true })}
                  error={errors.noOfGuests ? true : false}
                  helperText={errors.noOfGuests?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField2
                  label="Message"
                  multiline
                  rows={4}
                  fullWidth
                  {...register("message")}
                  error={errors.message ? true : false}
                  helperText={errors.message?.message}
                />
              </Grid>
            </Grid>

            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={2}
              //   justifyContent={"flex-end"}
            >
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
              >
                Submit
              </Button>
              <Button variant="outlined" fullWidth onClick={closeDrawer}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </GenericDrawer>
  );
}
