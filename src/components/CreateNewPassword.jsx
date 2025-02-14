import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const CreateNewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let formIsValid = true;

    if (!newPassword) {
      setNewPasswordError("New Password is required");
      formIsValid = false;
    } else if (newPassword.length < 6) {
      setNewPasswordError("Password must be at least 6 characters");
      formIsValid = false;
    } else {
      setNewPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is required");
      formIsValid = false;
    } else if (confirmPassword !== newPassword) {
      setConfirmPasswordError("Passwords do not match");
      formIsValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (formIsValid) {
      console.log("New Password:", newPassword);
      console.log("Confirm Password:", confirmPassword);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundImage: "url('/images/ballots.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: "5vw",
      }}
    >
     
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h5"
          align="left"
          sx={{ mb: 2, fontWeight: "bold", color: "#00796b" }}
        >
          Create New Password
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="New Password"
            type="password"
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          {newPasswordError && (
            <Typography color="error" sx={{ mb: 2 }}>
              {newPasswordError}
            </Typography>
          )}

          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          {confirmPasswordError && (
            <Typography color="error" sx={{ mb: 2 }}>
              {confirmPasswordError}
            </Typography>
          )}

          <Button
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            sx={{ mb: 2, backgroundColor: "#00796b" }}
          >
            Reset Password
          </Button>
        </form>

        <Typography sx={{ textAlign: "left", mt: 2 }}>
          <Link to="/" style={{ color: "#00796b", textDecoration: "none" }}>
            Back to Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default CreateNewPassword;
