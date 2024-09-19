const express = require('express');
const router = express.Router();
const {
  cancelSubscription,
  createSubscription,
  handlePayPalWebhook,
  getUserCurrentSubscriptions,
  getUserSubscriptionsHistory
} = require('../controllers/SubscriptionController');
const VerifyToken = require('../middlewares/verifytoken');
// const verifyWebhookSignature = require('../utils/verifyWebhookSignature');

router.post('/create', VerifyToken, createSubscription);
// router.get('/user', VerifyToken, getUserSubscriptions);
router.get('/current', VerifyToken,getUserCurrentSubscriptions);
router.get('/history', VerifyToken,getUserSubscriptionsHistory);
router.post('/cancel/:subscriptionId', VerifyToken, cancelSubscription);
router.post('/paypal/webhook', handlePayPalWebhook);

module.exports = router;
