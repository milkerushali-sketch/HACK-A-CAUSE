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
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';
import AddSensor from './pages/AddSensor';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import GovernmentDashboard from './pages/GovernmentDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';

const Layout = ({ children, unreadAlerts = 0 }) => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, role, logout } = useAuth();

  const getNavItems = () => {
    if (role === 'government') {
      return [
        { label: 'Gov Dashboard', path: '/gov-dashboard', icon: '🏛️' },
        { label: 'Verification', path: '/gov-dashboard', icon: '✅' }
      ];
    }
    return [
      { label: 'Dashboard', path: '/user-dashboard', icon: '📊' },
      { label: 'Alerts', path: '/alerts', icon: '🚨' },
      { label: 'Add Sensor', path: '/add-sensor', icon: '➕' }
    ];
  };

  const navItems = getNavItems();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    logout();
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
      <ListItem
        button
        onClick={() => {
          handleLogout();
          setDrawerOpen(false);
        }}
        sx={{ backgroundColor: '#ffebee' }}
      >
        <ListItemText primary="🚪 Logout" />
      </ListItem>
    </List>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar 
        position="sticky" 
        sx={{ 
          backgroundColor: role === 'government' ? '#D32F2F' : '#1976d2'
        }}
      >
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
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            💧 JalNexus
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

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ display: isMobile ? 'none' : 'block' }}>
              {user?.name || user?.email}
            </Typography>
            <IconButton color="inherit" sx={{ ml: 1 }} onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
            {!isMobile && (
              <IconButton color="inherit">
                <Badge badgeContent={unreadAlerts} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            )}
          </Box>
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
            💧 JalNexus © 2026 | Water Quality Monitoring System
          </Typography>
          <Typography variant="caption" color="textSecondary" align="center" sx={{ display: 'block', mt: 1 }}>
            Made with ❤️ for clean water in every home
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// User Role-based Route
const UserRoute = ({ children }) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!user || role !== 'user') {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      {children}
    </Layout>
  );
};

// Government Role-based Route
const GovernmentRoute = ({ children }) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!user || role !== 'government') {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      {children}
    </Layout>
  );
};

function AppRoutes() {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/gov-dashboard" element={<GovernmentDashboard />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/add-sensor" element={<AddSensor />} />
        <Route path="/" element={<Navigate to={user ? "/user-dashboard" : "/login"} replace />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
