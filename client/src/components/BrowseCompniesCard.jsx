import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaRegBuilding } from "react-icons/fa";
import { Fragment } from "react";



const BrowseCompniesCard = ({data,error,isError, isLoading}) => {
const navigate = useNavigate()



if(isLoading){
  return (
    <div className="min-h-screen flex justify-center items-center max-h-full ">
  <div className="flex flex-row gap-2 items-center justify-center">
<div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
<div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
<div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
</div>
  </div>
  )
}

  if (isError) {
    return error.data && error.data.message && <div className="flex items-center justify-center min-h-screen max-h-full ">
    <div className="text-center rounded-md  max-md:w-11/12  p-4">
    <div className="inline-flex rounded-full bg-red-100 p-4">
    <div className="rounded-full stroke-red-600 bg-red-200 ">
      <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z" fill="currentColor" />
        <path d="M12 16C12.5523 16 13 15.5523 13 15V11C13 10.4477 12.5523 10 12 10C11.4477 10 11 10.4477 11 11V15C11 15.5523 11.4477 16 12 16Z" fill="currentColor" />
        <path d="M12 8C12.5523 8 13 7.55228 13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7C11 7.55228 11.4477 8 12 8Z" fill="currentColor" />
      </svg>
    </div>
  </div>
      <h2 className="mt-5 text-2xl font-bold text-gray-800 md:text-2xl">{error.data.message }</h2>
     
      <p className="text-gray-600 mt-3 md:mt-5 md:text-lg">We're sorry, but an error has occurred. Please try again later.</p>
      <button onClick={()=>{navigate(-1)}} className="inline-flex items-center px-4 py-2 mt-6 font-semibold text-white transition-colors duration-200 bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
        Go Back
  </button>
    </div>
  </div>;
  }


  if (data && data.length > 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="container-lg mx-auto"
      >
        <div className="grid grid-cols-1 grid-flow-dense sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-16 max-md:my-12 px-4">
          {data.map(({_id,about,avtar,orgname,city,state,jobs}) => (
            <div
              onClick={() => {
                navigate(`/browsecompanies/profile/${_id}`);
              }}
              key={_id}
              className="  cursor-pointer  p-5 hover:shadow-md border striped-border bg-gray-50 rounded"
            >
              <div className="flex justify-between items-center">
               {
                avtar ? (
                  <img
                  className="h-8 rounded-full"
                  src={avtar}
                  alt={orgname}
                />
                ): <FaRegBuilding className="h-8 rounded-full" />
               }
              {
                jobs && Array.isArray(jobs) && (
                  <span className="border  px-2 py-0.5    rounded-md bg-blue-400/20 text-blue-700   ">
                <span className="px-1">{jobs?.length}</span>Jobs
                </span>
                )
              }
              </div>
              <section className="flex flex-col">
               {
                orgname && (
                  <p className="font-semibold my-3  tracking-wider">{orgname}</p>
                )
               }
                {
                  city && (
                    <p className=" text-gray-500 my-1 ">{city} ({state})</p>
                  )
                }
                <p className="text-sm text-gray-400 my-1">
                {about.length > 60 ? (
                  <Fragment>
                    {`${about.slice(0, 60)} `}
                    <span className='px-2 underline text-gray-500 hover:text-gray-600'>see more</span>
                  </Fragment>
                ) : (
                  about
                )}
              </p>
              </section>
            </div>
          ))}
        </div>
      </motion.div>
    );
  } else {
    return <div className="company-job-div flex justify-center items-center">
    <div className="flex items-center mx-4">
    <span className="ml-2  text-gray-500 text-xl">Sorry, no companies found. "Please try again."</span>
  </div>
    </div>;
  }
z  
 
}

export default BrowseCompniesCard