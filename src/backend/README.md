# Backend - FastAPI Server

## Quick Start

```bash
cd src/backend
python -m venv venv
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
cp ../../.env.example .env
# Edit .env with your credentials
python main.py
```

API will be available at: http://localhost:8000
Swagger Docs: http://localhost:8000/docs

## Project Structure

```
backend/
├── main.py                 # FastAPI application
├── models/                 # Pydantic models
│   └── __init__.py        # All data models
├── routes/                 # API endpoints
│   ├── sensors.py         # Sensor endpoints
│   ├── readings.py        # Reading endpoints
│   ├── anomalies.py       # Anomaly endpoints
│   └── alerts.py          # Alert endpoints
├── services/              # Business logic
│   ├── firebase_service.py     # Database ops
│   ├── sensor_service.py       # Sensor mgmt
│   ├── reading_service.py      # Reading mgmt
│   ├── anomaly_service.py      # ML anomaly detection
│   └── alert_service.py        # Alert management
├── utils/                 # Utilities
│   └── __init__.py        # Helper functions
└── requirements.txt       # Python dependencies
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/stats` - System statistics
- `POST /api/sensors` - Create sensor
- `GET /api/sensors` - List sensors
- `POST /api/readings` - Submit reading
- `GET /api/readings/sensor/{id}` - Get readings
- `POST /api/anomalies/detect` - Detect anomalies
- `GET /api/alerts` - Get alerts

See [docs/API_DOCS.md](../../docs/API_DOCS.md) for full documentation.

## Testing

```bash
# Run all tests
pytest tests/ -v

# Run with coverage
pytest tests/ --cov=. 

# Run specific test
pytest tests/test_sensor_service.py -v
```

## Environment Variables

See [.env.example](../../.env.example)

Key variables:
- `BACKEND_PORT` - Server port (default: 8000)
- `DEBUG` - Debug mode (True/False)
- `FIREBASE_*` - Firebase credentials

## Features

✅ RESTful API with FastAPI
✅ Real-time database with Firebase
✅ Anomaly detection using Isolation Forest
✅ Multi-channel alerts (SMS, Email, Push)
✅ Comprehensive error handling
✅ CORS support for frontend
✅ Automatic API documentation

## Deployment

See [docs/DEPLOYMENT.md](../../docs/DEPLOYMENT.md)

### Quick Deploy to Render

```bash
git push origin main
# Render will auto-deploy
```

## Issues?

Check [docs/TROUBLESHOOTING.md](../../docs/TROUBLESHOOTING.md)
