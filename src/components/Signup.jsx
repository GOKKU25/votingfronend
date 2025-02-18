

import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Paper, Link } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Validation functions
  const validateName = (name) => /^[a-zA-Z\s]+$/.test(name); // Allows only letters and spaces
  const validateMobile = (mobile) => /^\d{10}$/.test(mobile); // Ensures only 10 digits
  const validateGmail = (email) => /^[a-z0-9._%+-]+@gmail\.com$/.test(email); // Gmail specific regex

  const handleRegister = async (e) => {
    e.preventDefault();

    // Clear any previous errors
    setError('');

    // Validate fields
    if (!name || !validateName(name)) {
      setError("Please enter a valid name (letters and spaces only).");
      return;
    }
    if (!mobileNumber || !validateMobile(mobileNumber)) {
      setError("Please enter a valid mobile number (10 digits).");
      return;
    }
    if (!email || !validateGmail(email)) {
      setError("Please enter a valid Gmail address.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    try {
      await axios.post('https://votingbackend-favz.onrender.com/api/auth/signup', { email, password, name, mobileNumber, role: 'voter' });
      alert('Registration successful');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong.');
    }
  };

  return (
    <Box
      display="flex"
      height="105vh"
      alignItems="center"
      justifyContent="flex-start"
      sx={{
        backgroundImage: "url('/images/ballots.png')", // Set full-screen background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingLeft: "10%",
      }}
    >
      {/* Left Side with Form */}
      <Box display="flex" justifyContent="center" alignItems="center">
        <Paper elevation={6} sx={{ p: 3, width: 330, borderRadius: 3, backgroundColor: 'white' }}>
          <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
            Signup Form
          </Typography>
          {error && <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>{error}</Typography>}
          <form onSubmit={handleRegister}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Mobile Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            <TextField
              label="Email ID"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              type="password"
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            
            <Button type="submit" variant="outlined" fullWidth sx={{ mt: 2, py: 1.2, backgroundColor: '#00796b', color: 'white' }}>
              Signup
            </Button>
            <Box textAlign="center" sx={{ mt: 2 }}>
              <Link href="#" onClick={() => navigate('/')} sx={{ display: 'block', mb: 1, textDecorationColor: "#00796b", color: "#00796b" }}>
                Already registered? Back to login
              </Link>
            </Box>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default Signup;
