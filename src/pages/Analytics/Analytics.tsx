import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import BedUtilization from "../../components/BedUtilization/BedUtilization";
import CasesByDiseaseForm from "../../components/CasesBydisease/CasesByDiseaseForm";
import PatientChart from "../../components/PatientChart/PatientChart";

export default function Analytics(params) {
  return (
    <>
      <Box component={"div"} style={{ padding: 30 }}>
        <Typography variant="h4">Analytics</Typography>
        <Box component={"div"} style={{ marginTop: 30 }}>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <BedUtilization />
            </Grid>
            <Grid item xs={7}>
              <PatientChart />
            </Grid>
          </Grid>
        </Box>
        <Box component={"div"} style={{ paddingTop: 180 }}>
          <CasesByDiseaseForm />
        </Box>
      </Box>
    </>
  );
}
