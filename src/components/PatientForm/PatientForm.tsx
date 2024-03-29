import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import API from "../../utils/API";
import BedSelection from "./BedSelection";

const PatientForm = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [patientData, setPatientData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    bloodType: "",
    phoneNumber: "",
    email: "",
    address: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    medicalConditions: "",
    allergies: "",
    medications: "",
    insuranceProvider: "",
    insuranceNumber: "",
    primaryCarePhysician: "",
    lastVisitDate: "",
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
    e.preventDefault();
    console.log(patientData);
    const response = await API.post("/patients/addpatientdata", patientData);

    if (response.status === 200) {
      setSuccess("Patient record has been added");
      setPatientData({
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        bloodType: "",
        phoneNumber: "",
        email: "",
        address: "",
        emergencyContactName: "",
        emergencyContactNumber: "",
        medicalConditions: "",
        allergies: "",
        medications: "",
        insuranceProvider: "",
        insuranceNumber: "",
        primaryCarePhysician: "",
        lastVisitDate: "",
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
                label="First Name"
                name="firstName"
                value={patientData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                name="lastName"
                value={patientData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="Date of Birth"
                name="dob"
                value={patientData.dob}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="Gender"
                name="gender"
                value={patientData.gender}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="Blood Type"
                name="bloodType"
                value={patientData.bloodType}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={patientData.phoneNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                value={patientData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="Address"
                name="address"
                value={patientData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="Emergency Contact Name"
                name="emergencyContactName"
                value={patientData.emergencyContactName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="Emergency Contact Number"
                name="emergencyContactNumber"
                value={patientData.emergencyContactNumber}
                onChange={handleChange}
              />
            </Grid>
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
                label="Allergies"
                name="allergies"
                value={patientData.allergies}
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
                label="Insurance Provider"
                name="insuranceProvider"
                value={patientData.insuranceProvider}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="Insurance Number"
                name="insuranceNumber"
                value={patientData.insuranceNumber}
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
                label="Last Visit Date"
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
              <BedSelection onSelectBed={handleBedSelection} />
            </Grid>
          </Grid>
          <Box mt={3}>
            <Button variant="contained" color="primary" type="submit">
              Submit
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

export default PatientForm;
