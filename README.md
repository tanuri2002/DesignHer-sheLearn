# SheLearn 🎓✨
> A peer skill exchange and AI-powered learning platform built for women in engineering.

---

## 📌 Problem Statement

Female engineering students often face a dual challenge: they lack structured guidance on *where to begin* learning a new field, and they have limited access to informal peer networks where practical skills are shared. Existing platforms are either too formal, not community-driven, or fail to address the specific needs of women in STEM environments.

This gap leaves many talented students feeling lost — unsure of what to learn first, unable to find peers who can help, and without a sense of community or recognition for their growth.

---

## 💡 Solution Overview

**SheLearn** is a full-stack web application that combines AI-powered learning roadmap generation with a peer-to-peer skill exchange system — all built specifically for women in engineering.

A student can:
1. Enter any field she wants to learn (e.g. Cybersecurity, AI/ML, Web Development)
2. Receive an AI-generated, milestone-based learning roadmap with curated free resources (YouTube videos, courses, articles)
3. Be matched with a peer who can teach her the next skill she needs
4. Book 1-on-1 sessions with peers, rate sessions, and track her progress
5. Earn badges and climb a community leaderboard that recognises contribution

SheLearn doesn't just connect students — it empowers them with a clear path forward and a community to grow with.

---

## 🛠️ Technologies Used

### Frontend
| Technology | Purpose | Evidence |
|---|---|---|
| React.js (Vite) | UI framework and build tool | `frontend/package.json` → `"react": "^18.x"` |
| Tailwind CSS | Utility-first styling | `frontend/tailwind.config.js` |
| React Router DOM | Client-side page navigation | `frontend/src/router/index.jsx` |
| Axios | HTTP requests to backend API | `frontend/src/api/axios.js` |
| Lucide React | Icon library | Used throughout UI components |

### Backend
| Technology | Purpose | Evidence |
|---|---|---|
| Node.js + Express.js | REST API server | `backend/server.js` |
| MongoDB + Mongoose | Database and ODM | `backend/models/` |
| JSON Web Tokens (JWT) | User authentication | `backend/middleware/auth.js` |
| bcryptjs | Password hashing | `backend/controllers/authController.js` |
| dotenv | Environment variable management | `backend/.env` (not committed) |

### AI Integration
| Technology | Purpose | Evidence |
|---|---|---|
| Anthropic Claude API | Learning roadmap generation + peer matching | `backend/controllers/aiController.js` |
| Claude claude-sonnet-4-6 model | Structured JSON roadmap generation | API call in `aiController.js` |

### Deployment
| Service | Purpose |
|---|---|
| Vercel | Frontend hosting |
| Render | Backend hosting |
| MongoDB Atlas | Cloud database |

---

## 🏗️ Architectural Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER (Browser)                           │
└───────────────────────────┬─────────────────────────────────────┘
                            │  HTTPS
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                FRONTEND — React.js + Tailwind CSS               │
│                      Hosted on Vercel                           │
│                                                                 │
│  ┌──────────┐ ┌──────────┐ ┌────────────┐ ┌─────────────────┐  │
│  │ Landing  │ │Dashboard │ │Find Peers  │ │ Learning Tracks │  │
│  └──────────┘ └──────────┘ └────────────┘ └─────────────────┘  │
│  ┌──────────┐ ┌──────────┐ ┌────────────┐                       │
│  │  Booking │ │  My Path │ │Leaderboard │                       │
│  └──────────┘ └──────────┘ └────────────┘                       │
└───────────────────────────┬─────────────────────────────────────┘
                            │  REST API (Axios)
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│              BACKEND — Node.js + Express.js                     │
│                      Hosted on Render                           │
│                                                                 │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │ Auth Routes │  │ User Routes  │  │   AI Routes          │   │
│  │ /api/auth   │  │ /api/users   │  │   /api/ai            │   │
│  └──────┬──────┘  └──────┬───────┘  └──────────┬───────────┘   │
│         │                │                      │               │
│  ┌──────▼────────────────▼──────┐    ┌──────────▼───────────┐   │
│  │     Mongoose ODM             │    │  Anthropic Claude    │   │
│  │  (Models: User, Session,     │    │  API Integration     │   │
│  │   Skill, Badge, Track)       │    │  (Roadmap + Matching)│   │
│  └──────────────┬───────────────┘    └──────────────────────┘   │
└─────────────────┼───────────────────────────────────────────────┘
                  │  Mongoose connection
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                  MongoDB Atlas (Cloud Database)                  │
│                                                                 │
│   Collections: users · sessions · skills · badges · tracks     │
└─────────────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features

### 🤖 AI-Powered Learning Tracks
- Enter any field (Cybersecurity, AI/ML, Web Dev, Networking, etc.)
- Claude AI generates a structured, milestone-based roadmap
- Each milestone includes free YouTube videos, free courses, and articles
- Progress is tracked per milestone with checkboxes

### 👩‍💻 Peer Skill Exchange
- Post skills you can teach and skills you want to learn
- Browse and filter peers by skill category
- AI matches you with the best peer based on your learning goals

### 📅 Session Booking
- Book 1-on-1 sessions with peers via an interactive calendar
- Choose topic, duration, and time slot
- Rate and review sessions after completion

### 🏆 Gamification & Community
- Earn badges for teaching, learning, and streaks
- Community leaderboard with XP system
- Recognition for contributions encourages active participation

### 🔐 Secure Authentication
- JWT-based user registration and login
- Passwords hashed with bcrypt
- Protected routes for authenticated users only

### 📱 Responsive Design
- Fully responsive across desktop, tablet, and mobile
- Clean, accessible UI built with Tailwind CSS

---

## 📁 Project Structure

```
shelearn/
├── frontend/                   # React.js application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page components (Dashboard, Peers, etc.)
│   │   ├── api/                # Axios API calls
│   │   ├── context/            # Auth context
│   │   └── router/             # React Router config
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                    # Node.js + Express API
│   ├── controllers/            # Route logic
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── sessionController.js
│   │   └── aiController.js     # Claude API integration
│   ├── models/                 # Mongoose schemas
│   │   ├── User.js
│   │   ├── Session.js
│   │   ├── Skill.js
│   │   └── Track.js
│   ├── routes/                 # Express routes
│   ├── middleware/             # JWT auth middleware
│   ├── server.js               # Entry point
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started (Local Setup)

### Prerequisites
- Node.js v20+
- MongoDB Atlas account
- Anthropic API key

### 1. Clone the repository
```bash
git clone https://github.com/tanuri2002/sheLearn.git
cd shelearn
```

### 2. Backend setup
```bash
cd backend
npm install
```
Create a `.env` file:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ANTHROPIC_API_KEY=your_anthropic_api_key
```
```bash
npm run dev
```

### 3. Frontend setup
```bash
cd ../frontend
npm install
npm run dev
```

Visit `http://localhost:5173` to view the app.

---

## 👩‍💻 Developer

**Tanuri Bawanya**
Computer Engineering, University of Ruhuna
DesignHer 2.0 Competition — Faculty of Engineering

---

*SheLearn — Learn from her. Grow together.*