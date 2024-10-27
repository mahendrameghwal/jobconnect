import Subscription from "../models/SubscriptionSchema.js";

const checkExpiredSubscriptions = async () => {
    const now = new Date();
    const expiredSubscriptions = await Subscription.find({
      status: 'ACTIVE',
      subEnddate: { $lte: now }
    });
  
    for (let subscription of expiredSubscriptions) {
      subscription.status = 'EXPIRED';
      await subscription.save();
  
      // Remove current subscription from user
      await User.findByIdAndUpdate(subscription.user, { $unset: { currentSubscription: 1 } });
  
      console.log(`Subscription ${subscription._id} expired for user ${subscription.user}`);
    }
  };
export default checkExpiredSubscriptions