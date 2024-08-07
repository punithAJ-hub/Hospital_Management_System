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
import { useEffect } from "react";

export default function SideMenu() {
  const [isDoctor, setIsDoctor] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [isUser, setIsUser] = React.useState(false);
  const navigateToDashboard = () => {
    // console.log("Navigating to dashboard");
    window.location.href = "/dashboard";
  };

  const navigateToPatients = () => {
    // console.log("Navigating to patients");
    window.location.href = "/patients";
  };

  const navigateToPatientForm = () => {
    // console.log("Navigating to patientInformation");
    window.location.href = "/patientInformation";
  };

  const navigateToBeds = () => {
    // console.log("Navigating to beds");
    window.location.href = "/beds";
  };
  const navigateToManageAccounts = () => {
    // console.log("Navigating to manageAccounts");
    window.location.href = "/manageAccounts";
  };
  const navigateToSchedule = () => {
    // console.log("Navigating to schedule");
    window.location.href = "/schedule";
  };
  const navigateToAnalytics = () => {
    // console.log("Navigating to analytics");
    window.location.href = "/analytics";
  };

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setIsAdmin(userRole === "admin");
    setIsDoctor(userRole === "doctor");
    setIsUser(userRole === "user");
  }, []);

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
          {(isDoctor || isAdmin) && (
            <MenuItem
              className="mb-5 sidebarLink"
              onClick={navigateToPatientForm}
            >
              <ListItemIcon>
                <AssignmentIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Patient Info</Typography>
            </MenuItem>
          )}

          <MenuItem className="mb-5 sidebarLink" onClick={navigateToPatients}>
            <ListItemIcon>
              <PeopleIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">
              {" "}
              {isDoctor || isAdmin ? "Patients" : "My records"}{" "}
            </Typography>
          </MenuItem>

          <MenuItem className="mb-5 sidebarLink" onClick={navigateToSchedule}>
            <ListItemIcon>
              <EditCalendarIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              Schedule
            </Typography>
          </MenuItem>
          {(isDoctor || isAdmin) && (
            <MenuItem className="mb-5 sidebarLink">
              <ListItemIcon>
                <InventoryIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Inventories </Typography>
              <img
                src="comingsoon.webp"
                alt=""
                style={{
                  width: 50,
                  height: 50,
                  position: "absolute",
                  right: 0,
                  top: 10,
                }}
              />
            </MenuItem>
          )}
          {(isDoctor || isAdmin) && (
            <MenuItem className="mb-5 sidebarLink" onClick={navigateToBeds}>
              <ListItemIcon>
                <BedIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Beds</Typography>
            </MenuItem>
          )}
          {isAdmin && (
            <MenuItem
              className="mb-5 sidebarLink"
              onClick={navigateToManageAccounts}
            >
              <ListItemIcon>
                <ManageAccountsIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Manage Accounts</Typography>
            </MenuItem>
          )}
          {(isDoctor || isAdmin) && (
            <MenuItem
              className="mb-5 sidebarLink"
              onClick={navigateToAnalytics}
            >
              <ListItemIcon>
                <AnalyticsIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Analytics</Typography>
            </MenuItem>
          )}
        </MenuList>
        {isUser && (
          <MenuItem className="mb-5 sidebarLink">
            <ListItemIcon>
              <InventoryIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Bills </Typography>
            <img
              src="comingsoon.webp"
              alt=""
              style={{
                width: 50,
                height: 50,
                position: "absolute",
                right: 0,
                top: 10,
              }}
            />
          </MenuItem>
        )}
      </Paper>
    </div>
  );
}
