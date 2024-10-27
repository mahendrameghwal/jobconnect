function calculateEndDate(billingCycle) {
  const now = new Date();
  if (billingCycle) {
    return new Date(now.setFullYear(now.getFullYear() + 1));
  }
}

export default calculateEndDate;
