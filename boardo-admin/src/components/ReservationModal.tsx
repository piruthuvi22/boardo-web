import Dialog from "@mui/material/Dialog";
import EventIcon from "@mui/icons-material/Event";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Button,
  DialogActions,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useUpdateStatusMutation } from "store/api/reservationApi";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import AlertDialog from "./Alert";

export default function ReservationModal({
  open,
  handleClose,
  reservationId,
  status,
  checkIn,
  checkOut,
  message,
  noOfGuests,
}: {
  open: boolean;
  handleClose: () => void;
  reservationId: string;
  status: string;
  checkIn: string;
  checkOut: string;
  message: string;
  noOfGuests: number;
}) {
  const [updateStatus, { data: statusResponse, isError: statusUpdateError }] =
    useUpdateStatusMutation();

  const [changedStatus, setChangedStatus] = useState<string>("");
  const [alertOpen, setAlertOpen] = useState<boolean>(false);

  const handleSubmit = (changedStatus: string) => {
    setChangedStatus(changedStatus);
    updateStatus({ reservationId: reservationId, status: changedStatus });
    handleClose();
    setAlertOpen(false);
  };

  useEffect(() => {
    if (statusResponse?.status === changedStatus) {
      toast.success(`Reservation ${changedStatus.toLowerCase()} successfully`);
    }
    if (statusUpdateError) {
      toast.error("Something went wrong");
    }
  }, [statusResponse]);

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="md"
        fullWidth={true}>
        <Box sx={{ p: "20px" }}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h5" color="primary">
              Reservation Details
            </Typography>
            <IconButton onClick={handleClose}>
              <ClearIcon />
            </IconButton>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ m: "10px" }}>
            <Box display="flex" alignItems="center" gap={1}>
              <EventIcon color="primary" />
              <Typography>{` Check-in: ${checkIn}`}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <EventIcon color="primary" />
              <Typography>{` Check-out: ${checkOut}`}</Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" gap={1} sx={{ m: "10px" }}>
            <PeopleAltIcon color="primary" />
            <Typography>{`No of Guests: ${noOfGuests}`}</Typography>
          </Box>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="body1">{message}</Typography>
          </Paper>
        </Box>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            p: "20px",
          }}>
          <Button
            variant="contained"
            type="submit"
            color="success"
            disabled={status !== "PENDING"}
            onClick={() => {
              setChangedStatus("ACCEPTED");
              setAlertOpen(true);
            }}
            sx={{ width: "100%", mr: "10px" }}>
            Accept
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="error"
            disabled={status !== "PENDING"}
            onClick={() => {
              setChangedStatus("REJECTED");
              setAlertOpen(true);
            }}
            sx={{ width: "100%" }}>
            Decline
          </Button>
        </DialogActions>
      </Dialog>
      <AlertDialog
        open={alertOpen}
        handleClose={() => {
          setAlertOpen(false);
          handleClose();
        }}
        dialogTitle={"Are you sure you want to update the status?"}
        dialogContent={
          "When you confirm, your choice will be final and cannot be changed."
        }
        handleYes={() => handleSubmit(changedStatus)}
      />
    </>
  );
}
