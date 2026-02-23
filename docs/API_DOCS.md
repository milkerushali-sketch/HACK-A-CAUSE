# API Documentation

## Base URL
- **Development**: `http://localhost:8000`
- **Production**: `https://aquaguard-api.example.com`

## Authentication
Currently, the API is open (demo mode). In production, add JWT token authentication.

## Endpoints

### Health Check
```http
GET /api/health
```
**Response**: `200 OK`
```json
{
  "status": "healthy",
  "timestamp": "2026-02-23T10:30:00",
  "service": "AquaGuard API"
}
```

### System Statistics
```http
GET /api/stats
```
**Response**: `200 OK`
```json
{
  "total_sensors": 3,
  "total_readings": 150,
  "total_anomalies": 5,
  "active_alerts": 2,
  "timestamp": "2026-02-23T10:30:00"
}
```

---

## Sensors

### Create Sensor
```http
POST /api/sensors
Content-Type: application/json

{
  "name": "Main Tank Sensor",
  "location": "Overhead Tank - Roof",
  "device_type": "overhead_tank",
  "latitude": 28.6139,
  "longitude": 77.2090
}
```

**Response**: `200 OK`
```json
{
  "id": "sensor-001",
  "name": "Main Tank Sensor",
  "location": "Overhead Tank - Roof",
  "device_type": "overhead_tank",
  "status": "active",
  "created_at": "2026-02-23T10:00:00"
}
```

### List All Sensors
```http
GET /api/sensors
```

**Response**: `200 OK`
```json
[
  {
    "id": "sensor-001",
    "name": "Main Tank Sensor",
    "location": "Overhead Tank - Roof",
    "device_type": "overhead_tank",
    "status": "active"
  },
  ...
]
```

### Get Sensor Details
```http
GET /api/sensors/{sensor_id}
```

**Response**: `200 OK`
```json
{
  "id": "sensor-001",
  "name": "Main Tank Sensor",
  "location": "Overhead Tank - Roof",
  "device_type": "overhead_tank",
  "status": "active",
  "created_at": "2026-02-23T10:00:00",
  "last_reading_at": "2026-02-23T10:30:00"
}
```

### Get Sensor Statistics
```http
GET /api/sensors/{sensor_id}/stats?hours=24
```

**Query Parameters**:
- `hours` (int): Time range in hours (default: 24)

**Response**: `200 OK`
```json
{
  "sensor_id": "sensor-001",
  "reading_count": 50,
  "avg_ph": 7.2,
  "avg_tds": 220,
  "avg_turbidity": 1.5,
  "anomaly_count": 2,
  "min_ph": 6.8,
  "max_ph": 7.6,
  "min_tds": 150,
  "max_tds": 300,
  "min_turbidity": 0.5,
  "max_turbidity": 3.2
}
```

---

## Readings

### Submit Reading
```http
POST /api/readings
Content-Type: application/json

{
  "sensor_id": "sensor-001",
  "ph_level": 7.2,
  "tds_level": 220,
  "turbidity": 1.5,
  "temperature": 25.5
}
```

**Response**: `200 OK`
```json
{
  "id": "reading-123",
  "sensor_id": "sensor-001",
  "ph_level": 7.2,
  "tds_level": 220,
  "turbidity": 1.5,
  "temperature": 25.5,
  "is_anomaly": false,
  "anomaly_score": 0.05,
  "quality_status": "good",
  "created_at": "2026-02-23T10:30:00"
}
```

### Get Sensor Readings
```http
GET /api/readings/sensor/{sensor_id}?limit=100
```

**Query Parameters**:
- `limit` (int): Maximum readings to return (default: 100, max: 1000)

**Response**: `200 OK`
```json
[
  {
    "id": "reading-123",
    "sensor_id": "sensor-001",
    "ph_level": 7.2,
    "tds_level": 220,
    "turbidity": 1.5,
    "quality_status": "good",
    "is_anomaly": false,
    "created_at": "2026-02-23T10:30:00"
  },
  ...
]
```

