import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, RadioGroup, FormControlLabel, Radio, Button, Alert, CircularProgress } from '@mui/material';

const Dashboard = () => {
  const [votings, setVotings] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [userVotes, setUserVotes] = useState([]);
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const userEmail = sessionStorage.getItem('userEmail'); // Get the user email from session storage

  useEffect(() => {
    const fetchVotings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/voting/all');
        setVotings(response.data);
      } catch (error) {
        console.error('Error fetching voting categories', error);
        setErrorMessage('Failed to load voting categories');
      }
    };

    fetchVotings();

    const savedVotes = JSON.parse(sessionStorage.getItem('userVotes')) || [];
    setUserVotes(savedVotes);
  }, []);

  const handleVoteSubmit = async (votingId) => {
    if (!selectedOption) {
      alert('Please select an option to vote!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/voting/submit', {
        votingId,
        selectedOption,
        userEmail, // Pass user email here to identify the user
      });

      if (response.status === 201) {
        setVoteSubmitted(true);
        const updatedUserVotes = [...userVotes, votingId];
        setUserVotes(updatedUserVotes);
        sessionStorage.setItem('userVotes', JSON.stringify(updatedUserVotes));

        alert('Vote submitted successfully!');

        setTimeout(() => {
          setVoteSubmitted(false); // Reset the voteSubmitted state after the success message
          navigate('/dashboard'); // Redirect to dashboard
        }, 2000); // 2 seconds delay
      } else {
        setErrorMessage('Failed to submit the vote.');
      }
    } catch (error) {
      console.error('Error submitting vote:', error.response || error);
      setErrorMessage('Error submitting vote: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h3" gutterBottom align="center">Voting Dashboard</Typography>

      {votings.length === 0 ? (
        <Alert severity="info">No voting categories available</Alert>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {votings.map((voting) => (
            <Grid item xs={12} sm={6} md={4} key={voting._id}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h5" component="div" gutterBottom>{voting.category}</Typography>

                  <RadioGroup
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    disabled={userVotes.includes(voting._id)} // Disable voting if user already voted
                  >
                    {voting.options.map((option) => (
                      <FormControlLabel
                        key={option.text}
                        value={option.text}
                        control={<Radio />}
                        label={option.text}
                      />
                    ))}
                  </RadioGroup>
                </CardContent>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleVoteSubmit(voting._id)}
                  disabled={voteSubmitted || userVotes.includes(voting._id)} // Disable if already voted
                  sx={{ mt: 'auto', backgroundColor: '#00796b', '&:hover': { backgroundColor: '#004d40' } }}
                >
                  {voteSubmitted ? <CircularProgress size={24} /> : 'Submit Vote'}
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {errorMessage && (
        <Alert severity="error" sx={{ mt: 2 }}>{errorMessage}</Alert>
      )}
    </div>
  );
};

export default Dashboard;
