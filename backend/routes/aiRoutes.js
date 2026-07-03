const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    analyzeJD,
    interviewPreparation,
    careerFeedback,
} = require("../controllers/aiController");

router.post(
    "/jd-analyze/:id",
    protect,
    analyzeJD
);

router.get(
    "/interview/:id",
    protect,
    interviewPreparation
);

router.get(
    "/career/:id",
    protect,
    careerFeedback
);

module.exports = router;