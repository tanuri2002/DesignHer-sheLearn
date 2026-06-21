const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  learner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  topic: String,
  requestedTime: String,
  status: { type: String, enum: ["pending", "accepted", "declined", "completed"], default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model("Session", sessionSchema);