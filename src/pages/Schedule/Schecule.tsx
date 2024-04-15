import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import AppointmentForm from "../../components/Schedule/AppointmentForm";

export default function Schedule() {
  return (
    <>
      <div style={{ padding: 50 }}>
        <Typography variant="h4"> Schedules</Typography>
        <Box my={4} alignItems="center" gap={4} p={2}>
          <AppointmentForm />
        </Box>
      </div>
    </>
  );
}
