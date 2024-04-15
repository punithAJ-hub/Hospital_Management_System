import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import { useEffect } from "react";
import API from "../../utils/API";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Person2Icon from "@mui/icons-material/Person2";

export default function DoctorSchedule({ email, isADoctor }) {
  const [meetings, setMeetings] = React.useState([]);
  const [isDoctor, setIsDoctor] = React.useState(isADoctor);
  useEffect(() => {
    const docsSchedule = async () => {
      const res = await API.get(`/schedule/myschedule/${email}`);
      const schemeetings = res.data.schedule[0].meetings;
      setMeetings(schemeetings);
      console.log("Doc Meetings : ", schemeetings);
    };

    docsSchedule();
  }, []);
  return (
    <>
      {isADoctor && (
        <Box component={"div"}>
          {meetings.length > 0 ? (
            <Grid container spacing={3}>
              {meetings.map((meeting) => (
                <Grid item xs={4} key={meeting.id}>
                  <Paper
                    elevation={2}
                    style={{ marginTop: 5, padding: 20, width: 325 }}
                  >
                    <Typography fontSize={18} color={"#1B3C73"}>
                      <CalendarMonthIcon
                        style={{ paddingRight: 10, fontSize: 40 }}
                      />
                      {meeting.date}
                    </Typography>
                    <Typography>
                      <AccessTimeIcon
                        style={{ paddingRight: 10, fontSize: 40 }}
                      />
                      {meeting.time}
                    </Typography>
                    <Typography>
                      <Person2Icon style={{ paddingRight: 10, fontSize: 40 }} />
                      {meeting.patientName}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box>
              {isADoctor && (
                <Typography variant="h5" color={"#141E46"} pl={0} ml={0}>
                  You don't have any scheduled appointments. Sit back and relax!
                </Typography>
              )}
            </Box>
          )}
        </Box>
      )}
    </>
  );
}
