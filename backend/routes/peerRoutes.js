const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { getPeers } = require("../controllers/peerController");
// Public listing of peers (users who opted into the peer directory)
router.get("/", getPeers);

module.exports = router;