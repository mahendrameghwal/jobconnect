import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaCalendarAlt, FaComments, FaClipboardCheck } from "react-icons/fa";
import { FiCheckCircle, FiClock, FiX } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { useGetJobReportQuery } from '../../../../app/api/JobApi';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader';

// Helper functions for activity display
const getActivityIcon = (type, action) => {
  if (type === 'application') {
    return <FaUsers className="w-4 h-4 text-orange-500" />;
  } else if (type === 'interview') {
    if (action === 'scheduled') return <FaCalendarAlt className="w-4 h-4 text-blue-500" />;
    if (action === 'completed') return <FaClipboardCheck className="w-4 h-4 text-green-500" />;
    if (action === 'cancelled') return <FiX className="w-4 h-4 text-red-500" />;
  } else if (type === 'status_change') {
    if (action === 'shortlisted') return <FiCheckCircle className="w-4 h-4 text-green-500" />;
    if (action === 'rejected') return <IoCloseOutline className="w-4 h-4 text-red-500" />;
  }
  return <FaUsers className="w-4 h-4 text-gray-500" />;
};

const getActivityLabel = (type, action) => {
  if (type === 'application') return 'Applied';
  if (type === 'interview') {
    if (action === 'scheduled') return 'Interview Scheduled';
    if (action === 'completed') return 'Interview Completed';
    if (action === 'cancelled') return 'Interview Cancelled';
  }
  if (type === 'status_change') {
    if (action === 'shortlisted') return 'Shortlisted';
    if (action === 'rejected') return 'Rejected';
  }
  return 'Activity';
};

const getActivityBadgeColor = (type, action) => {
  if (type === 'application') return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
  if (type === 'interview') {
    if (action === 'scheduled') return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    if (action === 'completed') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (action === 'cancelled') return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  }
  if (type === 'status_change') {
    if (action === 'shortlisted') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (action === 'rejected') return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  }
  return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
};

