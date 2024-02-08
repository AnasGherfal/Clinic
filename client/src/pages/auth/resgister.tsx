import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { SignUp } from "../../config/AuthService";

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();

  const onButtonClick = async () => {
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

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

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Perform registration logic here
    // For demonstration purposes, navigate to the home page on successful registration
    try {
      // Call SignUp function here
      await SignUp({ email, password, firstName, lastName, phoneNumber });

      // For demonstration purposes, navigate to the home page on successful registration
      navigate("/");
    } catch (error:any) {
      // Handle registration errors here
      console.error("Error during registration:", error.message);
    }
  };

  return (
    <div className="background-container">

    <div className="login-box">
      <h2>Register</h2>
      <form>
        <div className="user-box">
          <input
            value={email}
            placeholder="Enter email address here"
            onChange={(ev) => setEmail(ev.target.value)}
            className="user-box"
          />
          <label className="errorLabel">{emailError}</label>
        </div>
        <div className="user-box">
          <input
            value={password}
            placeholder="Enter password here"
            type="password"
            onChange={(ev) => setPassword(ev.target.value)}
            className="user-box"
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <div className="user-box">
          <input
            value={confirmPassword}
            placeholder="Confirm password"
            type="password"
            onChange={(ev) => setConfirmPassword(ev.target.value)}
            className="user-box"
          />
          <label className="errorLabel">{confirmPasswordError}</label>
        </div>
        <div className="user-box">
          <input
            value={firstName}
            placeholder="Enter first name"
            onChange={(ev) => setFirstName(ev.target.value)}
            className="user-box"
          />
        </div>
        <div className="user-box">
          <input
            value={lastName}
            placeholder="Enter last name"
            onChange={(ev) => setLastName(ev.target.value)}
            className="user-box"
          />
        </div>
     
        <input
          onClick={onButtonClick}
          className="inputButton"
          type="button"
          value="Register"
        />
        <p>
          Already have an account? 
        </p>

      </form>
      <Link to="/login">Login here</Link>
    </div>
    </div>
  );
}

export default Registration;
