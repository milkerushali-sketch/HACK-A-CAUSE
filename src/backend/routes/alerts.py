"""
Alerts API routes
"""
from fastapi import APIRouter, HTTPException, Query
from typing import List
from services.alert_service import AlertService

router = APIRouter(prefix="/api/alerts", tags=["alerts"])

@router.get("", response_model=List[dict])
async def get_alerts(limit: int = Query(50, ge=1, le=1000)):
    """Get recent alerts"""
    try:
        alerts = AlertService.get_alerts(limit)
        return alerts
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{alert_id}/acknowledge")
async def acknowledge_alert(alert_id: str):
    """Mark alert as acknowledged"""
    try:
        AlertService.acknowledge_alert(alert_id)
        return {"message": "Alert acknowledged successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/sensor/{sensor_id}")
async def get_sensor_alerts(sensor_id: str, limit: int = Query(50, ge=1, le=1000)):
    """Get alerts for a specific sensor"""
    try:
        all_alerts = AlertService.get_alerts(limit * 2)
        sensor_alerts = [a for a in all_alerts if a.get('sensor_id') == sensor_id]
        return sensor_alerts[:limit]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/unacknowledged")
async def get_unacknowledged_alerts(limit: int = Query(50, ge=1, le=1000)):
    """Get unacknowledged alerts"""
    try:
        all_alerts = AlertService.get_alerts(limit * 2)
        unacknowledged = [a for a in all_alerts if not a.get('is_acknowledged', False)]
        return unacknowledged[:limit]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
