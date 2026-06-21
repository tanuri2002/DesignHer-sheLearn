const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// POST /api/auth/signup
const signup = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      department,
      year,
      teaches,       // optional array, e.g. ["React", "Figma"]
      learning,      // optional array, e.g. ["Node.js"]
      showOnPeerPage, // optional boolean
    } = req.body;

    // ─── Basic required-field validation ─────────────────────────────
    if (!fullName || !email || !password || !department || !year) {
      return res.status(400).json({ message: "Please fill in all required fields." });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters." });
    }

    // ─── Check for existing account ──────────────────────────────────
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    // ─── Hash password ────────────────────────────────────────────────
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ─── Create user ──────────────────────────────────────────────────
    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
      department,
      year,
      teaches: Array.isArray(teaches) ? teaches : [],
      learning: Array.isArray(learning) ? learning : [],
      showOnPeerPage: showOnPeerPage !== undefined ? showOnPeerPage : true,
    });

    // ─── Issue JWT so the frontend can log the user in immediately ────
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Account created successfully.",
      token,
      user, // password is automatically stripped by the toJSON method on the model
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please enter your email and password." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Logged in successfully.",
      token,
      user,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

module.exports = { signup, login };