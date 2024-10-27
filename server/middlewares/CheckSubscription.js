import User from "../models/Userschema";

const CheckSubscription = async (req, res, next) => {
  try {
    const userId = req.user._id;
  
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (!existingUser.subscriptionType || 
        existingUser.subscriptionType === 'none' || 
        new Date() > existingUser.subscriptionEnd) {
      return res.status(403).json({ message: 'Valid subscription required' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'something went wrong' });
  }
};

export default  CheckSubscription;