import React, { useEffect, useState } from 'react';

const Openvote = () => {
  const [openVotings, setOpenVotings] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch open voting data from the backend when the component is mounted
    const fetchOpenVotings = async () => {
      try {
        const response = await fetch('/api/open-voting');
        if (!response.ok) {
          throw new Error('Failed to fetch voting data');
        }
        const data = await response.json();
        setOpenVotings(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchOpenVotings();
  }, []);

  const handleVote = async (votingId, option) => {
    // You can send the vote to the backend here
    console.log(`Voting on "${votingId}" with option "${option}"`);
    // Example of how to send the vote (you will need to add your POST logic here)
  };

  return (
    <div>
      <h2>Open Voting</h2>
      
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      
      {openVotings.length === 0 ? (
        <p>No open voting available</p>
      ) : (
        <div>
          {openVotings.map((voting) => (
            <div key={voting._id}>
              <h3>{voting.category}</h3>
              <ul>
                {voting.options.map((option, index) => (
                  <li key={index}>
                    <button onClick={() => handleVote(voting._id, option)}>
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Openvote;
