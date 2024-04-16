import React, { useEffect } from "react";
import API from "../../utils/API";
import PatientCard from "../PatientCard/PatientCard";
import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function Patients(params) {
  const [isDoctor, setIsDoctor] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [myPatients, setMyPatients] = React.useState(false);
  const [user, setUser] = React.useState(localStorage.getItem("user"));
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const [patientRecords, setPatientRecords] = useState([]);
  const [patientsUnderMyCare, setPatientsUnderMyCare] = useState([]);

  const getMyPatients = (event) => {
    setMyPatients(event.target.checked);
  };

  async function getAllPatientRecords() {
    const response = await API.get("/patients/all");
    const records = response.data.patientRecords;
    setPatientRecords(records);
    const role = localStorage.getItem("role");
    setIsDoctor(role === "doctor");
    setIsAdmin(role === "admin");
    // console.log("User in patientRecord : ", user);
    let patientsUnderCare = [];
    records.forEach((document) => {
      const lastRecord = document.records[document.records.length - 1];
      if (lastRecord && lastRecord.primaryCarePhysician === user) {
        const exists = patientsUnderCare.some(
          (patient) => patient._id.$oid === document._id.$oid
        );
        if (!exists) {
          patientsUnderCare.push(document);
        }
      }
    });

    // console.log("records ", records);

    // console.log("Patients under my care : ", patientsUnderCare);
    myPatients
      ? setPatientsUnderMyCare(patientsUnderCare)
      : setPatientsUnderMyCare(records);

    patientsUnderCare = [];
  }

  useEffect(() => {
    getAllPatientRecords();
  }, [myPatients]);

  return (
    <div className="mx-5 px-5">
      {isDoctor && (
        <Box display={"flex"} justifyContent={"flex-end"} pt={5}>
          <FormControlLabel
            control={<Checkbox defaultChecked color="success" />}
            label="Patients under my care"
            style={{ paddingLeft: "100" }}
            checked={myPatients}
            onChange={getMyPatients}
          />
        </Box>
      )}
      {isDoctor || isAdmin ? (
        <Box sx={{ flexGrow: 1 }} className="mt-5 h-100">
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            className=""
          >
            {patientsUnderMyCare.map((record) => (
              <Grid item xs={2} sm={4} md={4} key={record._id}>
                <PatientCard data={record} isADoctor={true} />{" "}
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1 }} className="mt-5 h-100">
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            className=""
          >
            {patientRecords
              .filter((record) => record.email === user)
              .map((record) => (
                <Grid item xs={2} sm={4} md={4} key={record._id}>
                  <PatientCard data={record} isADoctor={false} />{" "}
                </Grid>
              ))}
          </Grid>
        </Box>
      )}
    </div>
  );
}
