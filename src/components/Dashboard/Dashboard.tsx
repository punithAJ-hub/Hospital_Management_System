import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import useState from "react";
import { useEffect } from "react";

export default function Dashboard() {
  const [name, setName] = React.useState("");

  useEffect(() => {
    const username = localStorage.getItem("name");
    setName(username);
  }, [name]);
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"80vw"}
        height={"80vh"}
      >
        <Paper elevation={2} style={{ padding: 20 }}>
          <Typography variant="h4">Welcome {name}</Typography>
        </Paper>
      </Box>
    </>
  );
}
