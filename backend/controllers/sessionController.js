const Session = require("../models/Session");
const Notification = require("../models/Notification");

exports.createSession = async (req, res) => {
  try {
    const { teacherId, topic, slot } = req.body;
    if (!teacherId) return res.status(400).json({ message: "Missing teacherId." });

    // ensure teacher exists
    const User = require("../models/User");
    const teacher = await User.findById(teacherId).select("fullName");
    if (!teacher) return res.status(404).json({ message: "Teacher not found." });

    // create the session
    const session = await Session.create({
      teacher: teacherId,
      learner: req.userId,
      topic: topic || "",
      requestedTime: slot || "",
    });

    // notify the teacher
    await Notification.create({
      user: teacherId,
      type: "session_request",
      message: `New session request from learner`,
      relatedSession: session._id,
    });

    res.status(201).json({ message: "Session requested.", session });
  } catch (err) {
    console.error("Create session error:", err);
    res.status(500).json({ message: "Could not create session." });
  }
};

// GET sessions where I'm the learner (my upcoming/pending sessions)
exports.getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ learner: req.userId })
      .populate("teacher", "fullName profilePicture")
      .sort({ createdAt: -1 });
    res.status(200).json(sessions);
  } catch (err) {
    console.error("Get my sessions error:", err);
    res.status(500).json({ message: "Could not load your sessions." });
  }
};

// GET sessions where I'm the teacher (requests waiting on me)
exports.getRequestsForMe = async (req, res) => {
  try {
    const sessions = await Session.find({ teacher: req.userId })
      .populate("learner", "fullName profilePicture")
      .sort({ createdAt: -1 });
    res.status(200).json(sessions);
  } catch (err) {
    console.error("Get requests error:", err);
    res.status(500).json({ message: "Could not load session requests." });
  }
};

// PATCH accept/decline a session request (only the teacher can do this)
exports.respondToSession = async (req, res) => {
  try {
    const { status } = req.body; // "accepted" or "declined"
    const session = await Session.findById(req.params.id);

    if (!session) return res.status(404).json({ message: "Session not found." });
    if (session.teacher.toString() !== req.userId) {
      return res.status(403).json({ message: "You can't respond to this session." });
    }
    if (!["accepted", "declined"].includes(status)) {
      return res.status(400).json({ message: "Invalid status." });
    }

    session.status = status;
    await session.save();

    await Notification.create({
      user: session.learner,
      type: status === "accepted" ? "session_accepted" : "session_declined",
      message: status === "accepted"
        ? "Your session request was accepted."
        : "Your session request was declined.",
      relatedSession: session._id,
    });

    res.status(200).json({ message: `Session ${status}.`, session });
  } catch (err) {
    console.error("Respond to session error:", err);
    res.status(500).json({ message: "Could not update session." });
  }
};