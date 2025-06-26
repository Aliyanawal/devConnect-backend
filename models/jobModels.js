const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    type: { type: String, required: true }, // e.g. Full-time, Remote
    description: { type: String, required: true },
    location: { type: String, default: "Remote" },
    applyLink: { type: String, default: "" },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;