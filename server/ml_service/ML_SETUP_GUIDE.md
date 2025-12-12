# 🤖 ML Service Setup Guide

This guide will help you set up the Machine Learning microservice for login anomaly detection and password analysis.

## 📋 Prerequisites

- **Python 3.8+** installed on your system
- **pip** (Python package manager)
- Node.js backend server configured and running

## 🔧 Installation Steps

### 1. Verify Python Installation

```bash
python --version
# or
python3 --version
```

### 2. Navigate to ML Service Directory

```bash
cd server/ml_service
```

### 3. Install Python Dependencies

```bash
pip install -r requirements.txt
# or
pip3 install -r requirements.txt
```

**Dependencies that will be installed:**
- Flask 3.0.0 - Web framework for ML API
- flask-cors 4.0.0 - CORS support
- scikit-learn 1.3.2 - Machine learning library
- pandas 2.1.4 - Data manipulation
- numpy 1.26.2 - Numerical computing
- joblib 1.3.2 - Model persistence

### 4. Start the ML Service

```bash
python app.py
# or
python3 app.py
```

You should see:
```
ML Service starting...
 * Running on http://127.0.0.1:5001
 * Press CTRL+C to quit
```

## 🧪 Testing the ML Service

### Test 1: Health Check
```bash
curl http://localhost:5001/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "ML Service is running",
  "timestamp": "2025-01-15T10:30:00.123Z"
}
```

### Test 2: Password Analysis
```bash
curl -X POST http://localhost:5001/analyze-password \
  -H "Content-Type: application/json" \
  -d '{"password": "MyTest123!"}'
```

Expected response:
```json
{
  "status": "success",
  "analysis": {
    "score": 75,
    "strength": "strong",
    "entropy": 58.7,
    "estimatedCrackTime": "3 years",
    "vulnerabilities": [],
    "suggestions": ["Password looks good!"]
  }
}
```

### Test 3: ML Service Statistics
```bash
curl http://localhost:5001/stats
```

## 🎯 ML Features Overview

### 1. Login Anomaly Detection

**Algorithm**: Isolation Forest
**Features Analyzed** (7 dimensions):
1. Hour of day (0-23)
2. Day of week (0-6)
3. Is weekend (0 or 1)
4. IP address hash (normalized)
5. User agent hash (normalized)
6. Time since last login (hours)
7. Login frequency (last 24h)

**Training Requirements**:
- Minimum 50 login records
- Recommended 100+ for better accuracy
- Automatic logging on each successful login

**Usage**:
```javascript
// From Node.js backend
const response = await axios.post('http://localhost:5001/detect-anomaly', {
  userId: '507f1f77bcf86cd799439011',
  timestamp: '2025-01-15T10:30:00.000Z',
  ipAddress: '192.168.1.100',
  userAgent: 'Mozilla/5.0...',
  endpoint: '/api/auth/login',
  historicalLogins: [...]
});
```

### 2. ML-Based Password Analysis

**Features**:
- Entropy calculation (randomness measure)
- Pattern detection (sequential chars, repeated chars)
- Common password checking (top 100 weak passwords)
- Character diversity analysis
- Crack time estimation

**Scoring**:
- 0-39: Weak
- 40-59: Medium
- 60-79: Strong
- 80-100: Very Strong

**Usage**:
```javascript
// From Node.js backend or direct API call
const response = await axios.post('http://localhost:5001/analyze-password', {
  password: 'MySecurePassword123!'
});
```

## 🔄 Training the Model

### Automatic Training
The model automatically logs login data when users authenticate.

### Manual Training
You can manually trigger training once you have sufficient data:

```bash
curl -X POST http://localhost:5001/train
```

**Training Requirements**:
- Minimum: 50 login records
- Recommended: 100+ login records
- Data location: `server/ml_service/data/login_logs.json`

