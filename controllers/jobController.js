const Job = require("../models/jobModels");

exports.addJob = async (req, res) => {
  try {
    const { company, role, type, description, location, applyLink } = req.body;

    if (!company || !role || !type || !description) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const newJob = new Job({ company, role, type, description, location, applyLink });
    const savedJob = await newJob.save();

    res.status(201).json({ message: "Job posted successfully", job: savedJob });
  } catch (error) {
    res.status(500).json({ message: "Error posting job", error });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
};
