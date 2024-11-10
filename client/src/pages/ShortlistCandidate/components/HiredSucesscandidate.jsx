import { IoStar, IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { GoEye } from "react-icons/go";
import { CiUser } from "react-icons/ci";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { DateTime } from "luxon";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

const HiredSuccessCandidate = ({ orgid, applicants }) => {
  const { jobid } = useParams();
  const FilterWithAppliedJobsCandidated = applicants.map(applicant => ({
    ...applicant,
    appliedJobs: applicant.appliedJobs.filter(job => job.jobId === jobid)
  }));
  const [HiredCandidate, setHiredcandidate] = useState(FilterWithAppliedJobsCandidated);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      {applicants && applicants.length < 1 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center min-h-[400px] bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
          <img 
            src="https://illustrations.popsy.co/white/taking-notes.svg" 
            alt="No candidates"
            className="w-64 h-64 mb-4"
          />
          <p className="text-lg text-gray-600 dark:text-gray-300">No candidates available at the moment</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {applicants && applicants.length > 0 && HiredCandidate?.map(({
          _id,
          fullname,
          currentempstatus,
          avtar,
          createdAt,
          appliedJobs
        }, index) => (
          <motion.div
            key={_id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white  dark:border-gray-700 border dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="relative p-6">
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  Joined {format(new Date(createdAt), 'MMM yyyy')}
                </span>
              </div>

              <div className="flex flex-col items-center text-center mb-4">
                {avtar ? (
                  <img 
                    src={avtar} 
                    alt={fullname}
                    className="w-24 h-24 rounded-full ring-4 ring-gray-100 dark:ring-gray-700 mb-4"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
                    <CiUser className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                  </div>
                )}
                
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                  {fullname}
                </h2>
                {currentempstatus && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {currentempstatus}
                  </p>
                )}
              </div>

              <div className="flex justify-center gap-3 mb-4">
                <Link
                  to={`/chat/${_id}`}
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors duration-200"
                >
                  <IoChatbubbleEllipsesOutline className="w-4 h-4 mr-2" />
                  Message
                </Link>
                <Link
                  to={`/user/candidate/${_id}`}
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200"
                >
                  <GoEye className="w-4 h-4 mr-2" />
                  View Profile
                </Link>
              </div>

              {appliedJobs.map(({ dateApplied }) => (
                <div key={_id} className="text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Applied on
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {DateTime.fromISO(dateApplied).toLocaleString({
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short',
                      hour: 'numeric',
                      minute: '2-digit',
                      meridiem: 'short'
                    })}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HiredSuccessCandidate;