import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsBuilding } from 'react-icons/bs';
import { MdOutlineAlternateEmail } from "react-icons/md";

const JobList = ({ jobs }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 grid-flow-dense sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-16 max-md:my-12 px-4">
      {jobs.map(({ title, joblevel, country, city, orgname, _id, jobtype }) => (
        <div
          key={_id}
          className="grid grid-rows-[auto_1fr_auto] dark:bg-gray-900/30 striped-border bg-gray-50 border rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden h-full"
        >
          <div className="px-4 py-2 ">
            <div className='flex justify-between items-center mb-3'>
              {orgname?.avtar ? (
                <img className='h-10 w-10 rounded-sm object-cover' loading='lazy' src={orgname.avtar} alt={title} />
              ) : (
                <BsBuilding className='h-6 w-6 text-gray-500' title="profile" />
              )}
              <span className='border border-green-300 px-2 py-0.5 rounded-md bg-green-50 text-green-700   '>{jobtype}</span>
            </div>
          </div>
          
          <div className="px-4 py-2 ">
            <h3 className='font-semibold dark:text-white text-lg mb-2 line-clamp-2'>{title}</h3> 
            <p className='text-sm dark:text-gray-50 text-gray-600'>
            {orgname?.orgname || 'Company'} | {city} | {country}
            </p>
          </div>
          
          <div className="px-2 py-2 mt-auto">
            <button
              onClick={() => navigate(`/post/search/about/${_id}`)}
             className="text-white w-full leading-6 bg-blue-500 border-none outline-none rounded-md max-md:textbase hover:bg-blue-400 px-5 py-1 text-base"
            >
              View Job
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobList;