import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state to disable button
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email) {
      setEmailError('Email is required');
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email is invalid');
      return;
    }

    setEmailError('');
    setMessage(''); // Reset the message before the request
    setLoading(true); // Set loading state to true

    try {
      // Make the POST request to your backend to send the password to the email
      const response = await axios.post('http://localhost:5000/api/reset-password', { email });

      if (response.status === 200) {
        setMessage('A password has been sent to your email!');
        setTimeout(() => {
          navigate('/'); // Redirect back to login page after 3 seconds
        }, 3000);
        setEmail(''); // Clear email after successful request
      }
    } catch (error) {
      console.error('Error sending reset link:', error.response ? error.response.data : error.message); // Log the full error message
      setMessage('Error sending password. Please try again.');
    } finally {
      setLoading(false); // Set loading state back to false after request
    }
  };

  return (
    <Box
      display="flex"
      height="100vh"
      alignItems="center"
      justifyContent="flex-start"
      sx={{
        backgroundImage: "url('/public/images/ballots.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingLeft: "10%",
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        <Paper elevation={6} sx={{ p: 3, width: 330, borderRadius: 3, backgroundColor: 'white' }}>
          <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 'bold', color: '#00796b' }}>
            Forgot Password
          </Typography>
          <form onSubmit={handleEmailSubmit}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              placeholder="Enter registered email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            {emailError && <Typography color="error" sx={{ mb: 2 }}>{emailError}</Typography>}
            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              sx={{ mb: 2, backgroundColor: '#00796b' }}
              disabled={loading} // Disable the button while loading
            >
              {loading ? 'Sending...' : 'Send Password'}
            </Button>
          </form>

          {/* Show message after submitting */}
          {message && (
            <Typography align="center" sx={{ mb: 2, color: message.includes('Error') ? 'red' : 'green', opacity: 0.8 }}>
              {message}
            </Typography>
          )}

          <Typography sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Link to="/" style={{ color: '#00796b', textDecoration: 'none' }}>Back to Login</Link>
          </Typography>

          <Typography align="center" variant="body2">Don’t have an account?</Typography>
          <br />
          <Link to="/signup" style={{ color: '#00796b', textDecoration: 'none' }}>
            <Typography align="center" variant="body2">
              Sign Up
            </Typography>
          </Link>
        </Paper>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
