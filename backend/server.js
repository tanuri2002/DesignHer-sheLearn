require("dotenv").config();
const express = require("express");
const dns = require('dns');
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const peerRoutes = require("./routes/peerRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/peers", peerRoutes);
app.use("/api/users", userRoutes); // user profile routes
app.use("/uploads", express.static("uploads")); // serve uploaded files

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