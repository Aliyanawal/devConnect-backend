const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
    userRegister: async (req , res) => {
        const {name, email, password, uid } = req.body;

        if(uid){
            const hashUid = await bcrypt.hash(uid,10);

            const existingUser = await User.find({uid});
            console.log("hbjhsdfjf".existingUser);
            if(existingUser){
                return res.status(400).json({
                    message: "User with this google UID already exists.",
                    status: "failure",
                    error: true,
                });
            }

            const newUser = new User ({
                uid: hashedUid,
            });
            await newUser.save();
            return res.status(201).json({
                message: "User registered successfully with Google UID!",
                status: "success",
                error: false,
                newUser,
            });

        }
        else{
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if(!passwordRegex.test(password)){
                return res.status(400).json({
                    message:"Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
                    status: "failure",
                    error: true,


                });

            }

            const existingUser = await User.findOne({email});
            
            if (existingUser) {
                return res.status(400).json({
                message: "User with this email already exists.",
                status: "failure",
                error: true,
                });
            }
                  const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                name,
                
                email,
                password: hashedPassword,
            });

            await newUser.save();

            return res.status(201).json({
                message: "User registered successfully!",
                status: "success",
                error: false,
                newUser,
            });


            }

        },

        userLogin: async (req, res) => {
            const {email,password,uid } = req.body;
            if(uid){
                const user = await User.find({uid});
                ContentVisibilityAutoStateChangeEvent.log("user......",user);

                if(!user){
                    return res.status(400).json({
                        message:"User not found with this Google UID. ",
                        status: "failure",
                        error: true,
                    });
                }

                const secret = process.env.SECRET_KEY;
                const token = jwt.sign(
                    {
                    userId: user._id,
                    },
                    secret,
                    { expiresIn: "24h" }
                );

                return res.status(200).json({
                    message: "Login successful with Google UID!",
                    status: "success",
                    error: false,
                    token,
                });

                } else {
                
                const user = await User.findOne({ email });
                if (!user) {
                    return res.status(400).json({
                    message: "User not found.",
                    status: "failure",
                    error: true,
                    });
                }

                // Check if the password is correct
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    return res.status(400).json({
                    message: "Invalid password.",
                    status: "failure",
                    error: true,
                    });
                }

                // Generate a token for the user
                const secret = process.env.SECRET_KEY;
                const token = jwt.sign(
                    {
                    userId: user._id,
                    },
                    secret,
                    { expiresIn: "24h" }
                );

                return res.status(200).json({
                    message: "Login successful!",
                    status: "success",
                    error: false,
                    token,
                });
               


            }
        },
    };



