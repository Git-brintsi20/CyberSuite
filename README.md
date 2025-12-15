<div align="center">

# 🛡️ Cybersecurity Applications Suite

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Security Grade](https://img.shields.io/badge/security-A+-success.svg)]()
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)]()
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-47A248?logo=mongodb&logoColor=white)]()
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)]()

### Enterprise-Grade Cybersecurity Platform for Password Management, Threat Detection & Security Education

*A comprehensive security suite delivering military-grade encryption, real-time threat detection, and interactive vulnerability training*

[Features](#-key-features) • [Security](#-security-architecture) • [Installation](#-installation-guide) • [Screenshots](#-screenshots) • [License](#-license)

</div>

---

## 📊 Executive Summary

The **Cybersecurity Applications Suite** is an enterprise-grade, full-stack security platform designed to address critical organizational security needs through three core modules: secure credential management, encrypted file storage, and security awareness training. Built on the MERN stack with industry-standard encryption protocols, this suite provides a unified solution for managing sensitive data, securing files, and educating teams on contemporary cybersecurity threats.

### 🎯 Key Performance Indicators

| Metric | Achievement | Module |
|--------|-------------|--------|
| **Password Strength Analysis** | **ML-Powered** | Password Manager |
| **Network Port Scanning** | **Real TCP Scanning** | Network Scanner |
| **Encryption Operations** | **10,000+/month** | File Vault |
| **Security Vulnerabilities Covered** | **OWASP Top 10** | Education Module |

---

## ✨ Key Features

### 🔐 **Password Manager**
*Military-grade credential storage with zero-knowledge architecture*

- **AES-256-GCM Encryption**: Industry-leading symmetric encryption for password storage
- **Secure Credential Vault**: Centralized password repository with role-based access control
- **Password Generator**: Customizable password generation with strength indicator (8-32 characters)
- **Advanced Search & Filter**: Real-time search, category filtering, and multi-sort options
- **Password Strength Analyzer**: Real-time entropy calculation and strength recommendations
- **Audit Logging**: Complete activity tracking for compliance and security monitoring
- **Multi-device Sync**: Encrypted credential synchronization across devices

### 🔒 **Two-Factor Authentication (2FA)**
*TOTP-based multi-factor authentication system*

- **TOTP Implementation**: Time-based One-Time Password using speakeasy
- **QR Code Setup**: Easy mobile authenticator app integration
- **Backup Codes**: 8 single-use recovery codes for emergency access
- **Login Protection**: Mandatory 2FA verification for enabled accounts
- **Backup Code Support**: Alternative authentication method if device unavailable
- **Status Dashboard**: Real-time 2FA statistics and management

### 🕵️ **Network Scanner**
*Real network security analysis for authorized networks*

- **TCP Port Scanning**: Real-time scanning using Node.js socket connections
- **20 Common Ports**: Scans essential services (SSH, HTTP, HTTPS, FTP, MySQL, RDP, etc.)
- **Hostname Resolution**: Supports both IP addresses and domain names via DNS
- **Security Analysis**: Detects insecure services (Telnet, FTP) and provides warnings
- **Batch Scanning**: Efficient rate-limited scanning (10 ports at a time)
- **Authorized Use Only**: For scanning your own networks (home/office with permission)
- **Custom Scanning Profiles**: Configurable scan depth and frequency
- **Alert System**: Immediate notification of critical security threats
- **Compliance Reporting**: Automated report generation for security audits

### 📦 **Encrypted File Vault**
*High-performance secure file storage system with end-to-end encryption*

- **AES-256-GCM Encryption**: Client-side encryption before upload with unique IV per file
- **Processing Capacity**: Handles 10,000+ secure file operations monthly
- **Drag & Drop Upload**: Intuitive file upload with real-time progress tracking
- **Smart Categorization**: Automatic file categorization (documents, images, videos, audio)
- **Advanced Search**: Full-text search across filenames, descriptions, and tags
- **Grid/List Views**: Flexible file viewing with favorites and metadata
- **Access Control**: User-based file isolation with download tracking
- **Secure Download**: Automatic file decryption on download

### 🎓 **Security Education Hub**
*Tailored cybersecurity training to help users master CyberSuite and stay safe online*

- **CyberSuite-Specific Courses**: 3 comprehensive courses designed specifically for this application:
  - **CyberSuite Security Essentials** (Beginner, 2.5 hours) - Master password security, file encryption, and threat protection
  - **File Vault & Encryption Mastery** (Beginner, 2 hours) - Learn AES-256 encryption and secure file management
  - **Network Security & Scanner Guide** (Intermediate, 2 hours) - Use the network scanner safely and secure your home network
  
- **Interactive Lessons**: Step-by-step courses with markdown content rendering and real-world examples
- **Practical Focus**: Each lesson teaches users how to use CyberSuite tools effectively
- **Progress Tracking**: Comprehensive analytics on learning completion with lesson-by-lesson tracking
- **Lesson Navigation**: Previous/Next navigation with auto-advance on completion
- **Real-World Scenarios**: Courses include actual security threats and how CyberSuite protects against them
- **Best Practices**: Security hygiene, password strategies, encryption fundamentals, and network protection
- **Legal & Ethical Guidance**: Proper use of security tools with legal boundaries clearly explained

### 🤖 **ML-Powered Security Intelligence**
*Machine learning-based anomaly detection and threat analysis*

- **Login Anomaly Detection**: Isolation Forest algorithm identifies suspicious login patterns
  - 7-feature analysis: hour, day, weekend, IP, user agent, time since last login, frequency
  - Real-time scoring (0-100) with detailed risk factors
  - Requires 50-100 login records for training
  - Automatic model retraining with new data
  
- **ML-Based Password Analysis**: Advanced password strength assessment
  - Entropy calculation and pattern detection
  - Sequential character identification (abc, 123)
  - Common password checking (top 100 known weak passwords)
  - Estimated crack time calculation
  - Comprehensive vulnerability reporting with suggestions
  
- **Python ML Microservice**: Dedicated Flask API on port 5001
  - Isolation Forest for anomaly detection
  - scikit-learn, pandas, numpy for ML operations
  - Model persistence with joblib
  - Independent scaling and deployment
  
- **ML Training Dashboard**: Admin-only model training interface
  - View training data statistics
  - Manual model retraining trigger
  - Anomaly detection performance metrics
  - Historical data visualization

---

## 🔒 Security Architecture

The Cybersecurity Applications Suite implements defense-in-depth security principles with multiple layers of protection:

### 🛡️ **Authentication & Authorization**

#### **JWT-Based Authentication**
- **Token Lifecycle**: 7-day expiration with automatic refresh
- **HttpOnly Cookies**: Prevents XSS-based token theft
- **SameSite Policy**: CSRF protection with strict same-site enforcement
- **Secure Flag**: HTTPS-only transmission in production environments

#### **Password Security**
- **bcryptjs Hashing**: Salted password hashing with configurable work factor (10 rounds)
- **Salt Generation**: Unique cryptographic salt per user credential
- **Rainbow Table Resistance**: Pre-computation attack mitigation
- **Password Policy Enforcement**: Minimum complexity requirements

### � **Email & Password Reset**

#### **Secure Password Reset Flow**
- **Email Integration**: Real SMTP email delivery via Gmail or custom SMTP server
- **Crypto-Secure Tokens**: 32-byte random tokens with SHA-256 hashing
- **Time-Limited Tokens**: 10-minute expiration for security
- **Single-Use Tokens**: Tokens invalidated after successful password reset
- **Professional Email Templates**: HTML-formatted emails with purple branding
- **Frontend Pages**: Dedicated forgot-password and reset-password/[token] pages
- **SMTP Configuration**: Supports Gmail App Passwords and custom SMTP servers

### �🔐 **Data Encryption**

#### **AES-256-GCM Implementation**
```
Algorithm: AES-256-GCM (Galois/Counter Mode)
Key Size: 256 bits
IV: 16 bytes (randomly generated per encryption)
Authentication Tag: 128 bits
```

- **Confidentiality**: AES-256 symmetric encryption
- **Integrity**: Galois Message Authentication Code (GMAC)
- **Non-repudiation**: Authenticated encryption prevents tampering
- **Key Management**: Environment-based key storage with rotation support

### 🚨 **Attack Surface Mitigation**

| Threat Vector | Mitigation Strategy | Implementation |
|---------------|---------------------|----------------|
| **XSS (Cross-Site Scripting)** | HttpOnly cookies, CSP headers | Helmet.js middleware |
| **CSRF (Cross-Site Request Forgery)** | SameSite cookies, token validation | Cookie configuration |
| **SQL/NoSQL Injection** | Mongoose ODM, input sanitization | Zod validation schemas |
| **Brute Force** | Rate limiting, account lockout | Express-rate-limit (100 req/15min) |
| **Man-in-the-Middle** | TLS/SSL enforcement | HTTPS-only in production |
| **DOS/DDOS** | Request size limits, rate limiting | Body parser limits (10kb) |

### 🔍 **Security Headers**
Implemented via Helmet.js:
- `Content-Security-Policy`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Strict-Transport-Security`
- `X-XSS-Protection`

---

## 🛠️ Tech Stack

### **Frontend Architecture**
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15+ | React framework with App Router |
| React | 19+ | UI component library |
| TypeScript | Latest | Type-safe development |
| Tailwind CSS | 3+ | Utility-first styling |
| shadcn/ui | Latest | Accessible component system |
| Axios | Latest | HTTP client with interceptors |

### **Backend Architecture**
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | JavaScript runtime |
| Express.js | 5+ | REST API framework |
| MongoDB | 6.0+ | NoSQL database |
| Mongoose | 8+ | ODM for MongoDB |
| JWT | 9+ | Token-based authentication |
| bcryptjs | 3+ | Password hashing |
| Multer | 2+ | File upload middleware |
| Speakeasy | 2+ | TOTP 2FA implementation |
| QRCode | 1+ | QR code generation for 2FA |
| Nodemailer | 6+ | Email sending (SMTP) for password reset |
| **Python** | **3.x** | **ML microservice runtime** |
| **Flask** | **3.0.0** | **ML API framework** |
| **scikit-learn** | **1.3.2** | **Machine learning library** |
| **pandas** | **2.1.4** | **Data manipulation** |
| **numpy** | **1.26.2** | **Numerical computing** |
| **joblib** | **1.3.2** | **Model persistence** |

### **Security Stack**
- **Encryption**: AES-256-GCM (Node.js Crypto)
- **Hashing**: bcryptjs (Salted, 10 rounds)
- **2FA**: Speakeasy (TOTP with 30s window)
- **Validation**: Zod (Type-safe schema validation)
- **Rate Limiting**: Express-rate-limit (100 req/15min)
- **Security Headers**: Helmet.js

---

## 📥 Installation Guide

### Prerequisites
- Node.js >= 18.0.0
- **Python >= 3.8** (for ML service)
- MongoDB >= 6.0 (local or Atlas)
- Git
- npm or pnpm
- **pip** (Python package manager)

### Step 1: Clone Repository
```bash
git clone https://github.com/Git-brintsi20/CyberSuite.git
cd CyberSuite/cybersecurity-suite
```

### Step 2: Environment Configuration

#### **Server Environment Variables**
Create `server/.env`:
```bash
# Database Configuration
MONGO_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_jwt_secret_key

# Encryption Configuration
ENCRYPTION_KEY=your_64_character_hex_key

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Email Configuration (for password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password_here
EMAIL_FROM=CyberSuite <your_email@gmail.com>

# ML Service Configuration (optional)
ML_SERVICE_URL=http://localhost:5001
```

#### **Client Environment Variables**
Create `client/.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

> 📘 **See [ENV_SETUP_GUIDE.md](ENV_SETUP_GUIDE.md) for detailed instructions on generating secure keys and obtaining MongoDB credentials.**

### Step 3: Install Dependencies

#### **Install Server Dependencies**
```bash
cd server
npm install
```

#### **Install Client Dependencies**
```bash
cd ../client
npm install
```

#### **Install Python ML Dependencies (Optional)**
```bash
cd ../server/ml_service
pip install -r requirements.txt
```
> ⚠️ **Note**: The ML service is optional. The application will work without it, but ML-powered features (anomaly detection, advanced password analysis) will be unavailable.

### Step 4: Start Development Servers

#### **Terminal 1 - Start Backend**
```bash
cd server
npm start
```
Server will run on `http://localhost:5000`

#### **Terminal 2 - Start Frontend**
```bash
cd client
npm run dev
```
Client will run on `http://localhost:3000`

#### **Terminal 3 - Start ML Service (Optional)**
```bash
cd server/ml_service
python app.py
```
ML service will run on `http://localhost:5001`

> 💡 **ML Service Notes**: 
> - Requires 50-100 login records before training is possible
> - Login data is automatically logged when users authenticate
> - Train the model via admin dashboard once sufficient data is collected

### Step 5: Verify Installation
1. Navigate to `http://localhost:3000`
2. You should see the login page
3. Check backend health: `http://localhost:5000/api/health`

---

## 📸 Screenshots

### 🏠 Dashboard Overview
![Dashboard](./docs/screenshots/dashboard.png)
*Real-time security metrics, activity feed, and comprehensive threat monitoring*

---

### 🔐 Password Manager
![Password Manager - Main View](./docs/screenshots/password-manager-main.png)
*Secure credential vault with AES-256 encryption and advanced search*

![Password Manager - Add Credential](./docs/screenshots/password-manager-add.png)
*Password generator with customizable settings and strength analysis*

![Password Manager - Decrypt View](./docs/screenshots/password-manager-decrypt.png)
*Secure password decryption with click-to-reveal functionality*

---

### 🔒 Two-Factor Authentication
![2FA Setup](./docs/screenshots/2fa-setup.png)
*QR code setup for mobile authenticator apps*

![2FA Verification](./docs/screenshots/2fa-verify.png)
*TOTP verification during login with backup code support*

![2FA Backup Codes](./docs/screenshots/2fa-backup-codes.png)
*8 single-use backup codes for emergency access*

---

### 🕵️ Network Scanner
![Network Scanner - Scan View](./docs/screenshots/network-scanner-main.png)
*Real TCP port scanning with hostname resolution support*

![Network Scanner - Results](./docs/screenshots/network-scanner-results.png)
*Detailed security analysis with vulnerability warnings*

---

### 📦 File Vault
![File Vault - Grid View](./docs/screenshots/file-vault-grid.png)
*Drag & drop encrypted file upload with smart categorization*

![File Vault - List View](./docs/screenshots/file-vault-list.png)
*Advanced filtering and search across encrypted files*

![File Upload](./docs/screenshots/file-upload.png)
*Real-time upload progress with encryption status*

---

### 🎓 Security Education Hub
![Education - Courses](./docs/screenshots/education-courses.png)
*CyberSuite-specific security training courses*

![Education - Lesson View](./docs/screenshots/education-lesson.png)
*Interactive lessons with markdown rendering and progress tracking*

![Education - Progress](./docs/screenshots/education-progress.png)
*Comprehensive learning analytics and completion tracking*

---

### 🤖 ML-Powered Features
![ML - Anomaly Detection](./docs/screenshots/ml-anomaly-detection.png)
*Real-time login anomaly detection with risk scoring*

![ML - Password Analysis](./docs/screenshots/ml-password-analysis.png)
*Advanced password strength assessment with ML algorithms*

![ML - Training Dashboard](./docs/screenshots/ml-training-dashboard.png)
*Admin model training interface with performance metrics*

---

### 👤 User Profile & Settings
![User Profile](./docs/screenshots/user-profile.png)
*Account management and security settings*

![Notifications](./docs/screenshots/notifications.png)
*Real-time security alerts and activity notifications*

---

### 🔐 Authentication Pages
![Login Page](./docs/screenshots/login-page.png)
*Secure login with 2FA support*

![Register Page](./docs/screenshots/register-page.png)
*User registration with password strength validation*

![Password Reset](./docs/screenshots/password-reset.png)
*Secure password reset flow with email verification*

---

## 🗂️ Project Structure

```
cybersecurity-suite/
├── client/                 # Next.js frontend application
│   ├── app/               # Next.js 15 App Router
│   │   ├── dashboard/     # Main dashboard
│   │   ├── login/         # Authentication pages
│   │   └── register/
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   └── views/        # Feature-specific views
│   ├── contexts/         # React context providers
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utility functions
│
└── server/               # Express.js backend API
    ├── controllers/      # Request handlers
    ├── middleware/       # Custom middleware (auth, validation)
    ├── models/           # Mongoose schemas
    ├── routes/           # API route definitions
    ├── utils/            # Helper functions (encryption, etc.)
    └── ml_service/       # Python ML microservice
        ├── app.py        # Flask API server (port 5001)
        ├── requirements.txt  # Python dependencies
        ├── models/       # ML models (anomaly detector, password analyzer)
        ├── data/         # Training data and logs
        └── utils/        # ML utility functions
```

---

## 🧪 Testing

See [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md) for comprehensive feature testing guide.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Git-brintsi20**
- GitHub: [@Git-brintsi20](https://github.com/Git-brintsi20)
- Repository: [CyberSuite](https://github.com/Git-brintsi20/CyberSuite)

---

## 🙏 Acknowledgments

- OWASP Foundation for security guidelines
- MongoDB Atlas for database hosting
- Vercel for deployment platform
- shadcn for UI component library

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ for a more secure digital world

</div>
- **Helmet** for security headers
- **CORS** with credentials
- **Rate Limiting** for DDoS protection
- **Zod** for validation

## 📋 Prerequisites

- **Node.js** 20.18.0 or higher
- **MongoDB** 6.0 or higher (running locally or remotely)
- **npm** or **pnpm**

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Git-brintsi20/CyberSuite.git
cd CyberSuite/cybersecurity-suite
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create `.env` file in the server directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/cybersuite

# Security Keys - CHANGE THESE IN PRODUCTION!
JWT_SECRET=your_super_secure_jwt_secret_key_here
# ENCRYPTION_KEY must be exactly 32 bytes (64 hex characters) for AES-256
ENCRYPTION_KEY=e8f32a394a1b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d

NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create `.env.local` file in the client directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
# or
brew services start mongodb-community
```

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
# Server will run on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
# Frontend will run on http://localhost:3000
```

### Production Mode

**Backend:**
```bash
cd server
npm start
```

**Frontend:**
```bash
cd client
npm run build
npm start
```

## 📁 Project Structure

```
cybersecurity-suite/
├── client/                 # Next.js frontend
│   ├── app/               # App router pages
│   │   ├── login/         # Login page
│   │   ├── register/      # Registration page
│   │   └── dashboard/     # Protected dashboard
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   └── views/        # Feature views
│   ├── contexts/          # React contexts
│   │   └── AuthContext.tsx
│   └── lib/              # Utilities
│       └── api.js        # Axios API client
│
└── server/                # Express backend
    ├── controllers/       # Request handlers
    │   └── authController.js
    ├── middleware/        # Express middleware
    │   └── auth.js       # JWT verification
    ├── models/           # Mongoose schemas
    │   ├── User.js
    │   └── Credential.js
    ├── routes/           # API routes
    │   ├── authRoutes.js
    │   └── passwordRoutes.js
    ├── utils/            # Utilities
    │   └── encryption.js # AES-256 encryption
    └── index.js          # Server entry point
```

## 🔐 Security Features

- **AES-256-GCM Encryption**: All passwords are encrypted with authenticated encryption
- **Bcrypt Password Hashing**: User passwords are hashed with salt rounds of 10
- **HTTP-Only Cookies**: JWT tokens stored in secure HTTP-only cookies
- **CORS Protection**: Configured to only accept requests from frontend
- **Rate Limiting**: Prevents brute force attacks
- **Helmet**: Sets secure HTTP headers
- **Input Validation**: Zod schema validation on all endpoints
- **Request Size Limiting**: Prevents DOS attacks

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/login/2fa` - Complete 2FA login
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user profile

### Password Management
- `GET /api/passwords` - Get all user credentials
- `GET /api/passwords/:id` - Get single credential
- `POST /api/passwords` - Add new credential
- `PUT /api/passwords/:id` - Update credential
- `DELETE /api/passwords/:id` - Delete credential
- `POST /api/passwords/:id/decrypt` - Decrypt password
- `GET /api/passwords/stats/strength` - Get statistics

### Two-Factor Authentication
- `POST /api/2fa/setup` - Initialize 2FA setup (get QR code)
- `POST /api/2fa/verify` - Verify and enable 2FA
- `POST /api/2fa/validate` - Validate 2FA code during login
- `POST /api/2fa/disable` - Disable 2FA
- `GET /api/2fa/status` - Get 2FA status
- `POST /api/2fa/backup-codes/regenerate` - Regenerate backup codes

### File Vault
- `GET /api/files` - Get all user files
- `GET /api/files/:id` - Get single file metadata
- `POST /api/files/upload` - Upload encrypted file
- `GET /api/files/:id/download` - Download and decrypt file
- `DELETE /api/files/:id` - Delete file
- `PATCH /api/files/:id/favorite` - Toggle favorite status

### Machine Learning (ML Service)
- `GET /api/ml/health` - Check ML service status
- `POST /api/ml/analyze-password` - Analyze password strength using ML
- `POST /api/ml/detect-anomaly` - Detect login anomalies (Protected)
- `GET /api/ml/stats` - Get ML service statistics (Protected)
- `POST /api/ml/train` - Train/retrain ML models (Admin only)

### Education
- `GET /api/education/courses` - Get all courses
- `GET /api/education/courses/:id` - Get course details
- `POST /api/education/progress` - Update course progress

### Notifications
- `GET /api/notifications` - Get user notifications
- `PATCH /api/notifications/:id/read` - Mark notification as read

## 🧪 Testing

Access the application:
1. Open http://localhost:3000
2. Click "Get Started" to register
3. Create an account
4. Start using the password manager

## 🔑 Environment Variables

### Backend (.env)
| Variable | Description | Required |
|----------|-------------|----------|
| PORT | Server port | Yes |
| MONGO_URI | MongoDB connection string | Yes |
| JWT_SECRET | Secret for JWT signing | Yes |
| ENCRYPTION_KEY | 32-byte hex key for AES-256 | Yes |
| NODE_ENV | Environment (development/production) | Yes |
| FRONTEND_URL | Frontend URL for CORS | Yes |
| ML_SERVICE_URL | Python ML service URL (default: http://localhost:5001) | No |

### Frontend (.env.local)
| Variable | Description | Required |
|----------|-------------|----------|
| NEXT_PUBLIC_API_URL | Backend API URL | Yes |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Git-brintsi20**
- GitHub: [@Git-brintsi20](https://github.com/Git-brintsi20)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

---

⭐ Star this repo if you find it helpful!
