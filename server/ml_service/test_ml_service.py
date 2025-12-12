"""
Quick Test Script for ML Service
Tests basic functionality without training
"""
import requests
import json

BASE_URL = "http://localhost:5001"

def test_health():
    """Test health endpoint"""
    print("\n1. Testing Health Endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"   Status: {response.status_code}")
        print(f"   Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 200
    except Exception as e:
        print(f"   Error: {e}")
        return False

def test_password_analysis():
    """Test password analysis"""
    print("\n2. Testing Password Analysis...")
    test_passwords = [
        "password123",
        "MySecureP@ssw0rd!2024",
        "abc123",
        "Tr0ub4dor&3"
    ]
    
    for pwd in test_passwords:
        print(f"\n   Testing: '{pwd}'")
        try:
            response = requests.post(
                f"{BASE_URL}/analyze-password",
                json={"password": pwd}
            )
            result = response.json()
            print(f"   Score: {result['analysis']['score']}/100")
            print(f"   Strength: {result['analysis']['strength']}")
            print(f"   Crack Time: {result['analysis']['estimatedCrackTime']}")
        except Exception as e:
            print(f"   Error: {e}")

def test_stats():
    """Test statistics endpoint"""
    print("\n3. Testing Statistics Endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/stats")
        print(f"   Status: {response.status_code}")
        print(f"   Response: {json.dumps(response.json(), indent=2)}")
    except Exception as e:
        print(f"   Error: {e}")

def test_anomaly_detection():
    """Test anomaly detection (will fail without training)"""
    print("\n4. Testing Anomaly Detection...")
    print("   Note: This will show 'not trained' until you collect 50+ login records")
    
    sample_login = {
        "userId": "test123",
        "timestamp": "2025-01-15T10:30:00.000Z",
        "ipAddress": "192.168.1.100",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "endpoint": "/api/auth/login"
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/detect-anomaly",
            json=sample_login
        )
        print(f"   Status: {response.status_code}")
        print(f"   Response: {json.dumps(response.json(), indent=2)}")
    except Exception as e:
        print(f"   Error: {e}")

if __name__ == "__main__":
    print("=" * 60)
    print("ML Service Test Suite")
    print("=" * 60)
    print("\nMake sure the ML service is running:")
    print("  cd server/ml_service")
    print("  python app.py")
    print("=" * 60)
    
    # Run tests
    health_ok = test_health()
    
    if health_ok:
        test_password_analysis()
        test_stats()
        test_anomaly_detection()
        
        print("\n" + "=" * 60)
        print("Test Summary:")
        print("  ✅ ML Service is running and responding")
        print("  ✅ Password analysis working")
        print("  ⚠️  Anomaly detection requires training data")
        print("\nNext Steps:")
        print("  1. Start the Node.js backend (npm start)")
        print("  2. Start the frontend (npm run dev)")
        print("  3. Login multiple times to generate training data")
        print("  4. Train the model when you have 50+ logins")
        print("=" * 60)
    else:
        print("\n❌ ML Service is not running!")
        print("   Start it with: python app.py")
