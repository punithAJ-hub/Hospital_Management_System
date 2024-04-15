import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import "../../components/welcomeMessage/WelcomeMessage.css";

function WelcomeMessage({ message }) {
  return (
    <>
      <Box ml={0} p={0} display={"flex"} className="WelcomeBg">
        <Box component={"div"}>
          <img src="doctor.webp" alt="" className="doctorImg" />
        </Box>
        <Box
          component={"div"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box position={"relative"}>
            <Box>
              <Typography variant="h2" fontSize={60} fontWeight={600}>
                Care Pro
              </Typography>
              <Typography
                variant="h4"
                className="brandSub"
                fontFamily={"cursive"}
                fontSize={30}
                fontWeight={300}
              >
                {message}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default WelcomeMessage;
