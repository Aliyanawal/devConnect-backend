const mongoose = require("mongoose");
require("dotenv").config();
const URL = process.env.DB_URL;

const connectDB = async () => {
    mongoose
        .connect(URL)
        .then( () => {
            console.log("connected to mongoDB")
        })
        .catch ((e) =>{
            console.log("Error found", e);
        });
};

module.exports = connectDB;