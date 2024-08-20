function filterCandidate( data,jobId, status) {

    const filteredCandidates = [];
    data.map(applicant => {
        applicant.appliedJobs.map(appliedJob => {
            if (appliedJob.jobId == jobId && appliedJob.status === status) {

                filteredCandidates.push({
                    name: applicant.fullname,
                    email: applicant.email,
                    gender: applicant.gender,
                    phone:applicant.phone,
                    appliedJobs:applicant.appliedJobs
                });
            }
        });
    });
    return filteredCandidates;
}

export default filterCandidate

