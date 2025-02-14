import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

const Result = ({ votingData }) => {
  const [chartData, setChartData] = useState({});
  const [isVotingFinished, setIsVotingFinished] = useState(false);

  // Simulate voting completion (you can replace this with your own logic)
  useEffect(() => {
    // Assume voting has ended after 5 seconds for demo purposes
    setTimeout(() => {
      setIsVotingFinished(true);
      processVotingResults();
    }, 5000); // Change this as per your logic
  }, []);

  // Process voting data to set up chart data
  const processVotingResults = () => {
    const candidates = votingData.candidates;
    const votes = candidates.map(candidate => candidate.votes);

    const chartLabels = candidates.map(candidate => candidate.name);
    const chartData = {
      labels: chartLabels,
      datasets: [
        {
          data: votes,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40'],
        },
      ],
    };
    setChartData(chartData);
  };

  return (
    <div>
      {isVotingFinished ? (
        <>
          <h2>Voting Results</h2>
          <div>
            {votingData.candidates.map(candidate => (
              <p key={candidate.id}>
                {candidate.name}: {candidate.votes} votes
              </p>
            ))}
          </div>
          <Pie data={chartData} />
        </>
      ) : (
        <h2>Voting in Progress...</h2>
      )}
    </div>
  );
};

export default Result;
