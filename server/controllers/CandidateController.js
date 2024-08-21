const Candidate = require('../models/Candidateschema');
const asyncHandler = require('express-async-handler');
const { cloudinary } = require('../utils/cloudinary');
const User = require('../models/Userschema');
const { CastError } = require('mongoose').Error;
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const Job = require('../models/jobschema');

const CreateCandidate = asyncHandler(async (req, res, next) => {
  try {
    const UserId = req.user._id;
    const AlreadyCandidate = await Candidate.find({ owner: UserId });
    if (!AlreadyCandidate || AlreadyCandidate?.length === 0) {
      let CandidateData;
      if (UserId) {
        const fileStr = req.body.avtar;
        if (fileStr) {
          const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'avatar',
            transformation: [
              { width: 150, height: 150, gravity: 'face', crop: 'thumb', radius: 'max'},
              { effect: 'brightness:30' },
              { quality: 'auto', fetch_format: 'auto' },
            ],});
          CandidateData = await Candidate.create({
            ...req.body,
            avtar: uploadResponse?.secure_url,
            owner: UserId,
            jobs: null,
          });
        } else {
          CandidateData = await Candidate.create({
            ...req.body,
            owner: UserId,
            jobs: null,
          });
        }
        if (CandidateData) {
          await User.findByIdAndUpdate(
            { _id: UserId },
            {
              $set: {
                candidate: CandidateData._id,
              },
              $unset: {
                jobs: 1,
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
            candidate,
            isAdmin,
          } = ExistUser._doc;
          
          const info = {
            _id,
            email,
            Isorg,
            candidate,
             isAdmin
          };
          const token = jwt.sign(info, process.env.JWT_SECRET, {
            expiresIn: '24h',
          });
       
          res.cookie('accesstoken', token, {
            httpOnly: true,
            expires: expirationDate,
            secure: true,
            sameSite: 'strict',
          });
          return res.status(201).json(CandidateData);
        } else {
          return res.status(400).json({ message: 'Unable to create Profile' });
        }
      } else {
        return res.status(422).json({ message: 'Invalid owner ID' });
      }
    } else {
      return res
        .status(400)
        .json({ message: 'You cannot create multiple profile' });
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      const validationErrors = {};
      for (const field in err.errors) {
        validationErrors[field] = err?.errors[field].message;
      }
      return res
        .status(400)
        .json({ error: 'Please check input and try again', details: validationErrors });
    } else if (err.code === 11000) {
      const duplicateKey = Object.keys(err.keyValue)[0];
      return res
        .status(400)
        .json({ message: ` Please use a different ${duplicateKey}` });
    } else {
      next(err);
    }
  }
});

const getAllCandidate = asyncHandler(async (req, res, next) => {
  try {
    const SelectedFields = 'name email avtar _id gender resume fullname  '
    const AllCandidate = await Candidate.find().select(SelectedFields).limit(0);
    if (!AllCandidate || AllCandidate.length === 0) {
      return res.status(404).json({ message: 'no candidate found' });
    }
    return res.status(200).json(AllCandidate);
  } catch (err) {
    
    next(err);
  }
});

