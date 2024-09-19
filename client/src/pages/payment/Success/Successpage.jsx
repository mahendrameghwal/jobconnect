import React from 'react';
import { FaRegCheckCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Successpage = () => {
 const navigate = useNavigate()
  
  return (
    <div className=" mx-auto px-4">
      <div className="flex justify-center min-h-[90vh] items-center">
        <div className="w-full max-w-lg">
          <div className="shadow-sm p-8 sm:p-11 w-full text-center mx-auto border-b-4 border-green-500">
            <section className='flex justify-center'>
            <FaRegCheckCircle className="text-green-500 text-5xl sm:text-[55px]" aria-hidden="true" />
            </section>
            <h2 className="text-gray-600 mt-4 mb-3 text-3xl sm:text-[40px] font-medium leading-tight">
              Your payment was successful
            </h2>
            <p className="text-lg sm:text-[18px] text-gray-700 font-medium">
              Thank you for your payment. We will <br /> be in contact with more details shortly.
            </p>
            <button onClick={()=>{navigate('/profile')}} className='hover:scale-95 duration-75 bg-green-500 hover:bg-green-600 tracking-wider px-6  py-1 rounded text-gray-100 '>go to profile</button>
          </div>
        </div>
      </div>
      <hr className="my-8" />
    </div>
  );
}

export default Successpage;
