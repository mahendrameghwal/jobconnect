import mongoose from "mongoose";
import passwordValidator from "password-validator";

const schema = new passwordValidator();

schema
  .is().min(8)                                    // Minimum length 8
  .is().max(100)                                  // Maximum length 100
  .has().uppercase()                              // Must have uppercase letters
  .has().lowercase()                              // Must have lowercase letters
  .has().digits()                                 // Must have digits
  .has().not().spaces();
const Userschema = new mongoose.Schema({
  fullname:{
    type:String,
    required:[true, 'please enter fullname']
  },
  username:{
    type:String,
    required:[true, ' enter username']
  },
  email:{
    
    type:String,
    required:[true, ' enter your email '],
    unique: [true, 'already exist email'],
    match: [/^(?=.{1,254}$)(?=.{1,64}@.{1,255}$)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/
    ,   'Please provide a valid email address',],
    lowercase: true 
   },
   password: {
    type: String,
    required: [true, ' enter your password '],
    validate: {
      validator: function (value) {
        return schema.validate(value) ? true : false;
      },
      message: 'Password does not meet the criteria'
    }
  },
   Isorg:{
    type: Boolean,
    required:true,
    default:false
   },

   isAdmin:{
    type: Boolean,
    required:true,
    default:false
   },
   candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'candidate',
    default:null
  },
  Org: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Org',
    default:null
  },
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job',}],
   resetPasswordToken: String,
   resetPasswordExpires: Date,
   deleteAcountToken: String,
   deleteAcountExpires: Date,

   
   currentSubscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription'
  },
  subscriptionHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription'
  }]

},{
  timestamps:true
});
Userschema.pre('save', function(next) {
  if (this.isModified('email')) {
      this.email = this.email.toLowerCase();
  }
  next();
});

const User = mongoose.model("User", Userschema);

export default User;

