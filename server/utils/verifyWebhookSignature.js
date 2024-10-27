import axios from "axios"
import  getAccessToken from "./getAccessToken.js";


const verifyWebhookSignature = async (headers, body, webhookId) => {
    try {
      const accessToken = await getAccessToken();
  
      const verificationRequest = {
        auth_algo: headers['paypal-auth-algo'],
        cert_url: headers['paypal-cert-url'],
        transmission_id: headers['paypal-transmission-id'],
        transmission_sig: headers['paypal-transmission-sig'],
        transmission_time: headers['paypal-transmission-time'],
        webhook_id:webhookId,
        webhook_event: body
      };
  
      const response = await axios.post(
        `https://api-m.sandbox.paypal.com/v1/notifications/verify-webhook-signature`,
        verificationRequest,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('from verification',response.data);
      return response.data.verification_status === 'SUCCESS';
    } catch (error) {
      console.error('Error verifying webhook signature:', error);
      return false;
    }
  };

export default verifyWebhookSignature