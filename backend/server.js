require("dotenv").config();
const express = require("express");
const dns = require('dns');
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const peerRoutes = require("./routes/peerRoutes");
const userRoutes = require("./routes/userRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const allowed = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : [];

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────
app.use(cors({ origin: (origin, cb) => { if(!origin) return cb(null, true); 
  return cb(null, allowed.length === 0 || allowed.includes(origin)); }, credentials: true }));
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/peers", peerRoutes);
app.use("/api/users", userRoutes); // user profile routes
app.use("/uploads", express.static("uploads")); // serve uploaded files
app.use("/api/sessions", sessionRoutes);
app.use("/api/notifications", require("./routes/notificationRoutes"));

app.get("/", (req, res) => {
  res.send("SheLearn API is running.");
});

// ─── Connect to MongoDB, then start server ────────────────────────────
const PORT = process.env.PORT || 5000;

// In development, prefer public DNS servers to avoid local DNS issues
if (process.env.NODE_ENV !== 'production') {
  try {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
    console.log('Using fallback DNS servers for SRV resolution');
  } catch (e) {
    console.warn('Failed to set DNS servers:', e);
  }
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });