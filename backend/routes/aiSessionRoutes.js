const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createSession,
  getSessions,
  getSession,
  deleteSession,
} = require("../controllers/aiSessionController");

router.post("/", protect, createSession);

router.get("/", protect, getSessions);

router.get("/:id", protect, getSession);

router.delete("/:id", protect, deleteSession);

module.exports = router;