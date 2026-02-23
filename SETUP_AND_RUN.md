# JalNexus - Complete Setup & Run Guide

## 📋 Project Overview

**JalNexus** is a smart water quality monitoring system with:
- **Frontend**: React dashboard with dual-role authentication (User & Government)
- **Backend**: Python FastAPI REST API with ML anomaly detection
- **IoT Simulator**: Python-based sensor simulator
- **Database**: Firebase Realtime Database

---

## 🛠️ Prerequisites

Before starting, ensure you have installed:

1. **Node.js & npm**
   ```bash
   # Check installation
   node --version  # Should be v16+
   npm --version   # Should be v8+
   ```

2. **Python 3.9+**
   ```bash
   # Check installation
   python --version  # Should be 3.9+
   pip --version
   ```

3. **Git**
   ```bash
   git --version
   ```

---

## 📦 Installation

### 1. Clone the Repository

```bash
# Navigate to your projects folder
cd YOUR_PROJECTS_FOLDER

# Clone the repository
git clone https://github.com/milkerushali-sketch/HACK-A-CAUSE.git

# Enter the directory
cd HACK-A-CAUSE
```

---

### 2. Setup Backend (Python FastAPI)

```bash
# Navigate to backend
cd src/backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp ../../.env.example .env
# Edit .env if you want to add real Firebase credentials
# (Demo mode will work without it)
```

---

### 3. Setup Frontend (React)

```bash
# From project root, navigate to frontend
cd src/frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
# Edit .env if needed for Firebase credentials
```

---

### 4. Setup IoT Simulator (Optional but Recommended)

```bash
# From project root, navigate to simulator
cd src/iot-simulator

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

---

## 🚀 Running the System

### Option A: Run Everything Together (Recommended for Testing)

Open **3 Terminal Windows** and run these commands in separate terminals:

#### Terminal 1 - Start Backend API (Port 8000)
```bash
cd src/backend

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Start the server
python main.py

# You should see:
# ✨ JalNexus backend starting...
# INFO: Application startup complete
# INFO: Uvicorn running on http://0.0.0.0:8000
```

**Backend is Ready at:**
- 🌐 API: http://localhost:8000
- 📚 Swagger Docs: http://localhost:8000/docs
- 🔍 ReDoc: http://localhost:8000/redoc

---

#### Terminal 2 - Start Frontend (Port 3000)
```bash
cd src/frontend

# Start React development server
npm start

# You should see:
# Compiled successfully!
# Local:   http://localhost:3000
```

**Frontend is Ready at:**
- 🏠 Dashboard: http://localhost:3000

---

#### Terminal 3 - Start IoT Simulator (Data Generator)
```bash
cd src/iot-simulator

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Run the simulator
python simulator.py

# You should see:
# 🤖 Simulator starting...
# ✅ Registered 3 sensors
# 📡 Sending readings...
```

---

### Option B: Run Components Individually

If you want to test one component at a time:

#### Backend Only
```bash
cd src/backend
venv\Scripts\activate  # or: source venv/bin/activate
python main.py
# Test at: http://localhost:8000/docs
```

#### Frontend Only
```bash
cd src/frontend
npm start
# Opens at: http://localhost:3000
# Will show loading state without backend
```

#### Simulator Only
```bash
cd src/iot-simulator
venv\Scripts\activate  # or: source venv/bin/activate
python simulator.py
# Runs in background sending data
```

---

## 🔐 Login to the Dashboard

Once all 3 components are running:

1. **Open http://localhost:3000** in your browser

2. **You'll see the Login Screen** with two role options:
   ```
   👤 User Login          🏛️ Government Login
   ```

3. **Select a Role**:
   
   **Option 1: Login as User (Household Resident)**
   - Click "User Login" card
   - Enter any email: `user@example.com`
   - Enter any password: `password123`
   - Click "Login as User"
   
   **Option 2: Login as Government Official**
   - Click "Government Login" card
   - Enter any email: `official@example.com`
   - Enter any password: `password123`
   - Click "Login as Official"

4. **You're In!** The dashboard loads based on your role.

---

## 👤 User Dashboard Features

After logging in as a User, you can:

### 📊 Monitor Water Quality
- View real-time readings from 3 water sources:
  - Overhead Tank
  - Kitchen Tap
  - Storage Tank
- See pH, TDS, Turbidity, Temperature

### 📈 Trend Analysis
- View 5-hour historical data
- Identify patterns and changes

### 📋 File Complaints
- Report water quality issues
- Track complaint status
- Get updates on resolution

### 📄 Download Reports
- Monthly water quality reports
- Sensor maintenance certificates
- Safety compliance documents

### 📊 View Statistics
- Average pH level
- Average TDS (Total Dissolved Solids)
- Number of safe days
- Alert count

---

## 🏛️ Government Portal Features

After logging in as a Government Official, you can:

### ✅ Verify Household Data
- Review pending reports from households
- Enter official test results
- Compare with household measurements
- Mark reports as verified

### 🗺️ Area Coverage
- View sensors by geographic area
- Monitor complaint counts per region
- Track device status (active/inactive)

### 📊 Data Analysis
- View discrepancy trends
- Compare official vs household pH levels
- Export compliance reports

### 📥 Verify Reports
- Dialog to enter chlorine levels
- Add official notes and observations
- Approve or request more information

### 📤 Export Data
- Download monthly reports
- Export discrepancy data
- Generate compliance certificates

---

## 🧪 Testing the System

### Test API Endpoints (Backend)

Open http://localhost:8000/docs in browser and try:

1. **Create a Sensor**
   ```
   POST /api/sensors
   Body: {"name": "Test Tank", "location": "Home"}
   ```

2. **Get All Sensors**
   ```
   GET /api/sensors
   ```

3. **Submit a Reading**
   ```
   POST /api/readings
   Body: {"sensor_id": "1", "ph": 7.2, "tds": 300, "turbidity": 2}
   ```

4. **Check System Stats**
   ```
   GET /api/stats
   ```

### Test Frontend Flows

1. **User Login & Dashboard**
   - Login as user
   - Check water quality readings
   - File a complaint
   - Download a report

2. **Government Login & Verification**
   - Login as government
   - View pending reports
   - Verify a household report
   - Export compliance data

3. **Mobile Responsiveness**
   - Open dashboard on phone/tablet
   - Test hamburger menu
   - Verify all data is readable

---

## 🔧 Troubleshooting

### Backend Won't Start

**Error**: `ModuleNotFoundError: No module named 'fastapi'`

```bash
# Make sure venv is activated
cd src/backend
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux

