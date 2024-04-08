import React, { useEffect } from "react";
import API from "../../utils/API";
import PatientCard from "../PatientCard/PatientCard";
import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

export default function Patients(params) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const [patientRecords, setPatientRecords] = useState([]);

  async function getAllPatientRecords() {
    const response = await API.get("/patients/all");
    const records = response.data.patientRecords;
    setPatientRecords(records);
  }
  useEffect(() => {
    getAllPatientRecords();
  }, []);

  return (
    <div className="mx-5 px-5">
      <Box sx={{ flexGrow: 1 }} className="mt-5 h-100">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          className=""
        >
          {patientRecords.map((record) => (
            <Grid item xs={2} sm={4} md={4} key={record._id}>
              <PatientCard data={record} />{" "}
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
