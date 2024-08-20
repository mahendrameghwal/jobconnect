const User = require('../models/Userschema');
const Org = require('../models/Orgschema');
const Job = require('../models/jobschema');
const Candidate = require('../models/Candidateschema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECERET_KEY = process?.env?.JWT_SECRET;
const asyncHandler = require('express-async-handler');
const crypto = require('crypto');
const { sendResetPasswordEmail, DeleteAcountSendEmail } = require('../utils/emailServices');
const validator = require('validator');

const { default: mongoose } = require('mongoose');


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
          .send({
            message: 'password must be conatain between 5 to 16 chacater',
          });
    }
    if (req.body.email) {
      if (!validator.isEmail(req.body.email)) {
        return res.status(400).send({ message: 'Email must be a valid email' });
      }
    }
    const ExistUser = await User.findOne({ email: req.body.email });

    if (ExistUser) {
      return res
        .status(403)
        .send({ message: 'user already exist with this email' });
    } else {
      const NewUser = new User({ ...req.body, password: Hashpassword });

      await NewUser.save();
      const {
        jobs,
        __v,
        createdAt,
        updatedAt,
        fullname,
        username,
        password,
        resetPasswordToken,resetPasswordExpires,
        deleteAcountExpires,
        deleteAcountToken,
        ...info
      } = NewUser._doc;

      const token = jwt.sign(info, SECERET_KEY, { expiresIn: '24h' });

      res.cookie('accesstoken', token, {
        httpOnly: true,
        expires: expirationDate,
      });

      return res
        .status(201)
        .send({ message: 'user created successfully', data: NewUser });
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      const validationErrors = {};
      for (const field in err.errors) {
        validationErrors[field] = err.errors[field].message;
      }
      return res
        .status(400)
        .send({
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
        .send({ message: ' Please fill in all required fields' });
    }

    const ExistUser = await User.findOne({ email });

    if (!ExistUser) {
      return res.status(400).send({ message: 'user not found' });
    } else {
      const Iscorrect = bcrypt.compareSync(
        req.body.password,
        ExistUser.password,
      );

      if (!Iscorrect) {
        return res.status(400).send({ message: 'check password or username' });
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
            return res.status(403).send({ message: 'Invalid or expired token' });
          } else {
            return res
              .cookie('accesstoken', token, {
                httpOnly: true,
                expires: expirationDate,
              })
              .status(200)
              .send({ message: 'login success', token:decodedToken }); 
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
            return res.status(403).send({ message: 'Invalid or expired token' });
          } else {
            return res.cookie('accesstoken', token, {
                httpOnly: true,
                expires: expirationDate,
              })
              .status(200)
              .send({ message: 'login success', token: decodedToken }); // Include decodedToken in the response
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
        .send({
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
    return res.status(404).send({ message: 'Please Provide  email address' });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).send({ message: 'Email must be a valid email.' });
  }
  try {
    const user = await User.findOne({ email });
  
    if (!user) {
      return res
        .status(404)
        .send({ message: 'User does not exist for this email.' });
    }
    
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    await sendResetPasswordEmail(user?.email,  resetToken);

    return res
      .status(200)
      .send({ message: 'Password reset email sent successfully.' });
  } catch (error) {
    next(error);
  }
});




const AcountDeleteRequest = asyncHandler(async (req, res, next) => {
  const {email}= req.user;

  if (email === '') {
    return res.status(404).send({ message:'Please Provide email address' });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).send({ message: 'Email must be a valid email.' });
  }
  try {
    const user = await User.findOne({ email });  
    if (!user) {
      return res
        .status(404)
        .send({ message: 'User does not exist for this email.' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.deleteAcountToken = resetToken;
    user.deleteAcountExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    await DeleteAcountSendEmail(user?.email,  resetToken);

    return res
      .status(200)
      .send({ message: 'Acount delete request email sent successfully.' });
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
        return res.status(404).send({ message: 'Candidate not found' });
      }
      
      const candidateObject = Existcandidate.toObject();
      PermissonForUpdate = Existcandidate._id.toString() === user?.candidate?.toString();
      candidateObject.PermissonForUpdate = PermissonForUpdate;
      candidateObject.Isorg = false; // Adding Isorg field for candidate

      return res.status(200).send(candidateObject);
    } else {
      let PermissonForUpdate = false;  
      const org = await Org.findById(user?.Org).populate('jobs');
      
      if (!org) {
        return res.status(404).send({ message: 'Organization not found' });
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
        res.status(401).send({
          message: 'password must be conatain between 5 to 16 chacater',
        });
    }
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send({
        message: 'Please request a new  reset link',
      });
    }

    user.password = Hashpassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    return res.status(200).send({ message: 'Password reset successfully.' });
  } catch (error) {
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      return res
        .status(500)
        .send({ message: 'Network error occurred. Please try again later.' });
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
      })
      .status(200)
      .send({ message: 'user has logged out succesfully' });
  } catch (error) {
    next(error);
  }
});

const GetCurrentUserInfo = asyncHandler(async (req, res, next) => {
  try {
    const userid = req.user?._id;
    const user = await User.findById(userid);
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }
    if (!user.Isorg) {
      const populatedUser = await user.populate('candidate');
      const { Org, password, jobs, ...Candidatedetail } =
        populatedUser.toObject();
      return res.status(200).send(Candidatedetail);
    } else {
      const populatedUser = await user.populate('Org');
      const { password, candidate, ...Orgdetails } = populatedUser.toObject();
      return res.status(200).send(Orgdetails);
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
        .send({ message: 'user information is not current' });
    }

    if (!userid) {
      return res.status(400).send({ message: 'user not found' });
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
      return res.status(404).send({ message: 'User not found' });
    } else {
      return res.status(200).send(details);
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
    return res.send(Person);
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
        .send({ message: 'Login first before deleting the account' });
    }
    const decodedToken = jwt.decode(accessToken);

    if (!decodedToken || !decodedToken._id) {
      return res
        .status(401)
        .send({ message: ' missing user ID in the access token' });
    }
    const userId = decodedToken._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    if (user.Isorg) {
      await Org.findOneAndDelete({ owner: user?._id });
      await Job.deleteMany({ author: user?._id });
      await User.findByIdAndDelete(user?._id);
      res.clearCookie('accesstoken', { httpOnly: true });
      return res.status(200).send({ message: 'Successfully deleted account' });
    } else {
      await Job.updateMany(
        { applicants: { $elemMatch: { $eq: mongoose.Types.ObjectId(user?._id) } } },
        { $pull: { applicants: { _id: mongoose.Types.ObjectId(user?._id) } } }
      )
      await Candidate.findOneAndDelete({ owner:user?._id});
    await User.findByIdAndDelete(user?._id);
      res.clearCookie('accesstoken', { httpOnly: true });
      return res
        .status(200)
        .send({ message: 'Successfully deleted account' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = {
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
Me
};
