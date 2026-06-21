const User = require("../models/User");

// GET /api/peers
// Returns every user who has opted in to showing their card on the
// Find Peers page. Never returns users with showOnPeerPage: false.
const getPeers = async (req, res) => {
  try {
    const peers = await User.find({ showOnPeerPage: true }).select(
      "fullName department year teaches learning bio available rating reviewCount"
    );
    res.status(200).json(peers);
  } catch (err) {
    console.error("Get peers error:", err);
    res.status(500).json({ message: "Could not load peers right now." });
  }
};

module.exports = { getPeers };