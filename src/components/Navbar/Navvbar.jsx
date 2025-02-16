


import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Container,
  Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const Navvbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  const settings = ['DASHBOARD', 'ABOUT', 'CONTACT', 'VOTE-RESULT', 'PROFILE', 'LOGOUT'];

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);


  


  const handleNavClick = (setting) => {
    setAnchorElNav(null); // Close menu on click
  
    if (setting === 'LOGOUT') {
      handleLogout(); // Directly call handleLogout
    } else if (setting === 'PROFILE') {
      navigate('/voter-profile');
    } else if (setting === 'VOTE-RESULT') {
      navigate('/vote-result');
    } else if (setting === 'DASHBOARD') {
      navigate('/dashboard');
    }
  };
  
  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
    window.location.replace('/'); // This will reload the page after logout
  };
  


  const getHoverText = (setting) => {
    if (setting === 'ABOUT') {
      return 'The Online Voting System is a secure and efficient full-stack web application designed to simplify and modernize election processes.';
    } else if (setting === 'CONTACT') {
      return 'Contact no: 7025224881, Email: OVC@gmail.com';
    }
    return '';
  };

  return (
    <>
      {/* Navbar */}
      <AppBar position="fixed" sx={{ backgroundColor: '#00796b' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img src="/images/logo-removebg-preview.png" alt="Logo" style={{ height: '50px' }} />
            </Box>

            {/* Mobile Menu */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton color="inherit" onClick={handleOpenNavMenu}>
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleNavClick(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Desktop Menu */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              {settings.map((setting) => (
                <Tooltip key={setting} title={hovered === setting ? getHoverText(setting) : ''}>
                  <Button
                    sx={{ color: 'white' }}
                    onMouseEnter={() => setHovered(setting)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => handleNavClick(setting)}
                  >
                    {setting}
                  </Button>
                </Tooltip>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Add padding to avoid content overlap */}
      <Box sx={{ paddingTop: '60px' }} />  
    </>
  );
};

export default Navvbar;
