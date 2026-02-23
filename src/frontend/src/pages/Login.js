import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  useMediaQuery,
  useTheme,
  Grid,
  Alert,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff, Person, Badge } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [activeRole, setActiveRole] = useState(null);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleLogin = (role) => {
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email');
      return;
    }

    // Mock authentication
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      email: formData.email,
      name: formData.name || formData.email.split('@')[0],
      role: role
    };

    login(userData, role);
    navigate(role === 'government' ? '/gov-dashboard' : '/user-dashboard');
  };

  const RoleCard = ({ role, icon: Icon, title, description, color }) => (
    <Card
      onClick={() => setActiveRole(role)}
      sx={{
        cursor: 'pointer',
        transition: 'all 0.3s',
        transform: activeRole === role ? 'scale(1.05)' : 'scale(1)',
        border: activeRole === role ? `3px solid ${color}` : '1px solid #ddd',
        backgroundColor: activeRole === role ? `${color}20` : '#fff',
        height: '100%'
      }}
    >
      <CardContent sx={{ textAlign: 'center' }}>
        <Box sx={{ fontSize: 48, mb: 2 }}>
          <Icon sx={{ fontSize: 48, color }} />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            variant="h3"
            sx={{
              color: '#fff',
              fontWeight: 'bold',
              mb: 2,
              fontSize: isMobile ? 28 : 40
            }}
          >
            💧 JalNexus
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)' }}>
            Smart Water Quality Monitoring System
          </Typography>
        </Box>

        {!activeRole ? (
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6}>
              <RoleCard
                role="user"
                icon={Person}
                title="User Login"
                description="Monitor your household water quality in real-time"
                color="#2196F3"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <RoleCard
                role="government"
                icon={Badge}
                title="Government Login"
                description="Access authorized data and compliance reports"
                color="#F44336"
              />
            </Grid>
          </Grid>
        ) : (
          <Paper
            elevation={10}
            sx={{
              p: isMobile ? 3 : 4,
              borderRadius: 2,
              backgroundColor: '#fff'
            }}
          >
            <Button
              onClick={() => setActiveRole(null)}
              sx={{ mb: 2, color: '#667eea' }}
            >
              ← Back
            </Button>

            <Typography
              variant="h5"
              sx={{
                mb: 3,
                fontWeight: 'bold',
                color: activeRole === 'government' ? '#F44336' : '#2196F3'
              }}
            >
              {activeRole === 'government' ? '🏛️' : '👤'} {activeRole === 'government' ? 'Government Official' : 'User'} Login
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {activeRole === 'user' && (
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  variant="outlined"
                />
              )}

              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                variant="outlined"
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  py: 1.5,
                  backgroundColor: activeRole === 'government' ? '#F44336' : '#2196F3',
                  '&:hover': {
                    backgroundColor: activeRole === 'government' ? '#D32F2F' : '#1976D2'
                  }
                }}
                onClick={() => handleLogin(activeRole)}
              >
                Login as {activeRole === 'government' ? 'Official' : 'User'}
              </Button>

              <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
                Demo Credentials: any email + any password
              </Typography>
            </Box>
          </Paper>
        )}

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            © 2026 JalNexus | Water Quality Monitoring System
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
