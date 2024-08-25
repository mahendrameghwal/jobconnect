import Loader from '../components/Loader';
import { FcHighPriority } from 'react-icons/fc';
import { BsBuilding } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useState, useEffect, useMemo, useCallback } from 'react';

import { useGetOrgQuery } from '../../app/api/OrgApi';
import { DateTime } from 'luxon';
import { motion } from 'framer-motion';
const DashboardOrg = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentJobs, setCurrentJobs] = useState([]);
  const [jobsPerPage] = useState(6);
  const { data, isLoading, isSuccess, isError, error } = useGetOrgQuery();

  useEffect(() => {
    if (data) {
      const indexOfLastJob = currentPage * jobsPerPage;
      const indexOfFirstJob = indexOfLastJob - jobsPerPage;
      setCurrentJobs(data.slice(indexOfFirstJob, indexOfLastJob));
    }
  }, [currentPage, data, jobsPerPage]);

  const totalPages = useMemo(() => {
    return data ? Math.ceil(data.length / jobsPerPage) : 0;
  }, [data, jobsPerPage]);

  const paginate = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);



  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div
      
      className="flex w-full border-l-6 border-warning bg-warning bg-opacity-[15%] px-7 py-8 bg-[#e98532] shadow-md   md:p-9">
        <div className="mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-warning bg-opacity-30">
          <FcHighPriority size={20} />
        </div>
        <div className="w-full">
          <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">Error</h5>
          <p className="leading-relaxed text-[#D0915C]">
            {error?.data?.message}
          </p>
        </div>
      </div>
    );
  }

  if (data.length < 1) {
    return (
      <div className="flex w-full border-l-6 border-warning bg-warning bg-opacity-[15%] px-7 py-8 bg-[#e98532] shadow-md   md:p-9">
        <div className="mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-warning bg-opacity-30">
          <FcHighPriority size={20} />
        </div>
        <div className="w-full">
          <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">Error</h5>
          <p className="leading-relaxed text-[#D0915C]">Candidate not found</p>
        </div>
      </div>
    );
  }

  return (
    <motion.main
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.2 }}
   
    className=" min-h-screen relative">
      <div className="rounded-sm border dark:border-gray-600 dark:bg-gray-900/30 bg-white shadow-default ">
        <div className="px-4 flex justify-between py-6 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white ">Top Companies</h4>
          <h4 className="text-sm text-black ">
            {`Result per page: ${jobsPerPage}`}
          </h4>
        </div>

        <div className="grid grid-cols-3 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-5 md:px-6 2xl:px-7.5">
          <div className="col-span-1 py-3 flex items-center">
            <p className="dark:text-gray-100 font-medium">Profile</p>
          </div>
          <div className="col-span-1 py-3  items-center sm:flex">
            <p className="dark:text-gray-100 font-medium">Title</p>
          </div>

          <div className="col-span-1 py-3  items-center sm:flex">
            <p className="dark:text-gray-100 font-medium">Created on </p>
          </div>
          <div className="col-span-1 py-3 hidden items-center sm:flex">
            <p className="dark:text-gray-100 font-medium">Job Posted</p>
          </div>
          <div className="col-span-1 py-3 hidden items-center sm:flex">
            <p className="dark:text-gray-100 font-medium">Last updated</p>
          </div>
        </div>

        {currentJobs.length > 0 &&
          Array.isArray(currentJobs) &&
          currentJobs.map(
            ({ avtar, orgname, jobs, _id, createdAt, updatedAt }, index) => (
             <div
  className="grid grid-cols-3 border-t dark:border-gray-600 py-2 px-4 sm:grid-cols-5 md:px-6 2xl:px-7.5"
  key={index}
>
  <div className="col-span-1 flex items-center">
    <Link
      to={`/browsecompanies/profile/${_id}`}
      className="flex-shrink-0 h-10 w-10 max-md:h-8 max-md:w-8"
    >
      {avtar ? (
        <img
          src={avtar}
          alt={orgname}
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
          <BsBuilding className="h-6 w-6 p-0.5" size={20} />
        </div>
      )}
    </Link>
  </div>

  <div className="col-span-1 items-center sm:flex">
    <p className="text-black dark:text-gray-300 max-md:text-sm">{orgname}</p>
  </div>

  <div className="col-span-1 items-center sm:flex">
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
      {DateTime.fromISO(createdAt).toLocaleString(DateTime.DATE_MED)}
    </p>
  </div>

  <div className="col-span-1 hidden items-center sm:flex">
    {Array.isArray(jobs) && (
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {jobs.length}
      </p>
    )}
  </div>

  <div className="col-span-1 hidden items-center sm:flex">
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
      {DateTime.fromISO(updatedAt).toLocaleString(DateTime.DATE_MED)}
    </p>
  </div>
</div>

            ),
          )}
      </div>

      <div className="flex justify-end mt-4 space-x-2 absolute right-4 bottom-28">
        <button
          onClick={() => paginate(1)}
          disabled={currentPage === 1}
          className="px-2 outline-none text-sm bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          First
        </button>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 outline-none text-sm bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        {[...Array(totalPages).keys()].map((number) => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={`px-2 outline-none text-sm rounded ${
              currentPage === number + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200'
            }`}
          >
            {number + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 outline-none text-sm bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
        <button
          onClick={() => paginate(totalPages)}
          disabled={currentPage === totalPages}
          className="px-2 outline-none text-sm bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Last
        </button>
      </div>
    </motion.main>
  );
};

export default DashboardOrg;
