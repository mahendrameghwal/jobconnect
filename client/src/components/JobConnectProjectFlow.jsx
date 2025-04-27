import React from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';

const JobConnectProjectFlow = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container-lg px-4 w-5/6 mx-auto py-16"
    >
      <div className="flex flex-col items-center text-center">
        <h2 className="text-4xl max-md:text-3xl max-sm:text-2xl font-bold mb-4">
          <span className="dark:text-gray-50">Transform Your </span>
          <span className="text-blue-500">Career Journey</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
          Join thousands of professionals who have found their dream jobs through JobConnect. Whether you're looking for new opportunities or seeking top talent, we've got you covered.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-8 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
        >
          <FaPaperPlane />
          <span>Get Started Now</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default JobConnectProjectFlow;