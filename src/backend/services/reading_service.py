"""
Reading management and data analysis service
"""
from typing import Optional, List, Dict, Any
from models import Reading, ReadingCreate
from services.firebase_service import FirebaseService
from services.sensor_service import SensorService
from datetime import datetime, timedelta
import uuid

firebase_service = FirebaseService()

class ReadingService:
    """Manage sensor readings"""
    
    @staticmethod
    def save_reading(reading_data: ReadingCreate) -> Dict[str, Any]:
        """Save new reading and analyze quality"""
        reading = {
            'sensor_id': reading_data.sensor_id,
            'ph_level': reading_data.ph_level,
            'tds_level': reading_data.tds_level,
            'turbidity': reading_data.turbidity,
            'temperature': reading_data.temperature,
            'is_anomaly': False,
            'anomaly_score': 0.0,
            'quality_status': ReadingService._assess_quality(
                reading_data.ph_level,
                reading_data.tds_level,
                reading_data.turbidity
            ),
            'created_at': (reading_data.timestamp or datetime.now()).isoformat()
        }
        
        reading_id = firebase_service.save_reading(reading)
        reading['id'] = reading_id
        
        # Update sensor's last reading time
        SensorService.update_sensor_last_reading(reading_data.sensor_id)
        
        return reading
    
    @staticmethod
    def _assess_quality(ph: float, tds: float, turbidity: float) -> str:
        """Assess water quality based on readings"""
        if ph < 6.5 or ph > 8.5 or tds > 500 or turbidity > 5:
            return "poor"
        elif ph < 7.0 or ph > 8.0 or tds > 300 or turbidity > 2:
            return "fair"
        return "good"
    
    @staticmethod
    def get_readings(sensor_id: str, limit: int = 100) -> List[Dict[str, Any]]:
        """Get readings for a sensor"""
        return firebase_service.get_readings(sensor_id, limit)
    
    @staticmethod
    def get_readings_by_time_range(
        sensor_id: str,
        hours: int = 24
    ) -> List[Dict[str, Any]]:
        """Get readings within time range"""
        readings = firebase_service.get_readings(sensor_id, limit=1000)
        now = datetime.now()
        cutoff = now - timedelta(hours=hours)
        
        filtered = []
        for reading in readings:
            try:
                created = datetime.fromisoformat(reading.get('created_at', ''))
                if created >= cutoff:
                    filtered.append(reading)
            except:
                pass
        
        return filtered
    
    @staticmethod
    def get_statistics(sensor_id: str, hours: int = 24) -> Dict[str, Any]:
        """Calculate statistics for sensor"""
        readings = ReadingService.get_readings_by_time_range(sensor_id, hours)
        
        if not readings:
            return {
                'reading_count': 0,
                'avg_ph': 0,
                'avg_tds': 0,
                'avg_turbidity': 0,
                'anomaly_count': 0
            }
        
        ph_levels = [r.get('ph_level', 7.0) for r in readings if 'ph_level' in r]
        tds_levels = [r.get('tds_level', 0) for r in readings if 'tds_level' in r]
        turbidity_levels = [r.get('turbidity', 0) for r in readings if 'turbidity' in r]
        anomalies = sum(1 for r in readings if r.get('is_anomaly', False))
        
        return {
            'reading_count': len(readings),
            'avg_ph': sum(ph_levels) / len(ph_levels) if ph_levels else 0,
            'avg_tds': sum(tds_levels) / len(tds_levels) if tds_levels else 0,
            'avg_turbidity': sum(turbidity_levels) / len(turbidity_levels) if turbidity_levels else 0,
            'anomaly_count': anomalies,
            'min_ph': min(ph_levels) if ph_levels else 0,
            'max_ph': max(ph_levels) if ph_levels else 14,
            'min_tds': min(tds_levels) if tds_levels else 0,
            'max_tds': max(tds_levels) if tds_levels else 0,
            'min_turbidity': min(turbidity_levels) if turbidity_levels else 0,
            'max_turbidity': max(turbidity_levels) if turbidity_levels else 0,
        }
