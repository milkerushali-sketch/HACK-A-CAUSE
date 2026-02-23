"""
Sensor management service
"""
from typing import Optional, List, Dict, Any
from models import Sensor, SensorCreate
from services.firebase_service import FirebaseService
from datetime import datetime
import uuid

firebase_service = FirebaseService()

class SensorService:
    """Manage sensor operations"""
    
    @staticmethod
    def create_sensor(sensor_data: SensorCreate) -> Dict[str, Any]:
        """Create new sensor"""
        data = {
            'name': sensor_data.name,
            'location': sensor_data.location,
            'device_type': sensor_data.device_type,
            'latitude': sensor_data.latitude,
            'longitude': sensor_data.longitude,
            'status': 'active',
            'created_at': datetime.now().isoformat(),
            'last_reading_at': None
        }
        sensor_id = firebase_service.create_sensor(data)
        data['id'] = sensor_id
        return data
    
    @staticmethod
    def get_sensor(sensor_id: str) -> Optional[Dict[str, Any]]:
        """Get sensor by ID"""
        sensor = firebase_service.get_sensor(sensor_id)
        if sensor:
            sensor['id'] = sensor_id
        return sensor
    
    @staticmethod
    def list_sensors() -> List[Dict[str, Any]]:
        """List all sensors"""
        return firebase_service.get_all_sensors()
    
    @staticmethod
    def update_sensor_status(sensor_id: str, status: str):
        """Update sensor status"""
        firebase_service.update_sensor(sensor_id, {
            'status': status,
            'updated_at': datetime.now().isoformat()
        })
    
    @staticmethod
    def update_sensor_last_reading(sensor_id: str):
        """Update sensor's last reading timestamp"""
        firebase_service.update_sensor(sensor_id, {
            'last_reading_at': datetime.now().isoformat()
        })
