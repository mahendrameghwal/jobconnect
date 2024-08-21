const expressAsyncHandler = require('express-async-handler');
const Org = require('../models/Orgschema');
const { cloudinary } = require('../utils/cloudinary');
const User = require('../models/Userschema');
const jwt = require('jsonwebtoken');
const { CastError } = require('mongoose').Error;
const Candidate = require('../models/Candidateschema');
const Job = require('../models/jobschema');

const CreateOrg = async (req, res, next) => {
  try {
    const ownerId = req.user._id;
    const AlreadyCandidate = await Org.findOne({ owner: ownerId });
    if (!AlreadyCandidate ) {
      let orgData;
      if (req.body.avtar) {
        const fileStr = req.body.avtar;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
          upload_preset: 'avatar',
          transformation: [
            {
              width: 150,
              height: 150,
              gravity: 'face',
              crop: 'thumb',
              radius: 'max',
            },
            { effect: 'brightness:30' },
            { quality: 'auto', fetch_format: 'auto' },
          ],
        });
        orgData = await Org.create({
          ...req.body,
          avtar: uploadResponse.secure_url,
          owner: ownerId,
          candidate: null,
        });
      } else {
        orgData = await Org.create({
          ...req.body,
          owner: ownerId,
          jobs: [],
          candidate: null,
        });
      }
      if (orgData) {
        await User.findByIdAndUpdate(
          { _id: ownerId },
          {
            $set: {
              Org: orgData._id,
              jobs: [],
            },
            $unset: {
              candidate: 1,
            },
          },
          { new: true },
        );
        const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const ExistUser = await User.findById(req.user._id);
        const {
          _id,
          email,
          Isorg,
          Org,
          isAdmin,
        } = ExistUser._doc;
        
        const info = {
          _id,
          email,
          Isorg,
           Org,
           isAdmin
        };
        const token = jwt.sign(info, process.env.JWT_SECRET, {
          expiresIn: '24h',
        });
        
        res.cookie('accesstoken', token, {
          httpOnly: true,
          secure: true, 
          expires: expirationDate,
     
        });


        return res.status(201).json(orgData);
      } else {
        return res.status(400).json({ message: 'Unable to create Profile' });
      }
    } else {
      return res
        .status(400)
        .send({ message: 'You cannot create multiple profile' });
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      const validationErrors = {};
      for (const field in err.errors) {
        validationErrors[field] = err.errors[field].message;
      }
      return res
        .status(400)
        .send({ error: 'Please check input and try again', details: validationErrors });
    } else if (err.code === 11000) {
      const duplicateKey = Object.keys(err.keyValue)[0];
      return res
        .status(400)
        .send({ message: ` Please use a different ${duplicateKey}` });
    } else {
      return next(err);
    }
  }
};


const UpdateOrgInformation = expressAsyncHandler(async (req, res, next) => {
  
  const  EditBody = req.body;
  try {
    const userId = req?.user?.Org;
    
    const existOrg = await Org.findById(userId);
    const OrgId = existOrg?._id.toString();
  
    if (!existOrg) {
      return res.status(404).send({ message: 'Candidate not found' });
    }

    if (userId !== OrgId) {
      return res.status(403).send({ message: 'Unauthorized to edit Information ' });
    }

    const updateData = EditBody;
    const updateKeys = Object.keys(updateData);
 

    const fieldsToRemove = updateKeys.filter((key) => updateData[key] === null);
    const unsetFields = {};

    fieldsToRemove.forEach((field) => {
      unsetFields[field] = 1;
      delete updateData[field];
    });

    const UpdatedOrg = await Org.findByIdAndUpdate(
      OrgId,
      {
        ...updateData,
        $unset: unsetFields,
      },
      { new: true,runValidators:true },
    );

   if (UpdatedOrg){

     return res.status(200).send({ message: 'Your Profile successfully updated', UpdatedOrg });
   }
  } catch (err) {
    if (err.name === 'ValidationError') {
      const validationErrors = {};
      for (const field in err.errors) {
        validationErrors[field] = err?.errors[field].message;
      }
      return res
        .status(400)
        .send({ message: 'Please check input and try again', details: validationErrors });
    } else if (err.code === 11000) {
      const duplicateKey = Object.keys(err.keyValue)[0];
      return res
        .status(400)
        .send({ message: ` Please use a different ${duplicateKey}` });
    } else {
      next(err);
    }
  }
});




