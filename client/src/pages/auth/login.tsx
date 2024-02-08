import React from "react";
import { useState } from "react";
import "./login.css";
import {
  BrowserRouter as Routers,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { SignIn, isAuthenticated } from "../../config/AuthService";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  const onButtonClick = async () => {
    setEmailError("");
    setPasswordError("");

    if ("" === email) {
      setEmailError("Please enter your email");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    if (password.length < 8) {
      setPasswordError("Password must be 8 characters or longer");
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    try {
      // Call SignUp function here
      await SignIn({ email, password });
      navigate("/");
      setOpenSnackbar(true);
      setSnackbarMessage("Login successful");
    } catch (error: any) {
      setOpenSnackbar(true);
      setSnackbarMessage(`${error.message}`);
    }
  };

  return (
    <div className="background-container">
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="user-box">
            <input
              value={email}
              placeholder="Enter email address here"
              onChange={(ev) => setEmail(ev.target.value)}
              className={"user-box"}
            />
            <label className="errorLabel">{emailError}</label>
          </div>
          <div className="user-box">
            <input
              value={password}
              type="password" 
              placeholder="Enter password here"
              onChange={(ev) => setPassword(ev.target.value)}
              className={"user-box"}
            />
            <label className="errorLabel">{passwordError}</label>
          </div>
          <input
            onClick={onButtonClick}
            className={"inputButton"}
            type="button"
            value={"Login"}
          />
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            
          >
                  <MuiAlert
              elevation={6}
              variant="filled"
              onClose={handleSnackbarClose}
              severity={snackbarMessage.includes("successful") ? "success" : "error"}
            >
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>
          
        </form>
      </div>
    </div>
  );
}

export default Login;
