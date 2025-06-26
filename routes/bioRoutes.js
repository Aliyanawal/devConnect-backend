const express = require('express');
const router = express.Router();
const tryCatchMiddleware = require("../middleware/tryCatch");
const { getProfile, updateProfile,getAllUsers,getUserById } = require('../controllers/bioController'); // ✅ DESTRUCTURE FUNCTIONS
const { protect } = require('../middleware/authMiddleware');

// Routes
router.get('/getUser', protect, tryCatchMiddleware(getProfile));
router.put('/updatebio', protect, tryCatchMiddleware(updateProfile));
router.get('/getAll', tryCatchMiddleware(getAllUsers));
router.get('/getUserById/:id', tryCatchMiddleware(getUserById));


module.exports = router;
