import { useGetCandidateQuery } from "../../app/api/CandidateApi";
import Loader from "../components/Loader";
import { FcHighPriority } from "react-icons/fc";

import { FaUserTie,  } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState, useEffect, useMemo , useCallback} from "react";
import { CgUnavailable } from "react-icons/cg";
const DashboardCandidate = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentJobs, setCurrentJobs] = useState([]);
  const [jobsPerPage] = useState(6);
const {data,isLoading,isSuccess, isError, error} =  useGetCandidateQuery()


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



if(data.length<1){
  return      <div className="flex w-full border-l-6 border-warning bg-warning bg-opacity-[15%] px-7 py-8 bg-[#e98532] shadow-md   md:p-9">
  <div className="mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-warning bg-opacity-30">
  <FcHighPriority size={20}/>
  </div>
  <div className="w-full">
    <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">
      Error
    </h5>
    <p className="leading-relaxed text-[#D0915C]">
    Candidate not found
    </p>
  </div>
</div>
}





  return (
    <main className=" min-h-screen relative">
   
  
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <div className="px-4 flex justify-between py-6 md:px-6 xl:px-7.5">
    <h4 className="text-xl font-semibold text-black ">
        Top Candidates
    </h4>
    <h4 className="text-sm text-black ">
        {`Candidates per page: ${jobsPerPage}`}
    </h4>
</div>


    <div className="grid grid-cols-3 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-5 md:px-6 2xl:px-7.5">
      <div className="col-span-1 py-3 flex items-center">
        <p className="font-medium">Profile</p>
      </div>
      <div className="col-span-1 py-3 hidden items-center sm:flex">
        <p className="font-medium">Full Name</p>
      </div>
      <div className="col-span-1 py-3 flex items-center">
        <p className="font-medium">Email</p>
      </div>
      <div className="col-span-1 py-3 hidden items-center sm:flex">
        <p className="font-medium">Gender</p>
      </div>
      <div className="col-span-1 py-3 hidden items-center sm:flex">
        <p className="font-medium">Resume</p>
      </div>
     
    </div>

    {currentJobs.length>0 && Array.isArray(currentJobs) &&currentJobs.map(({ avtar, fullname, email, gender, resume, _id }, index) => (
      <div
        className="grid grid-cols-3 border-t border-stroke py-2 px-4 dark:border-strokedark sm:grid-cols-5 md:px-6 2xl:px-7.5"
        key={index}
      >
        <div className="col-span-1 flex items-center">
          <Link to={`/user/candidate/${_id}`} className=" flex-shrink-0 h-10 w-10">
            {avtar ? (
              <img src={avtar} alt={fullname} className="h-full w-full rounded-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-500">
                <FaUserTie size={20} />
              </div>
            )}
          </Link>
        </div>

        <div className="col-span-1 hidden items-center sm:flex">
          <p className="text-black ">{fullname}</p>
        </div>

        <div className="col-span-1 flex items-center">
          <p className="text-sm text-black ">{email}</p>
        </div>

        <div className="col-span-1 hidden items-center sm:flex">
          <p className="text-sm font-medium text-green-500">{gender}</p>
        </div>

        <div className="col-span-1 hidden visited: cursor-pointer items-center sm:flex">
          {resume ? resume.url && (
            <Link
              to={resume.url}
              className="text-sm  text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {resume.filename}
            </Link>
          ):<CgUnavailable color="red" />}
        </div>
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
  </main>
  );
};

export default DashboardCandidate;
