// import React from 'react';
// import { Button, Typography, Box, Paper } from '@mui/material';
// import QRCode from 'react-qr-code';
// import { useNavigate } from 'react-router-dom';

// const Openvoting = () => {
//   const navigate = useNavigate(); 
//   const value = 'http://localhost:5173/dashboard'; 

//   const handleNavigate = () => {
//     navigate('/dashboard'); 
//   };
 
//   return (
//     <Box
//       sx={{
//         height: '100vh',
//         width: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'start',
//         backgroundImage: 'url("/public/images/ballots.png")', 
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         padding: 0,
//         marginTop: '-50px',
//         marginLeft: '80px'
//       }}
//     >
//       <Paper
//         sx={{
//           padding: 4,
//           borderRadius: 2,
//           boxShadow: 3,
//           textAlign: 'center',
//           backgroundColor: 'rgba(255, 255, 255, 0.7)', 
//           maxWidth: 400,
//           width: '100%',
//         }}
//       >
//         <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
//           Scan the QR Code to Vote
//         </Typography>

//         <QRCode value={value} size={256} /><br/>
        
//         <Button
//           variant="contained"
//           color="primary"
//           sx={{
//             mt: 2,
//             padding: '10px 20px',
//             fontSize: '16px',
//             borderRadius: '8px',
//             textTransform: 'none',
//             '&:hover': {
//               backgroundColor: '#2c6fff',
//             },
//           }}
//           onClick={handleNavigate} 
//         >
//           Vote via link
//         </Button>
//       </Paper>
//     </Box>
//   );
// };

// export default Openvoting;
import React from 'react'

const Openvoting = () => {
  return (
    <div>Openvoting</div>
  )
}

export default Openvoting