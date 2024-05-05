import { useEffect, useState } from "react";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Divider,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { TextField2 } from "components/ui-component/customizedComponents";
import auth from "../../config/firebase";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PROVINCES_AND_DISTRICTS } from "data/provinceAndDistricts";
import { toast } from "react-toastify";
import AlertDialog from "../../components/Alert";
import useUser from "hooks/useUser";
import {
  useLazyGetUserByEmailQuery,
  useUpdateProfileMutation,
} from "store/api/authApi";
import { User } from "data/dataModels";

interface InputsProfile {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  province: string | null;
  district: string | null;
}

interface InputsAccount {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
const initialValuesProfile: InputsProfile = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  province: null,
  district: null,
};

const initialValuesAccount: InputsAccount = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const profileSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .refine((value) => /^\d{10}$/.test(value), "Not a valid phone number"),
  province: z.any().refine((value) => (value == null ? false : true), {
    message: "Province is required",
  }),
  district: z.any().refine((value) => (value == null ? false : true), {
    message: "District is required",
  }),
});

const accountSchema = z
  .object({
    currentPassword: z.string().min(1, "Current Password is required"),
    newPassword: z
      .string()
      .min(6, "Password should be at least 6 characters long")
      .max(10, "Password should be at most 10 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/,
        {
          message: "Password should follow the password guidelines",
        }
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Profile = () => {
  const {
    register: registerProfileInputs,
    watch: watchProfile,
    control,
    setValue,
    getValues,
    handleSubmit: handleSubmitProfile,
    formState: { errors: errorsProfile },
  } = useForm<InputsProfile>({
    defaultValues: initialValuesProfile,
    resolver: zodResolver(profileSchema),
  });

  const {
    register: registerAccountInputs,
    watch: watchAccount,
    handleSubmit: handleSubmitAccount,
    formState: { errors: errorsAccount },
  } = useForm<InputsAccount>({
    defaultValues: initialValuesAccount,
    resolver: zodResolver(accountSchema),
  });

  const watchFirstName = watchProfile("firstName");
  const watchLastName = watchProfile("lastName");
  const watchPhoneNumber = watchProfile("phoneNumber");
  const watchProvince = watchProfile("province");
  const watchDistrict = watchProfile("district");

  const watchCurrentPassword = watchAccount("currentPassword");

  const navigate = useNavigate();

  const { userInfo } = useUser();

  const [currentTab, setCurrentTab] = useState("1");
  const [districtList, setDistrictList] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!PROVINCES_AND_DISTRICTS || PROVINCES_AND_DISTRICTS?.length === 0)
      return;

    if (watchProvince) {
      const targetProvince = PROVINCES_AND_DISTRICTS.find(
        (province) => province.province === watchProvince
      );
      console.log(targetProvince?.districts);

      setDistrictList(targetProvince?.districts || []);

      // Find whether targetProvince list has the watchDistrict value.
      // If not, set the watchDistrict to null
      const hasDistrict = targetProvince?.districts.find(
        (district) => district === watchDistrict
      );
      !hasDistrict && setValue("district", null);
    } else {
      setValue("district", null);
      setDistrictList([]);
    }
  }, [watchProvince, setValue]);

  const [userDetails, setUserDetails] = useState<User>();
  useEffect(() => {
    const response = localStorage.getItem("userInfo");
    const res = JSON.parse(response!);
    setUserDetails(res.data);
    
    if (userInfo && res) {
      console.log("User Info from local storage", res);
      const name = userInfo.displayName?.split(" ");
      setValue("firstName", name ? name[0] : res.data?.firstName ||res?.firstName|| "");
      setValue("lastName", name ? name[1] :  res.data?.lastName || res?.lastName || "");
      setValue(
        "phoneNumber",
        userInfo.providerData[0].phoneNumber ||  res.data?.phoneNumber ||res?.phoneNumber|| ""
      );
      setValue("province",  res.data?.province || res?.province || null);
      setValue("district",  res.data?.district || res?.district || null);
    }
  }, [userInfo, setValue]);

  const [updateProfileMutation] = useUpdateProfileMutation();

  const onUpdateProfileDetails = (data: InputsProfile) => {
    if (userInfo) {
      updateProfile(userInfo, {
        displayName: `${data.firstName} ${data.lastName}`,
        photoURL: "",
      })
        .then(() => {
          updateProfileMutation({
            email: userInfo.email!,
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            province: data.province!,
            district: data.district!,
          }).then((res) => {
            if (res) {
              localStorage.setItem("userInfo", JSON.stringify(res));
              toast.success("Profile updated successfully");
              return;
            }
            toast.error("Error in updating profile. Please try again later.");
          });
        })
        .catch((error) => {
          console.log(error);
          const message = error.message.split("/")[1];
          const removeLastChar = message.slice(0, -2);
          const finalMessage = removeLastChar.replace(/-/g, " ");
          toast.error(finalMessage);
        });
    }
  };

  const onUpdatePassword = (data: InputsAccount) => {
    if (userInfo) {
      const credential = EmailAuthProvider.credential(
        userInfo.email!,
        watchCurrentPassword
      );
      reauthenticateWithCredential(userInfo, credential)
        .then(() => {
          updatePassword(userInfo, data.newPassword)
            .then(() => {
              toast.success("Password updated successfully");
            })
            .catch((error) => {
              console.log(error);
              const message = error.message.split("/")[1];
              const removeLastChar = message.slice(0, -2);
              const finalMessage = removeLastChar.replace(/-/g, " ");
              toast.error(finalMessage);
            });
        })
        .catch((error) => {
          console.log(error);
          const message = error.message.split("/")[1];
          const removeLastChar = message.slice(0, -2);
          const finalMessage = removeLastChar.replace(/-/g, " ");
          toast.error(finalMessage);
        });
    }
  };

  const handleDeleteAccount = () => {
    const user = auth.currentUser;
    if (user) {
      user
        .delete()
        .then(() => {
          toast.success("Account deleted successfully");
          navigate("/auth/signup");
        })
        .catch((error) => {
          console.log(error);
          const message = error.message.split("/")[1];
          const removeLastChar = message.slice(0, -2);
          const finalMessage = removeLastChar.replace(/-/g, " ");
          toast.error(finalMessage);

          if (error.code === "auth/requires-recent-login") {
            auth.signOut();
            navigate("/auth/login");
          }
        });
    }
  };

  return (
    <>
      <Box>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <Avatar
            alt={userInfo?.displayName || userDetails?.firstName! || "User"}
            src={userInfo?.providerData[0].photoURL || ""}
            sx={{ width: 56, height: 56 }}
          />
          <Typography
            variant={"h4"}
            sx={{
              marginLeft: "10px",
            }}>
            {userInfo?.displayName ||
              `${userDetails?.firstName}  ${userDetails?.lastName}`}
          </Typography>
        </Box>
        <Box mt={2}>
          <Divider />
        </Box>
        <Box sx={{ width: "100%" }} mt={3}>
          <Box>
            <Tabs
              scrollButtons="auto"
              variant="scrollable"
              value={currentTab}
              onChange={(_: any, value: string) => setCurrentTab(value)}
              aria-label="basic tabs">
              <Tab label="Profile" value={"1"} />
              <Tab label="Account" value={"2"} />
            </Tabs>

            <Box mt={2}>
              {currentTab === "1" && (
                <Paper variant="outlined" sx={{ padding: "15px" }}>
                  <Typography variant="h6">Profile information</Typography>

                  <form
                    onSubmit={handleSubmitProfile(onUpdateProfileDetails)}
                    style={{
                      marginTop: "20px",
                    }}>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      gap={2}
                      sx={{ mb: 2 }}>
                      <TextField2
                        label="First Name"
                        sx={{ width: "300px" }}
                        InputLabelProps={{ shrink: !!watchFirstName }}
                        error={!!errorsProfile.firstName}
                        helperText={errorsProfile.firstName?.message}
                        {...registerProfileInputs("firstName")}
                      />

                      <TextField2
                        label="Last Name"
                        sx={{ width: "300px" }}
                        InputLabelProps={{ shrink: !!watchLastName }}
                        error={!!errorsProfile.lastName}
                        helperText={errorsProfile.lastName?.message}
                        {...registerProfileInputs("lastName")}
                      />
                    </Box>

                    <TextField2
                      label="Phone Number"
                      sx={{ mb: 2, width: "300px" }}
                      InputLabelProps={{ shrink: !!watchPhoneNumber }}
                      error={!!errorsProfile.phoneNumber}
                      helperText={errorsProfile.phoneNumber?.message}
                      {...registerProfileInputs("phoneNumber")}
                    />

                    <Box display={"flex"} alignItems={"center"} gap={2} mb={2}>
                      <Controller
                        name="province"
                        control={control}
                        render={({ field }) => (
                          <Autocomplete
                            sx={{ width: "300px" }}
                            options={PROVINCES_AND_DISTRICTS.map(
                              (province) => province.province
                            )}
                            isOptionEqualToValue={(option: any, value: any) =>
                              option === value
                            }
                            renderInput={(params) => (
                              <TextField2
                                {...params}
                                label="Province"
                                InputLabelProps={{ shrink: !!watchProvince }}
                                error={errorsProfile.province ? true : false}
                                helperText={errorsProfile.province?.message}
                              />
                            )}
                            onChange={(e, data: any) => field.onChange(data)}
                            value={field.value}
                          />
                        )}
                      />

                      <Controller
                        name="district"
                        control={control}
                        render={({ field }) => (
                          <Autocomplete
                            sx={{ width: "300px" }}
                            options={districtList}
                            disabled={!watchProvince}
                            isOptionEqualToValue={(option: any, value: any) =>
                              option === value
                            }
                            renderInput={(params) => (
                              <TextField2
                                {...params}
                                label="District"
                                InputLabelProps={{ shrink: !!watchDistrict }}
                                error={errorsProfile.district ? true : false}
                                helperText={errorsProfile.district?.message}
                              />
                            )}
                            onChange={(e, data: any) => field.onChange(data)}
                            value={field.value}
                          />
                        )}
                      />
                    </Box>
                    <Button type="submit" variant="contained" color="primary">
                      Update Profile
                    </Button>
                  </form>
                </Paper>
              )}

              {/* Update Password */}
              {currentTab === "2" && (
                <Paper variant="outlined" sx={{ padding: "15px" }}>
                  <Typography variant="h6">Account</Typography>

                  <form
                    onSubmit={handleSubmitAccount(onUpdatePassword)}
                    style={{
                      marginTop: "20px",
                    }}>
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      gap={2}>
                      <TextField2
                        label="Current Password"
                        type="password"
                        sx={{ width: "300px" }}
                        error={!!errorsAccount.currentPassword}
                        helperText={errorsAccount.currentPassword?.message}
                        {...registerAccountInputs("currentPassword")}
                      />

                      <TextField2
                        label="New Password"
                        type="password"
                        sx={{ width: "300px" }}
                        error={!!errorsAccount.newPassword}
                        helperText={errorsAccount.newPassword?.message}
                        {...registerAccountInputs("newPassword")}
                      />

                      <TextField2
                        label="Confirm Password"
                        type="password"
                        sx={{ mb: 2, width: "300px" }}
                        error={!!errorsAccount.confirmPassword}
                        helperText={errorsAccount.confirmPassword?.message}
                        {...registerAccountInputs("confirmPassword")}
                      />
                    </Box>

                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      sx={{ gap: 2 }}>
                      <Button type="submit" variant="contained" color="primary">
                        Update Password
                      </Button>
                      <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={() => setOpen(true)}>
                        Delete Account
                      </Button>
                      <AlertDialog
                        open={open}
                        handleClose={() => setOpen(false)}
                        dialogTitle="Are you sure you want to delete account?"
                        dialogContent="This action cannot be undone."
                        handleYes={handleDeleteAccount}
                      />
                    </Box>
                  </form>
                </Paper>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
