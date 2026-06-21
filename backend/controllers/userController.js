const User = require("../models/User");

exports.updateProfile = async (req, res) => {
  try {
    const { status, bio } = req.body;
    const updates = { status, bio };

    if (req.file) {
      updates.profilePicture = `/uploads/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(req.userId, updates, { new: true });
    res.status(200).json({ message: "Profile updated.", user });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Something went wrong." });
  }
};