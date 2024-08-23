import { Link, useNavigate, useParams } from 'react-router-dom';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { FaLink, FaLinkedinIn, FaUser } from 'react-icons/fa';
import { BiError  } from "react-icons/bi";
import randomcolor from '../../../data/Randomcolor';
import {
  useDeletePersonalJobMutation,
  useOrgbyidQuery,
} from '../../../../app/api/OrgApi';
import { motion } from 'framer-motion';
import { useState, memo, useMemo,  Fragment, useEffect, useCallback , lazy} from 'react';

import { toast } from 'react-hot-toast';
import { MdRemoveRedEye } from 'react-icons/md';
import { FaRegTrashCan } from 'react-icons/fa6';
import { LuPenSquare } from 'react-icons/lu';
import { FiEdit } from 'react-icons/fi';

const UpdateOrg = lazy(() => import("../Popup/UpdateOrg"));
const UpdateJobPopUp = lazy(() => import("../Popup/UpdateJobPopUp")); 



const CompanyProfile = memo(() => {
  const [showPopup, setShowPopup] = useState(false);
  const [activePopup, setActivePopup] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentJobs, setCurrentJobs] = useState([]);
  const [jobsPerPage] = useState(3);
  const [ChangeJob, setChangeJob]=useState(null)

  const { id } = useParams();
  const navigate = useNavigate();
 
  const memoizedId = useMemo(() => id, [id]);
  const [randomColor] = useState(randomcolor);

  const { data, isLoading, isError, error } = useOrgbyidQuery(memoizedId);
  const [deletePersonalJob] = useDeletePersonalJobMutation();

  const togglePopup = useCallback((activePopupName) => {
    setShowPopup((prev) => !prev);
    setActivePopup(activePopupName);
  }, []);



  const deleteJob = useCallback(async (jobId) => {
    if (jobId) {
      const response = await deletePersonalJob(jobId);
      if (response?.data) {
        toast.success(response?.data?.message);
      } else if (response?.error?.data?.message) {
        toast.error(response.error?.data?.message);
      }
    } else {
      toast.error('Something went wrong 😔');
    }
  }, [deletePersonalJob]);

  useEffect(() => {
    if (data?.jobs) {
      const indexOfLastJob = currentPage * jobsPerPage;
      const indexOfFirstJob = indexOfLastJob - jobsPerPage;
      setCurrentJobs(data.jobs.slice(indexOfFirstJob, indexOfLastJob));
    }
  }, [currentPage, data, jobsPerPage]);

  const totalPages = useMemo(() => {
    return data?.jobs ? Math.ceil(data.jobs.length / jobsPerPage) : 0;
  }, [data, jobsPerPage]);

  const paginate = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  if (isLoading) {
    return <div className="spinner min-h-screen absolute top-1/2 left-1/2 transform -translate-x-1/2"></div>;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen max-h-full">
        <div className="text-center  -mt-11 rounded-md max-md:w-11/12">
        <div className='flex justify-center'>
        <BiError color='#dc2626' className='h-12 w-12 md:w-16 md:h-16'/>
        </div>
          <h2 className="mt-3 text-2xl font-bold text-gray-800 max-md:text-lg">
            {error.data?.message || 'An error occurred'}
          </h2>
          <p className="text-gray-600 md:mt-5 text-lg max-md:text-base">
            We're sorry, but an error has occurred. Please try again later
          </p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-1.5 mt-2 max-md:font-normal font-medium text-white transition-colors duration-200 bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-red-500"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }


  if(!data){
    return null
  }
  if (data) {
    const {
      avtar,
      category,
      _id: orgid,
      permission,
      city,
      state,
      country,
      website,
      jobs,
      createdAt,
      about,
      mobile,
      orgname,
      linkedin,
    } = data;



    
    const ChangeExistJob = (i)=>{
      togglePopup('updatejob')
      setChangeJob(i)
    }


    return (
      <div >
      {
        activePopup === 'updateOrg' && (
          <UpdateOrg
            category={category}
            city={city}
            state={state}
            country={country}
            website={website}
            about={about}
            mobile={mobile}
            orgname={orgname}
            linkedin={linkedin}
            togglePopup={togglePopup}
          />
        )
      }

      {
        activePopup === 'updatejob' && (<UpdateJobPopUp    job={jobs[ChangeJob]}  togglePopup={togglePopup}      />)
      }
      

        <div className=" mx-auto pt-6">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="col-span-4 sm:col-span-3"
            >
              <div className="bg-white dark:bg-gray-900/95  relative shadow rounded-sm p-2">
      {
        permission && <FiEdit    onClick={() => togglePopup('updateOrg')} className="h-4 dark:text-gray-100 absolute right-3 top-2 cursor-pointer max-lg:my-0 my-2"  />   
      } 


                {avtar && (
                  <div className="flex flex-col items-center">
                    <img
                      src={avtar}
                      className="w-32 h-32 p-2 border dark:border-gray-600 rounded-full mb-4 shrink-0"
                    ></img>
                    {orgname && (
                      <h1 className="text-xl max-md:text-base text-blue-600 font-bold">
                        {orgname}
                      </h1>
                    )}
                    {category && (
                      <p className="text-gray-900 max-md:text-sm dark:text-white">{category}</p>
                    )}
                  </div>
                )}
                <hr className="my-3 border-t border-gray-300" />
                <div className="flex flex-col mb-2">
                  <h2 className="text-blue-600 capitalize font-bold max-md:font-medium tracking-wider mb-2">
                    Location
                  </h2>
                  <ul className="flex gap-x-1 dark:text-white flex-wrap">
                    {city && <li className="max-md:text-sm mb-1">{city}</li>}
                    {state && <li className="max-md:text-sm mb-1">({state})</li>}
                    {country && (
                      <li className="max-md:text-sm mb-1">{country}</li>
                    )}
                  </ul>
                </div>

                {about && (
                  <div className="flex flex-col mb-2">
                    <h2 className="text-blue-600 capitalize font-bold max-md:font-medium tracking-wider mb-2">
                      About Me
                    </h2>
                    <p className="text-gray-700 dark:text-gray-200 max-md:text-sm">{about}</p>
                  </div>
                )}
                {mobile && (
                  <div className="flex flex-col mb-2">
                    <h2 className="text-blue-600 capitalize font-bold max-md:font-medium tracking-wider mb-2">
                      Phone no.
                    </h2>
                    <p className="text-gray-700 dark:text-gray-200 max-md:text-sm">{mobile}</p>
                  </div>
                )}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="col-span-4 sm:col-span-9 "
            >
              <div className=" bg-white dark:bg-gray-900/95  relative shadow rounded-sm p-3 company-job-div">
                <div className="flex gap-x-5 absolute bottom-1 right-1 mt-3">
                
                </div>
                {createdAt && (
                  <span className="select-none text-green-500  rounded-md  py-0.5 text-sm font-sans font-medium">
                    account  created{' '}
                    {formatDistanceToNow(new Date(createdAt))} ago
                  </span>
                )}

                <h3 className="font-semibold dark:text-white text-left mt-3 -mb-2">
                  Follow us on :
                </h3>
                <div className="flex flex-wrap gap-x-5">
                  {linkedin && (
                    <Link to={linkedin}>
                      <div className="flex cursor-pointer dark:text-gray-200 justify-start items-center gap-6 my-6">
                        <FaLinkedinIn
                          className="hover:text-blue-600"
                          size={25}
                        />
                      </div>
                    </Link>
                  )}
                  {website && (
                    <Link to={website.trim()}>
                      <div className="flex cursor-pointer dark:text-gray-200 justify-start items-center gap-6 my-6">
                        <FaLink className="hover:text-blue-600" size={25} />
                      </div>
                    </Link>
                  )}
                </div>

                <div className="flex flex-wrap items-center my-2 justify-between">
                  <h2 className="text-xl font-bold dark:text-white ">Posted Jobs</h2>
                  {permission && (
                    <Link
                      to="/createjob"
                      className="bg-blue-600 dark:shadow-none flex items-center text-sm hover:bg-blue-700 duration-300 transition-shadow shadow-md hover:shadow-lg hover:shadow-blue-200 text-gray-100 px-4 py-1.5 gap-1 rounded-md tracking-wider capitalize"
                    >
                      create a Job
                      <LuPenSquare size={12} />
                    </Link>
                  )}
                </div>
                <div>
                {currentJobs.length>0 && Array.isArray(currentJobs) &&currentJobs.map(({ title, skills, createdAt, _id, city, country }, index) => (
                  <motion.section
                    key={_id}
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="my-5 px-2 border relative shadow-md shadow-gray-50 dark:shadow-none dark:border-gray-600 flex flex-row max-md:flex-col max-md:items-start justify-between"
                  >
                    <div className="max-md:px-0 mt-3 w-8/12 max-md:w-full max-md:mx-0">
                      {title && <p className="font-bold max-md:font-medium dark:text-white">{title}</p>}
                      {createdAt && (
                        <span className="text-gray-400 text-sm absolute top-3 right-2">
                          {formatDistanceToNow(parseISO(createdAt), { addSuffix: true })}
                        </span>
                      )}
                      <span className="font-medium max-md:font-normal max-md:text-sm text-gray-500 dark:text-gray-400">
                        {city}, {country}
                      </span>
                      {skills && skills.length > 0 && (
                        <div className="flex flex-wrap items-center justify-start gap-x-3 mt-1">
                          {skills.map((skill, i) => (
                            <span key={i} className="mb-0.5 dark:border-gray-500 dark:text-gray-300 border text-sm font-normal px-2 rounded-md">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex my-3 max-sm:justify-between flex-wrap gap-x-3 items-center">
                        {_id && (
                          <Fragment>
                            <button
                              onClick={() => navigate(`/post/search/about/${_id}`)}
                              type="button"
                              disabled={isLoading}
                              className="inline-flex items-center px-7 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-sm"
                            >
                              <MdRemoveRedEye size={16} />
                            </button>
                            {permission && (
                              <>
                                <button
                                  onClick={() => deleteJob(_id)}
                                  type="button"
                                  disabled={isLoading}
                                  className="inline-flex items-center px-7 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-sm"
                                >
                                  <FaRegTrashCan />
                                </button>
                                <button
                                  onClick={() => navigate(`/statistic/${_id}`)}
                                  type="button"
                                  disabled={isLoading}
                                  className="inline-flex items-center px-7 py-2 border border-gray-300 bg-gray-200 hover:bg-gray-300/80 text-white text-sm font-medium rounded-sm"
                                >
                                  <FaUser color="#3b82f6" />
                                </button>
                                <button
                                onClick={()=>ChangeExistJob(index)}
                                type="button"
                                disabled={isLoading}
                                className="inline-flex items-center px-7 py-2 bg-blue-900/60 hover:bg-blue-800 text-slate-100 text-sm font-medium rounded-sm"
                              >
                                <FiEdit className='dark:text-gray-100' />
                              </button>
                              </>
                            )}
                          </Fragment>
                        )}
                      </div>
                    </div>
                  </motion.section>
                ))}
          
                <div className="flex justify-end mt-4 space-x-2">
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
              </div>
                {jobs && jobs.length === 0 && (
                  <div className=" company-job-div  flex justify-center items-center">
                    <div className="flex justify-center items-center mx-4">
                      <pre className="ml-2  text-gray-500 text-xl">
                        Sorry, no Jobs found
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }
});

export default CompanyProfile;
