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

import { useEffect, useState } from "react";
import {
  useLazyGetFeedbackByUserQuery,
  useLazyGetFeedbacksQuery,
} from "store/api/feedbackApi";
import { Feedback } from "data/dataModels";
import moment from "moment";

export default function CommentSection({ placeId }: { placeId: string }) {
  const [getFeedbacks, { data: feedbacks }] = useLazyGetFeedbacksQuery();

  useEffect(() => {
    getFeedbacks(placeId);
  }, [getFeedbacks]);

  return (
    <Box>
      {feedbacks?.length === 0 && <Typography>{"No feedbacks yet"}</Typography>}
      {feedbacks?.map((comment, index) => (
        <Comment feedback={comment} key={index} />
      ))}
    </Box>
  );
}
const primaryText = (feedback: Feedback) => {
  return (
    <Box mb={1} display={"flex"} gap={2} alignItems={"center"}>
      <Typography variant="body1" fontWeight={500}>
        {feedback?.userName}
      </Typography>
      <Typography variant="body2">
        {moment(feedback?.timestamp).format("DD MMM YYYY - hh:mm A")}
      </Typography>
      <Rating
        name="rating"
        size="small"
        value={feedback?.rating || 0}
        readOnly
      />
    </Box>
  );
};
export function Comment({ feedback }: { feedback: Feedback }) {
  return (
    <ListItem key={feedback?._id} alignItems="flex-start">
      <ListItemAvatar>
        <Avatar
          alt={feedback?.userName}
          src={feedback?.userImage || User1.toString()}
        />
      </ListItemAvatar>
      <ListItemText
        primary={primaryText(feedback)}
        secondary={feedback?.comment}
      />
    </ListItem>
  );
}
