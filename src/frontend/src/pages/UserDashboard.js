import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  TextareaAutosize,
  Chip,
  LinearProgress,
  Alert
} from '@mui/material';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import reportIcon from '@mui/icons-material/Report';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const UserDashboard = () => {
  const [openComplaint, setOpenComplaint] = useState(false);
  const [complaintData, setComplaintData] = useState({
    subject: '',
    description: '',
    sensorId: '1'
  });

  // Mock sensor data
  const [sensorData] = useState([
    { time: '12:00', ph: 7.2, tds: 300, turbidity: 2 },
    { time: '13:00', ph: 7.3, tds: 320, turbidity: 2.5 },
    { time: '14:00', ph: 7.1, tds: 310, turbidity: 2.2 },
    { time: '15:00', ph: 7.4, tds: 330, turbidity: 3 },
    { time: '16:00', ph: 7.2, tds: 315, turbidity: 2.8 }
  ]);

  const [sensors] = useState([
    { id: 1, name: 'Overhead Tank', status: 'healthy', ph: 7.2, tds: 300, turbidity: 2, temp: 28 },
    { id: 2, name: 'Kitchen Tap', status: 'healthy', ph: 7.3, tds: 280, turbidity: 1.5, temp: 27 },
    { id: 3, name: 'Storage Tank', status: 'warning', ph: 6.8, tds: 420, turbidity: 4, temp: 30 }
  ]);

  const [complaints] = useState([
    { id: 1, date: '2026-02-20', subject: 'Discolored water', status: 'resolved' },
    { id: 2, date: '2026-02-18', subject: 'Strange odor', status: 'in-progress' },
    { id: 3, date: '2026-02-15', subject: 'High TDS levels', status: 'acknowledged' }
  ]);

  const handleSubmitComplaint = () => {
    console.log('Complaint submitted:', complaintData);
    setOpenComplaint(false);
    setComplaintData({ subject: '', description: '', sensorId: '1' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return '#2e7d32';
      case 'warning':
        return '#f57c00';
      case 'critical':
        return '#c62828';
      default:
        return '#1976d2';
    }
  };

  const getStatusDescription = (status) => {
    switch (status) {
      case 'healthy':
        return 'All parameters normal';
      case 'warning':
        return 'Some parameters out of range';
      case 'critical':
        return 'Multiple critical alerts';
      default:
        return 'Unknown status';
    }
  };

  const StatCard = ({ title, value, unit, icon, trend }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {value}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {unit}
          </Typography>
        </Box>
        {trend && (
          <Typography
            variant="caption"
            sx={{
              color: trend > 0 ? '#2e7d32' : '#c62828',
              fontWeight: 'bold',
              mt: 1,
              display: 'block'
            }}
          >
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% vs last hour
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          👤 Your Water Quality Dashboard
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Real-time monitoring of your household water sources
        </Typography>
      </Box>

      {/* Alert Banner */}
      <Alert severity="warning" sx={{ mb: 3 }}>
        ⚠️ Storage Tank shows elevated TDS levels. Recommend filtration maintenance.
      </Alert>

      {/* Active Sensors */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        🔌 Active Water Sources
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {sensors.map((sensor) => (
          <Grid item xs={12} sm={6} md={4} key={sensor.id}>
            <Card sx={{ borderLeft: `5px solid ${getStatusColor(sensor.status)}` }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {sensor.name}
                  </Typography>
                  <Chip
                    label={sensor.status.toUpperCase()}
                    color={sensor.status === 'healthy' ? 'success' : 'warning'}
                    size="small"
                  />
                </Box>

                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 2 }}>
                  {getStatusDescription(sensor.status)}
                </Typography>

                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="textSecondary">pH Level</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{sensor.ph}</Typography>
                    <LinearProgress variant="determinate" value={(sensor.ph / 14) * 100} sx={{ mt: 0.5 }} />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="textSecondary">TDS (ppm)</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{sensor.tds}</Typography>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min((sensor.tds / 500) * 100, 100)}
                      color={sensor.tds > 500 ? 'error' : 'primary'}
                      sx={{ mt: 0.5 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="textSecondary">Turbidity (NTU)</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{sensor.turbidity}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="textSecondary">Temperature</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{sensor.temp}°C</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Water Quality Trend */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
          📈 Water Quality Trend (Last 5 Hours)
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sensorData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="ph" stroke="#8884d8" strokeWidth={2} />
            <Line type="monotone" dataKey="tds" stroke="#82ca9d" strokeWidth={2} />
            <Line type="monotone" dataKey="turbidity" stroke="#ffc658" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      <Grid container spacing={3}>
        {/* Complaints */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                📋 Recent Complaints
              </Typography>
              <Button
                variant="contained"
                size="small"
                onClick={() => setOpenComplaint(true)}
              >
                + File New
              </Button>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {complaints.map((complaint) => (
                <Card key={complaint.id} sx={{ backgroundColor: '#f9f9f9' }}>
                  <CardContent sx={{ pb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {complaint.subject}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
                      {complaint.date}
                    </Typography>
                    <Chip
                      label={complaint.status}
                      color={
                        complaint.status === 'resolved' ? 'success' :
                        complaint.status === 'in-progress' ? 'warning' : 'default'
                      }
                      size="small"
                    />
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Reports & Documents */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              📄 Reports & Certificates
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {[
                { title: 'Monthly Water Quality Report - January', date: '2026-01-28' },
                { title: 'Sensor Maintenance Certificate', date: '2026-01-15' },
                { title: 'Safety Compliance Report', date: '2025-12-20' }
              ].map((report, idx) => (
                <Card key={idx} sx={{ backgroundColor: '#e3f2fd' }}>
                  <CardContent sx={{ pb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {report.title}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {report.date}
                        </Typography>
                      </Box>
                      <Button size="small" startIcon={<FileDownloadIcon />}>
                        Download
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Monthly Stats */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
          📊 Monthly Statistics
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <StatCard title="Avg pH" value="7.2" unit="" trend={2} />
          </Grid>
          <Grid item xs={6} sm={3}>
            <StatCard title="Avg TDS" value="312" unit="ppm" trend={-5} />
          </Grid>
          <Grid item xs={6} sm={3}>
            <StatCard title="Safe Days" value="28/31" unit="days" trend={15} />
          </Grid>
          <Grid item xs={6} sm={3}>
            <StatCard title="Alerts" value="2" unit="issues" trend={-50} />
          </Grid>
        </Grid>
      </Paper>

      {/* File Complaint Dialog */}
      <Dialog open={openComplaint} onClose={() => setOpenComplaint(false)} maxWidth="sm" fullWidth>
        <DialogTitle>📝 File a Complaint</DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            fullWidth
            label="Subject"
            margin="dense"
            value={complaintData.subject}
            onChange={(e) => setComplaintData({ ...complaintData, subject: e.target.value })}
            placeholder="Briefly describe the issue"
          />
          <TextField
            fullWidth
            label="Water Source"
            select
            margin="dense"
            value={complaintData.sensorId}
            onChange={(e) => setComplaintData({ ...complaintData, sensorId: e.target.value })}
          >
            {sensors.map((sensor) => (
              <option key={sensor.id} value={sensor.id}>
                {sensor.name}
              </option>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Detailed Description"
            multiline
            rows={4}
            margin="dense"
            value={complaintData.description}
            onChange={(e) => setComplaintData({ ...complaintData, description: e.target.value })}
            placeholder="Provide detailed information about the issue"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenComplaint(false)}>Cancel</Button>
          <Button onClick={handleSubmitComplaint} variant="contained" color="primary">
            Submit Complaint
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserDashboard;
