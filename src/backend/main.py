"""
Main FastAPI application
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
from datetime import datetime
import time

# Import routes
from routes.sensors import router as sensors_router
from routes.readings import router as readings_router
from routes.anomalies import router as anomalies_router
from routes.alerts import router as alerts_router

# Initialize FastAPI app
app = FastAPI(
    title="AquaGuard Water Quality API",
    description="Real-time water quality monitoring API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
origins = [
    "http://localhost:3000",
    "http://localhost:8000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8000",
    "*"  # For development; restrict in production
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "AquaGuard API"
    }

# Stats endpoint
@app.get("/api/stats")
async def system_stats():
    """Get system statistics"""
    try:
        from services.sensor_service import SensorService
        from services.alert_service import AlertService
        
        sensors = SensorService.list_sensors()
        alerts = AlertService.get_alerts(limit=1000)
        
        total_readings = 0
        total_anomalies = 0
        
        for sensor in sensors:
            from services.reading_service import ReadingService
            readings = ReadingService.get_readings(sensor['id'], limit=10000)
            total_readings += len(readings)
            total_anomalies += sum(1 for r in readings if r.get('is_anomaly', False))
        
        return {
            'total_sensors': len(sensors),
            'total_readings': total_readings,
            'total_anomalies': total_anomalies,
            'active_alerts': len([a for a in alerts if not a.get('is_acknowledged', False)]),
            'timestamp': datetime.now().isoformat()
        }
    except Exception as e:
        return {
            'error': str(e),
            'timestamp': datetime.now().isoformat()
        }

# Include routers
app.include_router(sensors_router)
app.include_router(readings_router)
app.include_router(anomalies_router)
app.include_router(alerts_router)

# Root endpoint
@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "AquaGuard API - Water Quality Monitoring System",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/api/health"
    }

# Startup event
@app.on_event("startup")
async def startup_event():
    """Handle startup"""
    print("=" * 50)
    print("AquaGuard Water Quality Monitoring API")
    print("=" * 50)
    print(f"Started at {datetime.now()}")
    print(f"Debug Mode: {os.getenv('DEBUG', 'False')}")
    print("=" * 50)

if __name__ == "__main__":
    import uvicorn
    
    debug = os.getenv('DEBUG', 'True').lower() == 'true'
    port = int(os.getenv('BACKEND_PORT', 8000))
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=debug,
        log_level="info"
    )
