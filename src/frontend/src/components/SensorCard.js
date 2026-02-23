import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Box,
  LinearProgress,
  Chip
} from '@mui/material';
import {
  OpacityIcon,
  ThermostatIcon,
  TrendingUpIcon
} from '@mui/icons-material';

const SensorCard = ({ sensor, stats }) => {
  const getStatusColor = (status) => {
    if (!status) return 'default';
    if (status === 'good') return 'success';
    if (status === 'fair') return 'warning';
    return 'error';
  };

  const getStatusLabel = (status) => {
    const labels = {
      'good': '✓ Good',
      'fair': '⚠ Fair',
      'poor': '✗ Poor'
    };
    return labels[status] || 'Unknown';
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title={sensor?.name || 'Sensor'}
        subheader={sensor?.location || 'Unknown Location'}
        avatar={
          <Chip
            label={sensor?.status === 'active' ? 'Active' : 'Inactive'}
            size="small"
            color={sensor?.status === 'active' ? 'success' : 'error'}
            variant="outlined"
          />
        }
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {/* pH Level */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="textSecondary">
                pH Level
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {stats?.avg_ph?.toFixed(1) || '-'} / 14
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(stats?.avg_ph || 7) / 14 * 100}
              sx={{ height: 8, borderRadius: 4 }}
            />
            <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5, display: 'block' }}>
              Range: {stats?.min_ph?.toFixed(1) || '-'} - {stats?.max_ph?.toFixed(1) || '-'}
            </Typography>
          </Grid>

          {/* TDS Level */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="textSecondary">
                TDS (ppm)
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {stats?.avg_tds?.toFixed(0) || '-'} / 500
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={Math.min((stats?.avg_tds || 0) / 500 * 100, 100)}
              sx={{ height: 8, borderRadius: 4 }}
            />
            <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5, display: 'block' }}>
              Range: {stats?.min_tds?.toFixed(0) || '-'} - {stats?.max_tds?.toFixed(0) || '-'}
            </Typography>
          </Grid>

          {/* Turbidity */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="textSecondary">
                Turbidity (NTU)
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {stats?.avg_turbidity?.toFixed(2) || '-'} / 5
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={Math.min((stats?.avg_turbidity || 0) / 5 * 100, 100)}
              sx={{ height: 8, borderRadius: 4 }}
            />
            <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5, display: 'block' }}>
              Range: {stats?.min_turbidity?.toFixed(2) || '-'} - {stats?.max_turbidity?.toFixed(2) || '-'}
            </Typography>
          </Grid>

          {/* Quality Status and Anomalies */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                label={`Readings: ${stats?.reading_count || 0}`}
                variant="outlined"
                size="small"
              />
              <Chip
                label={`Anomalies: ${stats?.anomaly_count || 0}`}
                variant="outlined"
                color={stats?.anomaly_count > 0 ? 'error' : 'success'}
                size="small"
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SensorCard;
