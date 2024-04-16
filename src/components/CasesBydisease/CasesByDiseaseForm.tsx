import { Api } from "@mui/icons-material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { LineChart } from "@mui/x-charts/LineChart";
import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import { diseases, counties } from "../../utils/API";
import RateOfInfection from "./RateOfInfection";

export default function CasesByDiseaseForm(params) {
  const [data, setData] = useState([]);
  const [disease, setDisease] = React.useState<string>("");
  const [county, setCounty] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);
  const [countyOpen, setCountyOpen] = React.useState(false);
  const [rates, setRates] = React.useState([{}]);

  useEffect(() => {
    const getData = async () => {
      const res = await API.get(`/diseasesdata/${disease}/${county}`);
      const filteredData = res.data.data.map((obj) => obj.Total);
      const ratesByYear = [];
      const filteredRate = res.data.data.map((obj) => {
        const rate = { [obj.year]: obj.rate };
        console.log(rate);

        ratesByYear.push(rate);
      });

      console.log("Filtered rates", ratesByYear);
      setRates(ratesByYear);

      console.log("Filtered data of population", filteredData);
      setData(filteredData);
    };

    getData();
  }, [disease, county]);

  const handleDiseaseChange = (event) => {
    const disease = event.target.value;
    setDisease(disease);
  };
  const handleCountyChange = (event) => {
    const county = event.target.value;
    setCounty(county);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCountyClose = () => {
    setCountyOpen(false);
  };

  const handleCountyOpen = () => {
    setCountyOpen(true);
  };

  return (
    <div style={{ marginBottom: 100 }}>
      <Box component={"div"}>
        <Box>
          <Typography
            variant="h5"
            align="center"
            p={5}
            mt={10}
            color={"#102C57"}
            fontWeight={600}
          >
            {" "}
            CID Cases by Disease Analysis California State{" "}
          </Typography>
        </Box>
        <Box
          component={"div"}
          style={{ display: "flex", gap: 100, justifyContent: "center" }}
        >
          <FormControl sx={{ m: 0, minWidth: 380 }}>
            <InputLabel
              id="demo-controlled-open-select-label"
              onClick={handleOpen}
            >
              Disease
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={disease}
              label="disease"
              onChange={handleDiseaseChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {diseases.map((dis) => (
                <MenuItem key={dis} value={dis}>
                  {dis}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 0, minWidth: 380 }}>
            <InputLabel
              id="demo-controlled-open-select-label"
              onClick={handleCountyOpen}
            >
              County
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={countyOpen}
              onClose={handleCountyClose}
              onOpen={handleCountyOpen}
              value={county}
              label="disease"
              onChange={handleCountyChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {counties.map((county) => (
                <MenuItem key={county} value={county}>
                  {county}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Grid container>
        <Grid item xs={8}>
          {" "}
          <Box component={"div"} style={{ paddingTop: 50 }}>
            <LineChart
              xAxis={[
                {
                  data: [
                    2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
                    2011, 2012, 2013, 2014,
                  ],
                  valueFormatter: (value) => value.toString(),
                  tickNumber: 14,
                },
              ]}
              series={[
                {
                  data: data,
                },
              ]}
              height={300}
              margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <RateOfInfection rates={rates} />
        </Grid>
      </Grid>
    </div>
  );
}
