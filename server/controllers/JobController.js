const Job = require('../models/jobschema');
const asyncHandler = require('express-async-handler');
const GenrateJobId = require('../utils/GenrateJobId');
const { default: mongoose } = require('mongoose');
const { CastError } = require('mongoose').Error;
const Org = require('../models/Orgschema');
const User = require('../models/Userschema');
const Candidate = require('../models/Candidateschema');
const { checkCandidateValid, checkJobValid } = require('../utils/checkValidId');

const Createjob = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const OrgId = req.user.Org;
    const jobId = await GenrateJobId();
    const IsAvailableOrg = await Org.findOne({ owner: userId });
    if (!IsAvailableOrg) {
      return res
        .status(400)
        .json({ message: 'Please Create an first Organization ' });
    } else {
      const newJobData = {
        ...req.body,
        author: userId,
        orgname: OrgId,
        jobId,
      };
      const newJob = await Job.create(newJobData);
      if (newJob) {
        const updatedOrg = await Org.findOneAndUpdate(
          { owner: userId },
          { $push: { jobs: newJob._id } },
          { new: true },
        );
        const updatedUser = await User.findOneAndUpdate(
          { _id: userId },
          { $push: { jobs: newJob._id } },
          { new: true },
        );

        if (updatedOrg || updatedUser || (updatedOrg && updatedUser)) {
          return res.status(201).json(newJob._id);
        } else {
          return res
            .status(500)
            .json({ error: 'Failed to update Information' });
        }
      }
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      const validationErrors = {};
      for (const field in err.errors) {
        validationErrors[field] = err.errors[field].message;
      }
      return res.status(400).json({
        error: 'please Fill required fields',
        details: validationErrors,
      });
    } else {
      next(err);
    }
  }
};

const getAllJobs = asyncHandler(async (req, res, next) => {
  try {
    const sortDirection = req.query.sort === 'latest' ? -1 : 1;
    const LimitofJob = req.query.limit ? req.query.limit:'';

    const jobs = await Job.find().sort({ updatedAt: sortDirection }).limit(LimitofJob).populate('orgname')
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: 'no jobs found' });
    } else {
      return res.status(200).json(jobs);
    }
  } catch (err) {

    next(err);
  }
});

const DeleteAlljob = asyncHandler(async (req, res, next) => {
  try {
    const jobs = await Job.deleteMany();
    return res.status(200).json({ message: 'successfully deleted' });
  } catch (err) {
    
    next(err);
  }
});

const GetJobById = asyncHandler(async (req, res, next) => {

  try {
    const { id } = req.params;
    const job = await Job.findById(id).populate('orgname');
  
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    return res.status(200).json({ job });
  } catch (err) {
    if (err instanceof CastError) {
      return res.status(400).json({ message: 'we could not find any Job 🧐' });
    }
    next(err);
  }
});

const AppliedCandidate = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const {Org}= req.user;
    



    const job = await Job.findById(id).populate('applicants');
    const Permission= job.orgname?.toString()===Org?.toString();

   if(job.orgname?.toString()!==Org?.toString()){
    return res.status(404).json({ message: "You don't have permission to perform this action" });
   }
    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }    
    else {
      //  const FilteredJob = job.applicants.map(applicant => applicant.appliedJobs.find(job => job.jobId.toString() === id))
     //  const filteredApplicants = job.applicants.map(applicant => applicant.appliedJobs.find(job => job.jobId.toString() === id))

      return res.status(200).json({job,Permission});
    }
  } catch (err) {
    if (err instanceof CastError) {
      return res
        .status(404)
        .json({ message: 'Please verify the ID and try again.' });
    }
    next(err);
  }
});





