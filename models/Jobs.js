const mongoose = require("mongoose");

const JobsSchema = new mongoose.Schema ({
company: {
    type: String,
    required: true,
    maxLength: 50
},

})

module.exports = JobsSchema;