const mongoose = require('mongoose');

const bioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  uid: { type: String }, // for Google login (optional)
  bio: { type: String, default: '' },
  education: { type: String, default: '' },
  experience: { type: String, default: '' },
  resume: { type: String, default: '' },
  github: { type: String, default: '' },
}, { timestamps: true });


const Bio = mongoose.model("Bio", bioSchema);
module.exports = Bio;