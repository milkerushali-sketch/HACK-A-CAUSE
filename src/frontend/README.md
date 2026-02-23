# Frontend - React Dashboard

## Quick Start

```bash
cd src/frontend
npm install
cp .env.example .env
# Edit .env with your Firebase credentials
npm start
```

App will open at: http://localhost:3000

## Project Structure

```
frontend/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── index.js               # React entry point
│   ├── App.js                 # Main app component
│   ├── components/
│   │   └── SensorCard.js      # Sensor display card
│   ├── pages/
│   │   ├── Dashboard.js       # Main dashboard page
│   │   ├── Alerts.js          # Alerts page
│   │   └── AddSensor.js       # Add sensor page
│   ├── services/
│   │   ├── apiService.js      # REST API client
│   │   └── firebaseConfig.js  # Firebase setup
│   └── hooks/
│       └── useData.js         # Custom React hooks
└── package.json               # Dependencies
```

## Pages

### Dashboard
- Real-time sensor monitoring
- Water quality status
- System statistics
- Device management

### Alerts
- Alert list and management
- Severity indicators
- Acknowledge alerts
- Real-time updates

### Add Sensor
- Register new sensors
- Configure device type
- Set location

## Components

- `SensorCard` - Displays sensor data and statistics
- `Layout` - Navigation and layout wrapper
- `Dashboard` - Main dashboard page
- Charts and visualizations (integration-ready)

## Custom Hooks

- `useSensors()` - Fetch all sensors
- `useReadings(sensorId)` - Fetch sensor readings
- `useSensorStats(sensorId)` - Get sensor statistics

## Build & Deploy

```bash
# Build for production
npm run build

# Test build locally
npm start  # or npm run build

# Deploy to Vercel
# (automatic on git push)
```

## Environment Variables

See [.env.example](.env.example)

Key variables:
- `REACT_APP_BACKEND_URL` - Backend API URL
- `REACT_APP_FIREBASE_*` - Firebase credentials

## Features

✅ Real-time data monitoring
✅ Material-UI components
✅ Responsive design
✅ Alert management
✅ Device management
✅ Firebase integration (ready)
✅ Chart.js visualization (ready)

## Testing

```bash
npm test               # Run tests
npm test -- --coverage # With coverage
```

## Deployment

See [docs/DEPLOYMENT.md](../../docs/DEPLOYMENT.md)

### Quick Deploy to Vercel

```bash
git push origin main
# Vercel will auto-deploy
```

## Troubleshooting

**Blank page?**
- Check browser console for errors
- Verify REACT_APP_BACKEND_URL is set
- Ensure backend is running

**API errors?**
- Check backend service
- Verify .env variables
- Check CORS configuration

**Components not rendering?**
- npm install (install dependencies)
- Clear cache: rm -rf node_modules
- npm start (restart dev server)

## Issues?

See [docs/TROUBLESHOOTING.md](../../docs/TROUBLESHOOTING.md)
