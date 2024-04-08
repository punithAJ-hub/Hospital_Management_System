import React from "react";
import { Grid, Paper } from "@mui/material";
import SideMenu from "../../components/SideMenu/SideMenu";

function HomePage({ children }) {
  return (
    <Grid item container>
      <Grid item style={{ width: 200 }}>
        <SideMenu />
      </Grid>

      {/* Children Component */}
      <Grid
        item
        style={{
          marginTop: "90px",
          marginLeft: "200px",
          height: "100vh",
          width: "100vw",
        }}
        className="bg-light"
      >
        {children}
      </Grid>
    </Grid>
  );
}

export default HomePage;
