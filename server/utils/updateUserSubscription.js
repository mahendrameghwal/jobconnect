const User = require('../models/Userschema');
const updateUserSubscription = async (userId, subscriptionId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (user.currentSubscription) {
      user.subscriptionHistory.push(user.currentSubscription);
    }
    user.currentSubscription = subscriptionId;
    await user.save();
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = updateUserSubscription;
