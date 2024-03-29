import * as React from "react";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import InventoryIcon from "@mui/icons-material/Inventory";
import AssignmentIcon from "@mui/icons-material/Assignment";

export default function SideMenu() {
  const navigateToDashboard = () => {
    console.log("Navigating to dashboard");
    window.location.href = "/dashboard";
  };

  const navigateToPatients = () => {
    console.log("Navigating to dashboard");
    window.location.href = "/patients";
  };

  const navigateToPatientForm = () => {
    console.log("Navigating to dashboard");
    window.location.href = "/patientInformation";
  };

  return (
    <div style={{ height: "100vh" }} className="position-fixed">
      <Paper sx={{ width: 200, height: "100%", marginTop: "90px" }}>
        <MenuList>
          <MenuItem className="my-5" onClick={navigateToDashboard}>
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Dashboard</Typography>
          </MenuItem>
          <MenuItem className="mb-5" onClick={navigateToPatientForm}>
            <ListItemIcon>
              <AssignmentIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Patient Info</Typography>
          </MenuItem>
          <MenuItem className="mb-5" onClick={navigateToPatients}>
            <ListItemIcon>
              <PeopleIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Patients</Typography>
          </MenuItem>
          <MenuItem className="mb-5">
            <ListItemIcon>
              <EditCalendarIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              Schedule
            </Typography>
          </MenuItem>
          <MenuItem className="mb-5">
            <ListItemIcon>
              <InventoryIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Inventories</Typography>
          </MenuItem>
          <MenuItem className="mb-5">
            <ListItemIcon>
              <AnalyticsIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Analytics</Typography>
          </MenuItem>
        </MenuList>
      </Paper>
    </div>
  );
}
