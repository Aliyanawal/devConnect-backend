const User = require("../models/userModels");
const Bio = require("../models/bioModels");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



// Public route to get all users and their public details
// exports.getAllUsers = async (req, res) => {
  
//     const users = await User.find({}, 'name email bio github education experience resume');
    
//     if (users.length === 0) {
//       return res.status(404).json({ message: "No users found." });
//     }

//     res.status(200).json({
//       status: "success",
//       users,
//     });

  
// };


exports.getUserById = async (req,res) => {
  const user = await User.findById(req.params.id);
  if(!user)return res.status(404).json({message:"User Not Found. "});
  res.status(200).json(user);
};


// exports.update = async(req,res) => {
//   const id = req.params.id;
//   const userExists = await User.findOne({_id:id})
//   if(!userExists){
//     res.status(404).json({message: "User Not Found."})
//   }
//   const UpdateUser = await User.findByIdAndUpdate(id,rer.body,{new:true})
//   res.status(500).json({message: "User Updated."})
// };

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("name bio education experience resume github");
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// @desc    Update logged in user's profile
// @route   PUT /api/user/profile
exports.updateProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id, // ✅ Use _id here
      req.body,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

