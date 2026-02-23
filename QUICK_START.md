# 🚀 Quick Start Guide - JalNexus

## ⚡ TL;DR - Run in 5 Minutes

### 1️⃣ Open 3 Terminals

**Terminal 1 - Backend**
```bash
cd src/backend
venv\Scripts\activate
python main.py
```

**Terminal 2 - Frontend**
```bash
cd src/frontend
npm start
```

**Terminal 3 - Simulator**
```bash
cd src/iot-simulator
venv\Scripts\activate
python simulator.py
```

### 2️⃣ Login at http://localhost:3000

**Demo Credentials** (any email + password):
```
Email: user@example.com
Password: password123
```

### 3️⃣ Choose Your Role

- 👤 **User**: Monitor household water quality
- 🏛️ **Government**: Verify data & manage compliance

---

## 🔧 One-Time Setup (First Time Only)

### Backend Setup
```bash
cd src/backend
python -m venv venv
venv\Scripts\activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Frontend Setup
```bash
cd src/frontend
npm install
```

### Simulator Setup
```bash
cd src/iot-simulator
python -m venv venv
venv\Scripts\activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

---

## 📍 URLs After Running

| Component | URL | Purpose |
|-----------|-----|---------|
| Frontend | http://localhost:3000 | Main dashboard |
| API Docs | http://localhost:8000/docs | Swagger API reference |
| API | http://localhost:8000 | REST API endpoint |

---

## ✅ System Ready When You See:

- ✅ Backend: `"Application startup complete"`
- ✅ Frontend: `"Compiled successfully!"`
- ✅ Simulator: `"Sending readings..."`

---

## 🎯 Demo Flow

1. **Login as User** → See water quality dashboard
2. **Check readings** → Real-time sensor data from simulator
3. **File complaint** → Submit water quality issue
4. **Download report** → Get monthly statistics
5. **Logout** → Try government login
6. **Login as Government** → Verify household data
7. **Check discrepancies** → Compare official vs home readings

---

## 🆘 Quick Fixes

| Issue | Solution |
|-------|----------|
| Port 8000 in use | Kill process: `netstat -ano \| findstr :8000` |
| Port 3000 in use | Kill process: `netstat -ano \| findstr :3000` |
| Module not found | Activate venv: `venv\Scripts\activate` |
| npm ERR! | Clear: `npm cache clean --force` |
| Backend won't connect | Check: `curl http://localhost:8000/api/health` |

---

## 📚 Detailed Guides

- **Full Setup**: Read [SETUP_AND_RUN.md](SETUP_AND_RUN.md)
- **API Reference**: Visit http://localhost:8000/docs
- **Deployment**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Architecture**: Check [AI_USAGE.md](AI_USAGE.md)

---

## 💡 Tips

- **Mobile Testing**: Open browser DevTools (F12) → Toggle mobile view
- **Test API**: Use Swagger at http://localhost:8000/docs
- **Mock Data**: Simulator generates 3 sensors automatically
- **Demo Mode**: Login works with ANY email + password
- **Session Saved**: Login persists even after browser refresh

---

**All set? Go to http://localhost:3000! 🌊**
