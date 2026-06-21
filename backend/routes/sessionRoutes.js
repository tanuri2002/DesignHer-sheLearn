const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { createSession } = require("../controllers/sessionController");

const {
	getMySessions,
	getRequestsForMe,
	respondToSession,
} = require("../controllers/sessionController");

router.post("/", verifyToken, createSession);
router.get("/mine", verifyToken, getMySessions);
router.get("/requests", verifyToken, getRequestsForMe);
router.patch("/:id/respond", verifyToken, respondToSession);

module.exports = router;