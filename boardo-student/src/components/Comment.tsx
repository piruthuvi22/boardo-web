import User1 from "assets/images/users/user-round.svg";
import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Typography,
} from "@mui/material";

import { useState } from "react";

export default function CommentSection() {
  return (
    <Box>
      {Array.from({ length: 5 }).map((_, index) => (
        <Comment key={index} />
      ))}
    </Box>
  );
}
const primaryText = () => {
  return (
    <Box mb={1} display={"flex"} gap={2} alignItems={"center"}>
      <Typography variant="body1">{"John Doe"}</Typography>
      <Typography variant="body2">{"12 Apr 2024"}</Typography>
      <Rating
        name="rating"
        size="small"
        value={3}
        readOnly
        onChange={(event, newValue) => {}}
      />
    </Box>
  );
};
function Comment() {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={User1.toString()} />
      </ListItemAvatar>
      <ListItemText
        primary={primaryText()}
        secondary={
          "I'll be in your neighborhood doing errands sjd jisbd jsijdfjs bjifsdb fjsb djbsdjkfbalsjbdf dblfajsbf ljbasdl fbdfbl sbflsdbflsbd lfbd this…"
        }
      />
    </ListItem>
  );
}
