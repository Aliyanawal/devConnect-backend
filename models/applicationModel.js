const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  status: { type: String, default: 'Pending' },
  cvFile: { type: String },
  createdAt: { type: Date, default: Date.now }
});


const Application = mongoose.model('Applications', applicationSchema);
module.exports = Application;