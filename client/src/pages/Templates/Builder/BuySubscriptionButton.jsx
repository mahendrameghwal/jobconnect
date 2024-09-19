import React from 'react';
import { FaRegCalendarAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';



const BuySubscriptionButton = () => {
  return (
    <Link to='/pricing' className="flex justify-center items-center px-4 py-0.5 gap-2 bg-blue-600 hover:bg-transparent text-white hover:text-black dark:hover:text-white font-bold text-base rounded-md border-2 border-blue-600 transition-all duration-100 ease-in-out">
      <FaRegCalendarAlt className="w-4 h-4 transition-all duration-100 ease-in-out" />
      <span className="transition-all duration-100 ease-in-out">Buy subscription</span>
    </Link>
  );
};

export default BuySubscriptionButton;