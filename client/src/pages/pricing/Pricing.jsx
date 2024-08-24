import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';

const Pricing = () => {
  const [activeBilling, setActiveBilling] = useState('monthly');
  const [prices, setPrices] = useState({
    candidate: { monthly: 199, yearly: 90 * 12 },
    organization: { monthly: 500, yearly: 400 * 12 }
  });

  useEffect(() => {
    setPrices(prevPrices => ({
      candidate: {
        monthly: 199,
        yearly: 90 * 12
      },
      organization: {
        monthly: 500,
        yearly: 400 * 12
      }
    }));
  }, [activeBilling]);


  return (
    <div className="sm:flex sm:flex-col sm:items-center p-10 bg-white dark:bg-gray-900">
    <div className="relative self-center bg-slate-200 dark:bg-black rounded-lg p-0.5 flex mb-8">
      <button
        type="button"
        onClick={() => setActiveBilling('monthly')}
        className={`relative w-1/2 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8 ${activeBilling === 'monthly' ? 'bg-blue-100 border border-blue-500 text-slate-900 dark:bg-blue-900 dark:border-blue-700 dark:text-slate-100' : 'bg-slate-50 border-slate-50 text-slate-900 dark:bg-gray-800 dark:border-gray-700 dark:text-slate-200'} shadow-sm`}
      >
        Monthly billing
      </button>
      <button
        type="button"
        onClick={() => setActiveBilling('yearly')}
        className={`ml-0.5 relative w-1/2 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8 ${activeBilling === 'yearly' ? 'bg-blue-100 border border-blue-500 text-slate-900 dark:bg-blue-900 dark:border-blue-700 dark:text-slate-100' : 'border border-transparent text-slate-900 dark:bg-gray-800 dark:border-gray-700 dark:text-slate-200'} shadow-sm`}
      >
        Yearly billing
      </button>
    </div>
  
    <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 md:max-w-4xl md:mx-auto xl:grid-cols-2">
      {/* Candidate plan */}
      <div className="border border-slate-200 rounded-lg shadow-sm divide-y divide-slate-200 dark:border-gray-700 dark:divide-gray-700">
        <div className="p-6">
          <h2 className="text-xl leading-6 font-bold text-slate-900 dark:text-slate-100">Candidate</h2>
          <p className="mt-2 text-base text-slate-700 dark:text-slate-400 leading-tight">
            For job seekers looking to create and manage their professional profile.
          </p>
          <p className="mt-8">
            <span className="text-4xl font-bold text-slate-900 dark:text-slate-100 tracking-wide">
              ₹{prices.candidate[activeBilling] / (activeBilling === 'yearly' ? 12 : 1)}
            </span>
            <span className="text-base font-medium text-slate-500 dark:text-slate-400">/{activeBilling === 'yearly' ? 'mo' : 'mo'}</span>
          </p>
          <Link to="/register"
            className="mt-8 block w-full bg-slate-900 rounded-md py-2 text-sm font-semibold text-white text-center dark:bg-gray-800"
          >
            Join as a Candidate
          </Link>
        </div>
        <div className="pt-6 pb-8 px-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-wide uppercase">What's included</h3>
          <ul role="list" className="mt-4 space-y-1">
            <li className="flex items-center space-x-3">
              <FaCheckCircle className="flex-shrink-0 h-4 w-5 text-green-400" />
              <span className="text-base max-md:text-sm text-slate-700 dark:text-slate-400">Create Resume By information</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaCheckCircle className="flex-shrink-0 h-4 w-5 text-green-400" />
              <span className="text-base max-md:text-sm text-slate-700 dark:text-slate-400">Apply to job listings</span>
              <span className="text-xs bg-green-100 text-green-800 px-3 py-0 rounded-sm dark:bg-green-900 dark:text-green-300">Free</span>
            </li>
          </ul>
        </div>
      </div>
  
      {/* Organization plan */}
      <div className="border border-slate-200 rounded-lg shadow-sm divide-y divide-slate-200 dark:border-gray-700 dark:divide-gray-700">
        <div className="p-6">
          <h2 className="text-xl leading-6 font-bold text-slate-900 dark:text-slate-100">Organization</h2>
          <p className="mt-2 text-base text-slate-700 dark:text-slate-400 leading-tight">
            For companies looking to post job listings and manage applicants.
          </p>
          <p className="mt-8">
            <span className="text-4xl font-bold text-slate-900 dark:text-slate-100 tracking-tighter">
              ₹{prices.organization[activeBilling] / (activeBilling === 'yearly' ? 12 : 1)}
            </span>
            <span className="text-base font-medium text-slate-500 dark:text-slate-400">/{activeBilling === 'yearly' ? 'mo' : 'mo'}</span>
          </p>
          <Link to="/register"
            className="mt-8 block w-full bg-slate-900 rounded-md py-2 text-sm font-semibold text-white text-center dark:bg-gray-800"
          >
            Join as an Organization
          </Link>
        </div>
        <div className="pt-6 pb-8 px-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-wide uppercase">What's included</h3>
          <ul role="list" className="mt-4 space-y-3">
            <li className="flex space-x-3">
              <FaCheckCircle className="flex-shrink-0 h-4 w-5 text-green-400" />
              <span className="text-base text-slate-700 dark:text-slate-400">Post unlimited job listings</span>
            </li>
            <li className="flex space-x-3">
              <FaCheckCircle className="flex-shrink-0 h-4 w-5 text-green-400" />
              <span className="text-base text-slate-700 dark:text-slate-400">Applicant tracking system</span>
            </li>
            <li className="flex space-x-3">
              <FaCheckCircle className="flex-shrink-0 h-4 w-5 text-green-400" />
              <span className="text-base text-slate-700 dark:text-slate-400">Advanced search features</span>
            </li>
            <li className="flex space-x-3">
              <FaCheckCircle className="flex-shrink-0 h-4 w-5 text-green-400" />
              <span className="text-base text-slate-700 dark:text-slate-400">Analytics and reporting</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Pricing;