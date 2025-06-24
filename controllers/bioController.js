// backend/controllers/userController.js
const User = require("../models/userModels");
const Bio = require("../models/bioModels");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// exports.fetch = async(req, res) => {

//     const users = await User.find();
//     if(users.length ===0 ){
//       return res.status(404).json({message: "user Not Found."});
//     }
//     res.status(200).json(users);
    
 
// };

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

