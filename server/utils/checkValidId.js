import Candidate  from '../models/Candidateschema.js';
import Job  from '../models/jobschema.js';

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

export { checkJobValid, checkCandidateValid };
