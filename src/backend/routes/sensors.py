"""
Sensor API routes
"""
from fastapi import APIRouter, HTTPException, Query
from typing import List
from models import Sensor, SensorCreate
from services.sensor_service import SensorService
from services.reading_service import ReadingService

router = APIRouter(prefix="/api/sensors", tags=["sensors"])

@router.post("", response_model=dict)
async def create_sensor(sensor: SensorCreate):
    """Create a new sensor"""
    try:
        result = SensorService.create_sensor(sensor)
        return {"id": result['id'], **result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("", response_model=List[dict])
async def list_sensors():
    """Get all sensors"""
    try:
        sensors = SensorService.list_sensors()
        return sensors
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{sensor_id}", response_model=dict)
async def get_sensor(sensor_id: str):
    """Get sensor by ID"""
    try:
        sensor = SensorService.get_sensor(sensor_id)
        if not sensor:
            raise HTTPException(status_code=404, detail="Sensor not found")
        return sensor
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{sensor_id}", response_model=dict)
async def update_sensor(sensor_id: str, updates: dict):
    """Update sensor"""
    try:
        SensorService.update_sensor_status(sensor_id, updates.get('status', 'active'))
        sensor = SensorService.get_sensor(sensor_id)
        if not sensor:
            raise HTTPException(status_code=404, detail="Sensor not found")
        return sensor
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{sensor_id}/stats", response_model=dict)
async def get_sensor_stats(sensor_id: str, hours: int = Query(24, ge=1, le=720)):
    """Get sensor statistics"""
    try:
        stats = ReadingService.get_statistics(sensor_id, hours)
        return {
            'sensor_id': sensor_id,
            **stats
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{sensor_id}")
async def delete_sensor(sensor_id: str):
    """Delete sensor"""
    try:
        SensorService.update_sensor_status(sensor_id, 'deleted')
        return {"message": "Sensor deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
