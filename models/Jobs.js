const mongoose = require("mongoose");

const JobsSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, "Please provide company's name"],
    maxLength: 50,
  },
  position: {
    type: String,
    required: [true, "Please provide position"],
    maxLength: 100,

  },
  status: {
    type: String,
    enum: ["interview", "declined", "pending"],
    default: "pending"
  },
  createdBy: {  //meaning that every time when we create a job, we'll assign it to one of the users
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide a user"]
  }
}, {timestamps: true});

module.exports = mongoose.model("Jobs", JobsSchema);

