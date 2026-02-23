"""
Utility functions
"""
from datetime import datetime, timedelta
from typing import Dict, List, Any

def validate_ph_level(ph: float) -> bool:
    """Validate pH level (0-14)"""
    return 0 <= ph <= 14

def validate_tds_level(tds: float) -> bool:
    """Validate TDS level"""
    return tds >= 0

def validate_turbidity(turbidity: float) -> bool:
    """Validate turbidity"""
    return turbidity >= 0

def assess_water_quality(ph: float, tds: float, turbidity: float) -> str:
    """Assess water quality based on readings"""
    if ph < 6.5 or ph > 8.5 or tds > 500 or turbidity > 5:
        return "poor"
    elif ph < 7.0 or ph > 8.0 or tds > 300 or turbidity > 2:
        return "fair"
    return "good"

def get_date_range(hours: int = 24) -> tuple:
    """Get date range for queries"""
    now = datetime.now()
    start = now - timedelta(hours=hours)
    return start, now

def format_reading_for_display(reading: Dict[str, Any]) -> Dict[str, Any]:
    """Format reading for API response"""
    return {
        'id': reading.get('id'),
        'sensor_id': reading.get('sensor_id'),
        'ph_level': round(reading.get('ph_level', 0), 2),
        'tds_level': round(reading.get('tds_level', 0), 1),
        'turbidity': round(reading.get('turbidity', 0), 2),
        'quality_status': reading.get('quality_status'),
        'is_anomaly': reading.get('is_anomaly', False),
        'anomaly_score': round(reading.get('anomaly_score', 0), 4) if reading.get('anomaly_score') else None,
        'created_at': reading.get('created_at')
    }

def generate_sensor_report(sensor_id: str, hours: int = 24) -> Dict[str, Any]:
    """Generate report for sensor"""
    from services.reading_service import ReadingService
    from services.sensor_service import SensorService
    from services.anomaly_service import AnomalyDetectionService
    
    sensor = SensorService.get_sensor(sensor_id)
    stats = ReadingService.get_statistics(sensor_id, hours)
    anomalies = AnomalyDetectionService.get_anomaly_statistics(sensor_id, hours)
    
    return {
        'sensor': sensor,
        'reading_stats': stats,
        'anomaly_stats': anomalies,
        'generated_at': datetime.now().isoformat()
    }
