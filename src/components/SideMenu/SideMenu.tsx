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
import BedIcon from "@mui/icons-material/Bed";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import "../../components/SideMenu/SideMenu.css";

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

  const navigateToBeds = () => {
    console.log("Navigating to dashboard");
    window.location.href = "/beds";
  };
  const navigateToManageAccounts = () => {
    console.log("Navigating to dashboard");
    window.location.href = "/manageAccounts";
  };

  return (
    <div style={{ height: "100vh" }} className="position-fixed">
      <Paper sx={{ width: 200, height: "100%", marginTop: "90px" }}>
        <MenuList>
          <MenuItem className="my-5 sidebarLink" onClick={navigateToDashboard}>
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Dashboard</Typography>
          </MenuItem>
          <MenuItem
            className="mb-5 sidebarLink"
            onClick={navigateToPatientForm}
          >
            <ListItemIcon>
              <AssignmentIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Patient Info</Typography>
          </MenuItem>
          <MenuItem className="mb-5 sidebarLink" onClick={navigateToPatients}>
            <ListItemIcon>
              <PeopleIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Patients</Typography>
          </MenuItem>
          <MenuItem className="mb-5 sidebarLink">
            <ListItemIcon>
              <EditCalendarIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              Schedule
            </Typography>
          </MenuItem>
          <MenuItem className="mb-5 sidebarLink">
            <ListItemIcon>
              <InventoryIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Inventories</Typography>
          </MenuItem>
          <MenuItem className="mb-5 sidebarLink" onClick={navigateToBeds}>
            <ListItemIcon>
              <BedIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Beds</Typography>
          </MenuItem>
          <MenuItem
            className="mb-5 sidebarLink"
            onClick={navigateToManageAccounts}
          >
            <ListItemIcon>
              <ManageAccountsIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Manage Accounts</Typography>
          </MenuItem>
          <MenuItem className="mb-5 sidebarLink">
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
