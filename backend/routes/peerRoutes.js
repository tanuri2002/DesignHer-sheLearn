const express = require("express");
const router = express.Router();
const { getPeers } = require("../controllers/peerController");

router.get("/", getPeers);

module.exports = router;