const AISession = require("../models/AISessions");

// Create Session
const createSession = async (req, res) => {
  try {
    const { title, jobDescription } = req.body;

    const session = await AISession.create({
      title,
      jobDescription,
      user: req.user.userId,
    });

    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Sessions
const getSessions = async (req, res) => {
  try {
    const sessions = await AISession.find({
      user: req.user.userId,
    }).sort({
      createdAt: -1,
    });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Session
const getSession = async (req, res) => {
  try {
    const session = await AISession.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    if (session.user.toString() !== req.user.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    res.json(session);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Session
const deleteSession = async (req, res) => {
  try {
    const session = await AISession.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    if (session.user.toString() !== req.user.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    await AISession.findByIdAndDelete(req.params.id);

    res.json({
      message: "Session deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createSession,
  getSessions,
  getSession,
  deleteSession,
};