const express=require('express')
const router=express.Router()
const tryCAtchMiddleware=require('../middleware/tryCatch')
const user=require('../controllers/userController')


router
.post('/register',tryCAtchMiddleware(user.userRegister))
.post("/login",tryCAtchMiddleware(user.userLogin))


module.exports=router