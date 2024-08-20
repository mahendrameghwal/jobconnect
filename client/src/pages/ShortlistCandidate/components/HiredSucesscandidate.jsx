import { IoStar } from "react-icons/io5"
import {motion} from  "framer-motion"
import { format } from "date-fns";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { GoEye } from "react-icons/go";
import { DateTime } from "luxon"
import { FcCheckmark } from "react-icons/fc";
import { Link, useParams } from "react-router-dom";
import { Fragment, useState } from "react";
const HiredSucesscandidate = ({orgid,applicants}) => {

  const {jobid}= useParams()
  const FilterWithAppliedJobsCandidated = applicants.map(applicant => ({...applicant, appliedJobs: applicant.appliedJobs.filter(job => job.jobId==jobid)}))
  const [HiredCandidate, setHiredcandidate]= useState(FilterWithAppliedJobsCandidated)


  

 
  return (
    <motion.div
    initial={{ opacity: 0, scale:1 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.6 }}
    >

  {
    applicants && applicants.length < 1  && (
      <div className="flex justify-center items-center min-h-screen max-h-full border border-green-500 "><pre>candidate not available</pre></div>
    )

  }

    
    <div className='grid grid-cols-1 grid-flow-dense sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3'>
  {
    applicants && applicants.length > 0  && (
       
      HiredCandidate?.map(({_id,fullname,currentempstatus,avtar, createdAt, appliedJobs})=>(
       
    <div key={_id} className="relative bg-gray-100   p-4 rounded-md shadow-md hover:shadow-lg border-gray-200 border flex items-center">
    <div className='absolute top-0.5 right-0.5'>
    <div className='bg-gray-300 px-2  text-gray-600 border border-gray-400 rounded-md text-xs flex gap-x-1 items-center'>Joined {format(new Date(createdAt), 'MMMM yyyy')}</div>
    </div>
{
avtar &&  <img src={avtar} alt="Profile Image" className="w-20 h-20 max-md:w-16 max-md:h-16 rounded-full mr-4"/>

} 
 <div className="flex-1">
  <h2 className="text-lg font-medium">{fullname}</h2>

{
  currentempstatus && <h2 className="text-base tracking-wide">{currentempstatus}</h2>
}


    <div  className="flex gap-x-3 mt-1 items-center">
    <Link to={`/chat/${_id}`} className="flex justify-center items-center px-1 py-3  transition-all duration-100  gap-2 h-4  bg-green-500 rounded-sm cursor-pointer text-white">
    <IoChatbubbleEllipsesOutline className="h-3"/>
    <span className="text-white text-sm font-sans font-normal tracking-wide">Message</span>
</Link>
<Link   to={`/user/candidate/${_id}`} className="flex justify-center items-center px-1 py-3  transition-all duration-100  gap-2 h-4  bg-custom-blue rounded-sm cursor-pointer text-white">
<GoEye className="h-3"/>
<span className="text-white text-sm font-sans font-normal tracking-wide">view profile</span>
</Link>
</div>
{
  
  appliedJobs.map(({success}, _id)=>(
   <div key={_id} className="flex flex-row gap-x-1 my-1 flex-wrap">
   <span className=" text-sm font-medium">Date of Hire :</span>
   <span  className="inline-flex items-center px-1 text-sm rounded-sm   text-emerald-600">
    
   {
     

 DateTime.fromISO(success.dateHired).toLocaleString({ 
   weekday: 'short', 
   day: 'numeric', 
   month: 'short' 
   
 }) + 
 ' at ' + DateTime.fromISO(success.dateHired).toLocaleString({ 
   hour: 'numeric', 
   minute: '2-digit', 
   meridiem: 'short' 
 })

   }
   
   </span>
   </div>
  ))
}
</div>
</div>
  ))
    )
  }
</div>
    </motion.div>
  )
}

export default HiredSucesscandidate