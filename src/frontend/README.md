# Frontend - React Dashboard (JalNexus)

## Quick Start

```bash
cd src/frontend
npm install
cp .env.example .env
# Edit .env with your Firebase credentials (optional for demo)
npm start
```

App will open at: http://localhost:3000

## Features

### 🔐 Dual-Role Authentication
- **User Login**: Household residents monitor their water quality
- **Government Login**: Officials verify data and manage compliance
- Role-based dashboards with different views
- Mobile & desktop responsive design
- Auto-login with localStorage persistence

### 👤 User Dashboard
- Real-time monitoring of water sources (overhead tank, kitchen tap, storage)
- Water quality parameters: pH, TDS, Turbidity, Temperature
- Trend analysis with historical data
- File complaints with status tracking
- Download monthly reports & certificates
- Personal water quality statistics

### 🏛️ Government Portal
- Data verification interface with chlorine level input
- Comparison of official vs household water data
- Area-wise coverage and sensor status
- Pending verification queue
- Complaint tracking by area
- Export reports for compliance

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── index.js
│   ├── App.js                      # Main app with routing
│   ├── context/
│   │   └── AuthContext.js          # Auth state management
│   ├── components/
│   │   └── SensorCard.js
│   ├── pages/
│   │   ├── Login.js                # Dual-role login
│   │   ├── UserDashboard.js        # User-specific dashboard
│   │   ├── GovernmentDashboard.js  # Government-specific dashboard
│   │   ├── Dashboard.js
│   │   ├── Alerts.js
│   │   └── AddSensor.js
│   ├── services/
│   │   ├── apiService.js
│   │   └── firebaseConfig.js
│   └── hooks/
│       └── useData.js
└── package.json
```

## Authentication Flow

1. **Initial Load**: User sees login page
2. **Role Selection**: Choose between "User" or "Government Official"
3. **Login Form**: Email + Password (demo mode accepts any)
4. **Session**: User data stored in localStorage
5. **Protected Routes**: Automatically redirect to role-specific dashboard
6. **Logout**: Clear session and return to login

## Pages

### Login Page
- Role selection cards (User vs Government)
- Email & password form
- Password visibility toggle
- Form validation
- Demo credentials indicator

### User Dashboard
- **Active Water Sources**: pH, TDS, Turbidity monitoring with progress bars
- **Water Quality Trend**: 5-hour historical chart
- **My Complaints**: File and track complaints
- **Reports & Documents**: Download certifications and monthly reports
- **Monthly Statistics**: Average pH, TDS, Safe Days, Alert Count

### Government Portal
- **Area Coverage**: Sensor count and complaint tracking by region
- **Data Verification**: Compare official vs household measurements
- **Pending Verifications**: Queue of reports to verify
- **Issue Verification Dialog**: Input chlorine level and official notes
- **Export Reports**: Download compliance data

## Mobile & Desktop Responsiveness

✅ **Mobile First Design**
- Hamburger menu navigation
- Single column layout
- Optimized touch targets
- Readable text sizes

✅ **Desktop Optimization**
- Multi-column layouts
- Full navigation bar
- Dashboard cards with more details
- Wider charts

## Demo Credentials

Any email + any password combination:
```
Email: demo@example.com
Password: password123
```

Or create your own during login.

## Environment Variables

See [.env.example](.env.example)

## Build & Deploy

```bash
# Development
npm start

# Build for production
npm run build

# Test
npm test
```

## Features Status

✅ Dual-role authentication (User & Government)
✅ Token-based session management
✅ Role-based routing & navigation
✅ Real-time sensor monitoring
✅ Water quality charts & trends
✅ Complaint filing system
✅ Government data verification
✅ Responsive Material-UI design
✅ Mobile & desktop support
✅ Report generation capability
✅ Alert management
✅ Device registration

## Tech Stack

- **React 18** - UI framework
- **Material-UI 5** - Component library
- **React Router v6** - Navigation
- **Recharts** - Data visualization
- **Firebase** - Backend (optional)
- **Axios** - HTTP client

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
