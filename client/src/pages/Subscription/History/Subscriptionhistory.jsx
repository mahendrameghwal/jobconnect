import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useGetUserSubscriptionsHistoryQuery } from '../../../../app/api/PaymentApi';
import { DateTime } from 'luxon';

const Subscriptionhistory = () => {
  const { isLoading, data: MySubscriptionsHistory } = useGetUserSubscriptionsHistoryQuery();

  const SubscriptionStatus = {
    ACTIVE: 'ACTIVE',
    EXPIRED: 'EXPIRED',
    CANCELLED: 'CANCELLED',
  };

  const StatusBadge = ({ status }) => {
    let color, icon;
    switch (status) {
      case SubscriptionStatus.ACTIVE:
        color = 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
        icon = <FaCheckCircle className="inline mr-1" />;
        break;
      case SubscriptionStatus.EXPIRED:
        color = 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
        icon = <FaTimesCircle className="inline mr-1" />;
        break;
      case SubscriptionStatus.CANCELLED:
        color = 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
        icon = <FaTimesCircle className="inline mr-1" />;
        break;
      default:
        color = 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
        icon = null;
    }
    return (
      <span className={`px-2 py-1 border flex items-center rounded-full text-xs font-semibold ${color}`}>
        {icon}{status}
      </span>
    );
  };

  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);
  const toggleHistory = () => setIsHistoryExpanded(!isHistoryExpanded);

  

  if (isLoading) {
    return <p>Loading subscription history...</p>;
  }

  return (
    Array.isArray(MySubscriptionsHistory) && MySubscriptionsHistory.length > 0 && (
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow transition-colors duration-200">
        <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center cursor-pointer" onClick={toggleHistory}>
          <div>
            <h2 className="text-xl font-semibold">Subscription History</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Your past subscriptions</p>
          </div>
          {isHistoryExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {isHistoryExpanded && (
          <div className="p-2">
            <div className="space-y-4">
              {MySubscriptionsHistory.map((sub) => (
                <div key={sub._id} className="p-2 border dark:border-gray-700 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold capitalize">{sub.plan} Plan</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Start Date: {new Date(sub.subCreatedate).toLocaleDateString()} <br />
                        End Date: {new Date(sub.subEnddate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right ">
                      <p className="font-semibold">${sub.price.toFixed(2)}</p>
                      <StatusBadge status={sub.status} />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    PayPal Subscription ID: {sub.paypalSubscriptionId} <br />
                    Last Payment Date: {new Date(sub.lastPaymentDate).toLocaleString()} <br />
                    Cancel Date: {sub.cancelDate ? new Date(sub.cancelDate).toLocaleString() : 'N/A'} <br />
                    Billing Cycle: {sub.billingCycle.charAt(0).toUpperCase() + sub.billingCycle.slice(1)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default Subscriptionhistory;
