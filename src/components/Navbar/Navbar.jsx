import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Container, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'; 

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [hovered, setHovered] = useState(null);
  const settings = ['ABOUT', 'CONTACT', 'LOGIN !'];

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

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
      <AppBar position="fixed" sx={{ backgroundColor: '#00796b', zIndex: 1100 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}>
              <img src="/images/logo-removebg-preview.png" alt="Logo" style={{ height: '40px' }} />
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
              <img src="/images/logo-removebg-preview.png" alt="Logo" style={{ height: '50px' }} />
            </Box>

            {/* Mobile Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Desktop Menu */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, justifyContent: 'flex-end' }}>
              {settings.map((setting) => (
                <Tooltip key={setting} title={hovered === setting ? getHoverText(setting) : ''}>
                  <Typography
                    sx={{
                      my: 2,
                      mx: 2,
                      color: 'white',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                    onMouseEnter={() => setHovered(setting)}
                    onMouseLeave={() => setHovered(null)}
                    component={setting === 'LOGIN !' ? Link : 'div'}
                    to={setting === 'LOGIN !' ? '/' : undefined}
                  >
                    {setting}
                  </Typography>
                </Tooltip>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ marginTop: '64px' }} /> {/* Prevents content from being covered by fixed navbar */}
    </>
  );
};

export default Navbar;