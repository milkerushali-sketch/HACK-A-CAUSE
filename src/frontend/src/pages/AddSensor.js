import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { sensorApi } from '../services/apiService';

const AddSensor = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    device_type: 'kitchen_tap'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await sensorApi.createSensor(formData);
      setSuccess(true);
      setFormData({ name: '', location: '', device_type: 'kitchen_tap' });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          ➕ Add New Sensor
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Register a new water quality monitoring device
        </Typography>
      </Box>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          ✓ Sensor added successfully!
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Error: {error}
        </Alert>
      )}

      <Paper sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Sensor Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Main Tank Sensor"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Overhead tank - Roof"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Device Type</InputLabel>
                <Select
                  name="device_type"
                  value={formData.device_type}
                  onChange={handleChange}
                  label="Device Type"
                >
                  <MenuItem value="overhead_tank">Overhead Tank</MenuItem>
                  <MenuItem value="underground_tank">Underground Tank</MenuItem>
                  <MenuItem value="kitchen_tap">Kitchen Tap</MenuItem>
                  <MenuItem value="storage_bucket">Storage Bucket</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{ py: 1.5 }}
              >
                {loading ? 'Adding...' : 'Add Sensor'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddSensor;
