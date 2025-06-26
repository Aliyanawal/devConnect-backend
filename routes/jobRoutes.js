const express = require("express");
const router = express.Router();
const { addJob, getAllJobs } = require("../controllers/jobController");

// You can protect addJob route with middleware if needed
router.post("/add", addJob);
router.get("/getall", getAllJobs);

module.exports = router;
