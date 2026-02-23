"""
Readings API routes
"""
from fastapi import APIRouter, HTTPException, Query
from typing import List
from models import ReadingCreate
from services.reading_service import ReadingService

router = APIRouter(prefix="/api/readings", tags=["readings"])

@router.post("", response_model=dict)
async def create_reading(reading: ReadingCreate):
    """Submit a sensor reading"""
    try:
        result = ReadingService.save_reading(reading)
        
        # Check for alerts after saving reading
        from services.alert_service import AlertService
        AlertService.check_and_create_alerts(result)
        
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/sensor/{sensor_id}", response_model=List[dict])
async def get_sensor_readings(sensor_id: str, limit: int = Query(100, ge=1, le=1000)):
    """Get readings for a sensor"""
    try:
        readings = ReadingService.get_readings(sensor_id, limit)
        return readings
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/sensor/{sensor_id}/range", response_model=List[dict])
async def get_readings_by_time(sensor_id: str, hours: int = Query(24, ge=1, le=720)):
    """Get readings within time range"""
    try:
        readings = ReadingService.get_readings_by_time_range(sensor_id, hours)
        return readings
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/stats/all", response_model=dict)
async def get_all_stats():
    """Get statistics for all sensors"""
    try:
        from services.sensor_service import SensorService
        sensors = SensorService.list_sensors()
        
        all_stats = []
        for sensor in sensors:
            stats = ReadingService.get_statistics(sensor['id'])
            all_stats.append({
                'sensor_id': sensor['id'],
                'sensor_name': sensor.get('name'),
                **stats
            })
        
        return {'sensors': all_stats}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
