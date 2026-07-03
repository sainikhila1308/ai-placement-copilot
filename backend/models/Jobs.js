const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
{
  company: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Applied", "Interview", "Selected", "Rejected"],
    default: "Applied",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
},
{ timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);