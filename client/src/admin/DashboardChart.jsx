import React from 'react'
import JobCategoryChart from './JobCategoryChart';
import { useGetJobsQuery } from "../../app/api/JobApi";
import DashboardSkillChart from './DashboardSkillChart';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';

const DashboardChart = () => {
  const { data: jobs, error, isError, isLoading } = useGetJobsQuery({ 
    sort: ''
  });


  if(isLoading){
    return (
      <Loader/>
    )
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
   <motion.section
   initial={{ y: -50, opacity: 0 }}
   animate={{ y: 0, opacity: 1 }}
   exit={{ y: -50, opacity: 0 }}
   transition={{ duration: 0.2 }}
   >
   <section className='flex justify-between max-md:gap-y-3 max-md:flex-col'>
   <JobCategoryChart jobs={jobs}/>
   <DashboardSkillChart jobs={jobs}/>
   </section>
   </motion.section>
  )
}

export default DashboardChart;