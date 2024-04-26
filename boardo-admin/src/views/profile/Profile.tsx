import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  useTheme,
} from "@mui/material";
import { TextField2 } from "components/ui-component/customizedComponents";
import auth from "../../config/firebase";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Profile = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const user = auth.currentUser;
    if (user) {
      const credential = EmailAuthProvider.credential(
        user.email!,
        currentPassword
      );
      reauthenticateWithCredential(user, credential)
        .then(() => {
          updatePassword(user, newPassword)
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
          window.alert(error.message);
          if (error.code === "auth/requires-recent-login") {
            auth.signOut();
            navigate("/auth/login");
          }
        });
    }
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/auth/login");
    });
  };

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}>
              <TextField2
                size="small"
                margin="normal"
                required
                fullWidth
                id="current-password"
                label="Current Password"
                name="current-password"
                autoComplete="current-password"
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoFocus
              />
              <TextField2
                size="small"
                margin="normal"
                required
                fullWidth
                name="new-password"
                label="New Password"
                type="new-password"
                id="new-password"
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
              />
              <TextField2
                size="small"
                margin="normal"
                required
                fullWidth
                name="confirm-password"
                label="Confirm Password"
                type="confirm-password"
                id="confirm-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Change Password
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleDeleteAccount}>
        Delete Account
      </Button>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
};

export default Profile;
