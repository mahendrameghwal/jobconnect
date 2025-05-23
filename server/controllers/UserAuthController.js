import User from '../models/Userschema.js';
import Org from '../models/Orgschema.js';
import Job from '../models/jobschema.js';
import Candidate from '../models/Candidateschema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import crypto from 'crypto';
import { sendResetPasswordEmail, DeleteAcountSendEmail } from '../utils/emailServices.js';
import validator from 'validator';
import mongoose from 'mongoose'; 
const SECERET_KEY = process?.env?.JWT_SECRET;



const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

//* register
const register = asyncHandler(async (req, res, next) => {
  try {
    let Hashpassword;
    if (req.body.password.length >= 5 && req.body.password.length <= 16) {
      Hashpassword = await bcrypt.hash(req.body.password, 10);
    } else {
      !req.body.password == '' &&
        res
          .status(401)
          .json({
            message: 'password must be conatain between 5 to 16 chacater',
          });
    }
    if (req.body.email) {
      if (!validator.isEmail(req.body.email)) {
        return res.status(400).json({ message: 'Email must be a valid email' });
      }
    }
    const ExistUser = await User.findOne({ email: req.body.email });

    if (ExistUser) {
      return res
        .status(403)
        .json({ message: 'user already exist with this email' });
    } else {

      
      const googleId = req.body.googleId;
      const NewUser = new User({ ...req.body, googleId: googleId, password: Hashpassword });

      await NewUser.save();
      const {
        _id,
        email,
        Isorg,
        isAdmin
      } = NewUser._doc;

     
      const info = {
        _id,
        email,
        Isorg,
        isAdmin
      };

      const token = jwt.sign(info, SECERET_KEY, { expiresIn: '24h' });

      res.cookie('accesstoken', token, {
        httpOnly: true,
        expires: expirationDate,
        secure: true,
        sameSite: 'none',
        path: '/',
      });
      
      return res
        .status(201)
        .json({ message: 'user created successfully', data: NewUser });
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      const validationErrors = {};
      for (const field in err.errors) {
        validationErrors[field] = err.errors[field].message;
      }
      return res
        .status(400)
        .json({
          error: 'Please check input and try again',
          details: validationErrors,
        });
    } else {
      next(err);
    }
  }
});

//* login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: ' Please fill in all required fields' });
    }

    const ExistUser = await User.findOne({ email });

    if (!ExistUser) {
      return res.status(400).json({ message: 'user not found' });
    } else {
      const Iscorrect = bcrypt.compareSync(
        req.body.password,
        ExistUser.password,
      );

      if (!Iscorrect) {
        return res.status(400).json({ message: 'check password or username' });
      }
      if (ExistUser.Isorg) {
        
        const {
          _id,
          email,
          Isorg,
          Org,
          isAdmin
        } = ExistUser._doc;

        const info = {
          _id,
          email,
          Isorg,
          Org,
          isAdmin
        };

        const token = jwt.sign(info, SECERET_KEY, { expiresIn: '24h' });

        jwt.verify(token, SECERET_KEY, (err, decodedToken) => {
          if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
          } else {
            return res
              .cookie('accesstoken', token, {
                httpOnly: true,
                expires: expirationDate,
                secure: true,
                sameSite: 'none',
                path: '/',
              })
              .status(200)
              .json({ message: 'login success', token:decodedToken }); 
          }
        });
      } else {
      

        const {
          _id,
          email,
          Isorg,
          candidate,
          isAdmin
        } = ExistUser._doc;

        const info = {
          _id,
          email,
          Isorg,
          candidate,
          isAdmin
        };

        const token = jwt.sign(info, SECERET_KEY, { expiresIn: '24h' });

        jwt.verify(token, SECERET_KEY, (err, decodedToken) => {
          if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
          } else {
             res.cookie('accesstoken', token, {
              httpOnly: true,
              expires: expirationDate,
              secure: true,
              sameSite: 'none',
           path: '/',
              })
              .status(200)
              .json({ message: 'login success', token: decodedToken }); // Include decodedToken in the response
          }
        });


       
      }
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      const validationErrors = {};
      for (const field in err.errors) {
        validationErrors[field] = err.errors[field].message;
      }
      return res
        .status(400)
        .json({
          error: 'Please check input and try again',
          details: validationErrors,
        });
    } else {
      next(err);
    }
  }
};

