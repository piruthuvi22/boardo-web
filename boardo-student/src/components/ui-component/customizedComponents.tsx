import {
  Avatar,
  OutlinedInput,
  Popper,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { shouldForwardProp } from "@mui/system";

export const TextField2 = styled(TextField, {
  shouldForwardProp: () => true,
})<TextFieldProps>(({ theme }) => ({
  "& .MuiInputBase-root": {
    background: "#fff",
  },
  // "& input": {
  //   background: "#fff",
  // },
  // "& textarea": {
  //   background: "#fff",
  // },
  // Chnage border color on hover
  "&:hover": {
    "& fieldset": {
      borderColor: `${theme.palette.primary.main} !important`,
    },
  },
  [theme.breakpoints.down("lg")]: {
    width: 250,
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
    background: "#fff",
  },
  "& .MuiFormHelperText-root": {
    margin: 0,
  },
}));
