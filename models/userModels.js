const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },

    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    password:{
        type: String,
        minlength: 8,

    },
     uid: {
        type: String,
        unique: true, // Ensures that each uid is unique
        sparse: true, // Allows `uid` to be optional when using email/password
    },
    bio: { type: String, default: '' },
  education: { type: String, default: '' },
  experience: { type: String, default: '' },
  resume: { type: String, default: '' },
  github: { type: String, default: '' },
    

}, 
{ timestamps: true }


);

const User = mongoose.model("users", userSchema);
module.exports = User;
