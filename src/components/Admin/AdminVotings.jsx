import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import { Box, Button, Typography, Alert } from '@mui/material'; // Material UI components

const AdminVotings = () => {
  const [votings, setVotings] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate for routing

  // Fetch voting data when the component mounts
  useEffect(() => {
    const fetchVotingData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/voting/all');
        const sortedVotings = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setVotings(sortedVotings);
      } catch (error) {
        console.error('Error fetching voting data:', error);
        if (error.response) {
          setErrorMessage(`Error fetching voting data: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
        } else if (error.request) {
          setErrorMessage('Error fetching voting data: No response from the server.');
        } else {
          setErrorMessage(`Error fetching voting data: ${error.message}`);
        }
      }
    };

    fetchVotingData();
  }, []);

  // Handle the delete voting button click
  const handleDeleteVoting = async (votingId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/voting/${votingId}`);
      if (response.status === 200) {
        setVotings(votings.filter((voting) => voting._id !== votingId));
        alert('Voting category deleted successfully.');
      } else {
        setErrorMessage(`Error deleting voting: ${response.status} - ${response.data.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting voting:', error);
      if (error.response) {
        // The response was received, but the server returned an error status
        setErrorMessage(`Error deleting voting: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        // The request was made, but no response was received
        setErrorMessage('Error deleting voting: No response from the server.');
      } else {
        // Something else happened
        setErrorMessage(`Error deleting voting: ${error.message}`);
      }
    }
  };

  return (
    <Box sx={{ textAlign: 'center', padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Voting Categories
      </Typography>

      {errorMessage && (
        <Alert severity="error" sx={{ marginBottom: 3 }}>
          {errorMessage}
        </Alert>
      )}

      {votings.length === 0 ? (
        <Typography>No voting categories available.</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3, marginTop: 3 }}>
          {votings.map((voting) => (
            <Box
              key={voting._id}
              sx={{
                width: 250,  // Reduced card width
                height: 400, // Increased card height slightly for better visibility
                padding: 3,
                border: '1px solid #ddd',
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              <Typography variant="h6">{voting.category}</Typography>
              <Box
                sx={{
                  flex: 1,  // Allow content to grow and fill available space
                  overflowY: 'auto', // Enable vertical scrolling inside this container
                  marginTop: 2,
                  marginBottom: 10, // Add some space at the bottom for the buttons
                }}
              >
                {voting.options.map((option, index) => (
                  <Box key={index} sx={{ marginBottom: 2 }}>
                    <Typography variant="body1">{option.text}</Typography>
                    <Typography variant="body2" sx={{ color: '#555' }}>
                      ({option.votes || 0} votes)
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Box sx={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
                <Button
                  onClick={() => handleDeleteVoting(voting._id)}
                  variant="contained"
                  color="error"
                  sx={{ width: '100%' }}
                >
                  Delete Voting
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default AdminVotings;
