const getPlanDetails = (plan, billingCycle) => {
    const plans = {
      candidate: {
        monthly: { planId: 'P-94F618772J696650FM3VF5EQ', price: '300.00' },
        yearly: { planId: 'P-6NP129987C2080035M3VF6PQ', price: '240.00' }
      },
      organization: {
        monthly: { planId: 'P-7SF915126F6442128M3VGCHA', price: '480.00' },
        yearly: { planId: 'P-4LT562767Y0966948M3VGFNY', price: '360.00' }
      }
    };
  
    return plans[plan] && plans[plan][billingCycle];
  };

export default getPlanDetails;