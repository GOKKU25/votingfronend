import React from 'react';

const VotersList = () => {
  const voters = [
    { studentId: 'S101', name: 'John Doe', email: 'john.doe@example.com', mobile: '123-456-7890' },
    { studentId: 'S102', name: 'Jane Smith', email: 'jane.smith@example.com', mobile: '234-567-8901' },
    { studentId: 'S103', name: 'Sam Brown', email: 'sam.brown@example.com', mobile: '345-678-9012' },
    // Add more voter data as needed
  ];

  return (
    <div>
      <h2>Voters List</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Voter Name</th>
            <th>Email</th>
            <th>Mobile No</th>
          </tr>
        </thead>
        <tbody>
          {voters.map((voter) => (
            <tr key={voter.studentId}>
              <td>{voter.studentId}</td>
              <td>{voter.name}</td>
              <td>{voter.email}</td>
              <td>{voter.mobile}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VotersList;
