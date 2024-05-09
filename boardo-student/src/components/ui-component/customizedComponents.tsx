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

  // Chnage border color on hover
  "&:hover": {
    "& fieldset": {
      borderColor: `${theme.palette.primary.main} !important`,
    },
  },
  "& .MuiFormHelperText-root": {
    margin: 0,
  },
}));