const ResetRequest = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (email === '') {
    return res.status(404).json({ message: 'Please Provide  email address' });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Email must be a valid email.' });
  }
  try {
    const user = await User.findOne({ email });
  
    if (!user) {
      return res
        .status(404)
        .json({ message: 'User does not exist for this email.' });
    }
    
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    await sendResetPasswordEmail(user?.email,  resetToken);

    return res
      .status(200)
      .json({ message: 'Password reset email sent successfully.' });
  } catch (error) {
    next(error);
  }
});




const AcountDeleteRequest = asyncHandler(async (req, res, next) => {
  const {email}= req.user;

  if (email === '') {
    return res.status(404).json({ message:'Please Provide email address' });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Email must be a valid email.' });
  }
  try {
    const user = await User.findOne({ email });  
    if (!user) {
      return res
        .status(404)
        .json({ message: 'User does not exist for this email.' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.deleteAcountToken = resetToken;
    user.deleteAcountExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    await DeleteAcountSendEmail(user?.email,  resetToken);

    return res
      .status(200)
      .json({ message: 'Acount delete request email sent successfully.' });
  } catch (error) {
    next(error);
  }
});




const Me = asyncHandler(async (req, res, next) => {
  try {
    const user = req?.user;

    if (!user.Isorg) {
      let PermissonForUpdate = false;
      
      const Existcandidate = await Candidate.findById(user?.candidate).populate(
        'appliedJobs.jobId',
      );
      
      if (!Existcandidate) {
        return res.status(404).json({ message: 'Candidate not found' });
      }
      
      const candidateObject = Existcandidate.toObject();
      PermissonForUpdate = Existcandidate._id.toString() === user?.candidate?.toString();
      candidateObject.PermissonForUpdate = PermissonForUpdate;
      candidateObject.Isorg = false; // Adding Isorg field for candidate

      return res.status(200).json(candidateObject);
    } else {
      let PermissonForUpdate = false;  
      const org = await Org.findById(user?.Org).populate('jobs');
      
      if (!org) {
        return res.status(404).json({ message: 'Organization not found' });
      }
  
      if (req.user && req.user.Org && req.user.Org.toString() === org._id.toString()) {
        PermissonForUpdate = true;
      }
  
      const orgWithPermission = {
        ...org.toObject(),
        PermissonForUpdate,
        Isorg: true // Adding Isorg field for organization
      };
  
      return res.status(200).json(orgWithPermission);
    }
  } catch (error) {
    next(error);
  }
});



const resetPassword = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    let Hashpassword;
    if (password.length >= 5 && password.length <= 16) {
      Hashpassword = await bcrypt.hash(password, 10);
    } else {
      !password == '' &&
        res.status(401).json({
          message: 'password must be conatain between 5 to 16 chacater',
        });
    }
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: 'Please request a new  reset link',
      });
    }

    user.password = Hashpassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    return res.status(200).json({ message: 'Password reset successfully.' });
  } catch (error) {
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      return res
        .status(500)
        .json({ message: 'Network error occurred. Please try again later.' });
    }
    next(error);
  }
});

const logout = asyncHandler(async (req, res, next) => {
  try {
    res
    .cookie('accesstoken', '', {
      httpOnly: true,
      expires: new Date(0),
      secure: true, 
      sameSite: 'none' 
    })
    .status(200)
    .json({ message: 'User has logged out successfully' });
  } catch (error) {
    next(error);
  }
});

