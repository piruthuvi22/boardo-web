import PropTypes from "prop-types";
import { useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  ButtonBase,
  Card,
  Grid,
  InputAdornment,
} from "@mui/material";

// third-party
import PopupState, { bindToggle } from "material-ui-popup-state";

// assets
import {
  IconAdjustmentsHorizontal,
  IconSearch,
  IconX,
} from "@tabler/icons-react";
import {
  HeaderAvatarStyle,
  OutlineInputStyle,
} from "components/ui-component/customizedComponents";

// ==============================|| SEARCH INPUT ||============================== //

const SearchSection = () => {
  const theme = useTheme();
  const [value, setValue] = useState("");

  return (
    <>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <PopupState variant="popper" popupId="demo-popup-popper">
          {(popupState) => (
            <>
              <Box sx={{ ml: 2 }}>
                <ButtonBase sx={{ borderRadius: "12px" }}>
                  <HeaderAvatarStyle
                    variant="rounded"
                    {...bindToggle(popupState)}
                  >
                    <IconSearch stroke={1.5} size="1.2rem" />
                  </HeaderAvatarStyle>
                </ButtonBase>
              </Box>
            </>
          )}
        </PopupState>
      </Box>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <OutlineInputStyle
          id="input-search-header"
          size="small"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <IconSearch
                stroke={1.5}
                size="1rem"
                color={theme.palette.grey[500]}
              />
            </InputAdornment>
          }
          aria-describedby="search-helper-text"
          inputProps={{ "aria-label": "weight" }}
        />
      </Box>
    </>
  );
};

export default SearchSection;
