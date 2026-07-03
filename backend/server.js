const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config();

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");
const aiSessionRoutes = require("./routes/aiSessionRoutes");
const aiRoutes = require("./routes/aiRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const dashboardRoutes =require("./routes/dashboardRoutes");


connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/ai", aiSessionRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/ai", resumeRoutes);
app.use("/api/dashboard",dashboardRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});