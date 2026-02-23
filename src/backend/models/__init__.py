from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

# Sensor Models
class SensorCreate(BaseModel):
    name: str
    location: str
    device_type: str  # "overhead_tank", "underground_tank", "kitchen_tap", "storage_bucket"
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class Sensor(SensorCreate):
    id: str
    created_at: datetime
    last_reading_at: Optional[datetime] = None
    status: str = "active"  # active, inactive, error


# Reading Models
class ReadingCreate(BaseModel):
    sensor_id: str
    ph_level: float  # 0-14
    tds_level: float  # mg/L (parts per million)
    turbidity: float  # NTU (0-5 is clean)
    temperature: Optional[float] = None
    timestamp: Optional[datetime] = None


class Reading(ReadingCreate):
    id: str
    is_anomaly: bool = False
    anomaly_score: Optional[float] = None
    quality_status: str = "good"  # good, fair, poor
    created_at: datetime


# Alert Models
class AlertCreate(BaseModel):
    sensor_id: str
    alert_type: str  # "ph_high", "ph_low", "tds_high", "turbidity_high", "anomaly"
    message: str
    severity: str = "medium"  # low, medium, high, critical
    reading_id: Optional[str] = None


class Alert(AlertCreate):
    id: str
    is_acknowledged: bool = False
    acknowledged_at: Optional[datetime] = None
    notified_via: List[str] = []  # ["sms", "email", "push"]
    created_at: datetime


# Anomaly Models
class AnomalyDetectionRequest(BaseModel):
    sensor_id: Optional[str] = None
    hours: int = 24


class AnomalyStats(BaseModel):
    total_readings: int
    anomalies_detected: int
    anomaly_percentage: float
    last_anomaly_time: Optional[datetime] = None


# Statistics Models
class SensorStats(BaseModel):
    sensor_id: str
    reading_count: int
    avg_ph: float
    avg_tds: float
    avg_turbidity: float
    anomaly_count: int
    last_reading: Optional[Reading] = None


class SystemStats(BaseModel):
    total_sensors: int
    total_readings: int
    total_anomalies: int
    active_alerts: int
    processing_time_ms: float