const JobReport = () => {
  const { jobid } = useParams();
  const navigate = useNavigate();
  const { data: stats, isLoading, isError, error } = useGetJobReportQuery(jobid);

  // Handle KPI card clicks with proper navigation
  const handleKPIClick = (type) => {
    switch (type) {
      case 'applications':
        // Navigate to Application Review tab (step 1)
        navigate(`/statistic/${jobid}?tab=applications`);
        break;
      case 'shortlisted':
        // Navigate to Application Review tab with shortlisted filter
        navigate(`/statistic/${jobid}?tab=applications&filter=shortlisted`);
        break;
      case 'rejected':
        // Navigate to Application Review tab with rejected filter
        navigate(`/statistic/${jobid}?tab=applications&filter=rejected`);
        break;
      case 'interviews':
        // Navigate to Interviews tab (step 3)
        navigate(`/statistic/${jobid}?tab=interviews`);
        break;
      default:
        break;
    }
  };

  if (isLoading) return <Loader />;
  
  if (isError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading job report: {error?.data?.message || 'Something went wrong'}</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="p-6 dark:bg-gray-900"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Applications Card */}
        <div 
          className="bg-white dark:bg-gray-800 rounded-lg border border-orange-400/50 p-6 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer group"
          onClick={() => handleKPIClick('applications')}
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors">
                {stats.totalApplications}
              </div>
              <div className="text-sm text-gray-500 group-hover:text-orange-500 transition-colors">Total Applications</div>
            </div>
            <div className="bg-orange-100 p-3 rounded-full group-hover:bg-orange-200 transition-colors">
              <FaUsers className="w-6 h-6 text-orange-500 group-hover:text-orange-600 transition-colors"/>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            Job ID: {stats.jobId}
          </div>
          {stats.jobTitle && (
            <div className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {stats.jobTitle}
            </div>
          )}
          <div className="mt-2 text-xs text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
            Click to view details →
          </div>
        </div>

        {/* Shortlisted Card */}
        <div 
          className="bg-white dark:bg-gray-800 rounded-lg border border-green-400 p-6 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer group"
          onClick={() => handleKPIClick('shortlisted')}
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 transition-colors">
                {stats.shortlisted}
              </div>
              <div className="text-sm text-gray-500 group-hover:text-green-500 transition-colors">Shortlisted</div>
              <div className="text-xs text-green-500 mt-1">
                {stats.totalApplications > 0 ? ((stats.shortlisted / stats.totalApplications) * 100).toFixed(1) : 0}% of total
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-full group-hover:bg-green-200 transition-colors">
              <FiCheckCircle className="w-6 h-6 text-green-500 group-hover:text-green-600 transition-colors"/>
            </div>
          </div>
          <div className="mt-2 text-xs text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">
            Click to view shortlisted →
          </div>
        </div>

        {/* Rejected Card */}
        <div 
          className="bg-white dark:bg-gray-800 rounded-lg border border-red-400 p-6 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer group"
          onClick={() => handleKPIClick('rejected')}
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white group-hover:text-red-600 transition-colors">
                {stats.rejected}
              </div>
              <div className="text-sm text-gray-500 group-hover:text-red-500 transition-colors">Rejected</div>
              <div className="text-xs text-red-500 mt-1">
                {stats.totalApplications > 0 ? ((stats.rejected / stats.totalApplications) * 100).toFixed(1) : 0}% of total
              </div>
            </div>
            <div className="bg-red-100 p-3 rounded-full group-hover:bg-red-200 transition-colors">
              <IoCloseOutline className="w-6 h-6 text-red-500 group-hover:text-red-600 transition-colors"/>
            </div>
          </div>
          <div className="mt-2 text-xs text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
            Click to view rejected →
          </div>
        </div>

        {/* Total Interviews Card */}
        <div 
          className="bg-white dark:bg-gray-800 rounded-lg border border-blue-400 p-6 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer group"
          onClick={() => handleKPIClick('interviews')}
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                {stats.totalInterviews || 0}
              </div>
              <div className="text-sm text-gray-500 group-hover:text-blue-500 transition-colors">Total Interviews</div>
              <div className="text-xs text-blue-500 mt-1">
                {stats.completedInterviews || 0} completed
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-200 transition-colors">
              <FaCalendarAlt className="w-6 h-6 text-blue-500 group-hover:text-blue-600 transition-colors"/>
            </div>
          </div>
          <div className="mt-2 text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
            Click to view interviews →
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {stats.recentActivity && stats.recentActivity.length > 0 ? (
            stats.recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 border-b border-gray-100 dark:border-gray-700 pb-4 last:border-b-0"
              >
                <div className="flex-shrink-0">
                  <img
                    src={activity.avatar}
                    alt={activity.candidateName}
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.candidateName}
                    </span>
                    {getActivityIcon(activity.type, activity.action)}
                    <span className={`text-xs px-2 py-1 rounded-full ${getActivityBadgeColor(activity.type, activity.action)}`}>
                      {getActivityLabel(activity.type, activity.action)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    {activity.details}
                  </div>
                  
                  {/* Interview Details */}
                  {activity.type === 'interview' && activity.interviewData && (
                    <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      {activity.action === 'scheduled' && (
                        <div className="space-y-1">
                          <div className="flex items-center text-xs text-gray-500">
                            <FiClock className="w-3 h-3 mr-1" />
                            Round {activity.interviewData.round}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(activity.interviewData.scheduledStart).toLocaleString()} - {new Date(activity.interviewData.scheduledEnd).toLocaleString()}
                          </div>
                          {activity.interviewData.meetingPlatform && (
                            <div className="text-xs text-gray-500">
                              Platform: {activity.interviewData.meetingPlatform}
                            </div>
                          )}
                        </div>
                      )}
                      
                      {activity.action === 'completed' && (
                        <div className="space-y-2">
                          <div className="flex items-center text-xs text-gray-500">
                            <FaClipboardCheck className="w-3 h-3 mr-1" />
                            Round {activity.interviewData.round} - Completed
                          </div>
                          {activity.interviewData.feedback && (
                            <div className="text-xs text-gray-600 dark:text-gray-300">
                              <strong>Feedback:</strong> {activity.interviewData.feedback}
                            </div>
                          )}
                          {activity.interviewData.notes && (
                            <div className="text-xs text-gray-600 dark:text-gray-300">
                              <strong>Notes:</strong> {activity.interviewData.notes}
                            </div>
                          )}
                          {activity.interviewData.evaluations && activity.interviewData.evaluations.length > 0 && (
                            <div className="text-xs">
                              <strong>Evaluations:</strong>
                              <div className="mt-1 space-y-1">
                                {activity.interviewData.evaluations.map((evaluation, idx) => (
                                  <div key={idx} className="text-gray-600 dark:text-gray-300">
                                    {evaluation.skill}: {evaluation.score}/10 {evaluation.feedback && `- ${evaluation.feedback}`}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {activity.action === 'cancelled' && (
                        <div className="space-y-1">
                          <div className="flex items-center text-xs text-gray-500">
                            <FiX className="w-3 h-3 mr-1" />
                            Round {activity.interviewData.round} - Cancelled
                          </div>
                          {activity.interviewData.notes && (
                            <div className="text-xs text-gray-600 dark:text-gray-300">
                              <strong>Reason:</strong> {activity.interviewData.notes}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(activity.timestamp).toLocaleDateString()} at {new Date(activity.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No recent activity found
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default JobReport;