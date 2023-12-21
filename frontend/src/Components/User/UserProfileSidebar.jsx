import * as React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useState, useEffect } from "react";

const drawerWidth = 100;

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
});

const UserProfileSideBar = () => {
  const [open, setOpen] = useState(true);

  const toggleSideBar = () => {
    setOpen(!open);
  };

  const hideSidebar = () => {
    setOpen(false);
  };

  const showSidebar = () => {
    setOpen(true);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 950) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call the function once on initial load

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <ThemeProvider theme={darkTheme}>
      <Drawer variant="permanent" sx={{ width: drawerWidth, flexShrink: 0 }}>
        {open ? (
          <button
            onClick={hideSidebar}
            style={{ backgroundColor: "#1e1e1e", border: "none" }}
          >
            <MenuIcon
              style={{ marginLeft: "80px", marginTop: "20px", color: "white" }}
            />
          </button>
        ) : (
          <button
            onClick={showSidebar}
            style={{ backgroundColor: "ffff", border: "none" }}
          >
            <MenuOpenIcon />
          </button>
        )}

        {open && (
          <div>
            <Toolbar />
            <List>
              <NavLink
                to="/profile"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {" "}
                <ListItemButton disablePadding>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </NavLink>
            </List>
            <List>
              <NavLink
                to="/user-trips"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {" "}
                <ListItemButton disablePadding>
                  <ListItemIcon>
                    <DriveEtaIcon />
                  </ListItemIcon>
                  <ListItemText primary="All Trips" />
                </ListItemButton>
              </NavLink>
            </List>
            <List>
              <NavLink
                to="/address"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {" "}
                <ListItemButton disablePadding>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Address" />
                </ListItemButton>
              </NavLink>
            </List>
            <List>
              <NavLink
                to="/reset-password"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {" "}
                <ListItemButton disablePadding>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Reset Password" />
                </ListItemButton>
              </NavLink>
            </List>
            
          </div>
        )}
      </Drawer>
    </ThemeProvider>
  );
};

export default UserProfileSideBar;
