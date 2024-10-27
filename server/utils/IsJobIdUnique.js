import Job from "../models/jobschema.js";

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
export default isJobIdUnique;
