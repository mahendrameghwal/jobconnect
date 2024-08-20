import { toast } from 'react-hot-toast';

export const validateDateRange = (startDate, endDate, fieldName) => {
  
  if (fieldName === 'startdate' && endDate && startDate > endDate) {
    toast.error('Start date cannot be later than end date');
    return false;
  }

  if (fieldName === 'enddate' && startDate && endDate < startDate) {
    toast.error('End date cannot be earlier than start date');
    return false;
  }

  return true;
};
