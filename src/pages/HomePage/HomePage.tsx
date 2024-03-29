import React from "react";
import { styled } from "@mui/material/styles";
import { Grid, Paper } from "@mui/material";
import SideMenu from "../../components/SideMenu/SideMenu";

function HomePage({ children }) {
  return (
    <Grid container>
      <Grid item xs={2}>
        <SideMenu />
      </Grid>

      {/* Children Component */}
      <Grid item xs={9} style={{ marginTop: "100px", marginLeft: "0px" }}>
        {children}
      </Grid>
    </Grid>
  );
}

export default HomePage;
