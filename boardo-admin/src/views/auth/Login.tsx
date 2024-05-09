import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { TextField2 } from "components/ui-component/customizedComponents";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";

import auth from "../../config/firebase";
import { toast } from "react-toastify";
import {
  useLazyGetUserByEmailQuery,
  useRegisterMutation,
} from "store/api/authApi";
import { useDispatch } from "react-redux";
import { setUserInfo } from "store/userInfo";

interface Inputs {
  email: string;
  password: string;
}

const initialValues: Inputs = {
  email: "",
  password: "",
};

const schema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
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
  const dispatch = useDispatch();

  const watchEmail = watch("email");
  const watchPassword = watch("password");

  const [getUserByEmail] = useLazyGetUserByEmailQuery();

  const onSubmit = () => {
    signInWithEmailAndPassword(auth, watchEmail, watchPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          getUserByEmail({ email: user.email!, userRole: "ADMIN" }).then(
            (res) => {
              console.log("Email login", res);
              localStorage.setItem("userInfo", JSON.stringify(res.data!));
              dispatch(setUserInfo(res.data!));
            }
          );
          toast.success("Sign in successful");
          navigate("/app/place/my-places");
        } else {
          toast.error("Please verify your email address");
        }
      })
      .catch((error) => {
        console.log(error);
        const message = error.message.split("/")[1];
        const removeLastChar = message.slice(0, -2);
        const finalMessage = removeLastChar.replace(/-/g, " ");
        toast.error(finalMessage);
      });
  };

  const handleForgetPassword = () => {
    sendPasswordResetEmail(auth, watchEmail)
      .then(() => {
        toast.success(
          "Password reset email sent to your email address. Please check your email."
        );
        navigate("/auth/login");
      })
      .catch((error) => {
        console.log(error);
        const message = error.message.split("/")[1];
        const removeLastChar = message.slice(0, -2);
        const finalMessage = removeLastChar.replace(/-/g, " ");
        toast.error(finalMessage);
      });
  };

  const provider = new GoogleAuthProvider();
  const [registration] = useRegisterMutation();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        registration({
          firstName: user?.displayName?.split(" ")[0] || "first name",
          lastName: user?.displayName?.split(" ")[1] || "last name",
          email: user.email!,
          userRole: "ADMIN",
        })
          .unwrap()
          .then((data) => {
            if (data.email === user?.email && data.userRole === "ADMIN") {
              console.log("Google Singin", data);

              localStorage.setItem("userInfo", JSON.stringify(data!));
              navigate("/app/place/my-places");
            }
          })
          .catch((error) => {
            console.log("Error in registration(): ", error);
            toast.error("Error in registration.");
          });
      })
      .catch((error) => {
        console.log(error);
        const message = error.message.split("/")[1];
        const removeLastChar = message.slice(0, -2);
        const finalMessage = removeLastChar.replace(/-/g, " ");
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
      }}
    >
      <Grid item xs={false} sm={4} md={7}></Grid>
      <Grid item xs={12} sm={8} md={5} className="glass">
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <TextField2
              size="small"
              margin="normal"
              fullWidth
              label="Email Address"
              autoComplete="email"
              autoFocus
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField2
              size="small"
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" onClick={handleForgetPassword}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/auth/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              onClick={handleGoogleSignIn}
            >
              <img
                src="https://unifysolutions.net/supportedproduct/google-signin/Google__G__Logo.svg"
                alt="google"
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
              />
              Sign In with Google
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
