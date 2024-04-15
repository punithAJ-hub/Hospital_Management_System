import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Person2Icon from "@mui/icons-material/Person2";

export default function MyAppointments({ email }) {
  const getName = (emailId: String) => {
    return emailId.split("@")[0].toUpperCase();
  };

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const schedule = async () => {
      try {
        console.log("Patient Email in MyAppointments : ", email);
        const res = await API.get(`/schedule/myappointment/${email}`);
        console.log(res.data.schedule);
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
  }, [email]);

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
      </Grid>
    </>
  );
}
