import {
  Avatar,
  OutlinedInput,
  Popper,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { shouldForwardProp } from "@mui/system";

// styles
export const PopperStyle = styled(Popper, { shouldForwardProp })(
  ({ theme }) => ({
    zIndex: 1100,
    width: "99%",
    top: "-55px !important",
    padding: "0 12px",
    [theme.breakpoints.down("sm")]: {
      padding: "0 10px",
    },
  })
);

export const TextField2 = styled(TextField, {
  shouldForwardProp: () => true,
})<TextFieldProps>(({ theme }) => ({
  "& input": {
    background: "#fff",
  },
  "& textarea": {
    background: "#fff",
  },
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

export const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(
  ({ theme }) => ({
    width: 434,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    "& input": {
      background: "transparent !important",
      paddingLeft: "4px !important",
    },
    [theme.breakpoints.down("lg")]: {
      width: 250,
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginLeft: 4,
      background: "#fff",
    },
  })
);

export const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(
  ({ theme }) => ({
    background: theme.palette.primary.light,
    color: theme.palette.primary.dark,
    "&:hover": {
      background: theme.palette.primary.main,
      color: theme.palette.primary.light,
    },
  })
);
