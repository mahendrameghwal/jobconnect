import mongoose from "mongoose";

const jobschema = new mongoose.Schema({
  title: {
    type: String,
    required: [true,'enter title name'],
    minlength:3
  },
  orgname: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Org',
  },
  jobId:{
    type: String, 
    required: [true,'Job ID Required'],
    unique:[true, 'not a valid Job id']
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  city: {
    type: String,
    required: [true,'enter location '],
  },
  state: {
    type: String,
    required: [true,'enter location '],
  },
  country: {
    type: String,
    required: [true,'enter location '],
  },
  salary: {
    type: String,
    required:  [true,'enter the salary'],
   
  },
  jobtype: {
    type: String,
    required:  [true,'Choose a job type '],
  },
  joblevel: {
    type: String,
    required:[true,'Choose a job level'],
  },
  NumberOfPost: {
    type: Number,
    default:1
    
  },
  category:{
    type:String,
    required:[true,'Choose a category of job.'],

  },
  skills: {
    type: [String],
    required: true,
    validate: {
      validator: function (skills) {
        return skills.length >0; 
      },
      message: 'Please enter at least one skill.' 
  },
},
  shortdesc: {
    type: String,
    required: [true,'please enter description.'],
  },
  responsibilities: {
    type: [String],
    required: true,
    validate: {
      validator: function (responsibilities) {
        return responsibilities.length > 0; 
      },
      message: 'Please enter roles & responsibilities of candiddate.' 
  },
   
  },
  applicants:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'candidate',
    appliedTime: {
      type: Date,
      default: Date.now
    }
  }],
  shortlistedappliciants:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'candidate',
  }],
  totalapplication: {
    type: Number,
    default: 0,
  },
   author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
},{
  timestamps:true
});

const Job = mongoose.model("Job", jobschema);

export default Job;

