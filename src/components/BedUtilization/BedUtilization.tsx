import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { PieChart } from "@mui/x-charts/PieChart";
import React, { useEffect, useState } from "react";
import API from "../../utils/API";
export default function BedUtilization(params) {
  const [vacant, setVacant] = useState(0);
  const [overall, setOverall] = useState(0);

  useEffect(() => {
    const getBeds = async () => {
      const response = await API.get("/beds/all");
      const beds = response.data.beds;
      console.log("Beds : ", beds);

      setOverall(beds.length);
      const available = beds.filter((bed) => bed.occupied === false);
      setVacant(available.length);
    };

    getBeds();
  }, []);

  return (
    <>
      <Paper
        elevation={1}
        style={{
          padding: 20,
        }}
      >
        <div style={{ textAlign: "left", marginBottom: 20 }}>
          <Typography variant="h6">Bed Utilization</Typography>
        </div>
        <PieChart
          colors={["#67C6E3", "#FF407D"]}
          series={[
            {
              data: [
                { id: 0, value: vacant, label: "available", color: "#67C6E3" },
                {
                  id: 1,
                  value: overall - vacant,
                  label: "occupied",
                  color: "#FF407D",
                },
              ],
            },
          ]}
          width={400}
          height={200}
        />
      </Paper>
    </>
  );
}
