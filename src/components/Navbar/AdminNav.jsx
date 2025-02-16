
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Button, Container, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const AdminNav = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

 


  const settings = [
    { label: 'ADD-VOTING', path: '/addvoting' },
    { label: 'OPEN-VOTING', path: '/Create_openvoting' },
    { label: 'VOTINGS', path: '/adminvoting' },
    { label: 'ABOUT', tooltip: 'The Online Voting System is a secure and efficient full-stack web application designed to simplify and modernize election processes.' },
    { label: 'CONTACT', tooltip: 'Contact no: 7025224881, Email: OVC@gmail.com' },
    { label: 'LOGOUT', action: () => { handleLogout(); } }
  ];

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  
  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');  // Assuming navigate is defined somewhere else, like useNavigate from react-router
    window.location.replace('/'); // This will reload the page and redirect to the homepage
  };
  
  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#00796b' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo for all screens */}
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <img src="/images/logo-removebg-preview.png" alt="Logo" style={{ height: '50px' }} />
            </Box>

            {/* Mobile Menu */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              >
                {settings.map(({ label, path, action }) => (
                  <MenuItem key={label} onClick={() => { handleCloseNavMenu(); action ? action() : navigate(path); }}>
                    <Typography textAlign="center">{label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, justifyContent: 'flex-end' }}>
              {settings.map(({ label, path, action, tooltip }) => (
                <Tooltip key={label} title={hovered === label ? tooltip || '' : ''} arrow>
                  <Button
                    sx={{ color: 'white', px: 2 }}
                    onMouseEnter={() => setHovered(label)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => action ? action() : navigate(path)}
                  >
                    {label}
                  </Button>
                </Tooltip>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Ensuring content does not get under the navbar */}
      <Box sx={{ pt: '54px' }} />
    </>
  );
};

export default AdminNav;