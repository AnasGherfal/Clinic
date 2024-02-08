import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Grid } from "@mui/material";
import { UserCreate } from "./model";
import { createUser } from "./userService"; // Import the createUser function
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Create: React.FC = () => {
  const [user, setUser] = useState<UserCreate>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof UserCreate
  ) => {
    setUser({ ...user, [fieldName]: e.target.value });
  };

  const handleAddUser = async () => {
    try {
      // Call the createUser function from userService.ts
      await createUser(user);
      // You may want to reset the form or perform other actions after adding the user
      setUser({
        firstName: "",
        lastName: "",
        email: "",
      });
      navigate("/users"); // Navigate to the specified route
    } catch (error) {
      // Handle error, display a message, or perform other actions
      console.error("Error adding user:", error);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous route
  };

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Add User
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              value={user.firstName}
              onChange={(e: any) => handleInputChange(e, "firstName")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              value={user.lastName}
              onChange={(e: any) => handleInputChange(e, "lastName")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={user.email}
              onChange={(e: any) => handleInputChange(e, "email")}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleAddUser}>
              Add User
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleGoBack}
            >
              Go Back
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Create;
