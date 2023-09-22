
const Job=require("../models/Jobs");
const {BadRequest}=require("../errors/bad-request.js");
const {NotFound}=require("../errors/not-found");
const {StatusCodes}=require("http-status-codes");

const getAllJobs = async (req, res) => {
  //looking for the jobs associated with a user (not all the jobs);
  //for all the jobs, const job = await Job.find({})
  const jobs = await Job.find({createdBy: req.user.userId}).sort("createdAt");
  res.status(StatusCodes.OK).json({jobs, count:jobs.length});
}

const getJob = async (req, res) => {
  res.send("get job");
};


const createJob = async (req, res) => {
  //res.json(req.user);
  req.body.createdBy=req.user.userId;
  const job=await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({job})
};

const updateJob = async (req, res) => {
  res.send("job updated");
};

const deleteJob = async (req, res) => {
  res.send("job deleted");
};


module.exports = {getAllJobs, getJob, createJob, deleteJob, updateJob}


