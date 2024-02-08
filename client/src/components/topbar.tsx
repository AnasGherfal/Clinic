import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Badge,
  IconButton,
} from "@mui/material";
import { Notifications } from "@mui/icons-material";

import { useState } from "react";

const TopBar = () => {
  const handleNotificationsClick = () => {
    // Handle notifications click logic here
  };

  const handleProfileClick = () => {
    // Handle profile click logic here
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
        <Typography variant="h6" component="h1">
          My App
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit" onClick={handleNotificationsClick}>
          <Badge color="secondary">
            <Notifications />
          </Badge>
        </IconButton>
        <Button color="inherit" />
        <Button color="inherit" />
        <IconButton color="inherit" onClick={handleProfileClick}>
          {/* <Avatar alt="Profile" src={profilePicUrl} /> */}
          <Typography variant="body1" sx={{ ml: 1 }}>
            John Doe
          </Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
