// API service for backend communication
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Error handler
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export const sensorApi = {
  // Get all sensors
  getAllSensors: async () => {
    try {
      const response = await apiClient.get('/api/sensors');
      return response.data;
    } catch (error) {
      console.error('Error fetching sensors:', error);
      return [];
    }
  },

  // Get sensor by ID
  getSensorById: async (sensorId) => {
    try {
      const response = await apiClient.get(`/api/sensors/${sensorId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sensor:', error);
      return null;
    }
  },

  // Create sensor
  createSensor: async (sensorData) => {
    try {
      const response = await apiClient.post('/api/sensors', sensorData);
      return response.data;
    } catch (error) {
      console.error('Error creating sensor:', error);
      throw error;
    }
  },

  // Get sensor statistics
  getSensorStats: async (sensorId, hours = 24) => {
    try {
      const response = await apiClient.get(`/api/sensors/${sensorId}/stats`, {
        params: { hours }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching sensor stats:', error);
      return {};
    }
  }
};

export const readingApi = {
  // Get readings for sensor
  getReadings: async (sensorId, limit = 100) => {
    try {
      const response = await apiClient.get(`/api/readings/sensor/${sensorId}`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching readings:', error);
      return [];
    }
  },

  // Get readings by time range
  getReadingsByTimeRange: async (sensorId, hours = 24) => {
    try {
      const response = await apiClient.get(`/api/readings/sensor/${sensorId}/range`, {
        params: { hours }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching readings:', error);
      return [];
    }
  },

  // Submit reading
  createReading: async (readingData) => {
    try {
      const response = await apiClient.post('/api/readings', readingData);
      return response.data;
    } catch (error) {
      console.error('Error submitting reading:', error);
      throw error;
    }
  }
};

export const anomalyApi = {
  // Detect anomalies
  detectAnomalies: async (sensorId, hours = 24) => {
    try {
      const response = await apiClient.post('/api/anomalies/detect', null, {
        params: { sensor_id: sensorId, hours }
      });
      return response.data;
    } catch (error) {
      console.error('Error detecting anomalies:', error);
      return { details: [] };
    }
  },

  // Get anomaly stats
  getAnomalyStats: async (sensorId, hours = 24) => {
    try {
      const response = await apiClient.get('/api/anomalies/stats', {
        params: { sensor_id: sensorId, hours }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching anomaly stats:', error);
      return {};
    }
  }
};

export const alertApi = {
  // Get alerts
  getAlerts: async (limit = 50) => {
    try {
      const response = await apiClient.get('/api/alerts', {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching alerts:', error);
      return [];
    }
  },

  // Get unacknowledged alerts
  getUnacknowledgedAlerts: async (limit = 50) => {
    try {
      const response = await apiClient.get('/api/alerts/unacknowledged', {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching alerts:', error);
      return [];
    }
  },

  // Acknowledge alert
  acknowledgeAlert: async (alertId) => {
    try {
      const response = await apiClient.put(`/api/alerts/${alertId}/acknowledge`);
      return response.data;
    } catch (error) {
      console.error('Error acknowledging alert:', error);
      throw error;
    }
  }
};

export const systemApi = {
  // Health check
  healthCheck: async () => {
    try {
      const response = await apiClient.get('/api/health');
      return response.data;
    } catch (error) {
      console.error('Error checking health:', error);
      return { status: 'error' };
    }
  },

  // Get stats
  getStats: async () => {
    try {
      const response = await apiClient.get('/api/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      return {};
    }
  }
};

export default apiClient;
