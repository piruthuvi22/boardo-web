import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { TextField2 } from "components/ui-component/customizedComponents";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Alert,
  AlertTitle,
  Collapse,
  IconButton,
  useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import auth from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useRegisterMutation } from "store/api/authApi";

interface Inputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: Inputs = {
  firstName: "Sagini",
  lastName: "Navaratnam",
  email: "saginisaju@gmail.com",
  password: "Abcd@123",
  confirmPassword: "Abcd@123",
};

const schema = z
  .object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(6, "Password should follow the password guidelines")
      .max(10, "Password should follow the password guidelines")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/,
        {
          message: "Password should follow the password guidelines",
        }
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignUp() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: initialValues,
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const watchEmail = watch("email");
  const watchPassword = watch("password");
  const watchFirstName = watch("firstName");
  const watchLastName = watch("lastName");

  const updateProfileDetails = async () => {
    if (!auth.currentUser) {
      console.log("User not found");
      return;
    }
    await updateProfile(auth.currentUser, {
      displayName: `${watchFirstName} ${watchLastName}`,
    })
      .then(() => {
        console.log("Profile updated successfully");
      })
      .catch((error) => {
        console.log("Error in updateProfile(): ", error);
      });
  };

  const [registration] = useRegisterMutation();

  const onSubmit = () => {
    createUserWithEmailAndPassword(auth, watchEmail, watchPassword)
      .then(async (userCredential) => {
        const user = userCredential.user;
        if (!user || !auth.currentUser) {
          toast.error("Error in creating account. Please try again later.");
          return;
        }
        updateProfileDetails();
        sendEmailVerification(auth.currentUser!).then(() => {
          registration({
            firstName: watchFirstName,
            lastName: watchLastName,
            email: watchEmail,
            userRole: "STUDENT",
          })
            .unwrap()
            .then((data) => {
              if (
                data.email === watchEmail &&
                data.firstName === watchFirstName &&
                data.lastName === watchLastName &&
                data.userRole === "STUDENT"
              ) {
                toast.success(
                  "Account created successfully. Please verify your email address"
                );
                navigate("/auth/login");
              }
            })
            .catch((error) => {
              console.log("Error in registration(): ", error);
              toast.error(
                "Error in sending email for verification account. Please try again later."
              );
            });
        });
      })
      .catch((error) => {
        console.log("Error in createUserWithEmailAndPassword(): ", error);
        const message = error.message.split("/")[1];
        const removeLastChar = message.slice(0, -2);
        const finalMessage = removeLastChar.replace(/-/g, " ");
        console.log("finalMessage: ", finalMessage);
        toast.error(finalMessage);
      });
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundImage:
          "url(https://source.unsplash.com/random/1920x1080?wallpapers)",
        backgroundRepeat: "no-repeat",
        backgroundColor: (t) =>
          t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        display={"flex"}
        alignItems={"center"}>
        <Box
          sx={{
            paddingY: "50px",
            paddingLeft: "50px",
            paddingRight: "100px",
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: "0 10px 10px 0",
          }}>
          <Typography
            variant="h1"
            sx={{
              color: "#fff",
              fontWeight: "500",
              fontSize: "4rem",
            }}>
            Find your <br />{" "}
            <span style={{ color: theme.palette.primary.main }}>
              accommodation
            </span>{" "}
            <br /> with us
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={5} className="glass">
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}>
            <Grid container spacing={2} mb={2}>
              <Grid item xs={12} sm={6}>
                <TextField2
                  size="small"
                  fullWidth
                  label="First Name"
                  autoFocus
                  {...register("firstName")}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField2
                  size="small"
                  fullWidth
                  label="Last Name"
                  {...register("lastName")}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField2
                  size="small"
                  fullWidth
                  label="Email Address"
                  autoComplete="email"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField2
                  size="small"
                  fullWidth
                  label="Password"
                  type="password"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  onFocus={() => setOpen(true)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField2
                  size="small"
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  {...register("confirmPassword")}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              </Grid>
            </Grid>
            <Collapse in={open}>
              <Alert
                variant="standard"
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}>
                    <Close fontSize="inherit" />
                  </IconButton>
                }>
                <AlertTitle>Password Guidelines</AlertTitle>
                <ul>
                  <li>
                    Password should be atleast 6 characters long and atmost 10
                    characters long
                  </li>
                  <li>Password should contain atleast one uppercase letter</li>
                  <li>Password should contain atleast one lowercase letter</li>
                  <li>Password should contain atleast one number</li>
                  <li>Password should contain atleast one special character</li>
                </ul>
              </Alert>
            </Collapse>
            <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/auth/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