### Get Readings by Time Range
```http
GET /api/readings/sensor/{sensor_id}/range?hours=24
```

**Query Parameters**:
- `hours` (int): Time range in hours

**Response**: `200 OK`
(Same format as Get Sensor Readings)

---

## Anomalies

### Detect Anomalies
```http
POST /api/anomalies/detect?sensor_id={sensor_id}&hours=24
```

**Query Parameters**:
- `sensor_id` (string): Sensor ID
- `hours` (int): Time range (default: 24)

**Response**: `200 OK`
```json
{
  "sensor_id": "sensor-001",
  "total_anomalies": 2,
  "anomaly_ids": ["reading-123", "reading-125"],
  "details": [
    {
      "reading_id": "reading-123",
      "sensor_id": "sensor-001",
      "timestamp": "2026-02-23T10:15:00",
      "ph_level": 5.2,
      "tds_level": 600,
      "turbidity": 8.5,
      "anomaly_score": -0.45,
      "severity": "high"
    }
  ]
}
```

### Get Anomaly Statistics
```http
GET /api/anomalies/stats?sensor_id={sensor_id}&hours=24
```

**Response**: `200 OK`
```json
{
  "sensor_id": "sensor-001",
  "total_readings": 50,
  "anomalies_detected": 2,
  "anomaly_percentage": 4.0,
  "last_anomaly_time": "2026-02-23T10:15:00",
  "average_anomaly_score": -0.35
}
```

---

## Alerts

### Get Alerts
```http
GET /api/alerts?limit=50
```

**Query Parameters**:
- `limit` (int): Maximum alerts (default: 50, max: 1000)

**Response**: `200 OK`
```json
[
  {
    "id": "alert-001",
    "sensor_id": "sensor-001",
    "alert_type": "ph_high",
    "message": "High pH detected: 8.7 (safe range: 6.5-8.5)",
    "severity": "high",
    "is_acknowledged": false,
    "created_at": "2026-02-23T10:15:00"
  },
  ...
]
```

### Get Unacknowledged Alerts
```http
GET /api/alerts/unacknowledged?limit=50
```

**Response**: `200 OK`
(Same format as Get Alerts)

### Acknowledge Alert
```http
PUT /api/alerts/{alert_id}/acknowledge
```

**Response**: `200 OK`
```json
{
  "message": "Alert acknowledged successfully"
}
```

### Get Sensor Alerts
```http
GET /api/alerts/sensor/{sensor_id}?limit=50
```

**Response**: `200 OK`
(Same format as Get Alerts)

---

## Error Responses

### 400 Bad Request
```json
{
  "detail": "Invalid sensor data"
}
```

### 404 Not Found
```json
{
  "detail": "Sensor not found"
}
```

### 500 Internal Server Error
```json
{
  "detail": "Internal server error"
}
```

---

## Alert Types

| Type | Severity | Trigger |
|------|----------|---------|
| `ph_high` | High | pH > 8.5 |
| `ph_low` | High | pH < 6.5 |
| `tds_high` | High | TDS > 500 ppm |
| `turbidity_high` | Medium | Turbidity > 5 NTU |
| `anomaly` | High | ML detected anomaly |

---

## Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Rate Limiting

Currently: No rate limiting (development mode)

In production, implement:
- 100 requests per minute per IP
- 1000 requests per hour per user

---

## Example cURL Requests

### Submit Reading
```bash
curl -X POST http://localhost:8000/api/readings \
  -H "Content-Type: application/json" \
  -d '{
    "sensor_id": "sensor-001",
    "ph_level": 7.2,
    "tds_level": 220,
    "turbidity": 1.5
  }'
```

### Get Sensors
```bash
curl http://localhost:8000/api/sensors
```

### Get Alerts
```bash
curl http://localhost:8000/api/alerts?limit=10
```

---

**API Version**: 1.0.0  
**Last Updated**: February 23, 2026
