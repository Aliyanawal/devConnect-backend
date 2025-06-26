const Application = require('../models/applicationModel');
const Job = require('../models/jobModels');

exports.applyToJob = async (req, res) => {
  const { jobId } = req.params;
  const userId = req.user.id;

  const existing = await Application.findOne({ user: userId, job: jobId });
  if (existing) {
    return res.status(400).json({ message: 'Already applied to this job' });
  }

  const application = new Application({ user: userId, job: jobId });
  await application.save();

  res.status(201).json({ message: 'Application submitted' });
};

exports.getAppliedJobs = async (req, res) => {
  const applications = await Application.find({ user: req.user.id }).populate('job');
  const appliedJobs = applications.map(app => ({
    _id: app.job._id,
    role: app.job.role,
    company: app.job.company,
    status: app.status || "Pending",
  }));

  res.json(appliedJobs);
};