const GetCurrentUserInfo = asyncHandler(async (req, res, next) => {
  try {
    const userid = req.user?._id;
    console.log(userid);
    const user = await User.findById(userid);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    if (!user.Isorg) {
      const populatedUser = await user.populate(['candidate','currentSubscription']);
      const { Org, password, jobs,deleteAcountExpires,deleteAcountToken, ...Candidatedetail } =
        populatedUser.toObject();
      return res.status(200).json(Candidatedetail);
    } else {
      const populatedUser = await user.populate(['Org','currentSubscription']);;
      const { password, candidate,deleteAcountExpires,deleteAcountToken, ...Orgdetails  } = populatedUser.toObject();
      return res.status(200).json(Orgdetails);
    }
  } catch (error) {
    next(error);
  }
});

const UserinfoById = asyncHandler(async (req, res, next) => {
  try {
    const { userid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userid)) {
      return res
        .status(404)
        .json({ message: 'user information is not current' });
    }

    if (!userid) {
      return res.status(400).json({ message: 'user not found' });
    }

    let details = await Org.findById(userid).select(
      'orgname _id avtar createdAt Isorg ',
    );

    if (!details) {
      details = await Candidate.findById(userid).select(
        'fullname gender empstatus _id avtar createdAt  ',
      );
    }

    if (!details) {
      return res.status(404).json({ message: 'User not found' });
    } else {
      return res.status(200).json(details);
    }
  } catch (error) {
    next(error);
  }
});

const MultipleUserinfo = asyncHandler(async (req, res, next) => {
  const Userids = req.query.ids ? req.query.ids.split(',') : [];
  try {
    let Person = [];
    for (let Id of Userids) {
      const OrgInfo = await Org.findById(Id);
      if (OrgInfo) {
        Person.push({
          name: OrgInfo?.orgname,
          id: OrgInfo?._id,
          avtar: OrgInfo?.avtar,
          created:OrgInfo?.createdAt
        });
        continue;
      }
      const CandidateInfo = await Candidate.findById(Id);
      if (CandidateInfo) {
        Person.push({
          name: CandidateInfo?.fullname,
          id: CandidateInfo?._id,
          avtar: CandidateInfo?.avtar,
          created:CandidateInfo?.createdAt
        });
        continue;
      }
    }
    return res.json(Person);
  } catch (error) {
    next(error);
  }
});

const DeleteAcountPerManently = asyncHandler(async (req, res, next) => {
  try {
    const accessToken = req.cookies.accesstoken;
    if (!accessToken) {
      return res
        .status(401)
        .json({ message: 'Login first before deleting the account' });
    }
    const decodedToken = jwt.decode(accessToken);

    if (!decodedToken || !decodedToken._id) {
      return res
        .status(401)
        .json({ message: ' missing user ID in the access token' });
    }
    const userId = decodedToken._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.Isorg) {
      await Org.findOneAndDelete({ owner: user?._id });
      await Job.deleteMany({ author: user?._id });
      await User.findByIdAndDelete(user?._id);
      res.clearCookie('accesstoken', { httpOnly: true, secure: true, sameSite: 'none', });
      return res.status(200).json({ message: 'Successfully deleted account' });
    } else {
      await Job.updateMany(
        { applicants: { $elemMatch: { $eq: mongoose.Types.ObjectId(user?._id) } } },
        { $pull: { applicants: { _id: mongoose.Types.ObjectId(user?._id) } } }
      )
      await Candidate.findOneAndDelete({ owner:user?._id});
      await User.findByIdAndDelete(user?._id);
      res.clearCookie('accesstoken', { httpOnly: true ,secure: true, sameSite: 'none', });
      return res
        .status(200)
        .json({ message: 'Successfully deleted account' });
    }
  } catch (error) {
    next(error);
  }
});

export {
  login,
  logout,
  register,
  resetPassword,
  ResetRequest,
  AcountDeleteRequest,
  DeleteAcountPerManently,
  GetCurrentUserInfo,
  UserinfoById,
  MultipleUserinfo,
  Me,
};
