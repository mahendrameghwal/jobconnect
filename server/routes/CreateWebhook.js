const createWebhook = async () => {
    const accessToken = await getAccessToken();
  
    const response = await axios.post(
      `${process.env.PAYPAL_API_URL}/v1/notifications/webhooks`,
      {
        url: `https://d3b28d9bac439e.lhr.life/billing-activated`,
        event_types: [
          {
            name: 'BILLING.SUBSCRIPTION.ACTIVATED'
          },
          // Add more events as needed
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
  
    console.log('Webhook created:', response.data);
  };
  
  createWebhook();
  