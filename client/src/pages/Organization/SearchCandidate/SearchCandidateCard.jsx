import React, { Fragment } from 'react'
import {motion} from "framer-motion";
import {FaUser} from "react-icons/fa"
import { Link, useNavigate } from 'react-router-dom';

const SearchCandidateCard = ({data}) => {
const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="container-lg mx-auto"
    >
      <div className="grid grid-cols-1 grid-flow-dense sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-16 max-md:my-12 px-4">
        {data.map(({ _id, summary, avtar, fullname, city, state, skills }) => (
          <div
            onClick={() => {
              navigate(`/user/candidate/${_id}`);
            }}
            key={_id}
            className="cursor-pointer p-5 hover:shadow-md border striped-border bg-gray-50 rounded"
          >
            <div className="flex justify-between items-center">
              {avtar ? (
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={avtar}
                  alt={fullname}
                />
              ) : (
                <FaUser className="h-8 w-8 text-gray-400" />
              )}
              {skills && Array.isArray(skills) && (
                <span className="border px-2 py-0.5 rounded-md bg-green-400/20 text-green-700">
                  <span className="px-1">{skills.length}</span>Skills
                </span>
              )}
            </div>
            <section className="flex flex-col">
              {fullname && (
                <p className="font-semibold my-3 tracking-wider">{fullname}</p>
              )}
              {city && (
                <p className="text-gray-500 my-1">
                  {city} ({state})
                </p>
              )}
              <p className="text-sm text-gray-400 my-1">
                {summary && summary.length > 60 ? (
                  <Fragment>
                    {`${summary.slice(0, 60)} `}
                    <span className='px-2 underline text-gray-500 hover:text-gray-600'>see more</span>
                  </Fragment>
                ) : (
                  summary
                )}
              </p>
            </section>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default SearchCandidateCard