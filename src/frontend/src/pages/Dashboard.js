import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import { useSensors, useReadings, useSensorStats } from '../hooks/useData';
import SensorCard from '../components/SensorCard';
import { systemApi } from '../services/apiService';

const Dashboard = () => {
  const { sensors, loading, error } = useSensors();
  const [systemStats, setSystemStats] = useState({});
  const [backendHealth, setBackendHealth] = useState('checking');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const health = await systemApi.healthCheck();
        setBackendHealth(health.status === 'healthy' ? 'ok' : 'error');
      } catch (err) {
        setBackendHealth('error');
      }
    };

    const fetchStats = async () => {
      try {
        const stats = await systemApi.getStats();
        setSystemStats(stats);
      } catch (err) {
        console.error('Error fetching system stats:', err);
      }
    };

    checkHealth();
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          💧 Water Quality Dashboard
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Real-time monitoring of your household water quality
        </Typography>
      </Box>

      {/* Backend Health Alert */}
      {backendHealth !== 'ok' && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          ⚠️ Backend connection issue. Some features may not work. Is the backend running?
        </Alert>
      )}

      {/* System Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {systemStats.total_sensors || 0}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Active Sensors
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {systemStats.total_readings || 0}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Total Readings
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'error.main' }}>
              {systemStats.total_anomalies || 0}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Anomalies Detected
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
              {systemStats.active_alerts || 0}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Active Alerts
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Sensors Grid */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Error loading sensors: {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : sensors.length === 0 ? (
        <Alert severity="info">
          No sensors found. Start the IoT simulator to generate sensor data!
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {sensors.map((sensor) => (
            <Grid item xs={12} sm={6} md={4} key={sensor.id}>
              <DashboardSensorCard sensor={sensor} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

// Sub-component for sensor card with stats
const DashboardSensorCard = ({ sensor }) => {
  const { stats } = useSensorStats(sensor.id);
  return <SensorCard sensor={sensor} stats={stats} />;
};

export default Dashboard;
