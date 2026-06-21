# SheLearn 🎓✨
> An AI-powered career guidance and peer skill exchange platform for women in engineering.

---

## 📌 Problem Statement

Female engineering students often face a dual challenge: they lack structured guidance on *where to begin* learning a new field, and they have limited access to informal peer networks where practical skills are shared. Existing platforms are either too formal, not community-driven, or fail to address the specific needs of women in STEM environments.

This gap leaves many talented students feeling lost — unsure of what to learn first, unable to find peers who can help, and without a sense of community or recognition for their growth.

---

## 💡 Solution Overview

**SheLearn** is a full-stack web application that combines AI-powered learning roadmap generation with a peer-to-peer skill exchange system — all built specifically for women in engineering.

A student can:
1. Enter any field she wants to learn (e.g. Cybersecurity, AI/ML, Web Development)
2. Receive an AI-generated, milestone-based learning roadmap with curated free resources (YouTube videos, courses, articles) and popular certificate course suggestions
3. Sign up and optionally list skills she can teach and skills she wants to learn
4. Be matched with real peers from the community who can teach her the next skill she needs
5. Book 1-on-1 sessions with peers
6. Earn badges as she teaches, learns, and grows with the community

SheLearn doesn't just connect students — it empowers them with a clear path forward and a community to grow with.

---

## 🛠️ Technologies Used

### Frontend
| Technology | Purpose | Evidence |
|---|---|---|
| React.js (Create React App) | UI framework and build tool | `frontend/package.json` → `"react-scripts"` |
| React Router DOM | Client-side page navigation | Routes defined in `frontend/src/App.js` |
| Inline JS styling (CSS-in-JS) | Component styling | Used throughout `frontend/src/pages/` and `frontend/src/components/` |

### Backend
| Technology | Purpose | Evidence |
|---|---|---|
| Node.js + Express.js | REST API server | `backend/server.js` |
| MongoDB + Mongoose | Database and ODM | `backend/models/` |
| JSON Web Tokens (JWT) | User authentication | `backend/middleware/auth.js` |
| bcryptjs | Password hashing | `backend/controllers/authController.js` |
| dotenv | Environment variable management | `backend/.env` (not committed) |
| cors | Cross-origin requests between Vercel and Railway | `backend/server.js` |

### AI Integration
| Technology | Purpose | Evidence |
|---|---|---|
| Anthropic Claude API | Learning roadmap + certificate course generation | `backend/controllers/aiController.js` |

### Deployment
| Service | Purpose |
|---|---|
| Vercel | Frontend hosting |
| Railway | Backend hosting |
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
│                FRONTEND — React.js (Create React App)           │
│                      Hosted on Vercel                           │
│                                                                 │
│  ┌──────────┐ ┌──────────┐ ┌────────────┐ ┌─────────────────┐  │
│  │   Home   │ │  SignUp  │ │   Login    │ │ Learning Tracks │  │
│  └──────────┘ └──────────┘ └────────────┘ └─────────────────┘  │
│  ┌──────────┐ ┌──────────┐ ┌────────────┐                       │
│  │  Peers   │ │ Profile  │ │   About    │                       │
│  └──────────┘ └──────────┘ └────────────┘                       │
└───────────────────────────┬─────────────────────────────────────┘
                            │  REST API (fetch)
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│              BACKEND — Node.js + Express.js                     │
│                      Hosted on Railway                          │
│                                                                 │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │ Auth Routes │  │ Peer Routes  │  │  Session Routes      │   │
│  │ /api/auth   │  │ /api/peers   │  │  /api/sessions       │   │
│  └──────┬──────┘  └──────┬───────┘  └──────────┬───────────┘   │
│         │                │                      │               │
│  ┌──────▼────────────────▼──────────────────────▼───────────┐   │
│  │     Mongoose ODM                                          │   │
│  │  (Models: User, Session)                                  │   │
│  │  + Badge award logic (backend/utils/badges.js)            │   │
│  └──────────────────────────┬───────────────────────────────┘   │
└─────────────────────────────┼───────────────────────────────────┘
                              │  Mongoose connection
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                  MongoDB Atlas (Cloud Database)                  │
│                                                                 │
│             Collections: users · sessions                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features

### 🤖 AI-Powered Learning Tracks
- Enter any field (Cybersecurity, AI/ML, Web Dev, Networking, etc.) or pick a popular one
- Choose your current level (complete beginner, some basics, intermediate)
- AI generates a structured, milestone-based roadmap with free YouTube videos, courses, and articles
- Includes a list of popular certificate courses relevant to the chosen field
- Peer suggestions appear at key milestones to encourage practice with a real person

### 👩‍💻 Peer Skill Exchange
- During sign-up, students can optionally list skills they can teach and skills they want to learn
- Students choose whether their card appears on the Find Peers page
- All peer cards are generated dynamically from real signup data in MongoDB — nothing is hardcoded
- Browse and filter peers by skill category and availability

### 📅 Session Booking
- Book 1-on-1 sessions with peers — choose a topic and time slot
- Booking automatically updates each user's session counters

### 🏆 Badges & Recognition
- Badges are awarded automatically based on real activity (first session booked, first session taught, 5 sessions taught, profile completed, etc.)
- Badges are visible on the user's Profile page and as small icons on their Peer card

### 🔐 Secure Authentication
- JWT-based user registration and login
- Passwords hashed with bcrypt
- Protected routes for authenticated actions (e.g. booking a session)

### 📱 Responsive Design
- Fully responsive across desktop, tablet, and mobile

---

## 📁 Project Structure

```
sheLearn/
├── frontend/                   # React.js application (Create React App)
│   ├── src/
│   │   ├── components/         # Reusable UI components (NavigationBar, BadgeComponents, etc.)
│   │   ├── pages/               # Page components (Home, SignUp, Login, Peers, Profile, About, etc.)
│   │   ├── context/              # Auth context
│   │   ├── api.js                # Central API URL config (REACT_APP_API_URL)
│   │   └── App.js                # Route definitions
│   └── package.json
│
├── backend/                    # Node.js + Express API
│   ├── controllers/            # Route logic
│   │   ├── authController.js
│   │   ├── peerController.js
│   │   └── sessionController.js
│   ├── models/                 # Mongoose schemas
│   │   ├── User.js
│   │   └── Session.js
│   ├── routes/                 # Express routes
│   ├── middleware/             # JWT auth middleware
│   ├── utils/
│   │   └── badges.js           # Badge definitions and award logic
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
cd sheLearn
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
npm start
```

Visit `http://localhost:3000` to view the app.

---

## 🌐 Live Deployment

- **Frontend (Vercel):** https://design-her-she-learn.vercel.app
- **Backend (Railway):** https://designher-shelearn-production.up.railway.app

---

## 👩‍💻 Developer

**Tanuri Bawanya**
Computer Engineering, University of Ruhuna
DesignHer 2.0 Competition — Faculty of Engineering

---

*SheLearn — Learn from her. Grow together.*