const SearchJobPost = asyncHandler(async (req, res, next) => {
  try {
    const {
      title,
      category,
      state,
      city,
      country,
      skills,
      jobtype,
      joblevel,
     salary,
      sort,
    } = req.query;
    let query = {};


    if (title) {
      query.title = { $regex: new RegExp(title, 'i') };
    }
    if (category) {
      query.category = { $regex: new RegExp(category, 'i') };
    }
    if (city) {
      query.city = { $regex: new RegExp(city, 'i') };
    }
    if (state) {
      query.state = { $regex: new RegExp(state, 'i') };
    }
    if (country) {
      query.country = { $regex: new RegExp(country, 'i') };
    }
    if (salary) {
      query.salary = { $regex: new RegExp(salary, 'i') };
    }
    if (skills) {
      const skillArray = skills
        .split(',')
        .map((skill) => new RegExp(skill.trim(), 'i'));
      query.skills = { $in: skillArray };
    }
    if (jobtype) {
      query.jobtype = { $regex: new RegExp(jobtype, 'i') };
    }
    if (joblevel) {
      query.joblevel = { $regex: new RegExp(joblevel, 'i') };
    }
  
    let sortBy = {};
    if (sort === 'newest') {
      sortBy = { createdAt: -1 };
    } else if (sort === 'oldest') {
      sortBy = { createdAt: 1 };
    }
    const jobPosts = await Job.find(query).populate('orgname').sort(sortBy);

    if (!jobPosts || jobPosts.length === 0) {
      return res
        .status(404)
        .json({ message: 'No job posts found with the given criteria' });
    }

    return res.status(200).json(jobPosts);
  } catch (err) {
   
    next(err);
  }
});

const getPernoalizePost = asyncHandler(async (req, res, next) => {
  try {
    const { authorid } = req.params;

    const isValidAuthorId = mongoose.Types.ObjectId.isValid(authorid);
    if (!isValidAuthorId) {
      return res.status(400).json({ message: 'Invalid author ID' });
    }
    if (authorid) {
      const JobPosts = await Job.find({ author: authorid });
      if (!JobPosts || JobPosts.length === 0) {
        return res.status(404).json({ message: 'no Job Found' });
      } else {
        return res.status(200).json(JobPosts);
      }
    }
  } catch (err) {
    next(err);
    console.error('Error updating job:', err.message);
  }
});

