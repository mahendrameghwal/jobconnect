import React from 'react';
import { RiErrorWarningLine } from "react-icons/ri";

const Failedpage = () => {
  return (
    <div className=" mx-auto px-4">
      <div className="flex justify-center min-h-[90vh] items-center">
        <div className="w-full max-w-lg">
          <div className="shadow-sm p-8 sm:p-11 w-full text-center mx-auto border-b-4 border-red-500">
            <section className='flex justify-center'>
            <RiErrorWarningLine className="text-red-500 text-5xl sm:text-[55px]" aria-hidden="true" />
            </section>
            <h2 className="mt-4 text-gray-600 mb-3 text-3xl max-md:text-2xl  font-medium leading-tight">
            Your payment was failed
            </h2>
            <p className="text-lg sm:text-[18px] text-gray-700 font-medium">
             Something went wrong <br /> Try again later.
            </p>
          </div>
        </div>
      </div>
      <hr className="my-8" />
    </div>
  );
}

export default Failedpage;
