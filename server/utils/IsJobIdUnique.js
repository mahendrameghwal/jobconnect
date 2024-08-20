const Job = require("../models/jobschema");

const isJobIdUnique = async jobId => {
  try {
    if (jobId) {
      const existingJob = await Job.findOne({ jobId });
      return !existingJob;
    }
  } catch (error) {
    console.error("Error checking job ID uniqueness :", error);
    return false;
  }
};
module.exports = isJobIdUnique;
