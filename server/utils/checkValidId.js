const Candidate = require('../models/Candidateschema');
const Job = require('../models/jobschema');

async function checkJobValid(applicationId) {
  try {
    const AvailableJob = await Job.findById(applicationId);
    return !!AvailableJob;
  } catch (error) {
    return false;
  }
}
async function checkCandidateValid(candidateId) {
  try {
    const Availablecandidate = await Candidate.findById(candidateId);
    return !!Availablecandidate;
  } catch (error) {
    return false;
  }
}

module.exports = { checkJobValid, checkCandidateValid };
