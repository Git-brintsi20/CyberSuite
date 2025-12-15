from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import os
import sys

# Add current directory to path
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, current_dir)

# Import models
try:
    from models.anomaly_detector import AnomalyDetector
    from models.password_analyzer import PasswordAnalyzer
except ModuleNotFoundError:
    # Fallback for different directory structures
    import importlib.util
    
    anomaly_path = os.path.join(current_dir, 'models', 'anomaly_detector.py')
    password_path = os.path.join(current_dir, 'models', 'password_analyzer.py')
    
    spec1 = importlib.util.spec_from_file_location("anomaly_detector", anomaly_path)
    anomaly_module = importlib.util.module_from_spec(spec1)
    spec1.loader.exec_module(anomaly_module)
    AnomalyDetector = anomaly_module.AnomalyDetector
    
    spec2 = importlib.util.spec_from_file_location("password_analyzer", password_path)
    password_module = importlib.util.module_from_spec(spec2)
    spec2.loader.exec_module(password_module)
    PasswordAnalyzer = password_module.PasswordAnalyzer

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize ML models
anomaly_detector = AnomalyDetector()
password_analyzer = PasswordAnalyzer()

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'CyberSuite ML Service',
        'version': '1.0.0'
    })

@app.route('/detect-anomaly', methods=['POST'])
def detect_anomaly():
    """
    Detect anomalous login behavior
    Expected input: {
        "userId": "123",
        "timestamp": "2024-12-11T10:30:00Z",
        "ipAddress": "192.168.1.1",
        "userAgent": "Mozilla/5.0...",
        "historicalLogins": [...]
    }
    """
    try:
        data = request.json
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Check if model is trained
        if not anomaly_detector.is_trained():
            return jsonify({
                'isAnomaly': False,
                'anomalyScore': 0,
                'message': 'Model not trained yet. Please train with historical data first.',
                'recommendation': 'Collect more login data'
            })
        
        # Extract features
        features = anomaly_detector.extract_features(data)
        
        # Predict anomaly (returns 1 for anomaly, -1 for normal)
        is_anomaly = anomaly_detector.predict(features)
        
        # Calculate anomaly score (0-100)
        anomaly_score = anomaly_detector.score(features)
        
        return jsonify({
            'isAnomaly': bool(is_anomaly == 1),
            'anomalyScore': float(anomaly_score),
            'factors': anomaly_detector.get_anomaly_factors(features, data),
            'recommendation': 'Verify identity with 2FA' if is_anomaly == 1 else 'Normal login pattern'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/analyze-password', methods=['POST'])
def analyze_password():
    """
    Analyze password strength using ML
    Expected input: {
        "password": "MyP@ssw0rd123"
    }
    """
    try:
        data = request.json
        
        if not data or 'password' not in data:
            return jsonify({'error': 'Password is required'}), 400
        
        password = data.get('password', '')
        
        # ML-based analysis
        analysis = password_analyzer.analyze(password)
        
        return jsonify({
            'score': analysis['score'],  # 0-100
            'strength': analysis['strength'],  # weak/medium/strong/very-strong
            'vulnerabilities': analysis['vulnerabilities'],
            'suggestions': analysis['suggestions'],
            'crackTime': analysis['estimatedCrackTime'],
            'entropy': analysis['entropy']
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/train', methods=['POST'])
def train_model():
    """
    Train/retrain the anomaly detection model
    This should be called periodically with new data
    """
    try:
        # Train the model
        training_result = anomaly_detector.train()
        
        return jsonify({
            'success': True,
            'message': 'Anomaly detection model trained successfully',
            'metrics': training_result
        })
        
    except FileNotFoundError as e:
        return jsonify({
            'success': False,
            'error': 'No training data found',
            'message': str(e)
        }), 404
        
    except ValueError as e:
        return jsonify({
            'success': False,
            'error': 'Insufficient training data',
            'message': str(e)
        }), 400
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/stats', methods=['GET'])
def get_stats():
    """Get ML service statistics"""
    try:
        stats = {
            'modelTrained': anomaly_detector.is_trained(),
            'trainingDataSize': anomaly_detector.get_training_data_size(),
            'passwordAnalyzerReady': True,
            'version': '1.0.0'
        }
        return jsonify(stats)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Start Flask server on port 5001
    print("Starting CyberSuite ML Service on port 5001...")
    app.run(host='0.0.0.0', port=5001, debug=True)
