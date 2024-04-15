import React, { useEffect } from "react";
import API from "../../utils/API";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { availableTimes } from "../../utils/API";
import { Typography } from "@mui/material";
import MyAppointments from "./MyAppointments";
import DoctorSchedule from "./DoctorSchedule";
import { useAuth } from "../../utils/AuthProvider";
import useState from "react";

export default function AppointmentForm(params) {
  const [user, setUser] = React.useState(localStorage.getItem("user"));
  const [isDoctor, setIsDoctor] = React.useState(false);
  const [isUser, setIsUser] = React.useState(false);
  const [doctors, setDoctors] = React.useState([]);
  const [doctorEmail, setDoctorEmail] = React.useState("");
  const [patientEmail, setPatientEmail] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [availabilityTimes, setAvailabilityTimes] = React.useState([]);
  const [message, setMessage] = React.useState("");

  const handleDoctorChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setDoctorEmail(value);
    setMessage("");
  };

  const handleTimeChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setTime(value);
    setMessage("");
  };

  const handleDateChange = (event: SelectChangeEvent) => {
    const dateObj = new Date(event.target.value);
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate() + 1).padStart(2, "0");
    const year = String(dateObj.getFullYear());
    const formattedDate = `${month}-${day}-${year}`;
    setDate(formattedDate);
    setMessage("");
  };

  const scheduleAppointment = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const patientName = localStorage.getItem("name");
    const formData = {
      doctorEmail: doctorEmail,
      patientEmail: patientEmail,
      patientName: patientName,
      date: date,
      time: time,
    };
    console.log("Scheduling an appointment");
    console.log("Form Data : ", formData);

    const res = await API.post(`/schedule/appointment`, formData);

    setMessage(res.data.message);
    console.log("After scheduling appointment", res.data);
  };

  useEffect(() => {
    const getDoctors = async () => {
      const response = await API.get("/users");
      const users = response.data.users;
      const userEmail = localStorage.getItem("user");
      setPatientEmail(userEmail);
      console.log("User Email ", userEmail);
      const doctors = users.filter((user) => user.role === "doctor");
      setDoctors(doctors);
    };

    getDoctors();
    const userRole = localStorage.getItem("role");
    setIsDoctor(userRole === "doctor");
    setIsUser(userRole != "doctor");
  }, [isDoctor, isUser, message]);

  useEffect(() => {
    const getTime = async () => {
      try {
        const response = await API.get(
          `/schedule/getAvailability/${doctorEmail}`
        );
        const schedule = response.data.schedule;
        console.log("Changed date : ", date);
        console.log("Availability : ", schedule.availability);

        const availabilityEntry = schedule.availability.find(
          (entry) => entry.date === date
        );

        const blockedTimes = availabilityEntry ? availabilityEntry.time : [];
        const filteredTimes = availableTimes.filter(
          (time) => !blockedTimes.includes(time)
        );
        setAvailabilityTimes(filteredTimes);
      } catch (error) {
        console.error("Error fetching availability:", error);
      }
    };

    getTime();
  }, [date, doctorEmail]);

  return (
    <>
      {console.log("Is User ", isUser)}
      {isUser && (
        <Box
          component="form"
          sx={{
            "& > :not(style)": { width: "100" },
            border: "2px solid grey",
            p: 5,
          }}
          noValidate
          autoComplete="off"
          onSubmit={scheduleAppointment} // Move onSubmit handler to the main form
        >
          <Grid
            container
            spacing={18}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Grid item xs={3}>
              <FormControl fullWidth style={{ width: 200 }}>
                <InputLabel id="demo-simple-select-label">
                  Select doctor
                </InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="doctor"
                  name="doctorEmail"
                  onChange={handleDoctorChange}
                >
                  {doctors.map((doctor) => {
                    return (
                      <MenuItem value={doctor.email} key={doctor.email}>
                        {doctor.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                id="outlined-basic"
                label="Select Date"
                variant="outlined"
                type="date"
                name="date"
                onChange={handleDateChange}
                style={{ width: 200 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth style={{ width: 200 }}>
                <InputLabel id="demo-simple-select-label">Time</InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="time"
                  onChange={handleTimeChange}
                >
                  {availabilityTimes.map((time) => {
                    return (
                      <MenuItem key={time} value={time}>
                        {time}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={3}>
              <Button type="submit" variant="contained">
                Schedule
              </Button>
            </Grid>
          </Grid>
          <Typography color={"green"} sx={{ mt: 1 }}>
            {message}
          </Typography>
        </Box>
      )}

      {isUser && (
        <Box component="div">
          <MyAppointments email={patientEmail}></MyAppointments>
        </Box>
      )}
      {isDoctor && (
        <Box component={"div"}>
          <DoctorSchedule email={user} isADoctor={isDoctor}></DoctorSchedule>
        </Box>
      )}
    </>
  );
}
