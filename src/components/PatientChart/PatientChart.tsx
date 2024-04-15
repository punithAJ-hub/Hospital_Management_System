import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

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
const dataset = [
  {
    admissions: 59,
    discharges: 57,
    month: "Jan",
  },
  {
    admissions: 50,
    discharges: 52,
    month: "Feb",
  },
  {
    admissions: 47,
    discharges: 53,
    month: "Mar",
  },
  {
    admissions: 54,
    discharges: 56,
    month: "Apr",
  },
  {
    admissions: 57,
    discharges: 69,
    month: "May",
  },
  {
    admissions: 60,
    discharges: 63,
    month: "June",
  },
  {
    admissions: 59,
    discharges: 60,
    month: "July",
  },
  {
    admissions: 65,
    discharges: 60,
    month: "Aug",
  },
  {
    admissions: 51,
    discharges: 51,
    month: "Sept",
  },
  {
    admissions: 60,
    discharges: 65,
    month: "Oct",
  },
  {
    admissions: 67,
    discharges: 64,
    month: "Nov",
  },
  {
    admissions: 61,
    discharges: 70,
    month: "Dec",
  },
];

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
