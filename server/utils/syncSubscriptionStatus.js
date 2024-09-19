const { default: axios } = require("axios");
const getAccessToken = require("./getAccessToken");

const syncSubscriptionStatus = async (subscription) => {
    const accessToken = await getAccessToken();
    const response = await axios.get(
      `${process.env.PAYPAL_API_URL}/v1/billing/subscriptions/${subscription.paypalSubscriptionId}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      }
    );

  console.log('from syncSubscription Status',response.data);

    subscription.status = response.data.status;
    subscription.subEnddate = response.data.billing_info.next_billing_time;
    await subscription.save();
    return response.data.status;
  };

  module.exports=syncSubscriptionStatus