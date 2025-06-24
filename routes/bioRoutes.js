const express = require('express');
const router = express.Router();
const tryCatchMiddleware = require("../middleware/tryCatch");
const { getProfile, updateProfile } = require('../controllers/bioController'); // ✅ DESTRUCTURE FUNCTIONS
const { protect } = require('../middleware/authMiddleware');

// Routes
router.get('/getUser', protect, tryCatchMiddleware(getProfile));
router.put('/updatebio', protect, tryCatchMiddleware(updateProfile));

module.exports = router;
