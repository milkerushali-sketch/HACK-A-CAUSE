"""
Anomaly Detection API routes
"""
from fastapi import APIRouter, HTTPException, Query
from typing import List
from services.anomaly_service import AnomalyDetectionService
from services.sensor_service import SensorService

router = APIRouter(prefix="/api/anomalies", tags=["anomalies"])

@router.post("/detect")
async def detect_anomalies(sensor_id: str = Query(...), hours: int = Query(24, ge=1, le=720)):
    """Detect anomalies for a sensor"""
    try:
        sensor = SensorService.get_sensor(sensor_id)
        if not sensor:
            raise HTTPException(status_code=404, detail="Sensor not found")
        
        anomaly_ids, anomaly_details = AnomalyDetectionService.detect_anomalies(sensor_id, hours)
        
        return {
            'sensor_id': sensor_id,
            'total_anomalies': len(anomaly_ids),
            'anomaly_ids': anomaly_ids,
            'details': anomaly_details
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/stats")
async def get_anomaly_stats(sensor_id: str = Query(...), hours: int = Query(24, ge=1, le=720)):
    """Get anomaly statistics for a sensor"""
    try:
        sensor = SensorService.get_sensor(sensor_id)
        if not sensor:
            raise HTTPException(status_code=404, detail="Sensor not found")
        
        stats = AnomalyDetectionService.get_anomaly_statistics(sensor_id, hours)
        
        return {
            'sensor_id': sensor_id,
            **stats
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/all-stats")
async def get_all_anomaly_stats(hours: int = Query(24, ge=1, le=720)):
    """Get anomaly statistics for all sensors"""
    try:
        sensors = SensorService.list_sensors()
        all_stats = []
        
        for sensor in sensors:
            stats = AnomalyDetectionService.get_anomaly_statistics(sensor['id'], hours)
            all_stats.append({
                'sensor_id': sensor['id'],
                'sensor_name': sensor.get('name'),
                **stats
            })
        
        return {'sensors': all_stats}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
