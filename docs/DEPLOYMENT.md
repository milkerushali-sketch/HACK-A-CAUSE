# Deployment Guide

## Prerequisites

- Git account (GitHub, GitLab, Bitbucket)
- Vercel account (for frontend)
- Render account (for backend)
- Firebase project
- Domain name (optional)

---

## Part 1: Frontend Deployment (Vercel)

### Step 1: Prepare Repository
```bash
# Make sure code is pushed to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Select your repository
5. Configure settings:
   - **Framework**: React
   - **Root Directory**: `src/frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### Step 3: Environment Variables
Add in Vercel dashboard:
```
REACT_APP_FIREBASE_API_KEY=your_key
REACT_APP_FIREBASE_PROJECT_ID=your_project
REACT_APP_BACKEND_URL=https://aquaguard-api.render.com
```

### Step 4: Deploy
Click "Deploy" - Vercel will build and deploy automatically

---

## Part 2: Backend Deployment (Render)

### Step 1: Create Render Service
1. Go to [render.com](https://render.com)
2. Sign up/Login
3. Click "New +" → "Web Service"
4. Connect GitHub repository

### Step 2: Configure Service
```
Name: aquaguard-api
Environment: Python 3.9
Region: Your closest region
Build Command: pip install -r src/backend/requirements.txt
Start Command: cd src/backend && python main.py
```

### Step 3: Environment Variables
Add these in Render dashboard:
```
BACKEND_PORT=8000
DEBUG=False
FIREBASE_PROJECT_ID=your_project
FIREBASE_API_KEY=your_key
FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
```

### Step 4: Deploy
Render will automatically deploy when code is pushed

---

## Part 3: Firebase Setup

### Step 1: Create Firebase Project
1. Go to [firebase.google.com](https://firebase.google.com)
2. Click "Go to console"
3. Create new project
4. Enable Realtime Database
5. Set location and rules

### Step 2: Database Rules
```json
{
  "rules": {
    "sensors": {
      ".read": true,
      ".write": true
    },
    "readings": {
      ".read": true,
      ".write": true
    },
    "alerts": {
      ".read": true,
      ".write": true
    }
  }
}
```

### Step 3: Get Credentials
1. Project Settings → Service Accounts
2. Download service account JSON
3. Copy credentials to environment variables

---

## Part 4: Domain Setup (Optional)

### Vercel Custom Domain
1. Go to Project Settings
2. Domains → Add Domain
3. Update DNS records
4. Verify domain

### Render Custom Domain
1. Go to "Render" page → Custom Domain
2. Add your domain
3. Update DNS CNAME record
4. Verify

---

## Monitoring & Maintenance

### Vercel Monitoring
- Logs: Dashboard → Deployments → Logs
- Errors: Dashboard → Functions
- Analytics: Dashboard → Analytics

### Render Monitoring
- Logs: Dashboard → Logs
- Metrics: Dashboard → Metrics
- Events: Dashboard → Events

### Firebase Monitoring
- Realtime Database → Rules
- Performance → Database
- Usage: Analytics

---

## Updating Deployment

### Update Frontend
```bash
git add .
git commit -m "Update frontend"
git push origin main
# Vercel auto-deploys
```

### Update Backend
```bash
git add .
git commit -m "Update backend"
git push origin main
# Render auto-deploys
```

---

## Troubleshooting

### Frontend Won't Build
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Backend Won't Start
```bash
# Check Python version
python --version

# Install requirements locally
pip install -r src/backend/requirements.txt

# Run locally first
python src/backend/main.py
```

### Firebase Connection Issues
- Check API keys
- Verify security rules
- Check network connectivity
- Review Firebase console logs

### API Not Responding
1. Check Render service status
2. View Render logs
3. Verify environment variables
4. Test with curl: `curl https://api-url/api/health`

---

## Cost Estimate

### Vercel Frontend
- **Free Tier**: 100GB bandwidth/month
- **Pro Tier**: $20/month + usage
- *For hackathon: Free*

### Render Backend
- **Free Tier**: Limited (sleeps after 15 min)
- **Starter Tier**: $7/month
- **Standard Tier**: $12/month
- *Recommended: Starter*

### Firebase
- **Spark Plan**: Free (limited)
- **Blaze Plan**: Pay-as-you-go
- *Monthly estimate: $5-15*

### Total: ~$20-30/month (production)

---

## Rollback Procedure

### Vercel
1. Deployments → Select previous version
2. Click "Promote to Production"

### Render
1. Logs → Scroll to previous deployment
2. Click "Redeploy" on old version

---

## Security Checklist

- [ ] Remove debug mode in production
- [ ] Set strong Firebase security rules
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS/SSL
- [ ] Set up monitoring alarms
- [ ] Regular backups enabled
- [ ] API keys rotated regularly

---

## Performance Optimization

### Frontend
```bash
# Build optimization
npm run build --analyze
# Enables code splitting and optimization
```

### Backend
```python
# Add caching headers
# Implement database indexes
# Use connection pooling
```

---

**Last Updated**: February 23, 2026  
**Deployment Version**: 1.0.0
