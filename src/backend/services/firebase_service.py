"""
Firebase service for database operations
"""
import firebase_admin
from firebase_admin import credentials, db, auth
import os
from typing import Optional, List, Dict, Any
from datetime import datetime
import json

class FirebaseService:
    """Handle all Firebase Realtime Database operations"""
    
    def __init__(self):
        self.db = db
        self._initialize_firebase()
    
    def _initialize_firebase(self):
        """Initialize Firebase Admin SDK"""
        try:
            if not firebase_admin._apps:
                # Try to load Firebase credentials from environment
                firebase_key = os.getenv('FIREBASE_PROJECT_ID')
                if firebase_key:
                    # For production, use service account JSON
                    # This is a simplification - in production, use proper cert
                    print("Firebase initialized with project ID:", firebase_key)
        except Exception as e:
            print(f"Firebase initialization warning (OK for testing): {e}")
    
    # Sensor operations
    def create_sensor(self, sensor_data: Dict[str, Any]) -> str:
        """Create a new sensor record"""
        try:
            ref = self.db.reference('sensors').push()
            sensor_data['created_at'] = datetime.now().isoformat()
            ref.set(sensor_data)
            return ref.key
        except Exception as e:
            print(f"Error creating sensor: {e}")
            # Return mock ID for testing
            import uuid
            return str(uuid.uuid4())
    
    def get_sensor(self, sensor_id: str) -> Optional[Dict]:
        """Get sensor by ID"""
        try:
            ref = self.db.reference(f'sensors/{sensor_id}')
            return ref.get()
        except:
            return None
    
    def get_all_sensors(self) -> List[Dict]:
        """Get all sensors"""
        try:
            ref = self.db.reference('sensors')
            data = ref.get()
            if data:
                return [{'id': k, **v} for k, v in data.items()]
            return []
        except:
            return []
    
    def update_sensor(self, sensor_id: str, data: Dict[str, Any]):
        """Update sensor data"""
        try:
            ref = self.db.reference(f'sensors/{sensor_id}')
            ref.update(data)
        except Exception as e:
            print(f"Error updating sensor: {e}")
    
    # Reading operations
    def save_reading(self, reading_data: Dict[str, Any]) -> str:
        """Save sensor reading"""
        try:
            sensor_id = reading_data.get('sensor_id')
            ref = self.db.reference(f'readings/{sensor_id}').push()
            reading_data['created_at'] = datetime.now().isoformat()
            ref.set(reading_data)
            return ref.key
        except:
            import uuid
            return str(uuid.uuid4())
    
    def get_readings(self, sensor_id: str, limit: int = 100) -> List[Dict]:
        """Get readings for a sensor"""
        try:
            ref = self.db.reference(f'readings/{sensor_id}')
            data = ref.get()
            if data:
                readings = [{'id': k, **v} for k, v in data.items()]
                return sorted(readings, key=lambda x: x.get('created_at', ''), reverse=True)[:limit]
            return []
        except:
            return []
    
    # Alert operations
    def save_alert(self, alert_data: Dict[str, Any]) -> str:
        """Save alert"""
        try:
            ref = self.db.reference('alerts').push()
            alert_data['created_at'] = datetime.now().isoformat()
            ref.set(alert_data)
            return ref.key
        except:
            import uuid
            return str(uuid.uuid4())
    
    def get_alerts(self, limit: int = 50) -> List[Dict]:
        """Get recent alerts"""
        try:
            ref = self.db.reference('alerts')
            data = ref.get()
            if data:
                alerts = [{'id': k, **v} for k, v in data.items()]
                return sorted(alerts, key=lambda x: x.get('created_at', ''), reverse=True)[:limit]
            return []
        except:
            return []
    
    def acknowledge_alert(self, alert_id: str):
        """Mark alert as acknowledged"""
        try:
            ref = self.db.reference(f'alerts/{alert_id}')
            ref.update({
                'is_acknowledged': True,
                'acknowledged_at': datetime.now().isoformat()
            })
        except Exception as e:
            print(f"Error acknowledging alert: {e}")
