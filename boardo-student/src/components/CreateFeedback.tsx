import { Box } from "@mui/system";
import { TextField2 } from "./ui-component/customizedComponents";
import { Button, Divider, Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Send } from "@mui/icons-material";
import {
  useAddFeedbackMutation,
  useUpdateFeedbackMutation,
} from "store/api/feedbackApi";
import { toast } from "react-toastify";
import { Feedback } from "data/dataModels";

export default function CreateFeedback({
  placeId,
  userFeedback,
  onCancel,
}: {
  placeId: string;
  userFeedback?: Feedback;
  onCancel: () => void;
}) {
  const [feedback, setFeedback] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  const [createFeedback, { isLoading }] = useAddFeedbackMutation();
  const [
    updateFeedback,
    { isLoading: isLoadingUpdate, data: updatedFeedback },
  ] = useUpdateFeedbackMutation();

  useEffect(() => {
    if (userFeedback) {
      setFeedback(userFeedback.comment);
      setRating(userFeedback.rating);
    }
  }, [userFeedback]);

  const onSubmit = async () => {
    if (!feedback.trim()) {
      toast.error("Feedback is required");
      return;
    }
    if (userFeedback) {
      try {
        await updateFeedback({
          _id: userFeedback._id,
          placeId,
          comment: feedback,
          rating,
          userId: userFeedback.userId,
          userName: userFeedback.userName,
          userImage: userFeedback.userImage,
          timestamp: userFeedback.timestamp,
        });
        setFeedback("");
        setRating(0);
        toast.success("Your feedback has been updated");
        onCancel();
      } catch (error) {
        console.log(error);
        toast.error("Failed to update feedback");
      }
      return;
    }
    try {
      await createFeedback({
        placeId,
        comment: feedback,
        rating,
        userId: "663527fd3e66c6dcce652b57",
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
        {userFeedback ? "Edit Feedback" : "Write a feedback"}
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
          disabled={isLoading || isLoadingUpdate || !feedback.trim()}
          onClick={onSubmit}
          //   endIcon={<Send />}
        >
          {userFeedback ? "Save" : "Submit"}
        </Button>
        {userFeedback && (
          <>
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
