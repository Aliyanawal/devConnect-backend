const express=require('express')
const connectDB=require('./database')
const app=express()
const cors=require("cors")
require('dotenv').config()
const authUser = require("./routes/userRoutes")
const authBio = require("./routes/bioRoutes")


const port=process.env.PORT
app.use(express.json())
app.use(cors())

connectDB()
// app.get('/',(req,res)=>{
//     res.send('Hello World')
// })

app.use('/api/auth',authUser)
app.use("/api/auth",authBio)
// app.use('/api',authTask)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})