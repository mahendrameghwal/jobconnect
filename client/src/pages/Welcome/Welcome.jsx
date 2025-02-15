import { motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Welcome = () => {
  const navigate =useNavigate();
  const info = useSelector((state)=>state?.auth?.userInfo);

  const NextPage = ()=>{
    info?.Isorg ? navigate('/create-company') : navigate('/create-candidate');
  }
  return (
    <motion.div 
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -50, opacity: 0 }}
    className="fixed  top-0 left-0 w-full h-full bg-black/90 backdrop-blur-sm  flex justify-center items-center z-50"
    >
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-md p-6 bg-white rounded-lg mx-auto">
        <div className="flex items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Join us today and unlock a world of career possibilities!</h1>
        </div>
        <p className="text-lg text-gray-600 mb-8">
        Discover a wealth of job opportunities from leading companies, refine your search with advanced filters, and showcase your experience with just a create profile.
        </p>
        <button onClick={NextPage} className="bg-gray-800 tracking-wider hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">
         let's start
        </button>
      </div>
    </div>
    </motion.div>
  );
};

export default Welcome;