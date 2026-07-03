const express = require("express");
const router = express.Router();

const Job = require("../models/Jobs");
const protect = require("../middleware/authMiddleware");
// ADD JOB
router.post("/", protect, async (req, res) => {
  try {
    const { company, role, status } = req.body;

    const job = await Job.create({
      company,
      role,
      status,
      user: req.user.userId,
    });

    res.status(201).json({
      message: "Job Added Successfully",
      job,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ALL JOBS
router.get("/", protect, async (req, res) => {
  try {
    const jobs = await Job.find({
      user: req.user.userId,
    });

    res.status(200).json(jobs);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// GET SINGLE JOB
router.get("/:id", protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json(job);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// UPDATE JOB
router.put("/:id", protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (job.user.toString() !== req.user.userId) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Job Updated Successfully",
      updatedJob,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE JOB
router.delete("/:id", protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }
    console.log("job.user =", job.user);
console.log("req.user =", req.user);

if (job.user && job.user.toString() !== req.user.userId)  {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Job Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;