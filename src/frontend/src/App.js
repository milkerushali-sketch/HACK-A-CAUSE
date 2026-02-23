import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  Menu,
  MenuItem,
  Badge,
  IconButton,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';
import AddSensor from './pages/AddSensor';

const Layout = ({ children, unreadAlerts = 0 }) => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const navItems = [
    { label: 'Dashboard', path: '/', icon: '📊' },
    { label: 'Alerts', path: '/alerts', icon: '🚨' },
    { label: 'Add Sensor', path: '/add-sensor', icon: '➕' }
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerContent = (
    <List sx={{ pt: 2 }}>
      {navItems.map((item) => (
        <ListItem
          button
          component={Link}
          to={item.path}
          key={item.path}
          onClick={() => setDrawerOpen(false)}
          sx={{
            backgroundColor: location.pathname === item.path ? '#f0f0f0' : 'transparent',
            color: location.pathname === item.path ? 'primary.main' : 'inherit'
          }}
        >
          <ListItemText 
            primary={`${item.icon} ${item.label}`}
            sx={{ fontWeight: location.pathname === item.path ? 'bold' : 'normal' }}
          />
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="sticky" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'bold'
            }}
          >
            💧 AquaGuard
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 3 }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  color="inherit"
                  sx={{
                    borderBottom: location.pathname === item.path ? '2px solid white' : 'none',
                    pb: location.pathname === item.path ? 1 : 0
                  }}
                >
                  {item.icon} {item.label}
                </Button>
              ))}
            </Box>
          )}

          <IconButton color="inherit" sx={{ ml: 2 }}>
            <Badge badgeContent={unreadAlerts} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {isMobile && (
        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
          <Box sx={{ width: 250 }}>
            {drawerContent}
          </Box>
        </Drawer>
      )}

      <Box component="main" sx={{ flexGrow: 1, py: 2 }}>
        {children}
      </Box>

      <Box
        component="footer"
        sx={{
          backgroundColor: '#f5f5f5',
          py: 3,
          borderTop: '1px solid #ddd',
          mt: 4
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="textSecondary" align="center">
            💧 AquaGuard © 2026 | Water Quality Monitoring System
          </Typography>
          <Typography variant="caption" color="textSecondary" align="center" sx={{ display: 'block', mt: 1 }}>
            Made with ❤️ for clean water in every home
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/add-sensor" element={<AddSensor />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
