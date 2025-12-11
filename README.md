# CyberSuite - Complete Cybersecurity Dashboard

A full-stack cybersecurity suite featuring password management with AES-256 encryption, network scanning, file vault, and security education.

## 🚀 Features

- **🔐 Password Manager**: Securely store passwords with military-grade AES-256-GCM encryption
- **👁️ Network Scanner**: Monitor and scan your network for vulnerabilities  
- **📁 File Vault**: Encrypted file storage and management
- **📚 Security Education**: Learn cybersecurity best practices
- **🛡️ Threat Dashboard**: Real-time security metrics and alerts
- **🔒 JWT Authentication**: Secure cookie-based authentication
- **⚡ Modern Stack**: Next.js 16 + Express + MongoDB

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** with App Router
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **Axios** for API calls
- **Framer Motion** for animations

### Backend
- **Express.js** - REST API
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **AES-256-GCM** for data encryption
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
