import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { dataset } from "../../utils/API";
const chartSetting = {
  yAxis: [
    {
      label: "Number of Patients",
    },
  ],
  width: 700,
  height: 400,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-10px, 0)",
    },
  },
};

const valueFormatter = (value: number | null) => `${value}`;

export default function PatientChart() {
  return (
    <Paper elevation={1} style={{ paddingLeft: 20 }}>
      <div>
        <Typography variant="h6" style={{ padding: "18px 0" }}>
          Rate of Admissions and Discharges
        </Typography>
      </div>
      <BarChart
        dataset={dataset}
        xAxis={[{ scaleType: "band", dataKey: "month" }]}
        series={[
          { dataKey: "admissions", label: "admissions", valueFormatter },
          { dataKey: "discharges", label: "discharges", valueFormatter },
        ]}
        {...chartSetting}
      />
    </Paper>
  );
}
