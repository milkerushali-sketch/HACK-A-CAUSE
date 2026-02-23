💧 JalNexus: Smart Water Quality Monitoring System

> **Real-time IoT-enabled water quality monitoring for households with SMS alerts and anomaly detection**

## 🎯 Problem Statement

Develop a low-cost IoT-enabled solution that monitors
water quality in household overhead tanks, storage
containers, and kitchen taps. The system should detect
contamination during storage or distribution within the
home and provide real-time alerts to residents.

Current solutions are expensive and require professional installation. **JalNexus** provides an affordable, easy-to-deploy alternative.

---

## ✨ Solution Overview

JalNexus is a **complete IoT water quality monitoring system** that:

✅ Monitors 3 critical parameters in real-time:
- **pH Levels** (6.5-8.5 optimal range)
- **TDS (Total Dissolved Solids)** (0-500 ppm safe)
- **Turbidity** (0-5 NTU clarity)

✅ **Detects anomalies** using ML-based anomaly detection
✅ **Multi-channel alerts**: 
- In-app push notifications
- SMS alerts for offline areas
- Email notifications
- Smart Safty alerts 
- Real-time dashboard updates

✅ **Offline support** using SMS for low-connectivity areas
✅ **Hardware-agnostic** - simulated ESP32 sensors + real hardware ready
✅ **Easy deployment** - runs locally or in cloud
✅ **Dual-Role Authentication** - Separate dashboards for Users & Government officials
✅ **Mobile & Desktop Responsive** - Works on all devices

---

## 🔐 Authentication System

JalNexus features a **secure dual-role authentication system**:

### User Role
- Household residents monitor their own water quality
- Real-time dashboard with sensor data
- File complaints and track issues
- Download quality reports and certifications
- Mobile-friendly interface

### Government Role
- Authorized officials verify household data
- Compare official measurements with household readings
- Manage compliance and discrepancy tracking
- Export reports for administrative purposes
- Area-wise coverage monitoring

**Login Features:**
- Email & password authentication
- Session persistence with localStorage
- Role-based navigation & routing
- Responsive Material-UI interface
- Demo mode (accepts any credentials)



## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Material-UI** - Professional component library
- **Firebase Realtime DB** - Live data synchronization
- **Chart.js** - Real-time data visualization

### Backend
- **Python 3.9+** - Core language
- **FastAPI** - High-performance REST API
- **Firebase Admin SDK** - Database & Auth
- **Scikit-learn & Pandas** - Anomaly detection

### IoT & Data
- **ESP32 Simulator** - IoT device simulation (Python)
- **Isolation Forest Algorithm** - Anomaly detection
- **MQTT Protocol Ready** - Can integrate real sensors

### Deployment & Database
- **Firebase Realtime Database** - Real-time data storage
- **Vercel** - Frontend deployment
- **Render** - Backend deployment
- **Twilio** - SMS alerts (configurable)

---

## 🚀 Quick Start

### Prerequisites
- **Node.js 16+** & npm
- **Python 3.9+** & pip


### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/HACK-A-CAUSE.git
   cd HACK-A-CAUSE
   ```

2. **Setup Backend**
   ```bash
   cd src/backend
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   
   pip install -r requirements.txt
   cp ../../.env.example .env
   # Edit .env with your Firebase credentials
   ```

3. **Setup Frontend**
   ```bash
   cd src/frontend
   npm install
   cp .env.example .env
   # Edit .env with your Firebase credentials
   ```

4. **Setup IoT Simulator**
   ```bash
   cd src/iot-simulator
   pip install -r requirements.txt
   ```

---

## 📱 Usage

### Start the Backend Server
```bash
cd src/backend
# Activate venv first
python main.py
# API available at http://localhost:8000
# Swagger docs at http://localhost:8000/docs
```

### Start the Frontend
```bash
cd src/frontend
npm start
# App opens at http://localhost:3000
```

### Login to the System

1. **Open http://localhost:3000** in your browser
2. **Select Role**:
   - 👤 **User Login** - Monitor your household water
   - 🏛️ **Government Login** - Verify data & manage compliance
3. **Enter Credentials** (any email + password in demo mode):
   - Email: `any@email.com`
   - Password: `any-password`
4. **Access Dashboard** - Role-specific interface loads automatically

### Start IoT Simulator
```bash
cd src/iot-simulator
python simulator.py
# Generates realistic sensor data and sends to backend
```

### All Together (Full System)
```bash
# Terminal 1 - Backend
cd src/backend && python main.py

# Terminal 2 - Frontend
cd src/frontend && npm start

# Terminal 3 - IoT Simulator
cd src/iot-simulator && python simulator.py

