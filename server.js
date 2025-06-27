const express=require('express')
const connectDB=require('./database')
const app=express()
const cors=require("cors")
require('dotenv').config()
const authUser = require("./routes/userRoutes")
const authBio = require("./routes/bioRoutes")
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require('./routes/applicationRoutes')


const port=process.env.PORT
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'));

connectDB()
// app.get('/',(req,res)=>{
//     res.send('Hello World')
// })

app.use('/api/auth',authUser)
app.use("/api/auth",authBio)
app.use("/api/jobs", jobRoutes);
app.use('/api/application' , applicationRoutes)

// app.use('/api',authTask)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})