import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import API from "../../utils/API";
import BedSelection from "./BedSelection";

const UpdateForm = ({ emailId }) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [patientData, setPatientData] = useState({
    medicalConditions: "",
    medications: "",
    primaryCarePhysician: "",
    lastVisitDate: "",
    dischargedOn: "",
    assigned_bed: "", // Add assigned_bed field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const handleBedSelection = (selectedBed) => {
    setPatientData({ ...patientData, assigned_bed: selectedBed });
  };

  const handleSubmit = async (e) => {
    const updatedPatientData = {
      ...patientData,
      email: emailId,
    };

    console.log("Email ID : ", emailId);

    e.preventDefault();
    // console.log(updatedPatientData);
    let response;
    // console.log("This is an update ");
    response = await API.put("/patients/updateRecord", updatedPatientData);
    // console.log(response.data.message);

    if (response?.status === 200) {
      setSuccess("Patient record has been added");
      setPatientData({
        medicalConditions: "",
        medications: "",
        primaryCarePhysician: "",
        lastVisitDate: "",
        dischargedOn: "",
        assigned_bed: "", // Reset assigned_bed field
      });
    } else {
      setError("Unable to add patient record. Please try again");
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Patient Information
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="Medical Conditions"
                name="medicalConditions"
                value={patientData.medicalConditions}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="Medications"
                name="medications"
                value={patientData.medications}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="Primary Care Physician"
                name="primaryCarePhysician"
                value={patientData.primaryCarePhysician}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="Last Visited Date"
                name="lastVisitDate"
                type="date" // Add type prop here
                value={patientData.lastVisitDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true, // Ensure the label floats when a date is selected
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Discharged On"
                name="dischargedOn"
                type="date" // Add type prop here
                value={patientData.dischargedOn}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true, // Ensure the label floats when a date is selected
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <BedSelection onSelectBed={handleBedSelection} />
            </Grid>
          </Grid>
          <Box mt={3}>
            <Button variant="contained" color="primary" type="submit">
              Update
            </Button>
          </Box>
        </form>
      </Box>
      <div>
        {success && (
          <Typography color={"green"} style={{ paddingLeft: 22 }}>
            {success}
          </Typography>
        )}
        {error && (
          <Typography color={"red"} style={{ paddingLeft: 22 }}>
            {error}
          </Typography>
        )}
      </div>
    </>
  );
};

export default UpdateForm;
