import { Avatar, Box, Card, CardContent, Typography, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('logintoken');
    
    if (token) {
      // Fetch the user data from the backend
      axios
        .get('http://localhost:5000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Send token for authentication
          },
        })
        .then((response) => {
          setUserData(response.data); // Store the user data
        })
        .catch((error) => {
          console.error('Error fetching profile data:', error);
        });
    }
  }, []);

  if (!userData) {
    return <Typography align="center" variant="h6" sx={{ color: '#000000' }}>Loading...</Typography>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '90vh', // Reduced minHeight to move it upwards
        backgroundColor: '#f4f4f4', // White background with a subtle light grey tone
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 500,
          borderRadius: 8,
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)', // Adding a strong shadow effect
          padding: 2,
          backgroundColor: '#ffffff', // White background for the card
        }}
      >
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            alt="User Avatar"
            src="/images/profile.png" // Placeholder for avatar
            sx={{
              width: 120,
              height: 120,
              marginBottom: 7,
              border: '4px solidrgb(3, 21, 38)', // Darker border for a subtle touch
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.2)', // Adding shadow to the avatar for depth
            }}
          />
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2c3e50', marginBottom: 1 }}>
            {userData.name}
          </Typography>
          <Typography variant="h6" sx={{ color: '#7f8c8d', marginBottom: 3 }}>
            Voter ID: {userData._id} {/* Voter-specific field */}
          </Typography>

          <Grid container spacing={3} sx={{ marginTop: 2 }}>
            <Grid item xs={6}>
              <Typography variant="body2" sx={{ color: '#7f8c8d', fontSize: '16px' }}>
                <strong>Mobile:</strong> {userData.mobileNumber}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" sx={{ color: '#7f8c8d', fontSize: '16px' }}>
                <strong>Email:</strong> {userData.email}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
