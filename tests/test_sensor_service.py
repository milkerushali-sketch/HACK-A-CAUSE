"""
Unit tests for sensor service
"""
import pytest
from src.backend.services.sensor_service import SensorService
from src.backend.models import SensorCreate

def test_sensor_creation():
    """Test sensor creation"""
    sensor_data = SensorCreate(
        name="Test Sensor",
        location="Test Location",
        device_type="overhead_tank"
    )
    result = SensorService.create_sensor(sensor_data)
    assert result['name'] == "Test Sensor"
    assert result['status'] == "active"

def test_sensor_list():
    """Test sensor listing"""
    sensors = SensorService.list_sensors()
    assert isinstance(sensors, list)

def test_update_sensor_status():
    """Test updating sensor status"""
    # This would require a valid sensor ID
    # In real tests, use fixtures and mocks
    pass
