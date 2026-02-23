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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DownloadIcon from '@mui/icons-material/Download';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const GovernmentDashboard = () => {
  const [openVerify, setOpenVerify] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportData, setReportData] = useState({
    chlorineLevel: '',
    testDate: '',
    notes: ''
  });

  // Mock data for government dashboard
  const [diseappData] = useState([
    { date: 'Jan', disclosed: 45, official: 42, difference: 3 },
    { date: 'Feb', disclosed: 52, official: 50, difference: 2 },
    { date: 'Mar', disclosed: 48, official: 48, difference: 0 },
    { date: 'Apr', disclosed: 61, official: 58, difference: 3 },
    { date: 'May', disclosed: 55, official: 57, difference: -2 }
  ]);

  const [households] = useState([
    { id: 1, area: 'Downtown', sensors: 12, complaints: 2, status: 'active', lastUpdate: '2 mins ago' },
    { id: 2, area: 'Suburban', sensors: 8, complaints: 0, status: 'active', lastUpdate: '5 mins ago' },
    { id: 3, area: 'Rural', sensors: 5, complaints: 1, status: 'inactive', lastUpdate: '1 hour ago' },
    { id: 4, area: 'Industrial', sensors: 15, complaints: 3, status: 'active', lastUpdate: '1 min ago' }
  ]);

  const [reports] = useState([
    { id: 101, household: 'Downtown - Block A', date: '2026-02-20', status: 'pending' },
    { id: 102, household: 'Suburban - Zone B', date: '2026-02-19', status: 'verified' },
    { id: 103, household: 'Industrial - Sector C', date: '2026-02-18', status: 'pending' }
  ]);

  const handleVerifyReport = (report) => {
    setSelectedReport(report);
    setOpenVerify(true);
  };

  const handleSubmitVerification = () => {
    console.log('Verified report:', selectedReport, reportData);
    setOpenVerify(false);
    setReportData({ chlorineLevel: '', testDate: '', notes: '' });
  };

  const StatCard = ({ title, value, icon, color }) => (
    <Card sx={{ backgroundColor: color, color: '#fff' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {title}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1 }}>
              {value}
            </Typography>
          </Box>
          <Box sx={{ fontSize: 40 }}>{icon}</Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          🏛️ Government Portal
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Water Quality Data Verification & Compliance Dashboard
        </Typography>
      </Box>

      {/* Top Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Active Areas" value="12" icon="🗺️" color="#1976d2" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Verified Reports" value="48" icon="✅" color="#2e7d32" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Pending Verification" value="7" icon="⏳" color="#f57c00" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Discrepancies" value="3" icon="⚠️" color="#c62828" />
        </Grid>
      </Grid>

      {/* Discrepancy Analysis */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
          official vs Household pH Levels
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={diseappData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="official" stroke="#F44336" strokeWidth={2} name="Official Data" />
            <Line type="monotone" dataKey="disclosed" stroke="#2196F3" strokeWidth={2} name="Household Data" />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      <Grid container spacing={3}>
        {/* Household Monitoring */}
        <Grid item xs={12} lg={7}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              📍 Area Coverage & Status
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell>Area</TableCell>
                    <TableCell align="center">Sensors</TableCell>
                    <TableCell align="center">Complaints</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {households.map((household) => (
                    <TableRow key={household.id}>
                      <TableCell>{household.area}</TableCell>
                      <TableCell align="center">{household.sensors}</TableCell>
                      <TableCell align="center">{household.complaints}</TableCell>
                      <TableCell align="center">
                        <Chip
                          label={household.status}
                          color={household.status === 'active' ? 'success' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Pending Reports */}
        <Grid item xs={12} lg={5}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              🔍 Pending Verifications
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {reports.map((report) => (
                <Card key={report.id} sx={{ backgroundColor: '#f9f9f9' }}>
                  <CardContent sx={{ pb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                      {report.household}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" sx={{ mb: 1 }}>
                      Date: {report.date}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      <Chip
                        label={report.status}
                        color={report.status === 'verified' ? 'success' : 'default'}
                        size="small"
                      />
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleVerifyReport(report)}
                        disabled={report.status === 'verified'}
                      >
                        {report.status === 'verified' ? 'Verified ✓' : 'Verify'}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Verification Dialog */}
      <Dialog open={openVerify} onClose={() => setOpenVerify(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <VerifiedUserIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Verify Household Report
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {selectedReport?.household}
          </Typography>
          <TextField
            fullWidth
            label="Chlorine Level (mg/L)"
            margin="dense"
            value={reportData.chlorineLevel}
            onChange={(e) => setReportData({ ...reportData, chlorineLevel: e.target.value })}
          />
          <TextField
            fullWidth
            label="Test Date"
            type="date"
            margin="dense"
            InputLabelProps={{ shrink: true }}
            value={reportData.testDate}
            onChange={(e) => setReportData({ ...reportData, testDate: e.target.value })}
          />
          <TextField
            fullWidth
            label="Official Notes"
            multiline
            rows={3}
            margin="dense"
            value={reportData.notes}
            onChange={(e) => setReportData({ ...reportData, notes: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenVerify(false)}>Cancel</Button>
          <Button onClick={handleSubmitVerification} variant="contained" color="success">
            Verify & Approve
          </Button>
        </DialogActions>
      </Dialog>

      {/* Export Section */}
      <Paper sx={{ p: 3, mt: 4, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          📊 Export Reports
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="contained" startIcon={<DownloadIcon />}>
            Download Monthly Report
          </Button>
          <Button variant="outlined" startIcon={<DownloadIcon />}>
            Export Discrepancy Data
          </Button>
          <Button variant="outlined" startIcon={<DownloadIcon />}>
            Verified Complaints
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default GovernmentDashboard;