# Then visit http://localhost:3000 and login!
```

---

## 📊 Dashboard Features

### User Dashboard
- **Real-time Monitoring** - Live pH, TDS, turbidity, temperature readings
- **Multiple Water Sources** - Monitor overhead tank, kitchen tap, storage container
- **Trend Analysis** - 5-hour historical charts
- **Complaint System** - File and track complaints
- **Reports & Certificates** - Download quality reports
- **Monthly Statistics** - Average readings, safe days, alert count

### Government Portal
- **Data Verification** - Compare official vs household measurements
- **Area Coverage** - Sensor count and status by region
- **Pending Queue** - Verify household reports
- **Chlorine Input** - Record official chlorination test results
- **Compliance Reports** - Export for administrative compliance
- **Discrepancy Analysis** - Identify measurement differences
- **Complaint Tracking** - Monitor issues by area

### Both Dashboards
- Real-time Monitoring
- Live pH, TDS, and turbidity readings
- Historical trend charts 
- Water quality status indicator (Good/Fair/Poor)
- Smart Alert systems (red , yellow,green)

### Anomaly Detection
- AI-powered anomaly detection
- Visual alerts for unusual patterns
- Anomaly history log

### Multi-Device Support
- Monitor multiple tanks/taps simultaneously
- Device-specific dashboards
- Alert configuration per device

### Alert Management
- SMS alerts for critical issues
- Email notifications
- In-app push notifications
- Alert history and logs
<<<<<<< HEAD

=======
### Other features
- past cholrination report
- graph of smart alert report
- user file complaints of water contamination
- user  monthly feedback
>>>>>>> 0f448f698ca8782a3c44ba4f15847cf3fd7cdfc5
---

## 🔄 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    IoT Layer                               │
│  (ESP32 Simulator / Real Hardware)                         │
│  Monitors: pH, TDS, Turbidity                              │
└──────────────────────┬──────────────────────────────────────┘
                       │ MQTT
┌──────────────────────▼──────────────────────────────────────┐
│                  Backend Layer (Python/FastAPI)             │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ API Routes  │  │ Anomaly      │  │ Alert Service    │   │
│  │ (REST)      │  │ Detection    │  │ (SMS/Email)      │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│           Firebase Realtime Database                         │
│  (Authentication, Data Storage, Real-time Sync)            │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│              Frontend Layer (React)                          │
│  Dashboard → Charts → Alerts → Device Management            │
└──────────────────────────────────────────────────────────────┘
```

---

## 📡 API Endpoints

### Sensor Data
- `GET /api/sensors` - List all sensors
- `GET /api/sensors/{id}` - Get sensor details
- `GET /api/sensors/{id}/readings` - Get sensor readings
- `POST /api/sensors/{id}/reading` - Submit new reading

### Anomalies
- `GET /api/anomalies` - List detected anomalies
- `GET /api/anomalies/detect` - Trigger anomaly detection

### Alerts
- `GET /api/alerts` - List all alerts
- `POST /api/alerts/{id}/acknowledge` - Mark alert as acknowledged

### System
- `GET /api/health` - Health check
- `GET /api/stats` - System statistics

---

## 🧪 Testing

### Run Unit Tests
```bash
cd src/backend
pytest tests/ -v
```

### Run Integration Tests
```bash
cd src/backend
pytest tests/integration/ -v
```

### Frontend Tests
```bash
cd src/frontend
npm test
```

---

## 🌐 Deployment

### Deploy Backend (Render)

1. Push code to GitHub
2. Connect Render.com to GitHub repository
3. Create new Web Service
4. Build command: `pip install -r src/backend/requirements.txt`
5. Start command: `cd src/backend && python main.py`
6. Add environment variables from `.env`

### Deploy Frontend (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Set build settings:
   - Build command: `cd src/frontend && npm run build`
   - Output directory: `src/frontend/build`
4. Add environment variables
5. Deploy!


## 📸 Screenshots

### Dashboard
![Dashboard mockup - Real-time monitoring with charts]

### Alert System
![Alert notifications - SMS and in-app alerts]

### Device Management
![Multiple device monitoring - Manage multiple water sources]

---

## 🎓 Key Features Implemented

- ✅ Real-time sensor data collection
- ✅ Multi-channel alert system (SMS, Email, Push)
- ✅ Smart Safty alert 
- ✅ Firebase real-time synchronization
- ✅ Responsive React dashboard
- ✅ Device management interface
- ✅ Historical trend analysis
- ✅ Offline SMS support
- ✅ REST API with Swagger docs
- ✅ Comprehensive error handling
- ✅ Production-ready code structure

---

## 🤝 Team Credits

**Hackathon Project**: HACK-A-CAUSE

**Team Members**:
- Vrushali Milke
- Shruti Muneshwar
- Srushti Mandekar

---


## 🔐 Security Note

- Never commit `.env` files with real credentials
- Use `.env.example` as template
- Rotate API keys regularly
- Enable Firebase security rules in production
- Validate all user inputs on backend

---

**Made with ❤️ for the Hackathon**

*Live Demo*: [Deploy to see it live!](#deployment)

