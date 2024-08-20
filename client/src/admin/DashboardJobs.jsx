
import Loader from "../components/Loader";
import { FcHighPriority } from "react-icons/fc";
import { useState, useEffect, useMemo , useCallback} from "react";
import { DateTime } from "luxon";
import { useGetJobsQuery } from "../../app/api/JobApi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const DashboardJobs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentJobs, setCurrentJobs] = useState([]);
  const [sortOrder, setSortOrder] = useState('latest');
  const [jobsPerPage] = useState(6);
  const { data: jobs, error, isError, isLoading } = useGetJobsQuery({ 
    sort: sortOrder
  });

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

useEffect(() => {
  if (jobs) {
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    setCurrentJobs(jobs.slice(indexOfFirstJob, indexOfLastJob));
  }
}, [currentPage, jobs, jobsPerPage]);

const totalPages = useMemo(() => {
  return jobs ? Math.ceil(jobs.length / jobsPerPage) : 0;
}, [jobs, jobsPerPage]);

const paginate = useCallback((pageNumber) => {
  setCurrentPage(pageNumber);
}, []);




if(isLoading){
  return <Loader/>
}

if(isError){
  return      <div className="flex w-full border-l-6 border-warning bg-warning bg-opacity-[15%] px-7 py-8 bg-[#e98532] shadow-md   md:p-9">
  <div className="mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-warning bg-opacity-30">
  <FcHighPriority size={20}/>
  </div>
  <div className="w-full">
    <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">
      Error
    </h5>
    <p className="leading-relaxed text-[#D0915C]">
    {error?.data?.message}
    </p>
  </div>
</div>
}



if(jobs.length<1){
  return      <div className="flex w-full border-l-6 border-warning bg-warning bg-opacity-[15%] px-7 py-8 bg-[#e98532] shadow-md   md:p-9">
  <div className="mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-warning bg-opacity-30">
  <FcHighPriority size={20}/>
  </div>
  <div className="w-full">
    <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">
      Error
    </h5>
    <p className="leading-relaxed text-[#D0915C]">
    jobs not found
    </p>
  </div>
</div>
}





  return (
    <motion.main
    initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.2 }}    
    className=" min-h-screen relative">
   
  
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <div className="px-4 flex justify-between items-center py-6 md:px-6 xl:px-7.5">
    <h4 className="text-xl font-semibold text-black ">All Jobs</h4>
    <div className="flex items-center space-x-4">
      <select 
        value={sortOrder}
        onChange={handleSortChange}
        className="border border-gray-300 rounded px-2 py-1 text-sm"
      >
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
      </select>
      <h4 className="text-sm text-black ">
        {`Results per page: ${jobsPerPage}`}
      </h4>
    </div>
  </div>


    <div className="grid grid-cols-3 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-5 md:px-6 2xl:px-7.5">
      <div className="col-span-1 py-3 flex items-center">
        <p className="font-medium">Title</p>
      </div>
      <div className="col-span-1 py-3  items-center sm:flex">
        <p className="font-medium">Job ID</p>
      </div>
     
      <div className="col-span-1 py-3  items-center sm:flex">
      <p className="font-medium">Created on </p>
      </div>
      <div className="col-span-1 py-3 hidden items-center sm:flex">
      <p className="font-medium">Last updated</p>
      </div>
      <div className="col-span-1 py-3 max-md:hidden items-center sm:flex">
        <p className="font-medium">Posted By</p>
      </div>
     
    </div>

    {currentJobs.length>0 && Array.isArray(currentJobs) &&currentJobs.map(({title,jobId,category,orgname,createdAt,updatedAt }, index) => (
      <div
        className="grid grid-cols-3 border-t border-stroke py-2 px-4 dark:border-strokedark sm:grid-cols-5 md:px-6 2xl:px-7.5"
        key={index}
      >

      <div className="col-span-1  items-center sm:flex">
          <p className="text-black max-md:text-sm ">{title}</p>
        </div>
        <div className="col-span-1  items-center sm:flex">
        <p className="text-black max-md:text-sm ">{jobId}</p>
      </div>
 
  

 
        <div className="col-span-1  items-center sm:flex">
          <p className="text-sm font-medium text-gray-500">{DateTime.fromISO(createdAt).toLocaleString(DateTime.DATE_MED)}</p>
          
        </div>
  

      <div className="col-span-1 hidden items-center sm:flex">
      <p className="text-sm font-medium text-gray-500">{DateTime.fromISO(updatedAt).toLocaleString(DateTime.DATE_MED)}</p>
      
    </div>
    {
        orgname && 
        <div className="col-span-1 flex items-center max-md:hidden">
              <Link to={`/browsecompanies/profile/${orgname._id}`} className=" flex-shrink-0 h-10 w-10 max-md:h-8 max-md:w-8">
                {orgname.avtar ? (
                  <img src={orgname.avtar} alt={orgname.orgname} className="h-full w-full rounded-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-500">
                    <BsBuilding className="h-6 w-6 p-0.5 " size={20} />
                  </div>
                )}
              </Link>
            </div>
    }
          
       
      </div>
    ))}
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
                        currentPage === number + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
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

export default DashboardJobs;
