import React, { useState, useEffect } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import { alertApi } from '../services/apiService';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        const data = await alertApi.getAlerts(100);
        setAlerts(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleAcknowledge = async (alertId) => {
    try {
      await alertApi.acknowledgeAlert(alertId);
      setAlerts(alerts.map(a => 
        a.id === alertId ? { ...a, is_acknowledged: true } : a
      ));
    } catch (err) {
      console.error('Error acknowledging alert:', err);
    }
  };

  const getSeverityColor = (severity) => {
    const colors = {
      'critical': 'error',
      'high': 'error',
      'medium': 'warning',
      'low': 'info'
    };
    return colors[severity] || 'default';
  };

  const getAlertTypeLabel = (type) => {
    const labels = {
      'ph_high': '📈 High pH',
      'ph_low': '📉 Low pH',
      'tds_high': '💧 High TDS',
      'turbidity_high': '🌫️ High Turbidity',
      'anomaly': '⚠️ Anomaly'
    };
    return labels[type] || type;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          🚨 Alerts & Notifications
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Water quality alerts and anomalies
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Error loading alerts: {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : alerts.length === 0 ? (
        <Alert severity="success">
          ✓ No alerts! Water quality is good.
        </Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Message</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Severity</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alerts.map((alert) => (
                <TableRow key={alert.id} sx={{ '&:hover': { backgroundColor: '#fafafa' } }}>
                  <TableCell>{getAlertTypeLabel(alert.alert_type)}</TableCell>
                  <TableCell>{alert.message}</TableCell>
                  <TableCell>
                    <Chip
                      label={alert.severity}
                      size="small"
                      color={getSeverityColor(alert.severity)}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={alert.is_acknowledged ? 'Acknowledged' : 'Pending'}
                      size="small"
                      color={alert.is_acknowledged ? 'default' : 'error'}
                    />
                  </TableCell>
                  <TableCell>
                    {!alert.is_acknowledged && (
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleAcknowledge(alert.id)}
                      >
                        Acknowledge
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Alerts;
