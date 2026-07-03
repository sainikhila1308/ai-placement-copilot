const mongoose = require("mongoose");

const aiSessionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    jobDescription: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AISession", aiSessionSchema);