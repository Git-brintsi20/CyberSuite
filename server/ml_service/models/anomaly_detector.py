import numpy as np
import json
import os
from datetime import datetime
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import joblib

class AnomalyDetector:
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        self.model_path = os.path.join(os.path.dirname(__file__), '../data/models/anomaly_model.pkl')
        self.scaler_path = os.path.join(os.path.dirname(__file__), '../data/models/scaler.pkl')
        
        # Load existing model if available
        self.load_model()
    
    def is_trained(self):
        """Check if model is trained"""
        return self.model is not None
    
    def get_training_data_size(self):
        """Get number of training samples"""
        data_path = os.path.join(os.path.dirname(__file__), '../data/login_logs.json')
        if os.path.exists(data_path):
            with open(data_path, 'r') as f:
                logs = json.load(f)
                return len(logs)
        return 0
    
    def extract_features(self, login_data):
        """
        Extract numerical features from login data
        Returns: numpy array of features
        """
        features = []
        
        # 1. Hour of day (0-23)
        timestamp = datetime.fromisoformat(login_data['timestamp'].replace('Z', '+00:00'))
        features.append(timestamp.hour)
        
        # 2. Day of week (0-6)
        features.append(timestamp.weekday())
        
        # 3. Is weekend (0 or 1)
        features.append(1 if timestamp.weekday() >= 5 else 0)
        
        # 4. IP address hash (normalized)
        ip_hash = hash(login_data.get('ipAddress', '')) % 1000
        features.append(ip_hash / 1000.0)
        
        # 5. User agent hash (normalized)
        ua_hash = hash(login_data.get('userAgent', '')) % 1000
        features.append(ua_hash / 1000.0)
        
        # 6. Time since last login (hours) - from historical data
        if 'historicalLogins' in login_data and login_data['historicalLogins']:
            last_login = datetime.fromisoformat(
                login_data['historicalLogins'][-1]['timestamp'].replace('Z', '+00:00')
            )
            time_diff = (timestamp - last_login).total_seconds() / 3600
            features.append(min(time_diff, 168))  # Cap at 1 week
        else:
            features.append(168)  # Default to 1 week
        
        # 7. Login frequency (logins in last 24 hours)
        if 'historicalLogins' in login_data:
            recent_logins = [
                l for l in login_data['historicalLogins']
                if (timestamp - datetime.fromisoformat(l['timestamp'].replace('Z', '+00:00'))).days == 0
            ]
            features.append(len(recent_logins))
        else:
            features.append(0)
        
        return np.array(features).reshape(1, -1)
    
    def train(self):
        """
        Train the anomaly detection model using historical login data
        """
        # Load training data
        data_path = os.path.join(os.path.dirname(__file__), '../data/login_logs.json')
        
        if not os.path.exists(data_path):
            raise FileNotFoundError("No training data found. Please collect login data first.")
        
        with open(data_path, 'r') as f:
            logs = json.load(f)
        
        if len(logs) < 50:
            raise ValueError(f"Insufficient training data. Need at least 50 login records, got {len(logs)}.")
        
        # Extract features from all logs
        X = []
        for i, log in enumerate(logs):
            # Build historical context for each login
            historical = logs[:i] if i > 0 else []
            log['historicalLogins'] = historical
            
            features = self.extract_features(log)
            X.append(features[0])
        
        X = np.array(X)
        
        # Scale features
        X_scaled = self.scaler.fit_transform(X)
        
        # Train Isolation Forest
        self.model = IsolationForest(
            contamination=0.1,  # Assume 10% anomalies
            random_state=42,
            n_estimators=100
        )
        self.model.fit(X_scaled)
        
        # Save model
        self.save_model()
        
        # Calculate metrics
        predictions = self.model.predict(X_scaled)
        anomaly_count = np.sum(predictions == -1)
        
        return {
            'totalSamples': len(X),
            'anomaliesDetected': int(anomaly_count),
            'anomalyRate': float(anomaly_count / len(X))
        }
    
    def predict(self, features):
        """
        Predict if login is anomalous
        Returns: 1 for anomaly, -1 for normal
        """
        if self.model is None:
            # If no model trained, return normal
            return -1
        
        features_scaled = self.scaler.transform(features)
        prediction = self.model.predict(features_scaled)
        return prediction[0]
    
    def score(self, features):
        """
        Get anomaly score (0-100, higher = more anomalous)
        """
        if self.model is None:
            return 0.0
        
        features_scaled = self.scaler.transform(features)
        # Isolation Forest returns negative scores, transform to 0-100
        raw_score = self.model.score_samples(features_scaled)[0]
        # Normalize to 0-100 (more negative = more anomalous)
        normalized_score = max(0, min(100, (1 - (raw_score + 0.5)) * 100))
        return normalized_score
    
    def get_anomaly_factors(self, features, login_data):
        """
        Explain which factors contributed to anomaly
        """
        factors = []
        f = features[0]
        
        # Hour analysis
        if f[0] < 6 or f[0] > 22:
            factors.append('Unusual login time (late night/early morning)')
        
        # Time since last login
        if f[5] > 72:  # More than 3 days
            factors.append('Long time since last login (inactive account)')
        elif f[5] < 0.5:  # Less than 30 minutes
            factors.append('Very frequent logins (possible automated access)')
        
        # Login frequency
        if f[6] > 5:
            factors.append('High login frequency in 24h (possible brute force)')
        
        # Weekend login
        if f[2] == 1 and 'endpoint' in login_data:
            factors.append('Weekend login activity')
        
        return factors if factors else ['No specific risk factors identified']
    
    def save_model(self):
        """Save trained model to disk"""
        os.makedirs(os.path.dirname(self.model_path), exist_ok=True)
        joblib.dump(self.model, self.model_path)
        joblib.dump(self.scaler, self.scaler_path)
        print(f"Model saved to {self.model_path}")
    
    def load_model(self):
        """Load trained model from disk"""
        try:
            if os.path.exists(self.model_path) and os.path.exists(self.scaler_path):
                self.model = joblib.load(self.model_path)
                self.scaler = joblib.load(self.scaler_path)
                print("Model loaded successfully")
        except Exception as e:
            print(f"Could not load model: {e}")
            self.model = None
