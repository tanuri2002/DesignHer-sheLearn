const express = require("express");
const router = express.Router();
const multer = require("multer");
const { updateProfile } = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");

const upload = multer({ dest: "uploads/" }); // simple disk storage for now

router.put("/profile", verifyToken, upload.single("profilePicture"), updateProfile);

module.exports = router;