const GetOrgById = expressAsyncHandler(async (req, res, next) => {

  try {
    let permission = false;
    const { id } = req.params;
    
    const org = await Org.findById(id).populate('jobs');
    
    if (!org) {
      return res.status(404).send({ message: 'Organization not found' });
    }


    if (req.user && req.user.Org && req.user.Org.toString() === org._id.toString()) {
      permission = true;
    }

    const orgWithPermission = {
      ...org.toObject(),
      permission
    };

    return res.status(200).json(orgWithPermission);
  } catch (err) {
    // Handle specific errors
    if (err instanceof CastError) {
      return res.status(400).send({ message: 'Invalid organization ID. Please check and try again' });
    }
    // Handle other potential errors
    next(err); // Pass error to the Express error handler
  }
});


const DeleteJob = expressAsyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const orgId = req.user.Org;

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).send({ message: 'Job not found' });
    }

    if (job.orgname.toString() !== orgId.toString()) {
      return res.status(403).send({ message: 'You do not have permission to delete this job' });
    }

    // Delete job from Job collection
    await Job.findByIdAndDelete(id);

    // Remove job reference from Org
    await Org.findByIdAndUpdate(
      orgId,
      { $pull: { jobs: id } },
      { new: true }
    );

    // Remove job reference from User
    await User.findByIdAndUpdate(
      userId,
      { $pull: { jobs: id } },
      { new: true }
    );

    // Update Candidates
    const appliedCandidateIds = job.applicants.map(applicant => applicant._id);

    await Candidate.updateMany(
      { _id: { $in: appliedCandidateIds } },
      {
        $pull: { 
          appliedJobs: { 
            jobId: job._id 
          } 
        },
        $inc: { TotalAppliedJob: -1 }
      }
    );

    return res.status(200).send({ message: 'Job deleted successfully' });

  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Invalid job ID or ID format' });
    }
    next(err);
  }
});





const SearchOrg = expressAsyncHandler(async (req, res, next) => {
  try {
    const { orgname, category, country } = req.query;
    let query = {};
  
    if (orgname) {
      query.orgname = { $regex: new RegExp(orgname, 'i') };
    }
    if (category) {
      query.category = { $regex: new RegExp(category, 'i') };
    }
    if (country) {
      query.country = { $regex: new RegExp(country, 'i') };
    }
    const Orgs = await Org.find(query);

    if (!Orgs || Orgs.length === 0) {
      return res.status(404).send({ message: 'No Companies found with the given criteria' });
    }

   return res.status(200).send(Orgs);
  } catch (err) {
    next(err);
  }
});





const searchCandidates = async (req, res, next) => {
  try {
    
    const limit = parseInt(req.query.limit) || 8;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    const query = {};

    if (req.query.gender) query.gender = req.query.gender;
    if (req.query.noticeperiod) query.noticeperiod = req.query.noticeperiod;
    if (req.query.country) query.country = req.query.country;
    if (req.query.state) query.state = req.query.state;
    if (req.query.empstatus) query.empstatus = req.query.empstatus;
    if (req.query.currentempstatus) query.currentempstatus = req.query.currentempstatus.toLowerCase();
    if (req.query.YearsOfExperience) query.YearsOfExperience = req.query.YearsOfExperience;

    // Array fields
    if (req.query.skill) {
      query['skills'] = {
        $elemMatch: {
          name: { $regex: req.query.skill, $options: 'i' }
        }
      };
    }

  
    // Search term for multiple fields
    if (req.query.searchTerm) {
      query.$or = [
        { fullname: { $regex: req.query.searchTerm, $options: 'i' } },
        { email: { $regex: req.query.searchTerm, $options: 'i' } },
        { summary: { $regex: req.query.searchTerm, $options: 'i' } },
        { city: { $regex: req.query.searchTerm, $options: 'i' } },
        { state: { $regex: req.query.searchTerm, $options: 'i' } },
        { summary: { $regex: req.query.searchTerm, $options: 'i' } },
        { 'skills.name': { $regex: req.query.searchTerm, $options: 'i' } }
      ];
    }

    
    const candidates = await Candidate.find(query)
      .sort({ updatedAt: sortDirection })
      .limit(limit);


      if (!candidates || candidates.length < 1) {
        return res.status(404).send({ message: "Candidates not found." });
    }

     res.status(200).json(candidates);
  } catch (error) {
    next(error);
  }
};




module.exports = {  CreateOrg, SearchOrg, GetOrgById, DeleteJob , UpdateOrgInformation, searchCandidates};
