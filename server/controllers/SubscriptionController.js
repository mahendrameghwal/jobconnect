const Subscription = require('../models/SubscriptionSchema');
const User = require('../models/Userschema');
const getPlanDetails = require('../utils/getPlanDetails');
const calculateEndDate = require('../utils/CalculateEndDate');
const getAccessToken = require('../utils/getAccessToken');
const axios = require('axios');
const updateUserSubscription = require('../utils/updateUserSubscription');
const verifyWebhookSignature = require('../utils/verifyWebhookSignature');
const syncSubscriptionStatus = require('../utils/syncSubscriptionStatus');

const createSubscription = async (req, res, next) => {
  try {
    const { plan, billingCycle } = req.body;
    const userId = req.user._id;
    const planDetails = getPlanDetails(plan, billingCycle);
    const Userdetail = await User.findById(userId);

    if (!planDetails) {
      return res.status(400).json({ message: 'Invalid plan or billing cycle' });
    }

    const accessToken = await getAccessToken();
    const [given_name] = Userdetail.fullname?.split(' ') || ['fullname'];

    const response = await axios.post(
      `${process.env.PAYPAL_API_URL}/v1/billing/subscriptions`,
      {
        plan_id: planDetails?.planId,
        subscriber: {
          name: {
            given_name: given_name || 'FirstName',
          },
          email_address: Userdetail.email,
        },
        application_context: {
          brand_name: 'Jobconnect',
          locale: 'en-US',
          shipping_preference: 'NO_SHIPPING',
          user_action: 'SUBSCRIBE_NOW',
          return_url: `${process.env.FRONTEND_APP_URL}/payment/success`,
          cancel_url: `${process.env.FRONTEND_APP_URL}/payment/cancel`,
          notify_url: `${process.env.BACKEND_APP_URL}/paypal/webhook`,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const subscription = new Subscription({
      user: userId,
      plan,
      price: planDetails.price,
      billingCycle,
      paypalSubscriptionId: response.data.id,
      status: response.data.status,
    });
    await updateUserSubscription(userId, subscription._id);
    await subscription.save();
    // console.log('response from creating plan', response.data);

    res.status(201).json({
      message: 'Subscription created successfully',
      subscriptionId: subscription._id,
      approvalUrl: response.data.links.find((link) => link.rel === 'approve')
        .href,
    });
  } catch (error) {
    console.error(
      'Error creating subscription:',
      error.response ? error.response.data : error.message,
    );
    next(error);
  }
};

const getUserCurrentSubscriptions = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('currentSubscription')
      .populate('currentSubscription');
    return res.status(200).json(user.currentSubscription);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching subscriptions' });
  }
};

const getUserSubscriptionsHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: 'subscriptionHistory',
        options: { sort: { createdAt: -1 } },
      })
      .select('subscriptionHistory');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user.subscriptionHistory);
  } catch (error) {
    console.error('Error fetching subscription history:', error);
    return res
      .status(500)
      .json({ message: 'Error fetching subscription history' });
  }
};

