import React, { useState } from "react";
import { motion } from "framer-motion";

const JobReport = () => {
  const [dropdownOpen, setDropdownOpen] = useState({
    total: false,
    shortlisted: false,
    rejected: false,
  });

  const toggleDropdown = (type) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const activities = [
    {
      imgSrc:
        "https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg",
      text: "Mahendra Kumar applied for a job successfully",
      time: "17.50",
    },
    // Add more activity objects here as needed
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="p-6 dark:bg-gray-900"
    >
      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Total Applied Candidates */}
        <div className="bg-white dark:bg-gray-800 rounded-md border border-orange-400/50 dark:border-gray-700 p-6 hover:shadow-lg shadow shadow-black/5 dark:shadow-black/20">
          <div className="flex justify-between mb-6">
            <div>
              <div className="text-2xl font-semibold dark:text-white">2</div>
              <div className="text-sm font-medium text-gray-400 dark:text-gray-500">
                Total Applied Candidate
              </div>
            </div>
          </div>
          <a
            href="/gebruikers"
            className="text-[#f84525] font-medium text-sm hover:text-red-800 dark:text-red-400"
          >
            View
          </a>
        </div>

        {/* Shortlisted Candidates */}
        <div className="bg-white dark:bg-gray-800 rounded-md border border-green-400 dark:border-gray-700 p-6 shadow-md hover:shadow-lg shadow-black/5 dark:shadow-black/20">
          <div className="flex justify-between mb-4">
            <div>
              <div className="flex items-center mb-1">
                <div className="text-2xl font-semibold dark:text-white">100</div>
                <div className="p-1 rounded bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20 text-[12px] font-semibold leading-none ml-2">
                  +30%
                </div>
              </div>
              <div className="text-sm font-medium text-gray-400 dark:text-gray-500">
                Shortlisted candidates
              </div>
            </div>
           
          </div>
          <a
            href="/dierenartsen"
            className="text-[#f84525] font-medium text-sm hover:text-red-800 dark:text-red-400"
          >
            View
          </a>
        </div>

        {/* Rejected Candidates */}
        <div className="bg-white dark:bg-gray-800 rounded-md border border-red-500 dark:border-gray-700 p-6 shadow-md hover:shadow-lg shadow-black/5 dark:shadow-black/20">
          <div className="flex justify-between mb-6">
            <div>
              <div className="text-2xl font-semibold dark:text-white mb-1">
                100
              </div>
              <div className="text-sm font-medium text-gray-400 dark:text-gray-500">
                Rejected candidates
              </div>
            </div>

          </div>
          <a
            href="#"
            className="text-[#f84525] font-medium text-sm hover:text-red-800 dark:text-red-400"
          >
            View
          </a>
        </div>
      </div>

      {/* Latest Applications Table */}
      <div className="relative bg-white dark:bg-gray-800 rounded shadow p-6">
        <div className="rounded overflow-hidden shadow-xs">
          <div className="w-1/4 mb-6">
            <div className="flex flex-wrap items-center px-6 mb-6">
              <div className="relative w-full max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-lg text-gray-700 dark:text-gray-200">
                  Latest Applications
                </h3>
              </div>
            </div>
          </div>
          <div className="block  overflow-x-auto px-6">
            <table className="items-center w-full  border-collapse table-striped table-hover">
              <tbody>
                {activities.map((activity, index) => (
                  <tr key={index}>
                    <td className="py-3 border-t-0 align-middle">
                      <img
                        src={activity.imgSrc}
                        alt="Activity"
                        className="w-12 h-12 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                      />
                    </td>
                    <td className="py-3 border-t-0 align-middle">
                      <p className="mb-0 flex items-center text-xs leading-4 text-gray-500 dark:text-gray-400">
                        {activity.text}
                      </p>
                    </td>
                  </tr>
                  
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobReport;