**Training Response**:
```json
{
  "status": "success",
  "model": "anomaly_detector",
  "metrics": {
    "totalSamples": 120,
    "anomaliesDetected": 12,
    "anomalyRate": 0.1
  },
  "message": "Model trained successfully"
}
```

## 📁 Data Storage

### Login Logs
- **Path**: `server/ml_service/data/login_logs.json`
- **Max Size**: 10,000 entries (auto-rotation)
- **Format**:
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "ipAddress": "192.168.1.100",
  "userAgent": "Mozilla/5.0...",
  "endpoint": "/api/auth/login"
}
```

### Model Files
- **Path**: `server/ml_service/data/models/`
- **Files**:
  - `anomaly_model.pkl` - Trained Isolation Forest model
  - `scaler.pkl` - Feature scaler for normalization

## 🔧 Configuration

### Environment Variables (Optional)

Add to `server/.env`:
```bash
ML_SERVICE_URL=http://localhost:5001
```

### Changing ML Service Port

Edit `server/ml_service/app.py`:
```python
if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Change port here
```

## 🚨 Troubleshooting

### Issue: "Module not found" error
**Solution**: Ensure all dependencies are installed:
```bash
pip install -r requirements.txt --upgrade
```

### Issue: ML service not accessible from Node.js
**Solution**: 
1. Check if ML service is running: `curl http://localhost:5001/health`
2. Verify `ML_SERVICE_URL` in `.env`
3. Check firewall settings

### Issue: "Insufficient training data" error
**Solution**: 
- Wait until at least 50 login records are collected
- Check `server/ml_service/data/login_logs.json` exists
- Users need to login multiple times to generate data

### Issue: Python version compatibility
**Solution**: 
- Use Python 3.8 or higher
- Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
pip install -r requirements.txt
```

## 🎮 Admin Dashboard Features

Once the ML service is running and trained, admins can:

1. **View ML Statistics**
   - GET `/api/ml/stats`
   - Shows training data count, model status, anomaly rate

2. **Trigger Manual Training**
   - POST `/api/ml/train`
   - Requires admin role
   - Retrains model with latest data

3. **Monitor Anomaly Detection**
   - Each login automatically checks for anomalies
   - High-risk logins are flagged in real-time
   - Detailed risk factors provided

## 📊 Performance Metrics

### Expected Performance:
- **Password Analysis**: < 50ms response time
- **Anomaly Detection**: < 200ms response time
- **Model Training**: 1-5 seconds (depends on data size)
- **Memory Usage**: ~100-200MB

### Scalability:
- Handles 1000+ requests per minute
- Model retraining recommended every 1000 new logins
- Automatic log rotation at 10,000 entries

## 🔐 Security Considerations

1. **No Password Storage**: Password analyzer receives passwords for analysis only, never stores them
2. **User Privacy**: Login logs use hashed IP and user agent for privacy
3. **Admin-Only Training**: Only administrators can trigger model retraining
4. **CORS Protection**: ML service only accepts requests from configured frontend URL

## 🚀 Production Deployment

### Recommendations:
1. Use a process manager (PM2, supervisor) for auto-restart
2. Enable HTTPS for ML service
3. Set up monitoring and logging
4. Regular model retraining schedule
5. Database backup for training data

### PM2 Example:
```bash
pm2 start app.py --name ml-service --interpreter python3
pm2 save
pm2 startup
```

## 📚 Additional Resources

- [Isolation Forest Paper](https://cs.nju.edu.cn/zhouzh/zhouzh.files/publication/icdm08b.pdf)
- [scikit-learn Documentation](https://scikit-learn.org/stable/)
- [Flask Documentation](https://flask.palletsprojects.com/)

## 🆘 Support

For issues or questions:
1. Check the [main README](../../README.md)
2. Review [ML_IMPLEMENTATION_GUIDE.md](../../ML_IMPLEMENTATION_GUIDE.md)
3. Open an issue on GitHub

---

**Note**: The ML service is optional. The application works without it, but ML-powered features will be unavailable.
