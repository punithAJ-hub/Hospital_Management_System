import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import { useEffect } from "react";
import "../../components/Dashboard/Dashboard.css";

export default function Dashboard() {
  const [name, setName] = React.useState("");
  const [role, setRole] = React.useState("");
  useEffect(() => {
    const username = localStorage.getItem("name");
    const userRole = localStorage.getItem("role");
    setRole(userRole);
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
        <Paper
          elevation={2}
          style={{
            padding: 20,
            width: "60vw",
          }}
        >
          <Typography
            variant="h4"
            style={{ textAlign: "center", color: "#673ab7" }}
            className="welcomeText"
          >
            Welcome {name}
          </Typography>
          <Box pt={5}>
            {role != "admin" && (
              <Typography
                variant="h4"
                style={{ textAlign: "center", color: "#1a237e" }}
              >
                Instructions
              </Typography>
            )}
            {role === "doctor" && (
              <Box padding={" 20px 40px "} fontSize={20}>
                <ul>
                  <li>Visit Patient Info to add new patient Informations</li>
                  <li>
                    Visit Patients to view/ update existing patients and click
                    on{" "}
                    <strong>
                      <i>Patients under my care </i>
                    </strong>{" "}
                    to view your patients{" "}
                  </li>
                  <li>Visit Schedule to view your meetings</li>
                  <li>Visit Beds to check availabilities of beds</li>
                  <li>Visit Analytics to view utilizantion and trends </li>
                </ul>
              </Box>
            )}
            {role === "user" && (
              <Box padding={" 20px 40px "} fontSize={20}>
                <ul>
                  <li>Visit My records to add view your Informations</li>

                  <li>
                    Visit Schedule to schedule an appointment with the doctor
                  </li>
                </ul>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
    </>
  );
}
