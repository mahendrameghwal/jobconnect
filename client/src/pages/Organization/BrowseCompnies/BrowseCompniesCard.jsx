import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaRegBuilding } from "react-icons/fa";
import { Fragment } from "react";



const BrowseCompniesCard = ({data}) => {
const navigate = useNavigate()





  if (Array.isArray(data)&& data.length > 0) {
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
              className=" dark:bg-gray-900/30 cursor-pointer  p-5 hover:shadow-md border striped-border bg-gray-50 rounded"
            >
              <div className="flex justify-between items-center">
               {
                avtar ? (
                  <img
                  className="h-8 rounded-full"
                  src={avtar}
                  alt={orgname}
                />
                ): <FaRegBuilding className="h-8 dark:text-gray-50 rounded-full" />
               }
              {
                jobs && Array.isArray(jobs) && (
                  <span className="border dark:border-none  px-2 py-0.5    rounded-md dark:bg-blue-300/20 dark:text-blue-300  bg-blue-400/20 text-blue-700   ">
                <span className="px-1">{jobs?.length}</span>Jobs
                </span>
                )
              }
              </div>
              <section className="flex flex-col">
               {
                orgname && (
                  <p className="font-semibold my-3 dark:text-white tracking-wider">{orgname}</p>
                )
               }
                {
                  city && (
                    <p className=" dark:text-gray-200 text-gray-500 my-1 ">{city} ({state})</p>
                  )
                }
                <p className="text-sm text-gray-400 dark:text-gray-300 my-1">
                {about.length > 60 ? (
                  <Fragment>
                    {`${about.slice(0, 60)} `}
                    <span className='px-2 underline dark:text-gray-200 text-gray-500 hover:text-gray-600'>see more</span>
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
  }
 
}

export default BrowseCompniesCard