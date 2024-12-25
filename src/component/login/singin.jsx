import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import "./Signin.css";
import axios from "axios";

const Signin = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [message, setMessage] = useState("");

  const toggleSignup = () => {
    setShowSignup(!showSignup);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    appType: "ecommerce",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e, isSignup) => {
    e.preventDefault();
    try {
      const data = {
        email: formData.email,
        password: formData.password,
        appType: formData.appType,
        ...(isSignup && { name: formData.name }), // Include name only for signup
      };
      const url = isSignup
        ? "https://academics.newtonschool.co/api/v1/user/signup"
        : "https://academics.newtonschool.co/api/v1/user/login";

      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          projectID: "zieod0ew1cmn",
        },
      });

      console.log("Response Data:", response.data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.data.user.name);
      localStorage.setItem("email", response.data.data.user.email);
      const successMessage = isSignup
        ? "Registration Successfully"
        : "Login Successfully";
      setMessage(successMessage);
      alert(successMessage);
      window.location.href = "/";
    } catch (error) {
      const errorMessage = error.response?.message || " Email or Passoword can not blank";
      setMessage(errorMessage);
      alert(errorMessage);
      console.log("Error:", error);
    }
  };

  const loginContent = () => (
    <div className="signin-container" style={{ backgroundColor: "red" }}>
      <form onSubmit={(e) => handleSubmit(e, false)} className="signin-form">
        <TextField
          label="Email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          size="small"
          style={{ backgroundColor: "#e0e0e0" }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          size="small"
          style={{ backgroundColor: "#e0e0e0" }}
        />
        <Button type="submit" variant="contained" color="primary">
          Sign In
        </Button>
        <div>
          <Button
            className="signup-btn"
            onClick={toggleSignup}
            variant="text"
            color="info"
          >
            Don't have an Account? Signup
          </Button>
          <br />
          <Typography
            className="auth-error-msg"
            variant="body2"
            color="error"
            align="center"
          >
            {message}
          </Typography>
        </div>
      </form>
    </div>
  );

  const signUpContent = () => (
    <div className="signin-container" style={{ backgroundColor: "red" }}>
      <form onSubmit={(e) => handleSubmit(e, true)} className="signin-form">
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Sign Up
        </Button>
        <div>
          <Button
            className="signup-btn"
            onClick={toggleSignup}
            variant="text"
            color="info"
          >
            Already have an Account? Sign In
          </Button>
          <br />
          <Typography
            className="auth-error-msg"
            variant="body2"
            color="error"
            align="center"
          >
            {message}
          </Typography>
        </div>
      </form>
    </div>
  );

  return <div>{showSignup ? signUpContent() : loginContent()}</div>;
};

export default Signin;


//rahul anand code