const GenrateCategory = asyncHandler(async (req, res) => {
  try {
    const categories = await Job.aggregate([
      {
        $group: {
          _id: { $toLower: '$category' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const uniqueCategories = categories.map((categoryObj) => categoryObj._id);

    return res.status(200).json(uniqueCategories);
  } catch (err) {
    return res.status(400).json({ message: 'no category found' });
  }
});

const ShortListSingleCandidate = asyncHandler(async (req, res, next) => {
  try {
    const { applicationId, candidateId } = req.params;
    
    
    const isValidIds = await Promise.all([
      checkJobValid(applicationId),
      checkCandidateValid(candidateId),
    ]);
    
    if (!isValidIds[0]) {
      return res
        .status(400)
        .json({ message: 'Please check the provided data and try again ' });
      }

    if (!isValidIds[1]) {
      return res.status(400).json({ message: 'Please check the provided data and try again.' });
    }
    const Availablejob = await Job.findById(applicationId);
    if (!Availablejob) {
      return res.status(400).json({ message: 'Job not found' });
    }

    if (Availablejob.orgname.toString() !== req.user.Org.toString()) {
      return res.status(403) .json({ message: "No permission for this action"});
    }
    const AvailableCandidate = await Candidate.findById(candidateId);
    if (!AvailableCandidate) {
      return res.status(403).json({ message: 'Candidate not found' });
    } else {
      const jobApplication = AvailableCandidate.appliedJobs.find(job => job.jobId.toString() === Availablejob._id.toString());

      // Check if the candidate is already shortlisted
      if (jobApplication.status.toLowerCase() === 'shortlisted') {
        return res.status(400).json({ message: 'Candidate is already Shortlisted' });
      }
    

      const ShortlistText = {
        'appliedJobs.$.status': 'shortlisted','appliedJobs.$.success.status': 'hired',
        'appliedJobs.$.success.dateHired': new Date() 
    };
      const updatedCandidate = await Candidate.findOneAndUpdate(
        { _id: candidateId, 'appliedJobs.jobId': Availablejob._id },
        { $set: ShortlistText },
        { new: true },
      );
      if (updatedCandidate) {
        return res
          .status(200)
          .json({ message: 'candidate has been successfully rejected ' });
      } else {
        return res.status(200).json({ message: ' Oops! Something went wrong' });
      }
    }
  } catch (err) {
    next(err);
  }
});



const RejectedSingleCandidate = asyncHandler(async (req, res, next) => {
  try {
    const { applicationId, candidateId } = req.params;
    
    
    const isValidIds = await Promise.all([
      checkJobValid(applicationId),
      checkCandidateValid(candidateId),
    ]);
    
    if (!isValidIds[0]) {
      return res
        .status(400)
        .json({ message: 'Please check the provided data and try again ' });
      }

    if (!isValidIds[1]) {
      return res.status(400).json({ message: 'Please check the provided data and try again.' });
    }
    const Availablejob = await Job.findById(applicationId);
    if (!Availablejob) {
      return res.status(400).json({ message: 'Job not found' });
    }

    if (Availablejob.orgname.toString() !== req.user.Org.toString()) {
      return res.status(403) .json({ message: "No permission for this action"});
    }
    const AvailableCandidate = await Candidate.findById(candidateId);
    if (!AvailableCandidate) {
      return res.status(403).json({ message: 'Candidate not found' });
    } else {
      const jobApplication = AvailableCandidate.appliedJobs.find(job => job.jobId.toString() === Availablejob._id.toString());

      // Check if the candidate is already rejected
      if (jobApplication.status.toLowerCase() === 'rejected') {
        return res.status(400).json({ message: 'Candidate is already rejected' });
      }
    

      const RejectedText = {'appliedJobs.$.status': 'rejected', 'appliedJobs.$.success.status': 'pending',};

      const updatedCandidate = await Candidate.findOneAndUpdate(
        { _id: candidateId, 'appliedJobs.jobId': Availablejob._id },
        { $set: RejectedText },
        { new: true },
      );
      if (updatedCandidate) {
        return res
          .status(200)
          .json({ message: 'candidate has been successfully rejected ' });
      } else {
        return res.status(200).json({ message: ' Oops! Something went wrong' });
      }
    }
  } catch (err) {
    next(err);
  }
});



const UpdateJobInformation = asyncHandler(async (req, res, next) => {
  try {
    const userId = req?.user?.Org; // Assuming the user is a recruiter
    const { jobId, jobData } = req.body;
    const existingJob = await Job.findById(jobId);
    if (!existingJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    // Check if the user is authorized to edit this job
    if (existingJob?.orgname.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized to edit this job' });
    }

    // Update the job fields
    const updatableFields = [
      'title', 'orgname', 'city', 'state', 'country', 'salary', 
      'jobtype', 'joblevel', 'NumberOfPost', 'category', 
      'skills', 'shortdesc', 'responsibilities'
    ];

    updatableFields.forEach(field => {
      if (jobData[field] !== undefined) {
        existingJob[field] = jobData[field];
      }
    });

    // Save the updated job
    await existingJob.save({validateModifiedOnly:true});

    res.status(200).json({ message: 'Job updated successfully', job: existingJob });

  } catch (err) {
    if (err.name === 'ValidationError') {
      const validationErrors = {};
      for (const field in err.errors) {
        validationErrors[field] = err.errors[field].message;
      }
      return res.status(400).json({ message: 'Please check input and try again', details: validationErrors });
    }

    next(err);
  }
});






module.exports = {
  AppliedCandidate,
  Createjob,
  DeleteAlljob,
  getAllJobs,
  GetJobById,
  UpdateJobInformation,
  getPernoalizePost,
  SearchJobPost,
  GenrateCategory,
  ShortListSingleCandidate,
  RejectedSingleCandidate,
};
