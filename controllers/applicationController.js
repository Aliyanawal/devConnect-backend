const Application = require('../models/applicationModel');
const Job = require('../models/jobModels');

exports.applyToJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.id;
    const file = req.file; // ✅ multer stores the uploaded file here

    // Check if file is uploaded
    if (!file) {
      return res.status(400).json({ message: 'CV file is required.' });
    }

    // Check for duplicate application
    const existing = await Application.findOne({ user: userId, job: jobId });
    if (existing) {
      return res.status(400).json({ message: 'Already applied to this job' });
    }

    const application = new Application({
      user: userId,
      job: jobId,
      cvFile: file.filename, // or file.path if you want full path
    });

    await application.save();

    res.status(201).json({ message: 'Application submitted successfully' });

  } catch (error) {
    console.error("Application Error:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getAppliedJobs = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.id }).populate('job');
    const appliedJobs = applications.map(app => ({
      _id: app.job._id,
      role: app.job.role,
      company: app.job.company,
      cv: app.cvFile ? `/uploads/${app.cvFile}` : null,
      status: app.status || "Pending",
    }));

    res.json(appliedJobs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch applications', error });
  }
};
