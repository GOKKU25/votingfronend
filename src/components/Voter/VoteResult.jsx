import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Alert } from '@mui/material';

const VoteResult = () => {
  const [votings, setVotings] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchVotingData = async () => {
      try {
        const response = await axios.get('https://votingbackend-favz.onrender.com/api/voting/all');
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
          {votings.map((voting) => {
            const winner = voting.options.reduce((max, option) => (option.votes > max.votes ? option : max), { votes: 0 });
            const allZeroVotes = voting.options.every(option => option.votes === 0);
            
            return !allZeroVotes ? (
              <Box
                key={voting._id}
                sx={{
                  width: 250,
                  height: 400,
                  padding: 3,
                  border: '1px solid #ddd',
                  borderRadius: 2,
                  boxShadow: 3,
                  backgroundColor: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="h6">{voting.category}</Typography>
                <Box
                  sx={{
                    flex: 1,
                    overflowY: 'auto',
                    marginTop: 2,
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
                <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold', color: 'green' }}>
                  Winner: {winner.text} ({winner.votes} votes)
                </Typography>
              </Box>
            ) : null;
          })}
        </Box>
      )}
    </Box>
  );
};

export default VoteResult;
