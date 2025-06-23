const express=require('express')
const router=express.Router()
const tryCatchMiddleware=require("../middleware/tryCatch")
const user=require('../controllers/userController')

router
.post('/register',tryCatchMiddleware(user.userRegister))
.post("/login",tryCatchMiddleware(user.userLogin))


module.exports=router