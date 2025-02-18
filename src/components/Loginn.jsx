import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Loginn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  // function handleLogin() {
  //   axios
  //     .post('https://votingbackend-favz.onrender.com/api/auth/', form)
  //     .then((res) => {
  //       alert(res.data.message);
  //       if (res.data.token) {
  //         // Store token and role in sessionStorage
  //         sessionStorage.setItem('logintoken', res.data.token);
  //         sessionStorage.setItem('role', res.data.role);

  //         // Store email in sessionStorage if login is successful
  //         sessionStorage.setItem('userEmail', form.email); // Store email

  //         // Redirect based on the role
  //         if (res.data.role === 'admin') {
  //           navigate('/addvoting');
  //         } else if (res.data.role === 'voter') {
  //           navigate('/dashboard');
  //         }
  //       } else {
  //         navigate('/'); // Redirect if no token found
  //       }
  //     })
  //     .catch(() => {
  //       alert('Invalid login');
  //     });
  // }

  function handleLogin() {
    axios
      .post('https://votingbackend-favz.onrender.com/api/auth/', form)
      .then((res) => {
        alert(res.data.message);
        if (res.data.token) {
          // Store token and role in sessionStorage
          sessionStorage.setItem('logintoken', res.data.token);
          sessionStorage.setItem('role', res.data.role);
  
          // Clear previous user votes from sessionStorage
          sessionStorage.removeItem('userVotes'); // Clear previous votes
  
          // Store email in sessionStorage if login is successful
          sessionStorage.setItem('userEmail', form.email); // Store email
  
          // Redirect based on the role
          if (res.data.role === 'admin') {
            navigate('/addvoting');
          } else if (res.data.role === 'voter') {
            navigate('/dashboard');
          }
        } else {
          navigate('/'); // Redirect if no token found
        }
      })
      .catch(() => {
        alert('Invalid login');
      });
  }
  




  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid
        item
        xs={12}
        sx={{
          background: 'url(/images/ballots.png) no-repeat center center',
          backgroundSize: 'cover',
          height: '100vh',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      />
      <Grid
        item
        xs={12} md={5}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 350,
            mx: 'auto',
            p: 2,
            borderRadius: 2,
            boxShadow: 3,
            background: '#fff',
          }}
        >
          <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 'bold', color: '#00796b' }}>
            LOGIN
          </Typography>

          <TextField
            fullWidth
            label="Email ID"
            variant="outlined"
            placeholder="Enter registered email ID"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            placeholder="Enter password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            sx={{ mb: 2 }}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleLogin}
            sx={{ mb: 2, backgroundColor: '#00796b' }}
          >
            LOGIN
          </Button>

          <Typography sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Link to={'/forgot-password'} style={{ color: '#00796b', textDecoration: 'none' }}>
              Forgot password?
            </Link>
          </Typography>

          <Typography align="center" variant="body2">
            Don’t have a registered email ID?
          </Typography>
          <br />

          <Link to={'/signup'}>
            <Typography
              align="center"
              variant="body2"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#00796b',
              }}
            >
              Sign up
            </Typography>
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Loginn;
