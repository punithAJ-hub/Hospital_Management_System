import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SignIn from "../../components/SignIn/SignIn";
import SignUp from "../../components/SignUp/SignUp";
import "../../pages/WelcomePage/welcomePage.css";
import WelcomeMessage from "../../components/welcomeMessage/WelcomeMessage";
import Grid from "@mui/material/Grid";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function WelcomePage() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const message = "Managing made easy.";

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const swiftUpElements = document.querySelectorAll(".swift-up-text");

  swiftUpElements.forEach((elem) => {
    const words = elem.textContent.split(" ");
    elem.innerHTML = "";

    words.forEach((el, index) => {
      words[index] = `<span><i>${words[index]}</i></span>`;
    });

    elem.innerHTML = words.join(" ");

    const children = document.querySelectorAll("span > i");
    children.forEach((node, index) => {
      node.style.animationDelay = `${index * 0.2}s`;
    });
  });

  return (
    <>
      <div className="container-fluid welcomeForms pt-5 welcomePageContainer">
        <Grid container mt={20}>
          <Grid item xs={6}>
            <WelcomeMessage message={message} />
          </Grid>
          <Grid item xs={6}>
            <div className="forms" style={{}}>
              <Box
                sx={{ bgcolor: "background.paper", width: 500 }}
                className="pr-0 shadow-sm p-3 mb-5 bg-white rounded"
              >
                <AppBar position="static">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                  >
                    <Tab label="SignIn" {...a11yProps(0)} />
                    <Tab label="SignUp" {...a11yProps(1)} />
                  </Tabs>
                </AppBar>
                <SwipeableViews
                  axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                  index={value}
                  onChangeIndex={handleChangeIndex}
                >
                  <TabPanel value={value} index={0} dir={theme.direction}>
                    <SignIn />
                  </TabPanel>
                  <TabPanel value={value} index={1} dir={theme.direction}>
                    <SignUp />
                  </TabPanel>
                </SwipeableViews>
              </Box>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
