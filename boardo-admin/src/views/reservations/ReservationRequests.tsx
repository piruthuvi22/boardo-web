import { Grid } from "@mui/material";
import ReservationCard from "../../components/ReservationCard";
import Modal from "components/Modal";
import { useEffect, useState } from "react";

export default function ReservationRequest() {
  const [open, setOpen] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} onClick={() => setOpen(true)}>
          <ReservationCard
            homeName="Live From Space"
            homeImage="https://mui.com/static/images/cards/live-from-space.jpg"
            studentName="Mac Miller"
            requestedTime="2024-01-01 10:00:00"
          />
        </Grid>
      </Grid>

      <Modal
        buttonText="Reservation Request"
        open={open}
        handleClose={() => setOpen(false)}
        message="message description"
        dialogContent="This is a test"
      />
    </>
  );
}
