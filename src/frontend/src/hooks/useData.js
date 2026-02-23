// Custom hook for fetching sensor data
import { useState, useEffect } from 'react';
import { sensorApi, readingApi } from '../services/apiService';

export const useSensors = () => {
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSensors = async () => {
      try {
        setLoading(true);
        const data = await sensorApi.getAllSensors();
        setSensors(data || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching sensors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSensors();
    // Refresh every 30 seconds
    const interval = setInterval(fetchSensors, 30000);
    return () => clearInterval(interval);
  }, []);

  return { sensors, loading, error };
};

// Custom hook for fetching readings
export const useReadings = (sensorId, hours = 24) => {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sensorId) return;

    const fetchReadings = async () => {
      try {
        setLoading(true);
        const data = await readingApi.getReadingsByTimeRange(sensorId, hours);
        setReadings(data || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching readings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReadings();
    // Refresh every 10 seconds
    const interval = setInterval(fetchReadings, 10000);
    return () => clearInterval(interval);
  }, [sensorId, hours]);

  return { readings, loading, error };
};

// Custom hook for sensor stats
export const useSensorStats = (sensorId, hours = 24) => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sensorId) return;

    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await sensorApi.getSensorStats(sensorId, hours);
        setStats(data || {});
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [sensorId, hours]);

  return { stats, loading, error };
};
