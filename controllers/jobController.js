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

// exports.applyToJob = async (req, res) => {
//     const { jobId } = req.params;
//   const userId = req.user.id;

//   const existing = await Application.findOne({ user: userId, job: jobId });
//   if (existing) {
//     return res.status(400).json({ message: 'Already applied to this job' });
//   }

//   const application = new Application({ user: userId, job: jobId });
//   await application.save();

//   res.status(201).json({ message: 'Application submitted' });
// };

// exports.appliedJobs = async (req, res) => {
//     const userId = req.user.id;
//   const applications = await Application.find({ user: userId }).populate('job');

//   const appliedJobs = applications.map(app => ({
//     _id: app.job._id,
//     role: app.job.role,
//     company: app.job.company,
//     status: app.status,
//   }));

//   res.json(appliedJobs);
// };
