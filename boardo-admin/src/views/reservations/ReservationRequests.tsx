import { CircularProgress, Grid, Typography, Box } from "@mui/material";
import ReservationCard from "../../components/ReservationCard";
import ReservationModal from "components/ReservationModal";
import { useEffect, useState } from "react";
import { useLazyGetReservationsQuery } from "store/api/reservationApi";
import { Reservation } from "data/dataModels";

export default function ReservationRequest() {
  const [open, setOpen] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const [getReservations, { isLoading, data: reservations, isError, error }] =
    useLazyGetReservationsQuery();
  const [selectedReservation, setSelectedReservation] = useState<Reservation>();

  useEffect(() => {
    if (userInfo?._id) {
      getReservations(userInfo?._id);
    }
  }, [getReservations]);

  return isLoading ? (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ height: "100%" }}
    >
      <CircularProgress color="secondary" />
    </Box>
  ) : isError ? (
    <>
      <Typography variant="h4">
        {error ? JSON.stringify(error) : "Something went wrong"}
      </Typography>
    </>
  ) : (
    <>
      <Grid container spacing={3}>
        {reservations?.map((res: Reservation, index: number) => (
          <Grid
            item
            xs={12}
            md={6}
            onClick={() => {
              setOpen(true);
              setSelectedReservation(res);
            }}
            key={res._id}
          >
            <ReservationCard
              homeName={res?.placeName || "Home Name"}
              homeImage={res?.placeUrl || "https://source.unsplash.com/random"}
              status={res?.status || "Pending"}
              studentName={res?.studentName || "Student Name"}
              requestedTime={res?.timestamp}
            />
          </Grid>
        ))}
      </Grid>
      <ReservationModal
        open={open}
        handleClose={() => setOpen(false)}
        reservationId={selectedReservation?._id!}
        status={selectedReservation?.status!}
        checkIn={selectedReservation?.checkIn!}
        checkOut={selectedReservation?.checkOut!}
        message={selectedReservation?.message || ""}
        noOfGuests={selectedReservation?.noOfGuests!}
        studentNumber={selectedReservation?.studentNumber || "Not Available"}
      />
    </>
  );
}
