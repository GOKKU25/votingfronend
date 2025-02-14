import React from 'react';
import { Box, Typography, Container, Link, IconButton, Grid } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#00796b',
        color: '#fff',
        py: 3,
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md={4} textAlign={{ xs: 'center', md: 'left' }}>
            <Typography variant="h6" gutterBottom>
              Created by : Gokul Santhosh
            </Typography>
            <Typography variant="body2">&copy; 2025. All rights reserved.</Typography>
          </Grid>

          <Grid item xs={12} md={4} textAlign="center">
            <Typography variant="body1">Contact:</Typography>
            <Link href="mailto:gokulsanthosh125@gmail.com" color="inherit" underline="hover">
              gokulsanthosh125@gmail.com
            </Link>
          </Grid>

          <Grid item xs={12} md={4} textAlign={{ xs: 'center', md: 'right' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', md: 'flex-end', gap: 1.5 }}>
              <IconButton color="inherit" href="https://wa.me/7025224881" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon fontSize="large" />
              </IconButton>
              <IconButton color="inherit" href="https://www.instagram.com/gokku2_3" target="_blank" rel="noopener noreferrer">
                <InstagramIcon fontSize="large" />
              </IconButton>
              <IconButton color="inherit" href="https://twitter.com/your-profile" target="_blank" rel="noopener noreferrer">
                <TwitterIcon fontSize="large" />
              </IconButton>
              <IconButton color="inherit" href="https://www.facebook.com/GokulSanthosh" target="_blank" rel="noopener noreferrer">
                <FacebookIcon fontSize="large" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
