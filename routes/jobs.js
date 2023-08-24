
const express = require("express");
const router = express.Router();

const {getAllJobs, getJob, createJob, deleteJob, updateJob}=require("../controllers/jobs.js")

router.route("/").get(getAllJobs)
router.route("/").post(createJob);
router.route("/:id").delete(deleteJob).patch(updateJob).get(getJob);

module.exports=router;