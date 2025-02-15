import React, { Fragment,useState } from 'react';
import { useCancelSubscriptionMutation, useGetUserCurrentSubscriptionQuery, useRefundMoneyMutation } from '../../../../app/api/PaymentApi';
import Skeletion from './Skeletion';
import { FiCalendar, FiClock, FiDollarSign, FiRefreshCcw } from "react-icons/fi";
import { DateTime } from 'luxon';
import { toast } from "react-hot-toast";
import { RiRefundFill } from "react-icons/ri";



const CurrentSubscription = () => {
  const { data: currentSubscription, isLoading:CurrentSubLoading, isSuccess } = useGetUserCurrentSubscriptionQuery();
  const [cancelSubscription, { isLoading: cancelLoading }] = useCancelSubscriptionMutation();
  const [RefundMoney, { isLoading: RefundMoneyLoading }] = useRefundMoneyMutation();
  
  
  const HandleCancelSubscription = async (subscriptionId) => {
    console.log(subscriptionId);
    try {
      if (!subscriptionId) return;
      const response = await cancelSubscription(subscriptionId).unwrap();
      
      if (response.message) {
        toast.success(response.message);
      }
    } catch (error) {
      console.error('Cancellation error:', error);
      if (error.data && error.data.message) {
        toast.error(error.data.message);
      } else {
        toast.error('An error occurred while cancelling the subscription');
      }
    }
  };


  const HandleRefundMoney = async (subscriptionId) => {
    try {
      if (!subscriptionId) return;
      const response = await RefundMoney(subscriptionId).unwrap();
      
      if (response.message) {
        toast.success(response.message);
      }
    } catch (error) {
      console.error('Cancellation error:', error);
      if (error.data && error.data.message) {
        toast.error(error.data.message);
      } else {
        toast.error('An error occurred while cancelling the subscription');
      }
    }
  };

console.log(currentSubscription);
  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    return DateTime.fromISO(dateString).toFormat("dd LLL yyyy, hh:mm a");
  };

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      'APPROVAL_PENDING': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: '⏳' },
      'CANCELLED': { bg: 'bg-gray-100', text: 'text-gray-800', icon: '🚫' },
      'ACTIVE': { bg: 'bg-green-100', text: 'text-green-800', icon: '✅' },
      'EXPIRED': { bg: 'bg-red-100', text: 'text-red-800', icon: '⚠️' },
      'CREATED': { bg: 'bg-blue-100', text: 'text-blue-800', icon: '🆕' },
    };
  
    const config = statusConfig[status] || statusConfig['CREATED'];



  
    return (
      <span className={`px-2 py-1 rounded-md text-sm font-bold ${config.bg} ${config.text} flex items-center space-x-1`}>
        <span>{config.icon}</span>
        <span>{status}</span>
      </span>
    );
  };

  const InfoRow = ({ icon, label, value }) => (
    value && (
      <div className="flex items-center space-x-2 my-0.5 text-sm">
        <span className="text-gray-400 dark:text-gray-500">{icon}</span>
        <span className="font-medium text-gray-500 dark:text-gray-400">{label}:</span>
        <span className="text-gray-700 dark:text-gray-300">{value}</span>
      </div>
    )
  );

  return (
    <Fragment>
    
      {CurrentSubLoading && <Skeletion />}
      {isSuccess && currentSubscription && (
        <Fragment>
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <section className='w-full sm:w-1/2 mb-4 sm:mb-0'>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Current Subscription</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Your active subscription details
          </p>
        </section>
        <section className='w-full sm:w-1/2 flex gap-x-3 justify-start sm:justify-end'>
          <button disabled={cancelLoading} onClick={()=>{HandleCancelSubscription(currentSubscription?._id)}} className="py-0.5 max-md:py-1 px-2 rounded-md text-white shadow-sm flex items-center tracking-wider bg-[#f93a3a] hover:bg-[#e71f1f] active:bg-[#c21313] disabled:bg-[#ffc7c7] transition-colors duration-200">
          {cancelLoading ? 'cancelling Subscription..':'Cancel Plan'}
          </button>
     {  !currentSubscription.isrefund &&    <button disabled={RefundMoneyLoading} onClick={()=>{HandleRefundMoney(currentSubscription?._id)}} className="relative inline-flex items-center justify-center gap-2 text-sm font-medium bg-green-500 hover:bg-green-600 rounded-md px-3 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
     {RefundMoneyLoading ? (
        'Wait...'
      ) : (
        <>
          <RiRefundFill />
          Refund
        </>
      )}
      
    </button>}
        </section>
      </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-gray-900 rounded-lg p-4 shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">{currentSubscription?.billingCycle}</h3>
                <InfoRow icon={<FiCalendar />} label="Period" value={`${formatDateTime(currentSubscription?.lastPaymentDate)} - ${formatDateTime(currentSubscription?.subEnddate)}`} />
                <InfoRow icon={<FiClock />} label="Created" value={formatDateTime(currentSubscription?.subCreatedate)} />
                <InfoRow icon={<FiRefreshCcw />} label="Last Payment" value={formatDateTime(currentSubscription?.lastPaymentDate)} />
                <InfoRow icon={<FiRefreshCcw />} label="end date" value={formatDateTime(currentSubscription?.subEnddate)} />

                {currentSubscription?.isrefund !== undefined && (
                  <InfoRow icon={<FiRefreshCcw />} label="Refunded" value={currentSubscription.isrefund ? "Yes" : "No"} />
                )}
              </div>
            </div>
            
            <div className="flex flex-col justify-between">
              <div className="bg-blue-50 dark:bg-gray-900 rounded-lg p-4 shadow-md mb-2">
                {currentSubscription?.price && (
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-gray-600 dark:text-gray-400">Price</span>
                    <span className="text-base font-bold text-gray-800 dark:text-white flex items-center">
                      <FiDollarSign className="mr-1" />
                      {currentSubscription.price}
                    </span>
                  </div>
                )}
              </div>
              <div className="bg-blue-50 dark:bg-gray-900 rounded-lg p-4 shadow-md">
                <div className="flex justify-between items-center">
                  <span className="text-base font-medium text-gray-600 dark:text-gray-400">Status</span>
                  <StatusBadge status={currentSubscription?.status} />
                </div>
              </div>
            </div>
          </div>
      </Fragment>
      )}
    </Fragment>
  );
};

export default CurrentSubscription;