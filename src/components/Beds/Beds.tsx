import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import API from "../../utils/API";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import Badge from "@mui/material/Badge";

export default function Beds() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: 200,
  }));

  const [beds, setBeds] = useState([
    { bed_id: "1001", occupied: true },
    { bed_id: "1002", occupied: false },
    { bed_id: "1002", occupied: false },
    { bed_id: "1002", occupied: false },
  ]);

  useEffect(() => {
    async function getAllBeds() {
      const response = await API.get("/beds/all");
      if (response.status == 200) {
        const allbeds = response.data.beds;
        setBeds(allbeds);
      } else {
        // console.log(response.data.error);
      }
    }
    getAllBeds();
  }, []);

  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 5 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        className="my-5 mx-5 bg-light pb-5"
      >
        {beds.map((bed, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Badge
              color={bed.occupied ? "error" : "success"}
              badgeContent={bed.occupied ? "O" : "V"}
            >
              <Item>
                <SingleBedIcon />
                {bed.bed_id}
              </Item>
            </Badge>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
