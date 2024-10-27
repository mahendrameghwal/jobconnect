import mongoose from "mongoose";

const Orgschema = new mongoose.Schema(
  {
    avtar: {
      type: String,
    },
    orgname: {
      type: String,
      required: [true, "Please enter your company name "]
  
    },
    category: {
      type: String,
      required: [true, "Please enter your category name"]
    },
    linkedin: {
      type: String,
    },
    website: {
      type: String,
    },
    mobile: {
      type: String,
      validate: {
        validator:  (value)=> {
          // digit, maximum length 10
            return /^\d{10}$/.test(value);
        },
        message: (props) =>`'${props.value}' is not a valid phone number! Please provide a valid mobile no.`,
      },
      required: [true, 'Mobile number is required!'],
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    about: {
      type: String,
      required: [true, "Please enter description"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job',}]
  },
  {
    timestamps: true,
  }
);

const Org = mongoose.model("Org", Orgschema);
export default Org;
