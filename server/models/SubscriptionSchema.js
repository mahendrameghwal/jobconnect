import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    plan: {
      type: String,
      enum: ['candidate', 'organization'],
      required: true,
    },

    billingCycle: {
      type: String,
      enum: ['monthly', 'yearly'],
      required: true,
    },
    subCreatedate: {
      type: Date,
    },
    subEnddate: {
      type: Date,
    },
    status: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    isrefund:{
      type: Boolean,
      required: true,
      default: false,
    },
    lastPaymentDate:{
      type: Date,
    },
    cancelDate:{
      type: Date,
    },
    refundDate:{
      type: Date,
    },
TransactionId:{
  type: String,
},
    paypalSubscriptionId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Subscription', SubscriptionSchema);
