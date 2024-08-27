const SubscriptionSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    planId: {
      type: String,
      required: true
    },
    planName: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'CANCELLED', 'SUSPENDED', 'EXPIRED'],
      default: 'ACTIVE'
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date
    },
    paypalSubscriptionId: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    },
    frequency: {
      type: String,
      enum: ['MONTH', 'YEAR'],
      required: true
    }
  }, {
    timestamps: true
  });
  
  const Subscription = mongoose.model('Subscription', SubscriptionSchema);
  module.exports = Subscription;