import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Person2Icon from "@mui/icons-material/Person2";
import ClearIcon from "@mui/icons-material/Clear";

export default function MyAppointments({ email }) {
  const getName = (emailId: String) => {
    return emailId.split("@")[0].toUpperCase();
  };

  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const schedule = async () => {
      try {
        // console.log("Patient Email in MyAppointments : ", email);
        const res = await API.get(`/schedule/myappointment/${email}`);
        // console.log(res.data.schedule);
        const data = res.data.schedule;
        if (res.status === 200) {
          const filteredMeetings = data.flatMap((obj) => {
            return obj.meetings.filter(
              (meeting) => meeting.patientEmail === email
            );
          });
          setAppointments(filteredMeetings);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    schedule();
  }, [email, message]);

  const cancelAppointment = async (appointment) => {
    const doctorEmail = appointment.doctorEmail;
    const date = appointment.date;
    const time = appointment.time;

    const res = await API.delete(
      `/schedule/cancelAppointment/${doctorEmail}/${date}/${time}`
    );

    // console.log("Cancel Meeting response : ", res.data.message);
    setMessage(res.data.message);
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 4, p: 2 }}>
        My Appointments
      </Typography>
      <Grid container spacing={3}>
        {appointments.map((appointment) => {
          return (
            <Grid item xs={4} style={{ padding: 40 }}>
              <Paper sx={{ p: 2, mt: 3 }} key={appointment.time}>
                <Box
                  component={"div"}
                  justifyContent={"end"}
                  display={"flex"}
                  onClick={() => {
                    cancelAppointment(appointment);
                  }}
                >
                  <ClearIcon color="primary"></ClearIcon>
                </Box>
                <Typography fontSize={18} color={"#1B3C73"}>
                  {" "}
                  <CalendarMonthIcon
                    style={{ paddingRight: 10, fontSize: 40 }}
                  />
                  {appointment.date}
                </Typography>
                <Typography>
                  {" "}
                  <AccessTimeIcon style={{ paddingRight: 10, fontSize: 40 }} />
                  {appointment.time}
                </Typography>
                <Typography>
                  <Person2Icon style={{ paddingRight: 10, fontSize: 40 }} />
                  {getName(appointment.doctorEmail)}
                </Typography>
              </Paper>
            </Grid>
          );
        })}

        <Box mt={4}>
          <Typography color={"green"}>{message ? message : ""}</Typography>
        </Box>
      </Grid>
    </>
  );
}
