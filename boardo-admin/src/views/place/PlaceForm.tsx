import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { TextField2 } from "components/ui-component/customizedComponents";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Upload from "rc-upload";
import LocationPicker from "components/LocationPicker";
import { RcFile } from "rc-upload/lib/interface";
import { useEffect, useState } from "react";
import { FACILITIES } from "data/facilities";
import { uploadFile } from "utils/fileUploader";
import { Clear, Delete } from "@mui/icons-material";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "config/firebase";
import {
  useCreatePlaceMutation,
  useUpdatePlaceMutation,
} from "store/api/placeApi";
import { Place, Status } from "data/dataModels";
import { toast } from "react-toastify";

interface Inputs {
  name: string;
  description: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  address: string;
  images: {
    url: string;
    name: string;
    fileRef: string;
  }[];
  roomTypes: string;
  noOfBeds: number;
  washRoomType: string;
  facilities: string[];
  paymentType: string;
  cost: number;
}

const initialValues: Inputs = {
  name: "",
  description: "",
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
  address: "",
  images: [],
  roomTypes: "",
  noOfBeds: 0,
  washRoomType: "",
  facilities: [],
  paymentType: "",
  cost: 0,
};

const schema = z.object({
  name: z.string().min(1, "Place name is required"),
  description: z.string().min(1, "Place description is required"),
  images: z
    .array(
      z.object({
        url: z.string(),
        name: z.string(),
        fileRef: z.string(),
      })
    )
    .min(1, "Atleast one image is required"),
  coordinates: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  address: z.string().min(1, "Address is required"),
  roomTypes: z.string().min(1, "Room type is required"),
  noOfBeds: z.number().min(1, "Number of beds is required"),
  washRoomType: z.string().min(1, "Washroom type is required"),
  facilities: z.array(z.string()).min(1, "Facilities are required"),
  paymentType: z.string().min(1, "Payment type is required"),
  cost: z
    .number()
    .min(1, "Cost is required")
    .refine((value) => {
      if (typeof value === "number") {
        return value > 0;
      }
      return false;
    }),
});