const EditCandidateInformation = asyncHandler(async (req, res, next) => {
  
  const  EditBody = req.body;
  try {
    const userId = req?.user?.candidate;
    const existCandidate = await Candidate.findById(userId);
    const CandidateId = existCandidate?._id.toString();
  
    if (!existCandidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    if (userId !== CandidateId) {
      return res.status(403).json({ message: 'Unauthorized to edit Information ' });
    }

    const updateData = EditBody;
    const updateKeys = Object.keys(updateData);
 

    const fieldsToRemove = updateKeys.filter((key) => updateData[key] === null);
    const unsetFields = {};

    fieldsToRemove.forEach((field) => {
      unsetFields[field] = 1;
      delete updateData[field];
    });

    const UpdatedCandidate = await Candidate.findByIdAndUpdate(
      CandidateId,
      {
        ...updateData,
        $unset: unsetFields,
      },
      { new: true,runValidators:true },
    );

   if (UpdatedCandidate){

     return res.status(200).json({ message: 'Your Profile successfully updated', UpdatedCandidate });
   }
  } catch (err) {
    if (err.name === 'ValidationError') {
      const validationErrors = {};
      for (const field in err.errors) {
        validationErrors[field] = err?.errors[field].message;
      }
      return res
        .status(400)
        .json({ message: 'Please check input and try again', details: validationErrors });
    } else if (err.code === 11000) {
      const duplicateKey = Object.keys(err.keyValue)[0];
      return res
        .status(400)
        .json({ message: ` Please use a different ${duplicateKey}` });
    } else {
      next(err);
    }
  }
});




const UpdateCandidateProfile = asyncHandler(async (req, res, next) => {
  try {
    const userId = req?.user?.candidate;
    const existCandidate = await Candidate.findById(userId);
    const candidateId = existCandidate?._id.toString();
    const { section, action, itemData, itemId } = req.body;

    if (!existCandidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    if (userId.toString() !== candidateId.toString()) {
      return res.status(403).json({ message: 'Unauthorized to edit information' });
    }


    let message;

    switch (section) {
      case 'skills':
        message = 'Skill';
        break;
      case 'employment':
        message = 'Employment';
        break;
      case 'project':
        message = 'Project';
        break;
      case 'education':
        message = 'Education';
        break;
        case 'language':
        message = 'Language';
        break;
      case 'social':
        message = 'Social link';
        break;
      default:
        return res.status(400).json({ message: 'something went wrong...' });
    }
   
    switch (action) {
      case 'add':
        existCandidate[section].push(itemData);
          break;
      case 'update': 
        const itemIndex = existCandidate[section].findIndex(item => item._id.toString() === itemId);
    
        if (itemIndex !== -1) {
          existCandidate[section][itemIndex] = { ...existCandidate[section][itemIndex], ...itemData };
        } else {
          return res.status(404).json({ message: `${message} record not found` });
        }
        break;
      case 'remove':
        existCandidate[section] = existCandidate[section].filter(item => item._id.toString() !== itemId);
        break;
      default:
        return res.status(400).json({ message: 'Invalid action' });
    }

     await existCandidate.save();
    res.status(200).json({ message: `${message} updated successfully` });

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


const UpdateResume = asyncHandler(async (req, res) => {
  if (!req.files || !req.files.resume) {
    return res.status(400).json({ message: "No resume file provided" });
  }

  const userId = req.user?.candidate;
  const Existcandidate = await Candidate.findById(userId);

  if (!Existcandidate) {
    return res.status(404).json({ message: 'Candidate not found' });
  }

  const resumeFile = req.files.resume;

  try {
    const uploadResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          upload_preset: 'resume',
          resource_type: 'raw',
          format: 'pdf',
          public_id: `${Existcandidate._id}`,
          access_mode: "public",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      // Use the file buffer directly
      uploadStream.end(resumeFile.data);
    });

    if (uploadResponse && uploadResponse.secure_url) {
      Existcandidate.resume = {
        filename: resumeFile.name,
        url: uploadResponse.secure_url,
        UploadAt: Date.now()
      };
     
      await Existcandidate.save();
      return res.status(200).json({ message: "Resume updated successfully", url: uploadResponse.secure_url });
    } else {
      return res.status(400).json({ message: "Failed to upload resume" });
    }
  } catch (uploadError) {
    
    return res.status(500).json({ message: "Error uploading resume " });
  }
});






const ApplyToJob = asyncHandler(async (req, res, next) => {
  try {
    const { jobid } = req.params;
    const CandidateId = req.user.candidate;
    const IsCandidateAvailable =
      !CandidateId || CandidateId === undefined || CandidateId === '';
    if (IsCandidateAvailable) {
      return res.status(400).json({ message: 'Please Create Profile First' });
    } else {
      const IsValidCandidateId = mongoose.Types.ObjectId.isValid(CandidateId);
      if (!IsValidCandidateId) {
        return res
          .status(400)
          .json({ message: 'Invalid candidate ID provided' });
      } else {
        if (CandidateId) {
          const availablecandidate = await Candidate.findById(CandidateId);
          if (!availablecandidate) {
            return res.status(400).json({ message: 'candidate not available' });
          } else {
            const IsAlreadyAppliedJobs = availablecandidate.appliedJobs.some(
              (job) => job.jobId.toString() == jobid.toString(),
            );

            if (IsAlreadyAppliedJobs) {
              return res
                .status(400)
                .json({ message: 'You have already applied for this job' });
            } else {
              const SuccessCandidateUpdate = await Candidate.findByIdAndUpdate(
                availablecandidate._id,
                {
                  $inc: { TotalAppliedJob: 1 },
                  $push: { appliedJobs: { jobId: jobid } },
                },
                { new: true },
              );

              if (SuccessCandidateUpdate) {
                const SuccessJobUpdate = await Job.findByIdAndUpdate(
                  jobid,
                  {
                    $inc: { totalapplication: 1 },
                    $push: { applicants: availablecandidate._id },
                  },
                  { new: true },
                );

                if (SuccessJobUpdate) {
                  return res
                    .status(200)
                    .json({ message: 'Applied Successfully' });
                } else {
                  return res
                    .status(400)
                    .json({ message: 'something wrong to Apply Job.' });
                }
              } else {
                return res
                  .status(400)
                  .json({ message: ' failed to apply Please try again later' });
              }
            }
          }
        }
      }
    }
  } catch (err) {
    if (err instanceof CastError) {
      return res.status(400).json({ message: 'Invalid ID format' });
    } else {
      next(err);
    }
  }
});








const GetCandidateById = asyncHandler(async (req, res, next) => {
  let PermissonForUpdate = false;
  try {
    const {id}= req.params;
    const { candidate } = req.user;
    const Existcandidate = await Candidate.findById(id).populate(
      'appliedJobs.jobId',
    );
    
    if (!Existcandidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    
    const candidateObject = Existcandidate.toObject();
    if(candidate){
      PermissonForUpdate  = Existcandidate._id.toString()===candidate?.toString()
      candidateObject.Permisson = PermissonForUpdate;
    }
    
    return res.status(200).json(candidateObject);
  } catch (err) {
    if (err instanceof CastError) {
      return res.status(404).json({ message: 'Please verify the ID and try again.' });
    }
    next(err);
  }
});





















module.exports = {
  CreateCandidate,
  getAllCandidate,
  EditCandidateInformation,
  ApplyToJob,
  GetCandidateById,
  UpdateCandidateProfile,
  UpdateResume
};

