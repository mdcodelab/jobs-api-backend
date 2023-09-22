
const Job=require("../models/Jobs");
const {BadRequest}=require("../errors/bad-request.js");
const {NotFound}=require("../errors/not-found");
const {StatusCodes}=require("http-status-codes");

const getAllJobs = async (req, res) => {
  
    res.send("get all jobs");
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


