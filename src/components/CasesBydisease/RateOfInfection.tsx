import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { PieChart } from "@mui/x-charts/PieChart";
import React, { useEffect, useState } from "react";
import { years } from "../../utils/API";

export default function RateOfInfection({ rates }) {
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState("");
  const [newRates, setNewRates] = useState([]);
  const [rateByYear, setRateByYear] = useState({});
  const [multipliedRate, setMultipliedRate] = useState(0);

  useEffect(() => {
    console.log("Rates in Rate chart ", rates);

    setNewRates(rates);
    if (rates) {
      const filtered = rates.find((obj) => obj.hasOwnProperty(year));
      console.log("filtered data ", filtered);

      setRateByYear(filtered);
      if (filtered) {
        const multiplier = filtered[year] * 100000;
        console.log("year selected ", year);
        console.log("Rate at year : ", multiplier);
        setMultipliedRate(multiplier);
      }
    }
  }, [rates, year]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setYear(selectedYear);
  };

  return (
    <>
      <Box mt={5} ml={2}>
        <Box padding={"10px 0"}>
          <FormControl sx={{ m: 0, minWidth: 380 }}>
            <InputLabel
              id="demo-controlled-open-select-label"
              onClick={handleOpen}
            >
              Year
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={year}
              label="Year"
              onChange={handleYearChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <div style={{ textAlign: "left", marginBottom: 20 }}>
          <Typography variant="h6">
            Infection rate per million population
          </Typography>
        </div>
        <PieChart
          colors={["#67C6E3", "#FF407D"]}
          series={[
            {
              data: [
                {
                  id: 0,
                  value: multipliedRate,
                  label: `affected ${multipliedRate.toPrecision(4)} `,
                  color: "#67C6E3",
                },
                {
                  id: 1,
                  value: 100000,
                  label: "per million",
                  color: "#FF407D",
                },
              ],
            },
          ]}
          width={420}
          height={200}
        />
      </Box>
    </>
  );
}
