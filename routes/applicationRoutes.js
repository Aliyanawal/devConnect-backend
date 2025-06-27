const express = require("express");
const tryCatchMiddleware = require("../middleware/tryCatch");
const { protect } = require("../middleware/authMiddleware");
const { applyToJob, getAppliedJobs } = require("../controllers/applicationController");
const upload = require("../middleware/storage"); 

const router = express.Router();


router.post(
  "/apply/:jobId",protect, upload.single("cv"),tryCatchMiddleware(applyToJob));

router.get(
  "/applied",protect, tryCatchMiddleware(getAppliedJobs));

module.exports = router;
