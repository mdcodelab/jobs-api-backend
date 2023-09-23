
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
  const {
    user: { userId },
  } = req;

  const jobs = await Job.find({ createdBy: userId });

  if (!jobs || jobs.length === 0) {
    throw new NotFound(`No jobs found for user with id ${userId}`);
  }

  res.status(StatusCodes.OK).json({ jobs });
};

// or:
// const getJob = async (req, res) => {
//   const job = await Job.find({ createdBy: req.user.userId });
//   if (!job) {
//     return res.status(StatusCodes.NOT_FOUND).json({ message: "Job not found" });
//   }
//   res.status(StatusCodes.OK).json({ job });
// };




const createJob = async (req, res) => {
  //res.json(req.user);
  req.body.createdBy=req.user.userId;
  const job=await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({job})
};


// const updateJob = async (req, res) => {
//   const jobId = req.params.id;
//   const userId = req.user.userId;
//   const { company, position } = req.body;

//   const jobToUpdate = await Job.findOne({ _id: jobId, createdBy: userId });

//   if (!jobToUpdate) {
//     throw new NotFound(
//       "The job was not found for the specified user or does not exist"
//     );
//   }

//   jobToUpdate.company = company;
//   jobToUpdate.position = position;

//   const jobUpdated = await jobToUpdate.save();

//   res.status(StatusCodes.ACCEPTED).json({jobUpdated})
// };

//or
const updateJob = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.user.userId;
  const { company, position } = req.body;
  //verify for the existing job and whether it has been created by the user with the specific id
  const existingJob = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!existingJob) {
    throw new NotFound("Job not found or not authorized to update");
  }

  const updatedValues = {
    company: company,
    position: position
  };

  const jobUpdated = await Job.findByIdAndUpdate(jobId, updatedValues, { new: true });
  res.status(StatusCodes.ACCEPTED).json({ jobUpdated });
};


const deleteJob = async (req, res) => {
  const jobId=req.params.id;
  const userId=req.user.userId;
  const jobToDelete = await Job.findByIdAndRemove({_id: jobId, createdBy: userId});
  if (!jobToDelete) {
    throw new NotFound ("There is no job to delete");
  }
  res.status(StatusCodes.ACCEPTED).json({jobToDelete});
};


module.exports = {getAllJobs, getJob, createJob, deleteJob, updateJob}