const cancelSubscription = async (req, res, next) => {
  try {
    const { subscriptionId } = req.params;
    const userId = req.user._id;
    const subscription = await Subscription.findOne({
      _id: subscriptionId,
      user: userId,
    });

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    const accessToken = await getAccessToken();

    const currentStatus = await syncSubscriptionStatus(subscription);
    if (currentStatus !== 'ACTIVE' && currentStatus !== 'SUSPENDED') {
      return res.status(400).json({
        message: 'Cannot cancel subscription',
        details: `Subscription status is ${currentStatus}`,
      });
    }

    // If status is correct, proceed with cancellation
    await axios.post(
      `${process.env.PAYPAL_API_URL}/v1/billing/subscriptions/${subscription.paypalSubscriptionId}/cancel`,
      { reason: 'Customer requested cancellation' },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error(
      'Error cancelling subscription:',
      error.response ? error.response.data : error.message,
    );
    res.status(500).json({
      message: 'Error cancelling subscription',
      details: error.response ? error.response.data : error.message,
      data: error,
    });
  }
};

const handleRefundRequest = async (req, res) => {
  try {
    console.log(req.params);
    const { subscriptionId } = req.params;
    const userId = req.user._id;
    const subscription = await Subscription.findOne({
      _id: subscriptionId,
      user: userId,
    });

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    const daysSincePayment =
      (new Date() - subscription.lastPaymentDate) / (1000 * 60 * 60 * 24);

    if (daysSincePayment > 15) {
      return res
        .status(400)
        .json({ message: 'Refund not possible after 15 days' });
    }

    if (subscription.price <= 0 || !subscription.price) {
      return res.status(400).json({ message: 'Invalid refund amount' });
    }
    if (subscription.isrefund) {
      return res.status(400).json({ message: 'Refund was already issued for transaction' });
    }
console.log(subscription);
    //  refund
    if (subscription.TransactionId) {
      const accessToken = await getAccessToken();
      const refundResponse = await axios.post(
        `${process.env.PAYPAL_API_URL}/v1/payments/sale/${subscription.TransactionId}/refund`,
        {
          amount: {
            total: subscription.price.toFixed(2),
            currency: 'USD',
          }
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('response from refund',refundResponse);
      if (refundResponse.data.state === 'completed') {
        subscription.status = 'CANCELLED';
        subscription.refundDate = new Date(refundResponse.data.create_time);
        subscription.cancelDate = new Date(refundResponse.data.create_time);

        subscription.isrefund = true;

        const user = await User.findById(subscription.user);
        if (user) {
          user.currentSubscription = undefined;
          if (!user.subscriptionHistory.includes(subscriptionId)) {
            user.subscriptionHistory.push(subscriptionId);
            await subscription.save();
          }
          await user.save();
          return res.status(201).json({ message: 'Refund successfully' });
        }
        
      } else {
        return res
          .status(400)
          .json({ message: 'Refund could not be processed' });
      }
    }
  } catch (error) {
    console.error('Error processing refund:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const handlePayPalWebhook = async (req, res) => {
  try {
    const webhookId = process.env.WEBHOOKID;
    const isVerified = await verifyWebhookSignature(
      req.headers,
      req.body,
      webhookId,
    );

    if (!isVerified) {
      console.error('Invalid webhook signature');
      return res.status(400).json({ message: 'something went wrong' });
    }
    // console.log('from request', req);
    const event = req.body;
    // console.log('Received PayPal webhook:', event.event_type);
    console.log('event body:', event);

    let subscriptionId;
    let subscription;

    switch (event.event_type) {
      case 'BILLING.SUBSCRIPTION.CREATED':
        subscriptionId = event.resource.id;
        subscription = await Subscription.findOne({
          paypalSubscriptionId: subscriptionId,
        });
        if (subscription) {
          subscription.status = 'CREATED';
          subscription.subCreatedate = event.create_time;
          await subscription.save();
          // console.log('Subscription created:', subscriptionId);
        }
        break;
      case 'PAYMENT.SALE.COMPLETED':
        subscriptionId = event.resource.billing_agreement_id;
        subscription = await Subscription.findOne({
          paypalSubscriptionId: subscriptionId,
        });
        if (subscription) {
          const lastPaymentDate = new Date(event.resource.create_time);
          subscription.status = 'ACTIVE';
          subscription.TransactionId=event.resource.id;
          subscription.lastPaymentDate = lastPaymentDate;
          subscription.subEnddate = calculateEndDate(
            subscription.billingCycle,
            lastPaymentDate,
          );
          await subscription.save();
          // console.log('Payment completed for subscription:', subscriptionId);
        }
        break;

      case 'BILLING.SUBSCRIPTION.CANCELLED':
        subscriptionId = event.resource.id;
        subscription = await Subscription.findOne({
          paypalSubscriptionId: subscriptionId,
        });
        if (subscription) {
          subscription.status = event.status;
          subscription.cancelDate = event.status_update_time;
          await subscription.save();
          // console.log('Subscription cancelled:', subscriptionId);
          const user = await User.findById(subscription.user);
          if (user) {
            user.currentSubscription = undefined;
            if (!user.subscriptionHistory.includes(subscriptionId)) {
              user.subscriptionHistory.push(subscriptionId);
            }
            await user.save();
            res
              .status(200)
              .json({ message: 'subscription cancelled successfully' });
          }
        }
        break;
      case 'BILLING.SUBSCRIPTION.EXPIRED':
        subscriptionId = event.resource.id;
        subscription = await Subscription.findOne({
          paypalSubscriptionId: subscriptionId,
        });
        if (subscription) {
          subscription.status = 'EXPIRED';
          await subscription.save();
          // console.log('Subscription expired:', subscriptionId);
          const user = await User.findById(subscription.user);
          if (user) {
            user.currentSubscription = undefined;
            if (!user.subscriptionHistory.includes(subscriptionId)) {
              user.subscriptionHistory.push(subscriptionId);
            }
            await user.save();
          }
        }
        break;

      default:
      // console.log('Unhandled event type:', event.event_type);
    }

    if (!subscription && subscriptionId) {
      console.error('Subscription not found:', subscriptionId);
      return res.status(404).json({ message: 'Subscription not found' });
    }

    res.status(200).json({ message: 'Webhook successfully' });
  } catch (error) {
    console.error('Error handling PayPal webhook:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  cancelSubscription,
  createSubscription,
  handlePayPalWebhook,
  getUserCurrentSubscriptions,
  getUserSubscriptionsHistory,
  handleRefundRequest,
};