export default function PlaceForm({
  open,
  place,
  closeDrawer,
}: {
  open: boolean;
  place?: Place;
  closeDrawer: () => void;
}) {
  const theme = useTheme();
  const {
    register,
    watch,
    setValue,
    getValues,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: initialValues,
    resolver: zodResolver(schema),
  });

  const [createPlace, { isLoading }] = useCreatePlaceMutation();
  const [updatePlace, { isLoading: loadingUpdate }] = useUpdatePlaceMutation();

  const watchImages = watch("images");
  const watchAddress = watch("address");

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (place) {
      setValue("name", place.name);
      setValue("description", place.description);
      setValue("coordinates", place.coordinates);
      setValue("address", place.address);
      setValue("images", place.imageUrls);
      setValue("roomTypes", place.facilities.roomType);
      setValue("noOfBeds", place.facilities.noOfBeds);
      setValue("washRoomType", place.facilities.washRoomType[0]);
      setValue("facilities", place.facilities.facilities);
      setValue("paymentType", place.paymentType);
      setValue("cost", place.cost);
    } else {
      reset();
    }
  }, [place]);

  //console.log("type of cost edit = ", place && typeof place.cost);
  console.log("type of code", typeof watch("cost"));

  const onSubmit: any = (data: Inputs) => {
    if (place) {
      updatePlace({
        ...place,
        name: data.name,
        description: data.description,
        address: data.address,
        imageUrls: data.images,
        coordinates: data.coordinates,
        facilities: {
          roomType: data.roomTypes,
          noOfBeds: data.noOfBeds,
          washRoomType: [data.washRoomType],
          facilities: data.facilities,
        },
        paymentType: data.paymentType,
        cost: data.cost,
      })
        .then(() => {
          toast.success("Place updated successfully");
          closeDrawer();
        })
        .catch((error) => {
          toast.error("Error updating place");
          console.error("Error updating place", error);
        });
      return;
    }
    createPlace({
      _id: "",
      userId: "userid",
      name: data.name,
      description: data.description,
      address: data.address,
      imageUrls: data.images,
      rating: 0,
      coordinates: data.coordinates,
      facilities: {
        roomType: data.roomTypes,
        noOfBeds: data.noOfBeds,
        washRoomType: [data.washRoomType],
        facilities: data.facilities,
      },
      paymentType: data.paymentType,
      cost: data.cost,
      status: Status.AVAILABLE,
    })
      .then(() => {
        toast.success("Place added successfully");
        closeDrawer();
      })
      .catch((error) => {
        toast.error("Error creating place");
        console.error("Error creating place", error);
      });
  };

  const uploadImage = async (file: RcFile) => {
    setUploading(true);
    const path = `places/user1/${file.name}`;
    uploadFile(file, path)
      .then((url) => {
        setValue("images", [
          ...getValues("images"),
          { url: url.url, name: file.name, fileRef: url.fileRef },
        ]);
      })
      .catch((error) => {
        console.error("Error uploading file", error);
      });
    setUploading(false);
  };

  const handleDeleteImage = (fileRef: string) => {
    const desertRef = ref(storage, fileRef);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        console.log("File deleted successfully");
        const images = getValues("images");
        const updatedImages = images.filter(
          (image: any) => image.fileRef !== fileRef
        );
        setValue("images", updatedImages);
      })
      .catch((error) => {
        console.log("Uh-oh, an error occurred!", error);
      });
  };

  return (
    <Drawer
      open={open}
      onClose={closeDrawer}
      anchor="right"
      variant="temporary"
      sx={{
        "& .MuiDrawer-paper": {
          height: "100%",
          maxHeight: "100%",
          [theme.breakpoints.up("md")]: {
            maxWidth: "60%",
          },
        },
      }}
    >
      <Box p={2}>
        <Typography variant="h5" color={theme.palette.primary.main}>
          {place ? "Edit Place" : "Add Place"}
        </Typography>
        <Typography variant="subtitle2" color={theme.palette.grey[500]}>
          {place
            ? "Edit the place details and click submit to save the changes"
            : "Showcase your places to the world"}
        </Typography>
        <Box
          sx={{
            width: "600px",
            marginTop: "50px",
          }}
        >
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField2
                label="Place Name"
                fullWidth
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
              <Box width={"100%"}>
                <Typography>Upload Place Image</Typography>
                <Upload
                  style={{}}
                  disabled={uploading}
                  // multiple={true}
                  onStart={uploadImage}
                  accept="image/png, image/jpg, image/jpeg"
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "150px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      // width: "100%",
                      cursor: "pointer",
                      "&:hover": {
                        borderColor: theme.palette.primary.main,
                      },
                    }}
                  >
                    <Typography color={theme.palette.grey[400]}>
                      Click to upload images or Drag and drop images here
                    </Typography>
                  </Box>
                </Upload>
                {errors.images && (
                  <Typography fontSize={"12px"} color="error">
                    {errors.images.message}
                  </Typography>
                )}

                <Box className="image-list-container" mt={2}>
                  <ul className="image-list">
                    {watchImages?.map((image) => (
                      <li style={{ position: "relative" }}>
                        <IconButton
                          size="small"
                          style={{
                            position: "absolute",
                            top: 5,
                            right: 5,
                            zIndex: 1,
                            color: theme.palette.error.main,
                            backgroundColor: "rgba(255,255,255,0.5)",
                          }}
                          onClick={() => handleDeleteImage(image.fileRef)}
                        >
                          <Clear />
                        </IconButton>
                        <img
                          src={image.url}
                          alt="place-image"
                          style={{
                            height: "150px",
                            width: "150px",
                            objectFit: "cover",
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </Box>
              </Box>

              <Box mt={2}>
                {watchAddress && (
                  <Typography color={theme.palette.grey[500]}>
                    Selected Address: {watchAddress}
                  </Typography>
                )}
                <Box
                  sx={{
                    height: "500px",
                  }}
                >
                  <LocationPicker
                    currentCoordinates={place?.coordinates}
                    setAddress={(address: string) =>
                      setValue("address", address)
                    }
                    setCoordinates={(coordinates: {
                      lat: number;
                      lng: number;
                    }) =>
                      setValue("coordinates", {
                        latitude: coordinates.lat,
                        longitude: coordinates.lng,
                      })
                    }
                  />
                </Box>
              </Box>
              <Box mt={2}>
                <Controller
                  name="facilities"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      size="small"
                      multiple
                      // getOptionLabel={(option) => option.title}
                      options={FACILITIES.map((facility) => facility.name)}
                      isOptionEqualToValue={(option: any, value: any) =>
                        option === value
                      }
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField2
                          {...params}
                          label="Facilities"
                          placeholder="Select Facilities"
                          error={!!errors.facilities}
                          helperText={errors.facilities?.message}
                        />
                      )}
                      onChange={(e, data: any) => field.onChange(data)}
                      value={field.value}
                    />
                  )}
                />
              </Box>

              <Box mt={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField2
                      label="Room Type"
                      fullWidth
                      {...register("roomTypes")}
                      error={!!errors.roomTypes}
                      helperText={errors.roomTypes?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField2
                      label="Washroom Type"
                      fullWidth
                      {...register("washRoomType")}
                      error={!!errors.washRoomType}
                      helperText={errors.washRoomType?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField2
                      label="No of Beds"
                      fullWidth
                      type="number"
                      inputProps={{ min: 1 }}
                      {...register("noOfBeds", { valueAsNumber: true })}
                      error={!!errors.noOfBeds}
                      helperText={errors.noOfBeds?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField2
                      label="Payment Type"
                      fullWidth
                      {...register("paymentType")}
                      error={!!errors.paymentType}
                      helperText={errors.paymentType?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField2
                      label="Cost"
                      fullWidth
                      type="number"
                      inputProps={{ min: 1 }}
                      {...register("cost", { valueAsNumber: true })}
                      error={!!errors.cost}
                      helperText={errors.cost?.message}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{ mt: 2 }}
                disabled={isLoading || loadingUpdate}
              >
                {place ? "Update Place" : "Add Place"}
              </Button>
              <Button
                fullWidth
                variant="outlined"
                type="button"
                sx={{ mt: 2 }}
                onClick={closeDrawer}
              >
                Cancel
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
