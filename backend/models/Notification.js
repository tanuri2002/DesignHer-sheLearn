const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: String,
  message: String,
  read: { type: Boolean, default: false },
  relatedSession: { type: mongoose.Schema.Types.ObjectId, ref: "Session" },
}, { timestamps: true });

module.exports = mongoose.model("Notification", notificationSchema);