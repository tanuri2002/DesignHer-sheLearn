const Notification = require("../models/Notification");

exports.getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.userId })
      .sort({ createdAt: -1 })
      .limit(30);
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ message: "Could not load notifications." });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { read: true }
    );
    res.status(200).json({ message: "Marked as read." });
  } catch (err) {
    res.status(500).json({ message: "Could not update notification." });
  }
};