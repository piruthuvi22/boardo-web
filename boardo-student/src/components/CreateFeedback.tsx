import { Box } from "@mui/system";
import { TextField2 } from "./ui-component/customizedComponents";
import { Button, Divider, Rating, Typography } from "@mui/material";
import { useState } from "react";
import { Send } from "@mui/icons-material";
import { useAddFeedbackMutation } from "store/api/feedbackApi";
import { toast } from "react-toastify";

export default function CreateFeedback({ placeId }: { placeId: string }) {
  const [feedback, setFeedback] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  const [createFeedback, { isLoading }] = useAddFeedbackMutation();

  const onSubmit = async () => {
    if (!feedback.trim()) {
      toast.error("Feedback is required");
      return;
    }
    try {
      await createFeedback({
        placeId,
        comment: feedback,
        rating,
        email: "piruthuvi22@gmail.com",
        userName: "Raj",
        userImage:
          "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg",
        timestamp: new Date().toISOString(),
      });
      setFeedback("");
      setRating(0);
      toast.success("Your feedback has been submitted");
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit feedback");
    }
  };

  return (
    <Box>
      <Typography variant="h6" py={1}>
        Leave a feedback
      </Typography>
      <Box>
        <Rating
          name="rating"
          size="large"
          sx={{
            mb: 2,
            // "& .MuiRating-iconFilled": { color: "#ff6d75" }
          }}
          value={rating}
          onChange={(event, newValue) => setRating(newValue as number)}
        />
        <TextField2
          multiline
          rows={5}
          fullWidth
          placeholder="Write your feedback..."
          onChange={(e) => setFeedback(e.target.value)}
          value={feedback}
        />
      </Box>
      <Box display={"flex"} justifyContent={"flex-end"} mt={1}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          disabled={isLoading || !feedback.trim()}
          onClick={onSubmit}
          //   endIcon={<Send />}
        >
          Comment
        </Button>
      </Box>
    </Box>
  );
}