# Reinstall dependencies
pip install -r requirements.txt

# Try again
python main.py
```

**Error**: `Port 8000 already in use`

```bash
# On Windows, find process using port 8000
netstat -ano | findstr :8000

# On macOS/Linux
lsof -i :8000

# Kill the process or use different port
# Edit main.py to use different port:
# uvicorn.run(app, host="0.0.0.0", port=8001)
```

---

### Frontend Won't Start

**Error**: `npm ERR! 404 Not Found - npm ERR! 404`

```bash
cd src/frontend

# Clear cache and reinstall
rm -rf node_modules
npm cache clean --force
npm install
npm start
```

**Error**: `Port 3000 already in use`

```bash
# On Windows
netstat -ano | findstr :3000

# On macOS/Linux
lsof -i :3000

# Kill the process or use different port
PORT=3001 npm start
```

---

### IoT Simulator Not Sending Data

**Check**: Backend is running first

```bash
# Test backend health
curl http://localhost:8000/api/health
# Should return: {"status": "ok"}
```

**Check**: Correct Python environment

```bash
cd src/iot-simulator
python --version  # Should be 3.9+
pip list | grep requests  # Should list 'requests'
```

---

### Can't Login (Bad Gateway Error)

**Make sure**:
- ✅ Backend is running on http://localhost:8000
- ✅ Frontend is running on http://localhost:3000
- ✅ No firewall blocking localhost communication

---

## 📊 Sample Data

The IoT Simulator automatically generates:

| Parameter | Range | Optimal |
|-----------|-------|---------|
| pH | 5.0-9.0 | 6.5-8.5 |
| TDS (ppm) | 0-500 | <500 |
| Turbidity (NTU) | 0-10 | <5 |
| Temperature (°C) | 20-35 | 20-28 |

**Anomalies**: 5% of readings are marked as anomalies for testing ML detection.

---

## 🎓 Project Structure

```
HACK-A-CAUSE/
├── src/
│   ├── backend/              # FastAPI server
│   │   ├── main.py          # Server entry point
│   │   ├── models/          # Data models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   └── requirements.txt  # Python dependencies
│   ├── frontend/             # React application
│   │   ├── src/
│   │   │   ├── pages/       # Page components
│   │   │   ├── context/     # Auth context
│   │   │   ├── services/    # API client
│   │   │   └── App.js       # Main app
│   │   ├── package.json     # npm dependencies
│   │   └── public/          # Static files
│   └── iot-simulator/        # Python simulator
│       └── simulator.py      # Simulator entry point
├── README.md                 # Project overview
└── .env.example             # Environment template
```

---

## 📈 Next Steps

### After Setup Works

1. **Explore the API**
   - Visit http://localhost:8000/docs
   - Try different endpoints
   - Understand request/response formats

2. **Customize Dashboards**
   - Edit `/src/frontend/src/pages/UserDashboard.js`
   - Add more charts and visualizations
   - Customize color scheme

3. **Deploy to Cloud**
   - Deploy backend to Render: See DEPLOYMENT.md
   - Deploy frontend to Vercel: See DEPLOYMENT.md
   - Update `.env` with production URLs

4. **Connect Real Sensors**
   - Replace simulator with actual ESP32 code
   - Modify `/src/iot-simulator/simulator.py`
   - Update sensor registration logic

5. **Add SMS Alerts**
   - Set up Twilio account
   - Add API keys to `.env`
   - Enable SMS feature in alert service

---

## 📞 Support

If you encounter issues:

1. **Check logs** - Both backend and frontend show helpful error messages
2. **Verify ports** - Ensure 8000, 3000 are not in use
3. **Try restarting** - Kill all terminals and start fresh
4. **Check dependencies** - Ensure requirements.txt and package.json are installed

---

## ✅ Checklist

Before considering setup complete:

- [ ] Backend running on port 8000
- [ ] Frontend running on port 3000
- [ ] IoT Simulator generating data
- [ ] Can login as User
- [ ] Can login as Government
- [ ] User Dashboard shows water quality data
- [ ] Government Portal shows verification queue
- [ ] Charts and graphs rendering correctly
- [ ] Mobile view responsive
- [ ] No console errors

---

**You're all set! 🎉 Enjoy monitoring water quality with JalNexus!**

💧 Made with ❤️ for clean water in every home
