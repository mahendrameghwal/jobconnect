import express from 'express';
const router = express.Router();
import {
  cancelSubscription,
  createSubscription,
  handlePayPalWebhook,
  getUserCurrentSubscriptions,
  getUserSubscriptionsHistory,
  handleRefundRequest
} from '../controllers/SubscriptionController.js';
import VerifyToken from '../middlewares/verifytoken.js';
// const verifyWebhookSignature = require('../utils/verifyWebhookSignature');

router.post('/create', VerifyToken, createSubscription);
// router.get('/user', VerifyToken, getUserSubscriptions);
router.get('/current', VerifyToken,getUserCurrentSubscriptions);
router.get('/history', VerifyToken,getUserSubscriptionsHistory);
router.post('/cancel/:subscriptionId', VerifyToken, cancelSubscription);
router.post('/refund/:subscriptionId',VerifyToken, handleRefundRequest);
router.post('/paypal/webhook', handlePayPalWebhook);

export default router;
