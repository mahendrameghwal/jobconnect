import React from "react";
import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa6";
import { FiCheckCircle } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
const JobReport = () => {
  // Mock data based on your provided job data
  const stats = {
    totalApplications: 1,
    shortlisted: 0,
    rejected: 1,
    jobId: "F0TQ00JMAH",
    recentActivity: [
      {
        name: "Mahendra Kumar",
        status: "Applied",
        timestamp: "2024-03-21T09:31:58.732Z",
        avatar: "https://ui-avatars.com/api/?name=Mahendra+Kumar&background=random"
      }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="p-6 dark:bg-gray-900"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Total Applications Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-orange-400/50 p-6 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalApplications}
              </div>
              <div className="text-sm text-gray-500">Total Applications</div>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">

            <FaUsers  className="w-6 h-6 text-orange-500"/>
            
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            Job ID: {stats.jobId}
          </div>
        </div>

        {/* Shortlisted Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-green-400 p-6 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.shortlisted}
              </div>
              <div className="text-sm text-gray-500">Shortlisted</div>
              <div className="text-xs text-green-500 mt-1">
                {((stats.shortlisted / stats.totalApplications) * 100).toFixed(1)}% of total
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
            <FiCheckCircle  className="w-6 h-6 text-green-500"/>
            </div>
          </div>
        </div>

        {/* Rejected Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-red-400 p-6 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.rejected}
              </div>
              <div className="text-sm text-gray-500">Rejected</div>
              <div className="text-xs text-red-500 mt-1">
                {((stats.rejected / stats.totalApplications) * 100).toFixed(1)}% of total
              </div>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
            <IoCloseOutline className="w-6 h-6 text-red-500"/>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {stats.recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 border-b border-gray-100 dark:border-gray-700 pb-4"
            >
              <img
                src={activity.avatar}
                alt={activity.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.name}
                </div>
                <div className="text-xs text-gray-500">
                  {activity.status} • {new Date(activity.timestamp).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default JobReport;