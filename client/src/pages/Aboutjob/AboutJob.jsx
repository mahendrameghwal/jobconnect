import React, { Fragment, memo, useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGetJobByIdQuery } from "../../../app/api/JobApi";
import {Link, useNavigate , useParams } from "react-router-dom";
import { BsBuilding } from "react-icons/bs";
import { MdOutlineLocationOn } from "react-icons/md";
import { BsCalendar2Date } from "react-icons/bs";
import { PiMoneyThin } from "react-icons/pi";
import randomcolor from "../../data/RandomTextColor";
import { v4 as uuidv4 } from 'uuid';
import { formatDistanceToNow } from 'date-fns';
import ApplyTojob from "./ApplyTojob";
import { FaClipboardCheck, FaCopy } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useCurrentUserQuery } from "../../../app/api/authApi";
import SkillMatcher from "./SkillMatcher";
import Loader from "../../components/Loader";




const AboutJob = memo(() => {
  const { data: CurrentUser } = useCurrentUserQuery();
  const navigate = useNavigate();
  const { jobid } = useParams();
  const GetjobById = useCallback(()=>useGetJobByIdQuery(jobid),[]);
  const Topref = useRef();
  useEffect(() => {document.body.scrollIntoView({ top: 0, behavior: 'smooth' })}, []);
  const [RandomColor,setRandomColor]= useState(randomcolor);
  const [PostTime,setPostTime]= useState('')
  const {data,error,isError,isLoading, isSuccess }= GetjobById();
  const Jobdata = data && data.job;
  const {title,_id,orgname,jobId,skills,country,state,city,responsibilities,applicants,salary,joblevel,shortdesc, category, jobtype, createdAt}= Jobdata || {};
console.log(CurrentUser)
  useEffect(()=>{
  setRandomColor(RandomColor)
  if (createdAt) {
  const formattedDate = new Date(createdAt);
  const distance = formatDistanceToNow(formattedDate, { addSuffix: true });
  return setPostTime(distance);
  } else {
  return setPostTime("No date provided");
}
},[createdAt])
const [copied, setCopied] = useState(false);

const copyToClipboard = (id) => {
  navigator.clipboard.writeText(id)
    .then(() => {
      toast.success('copied ');
      setCopied(true);
      setTimeout(() => setCopied(false), 3000); // Reset after 3 seconds
    })
    .catch(() => toast.error('Failed to copy Job ID'));
};

  return (
      <div>
      {isError && ( error && error.data  && error.data.message &&<div ref={Topref} className="flex justify-center items-center h-screen bg-transparent">
      <div className="text-center">
        <h1 className="text-gray-600 text-lg capitalize font-bold py-1 px-2 rounded">{error.data.message}</h1>
        <button className="w-1/2 shrink-0 rounded-md bg-blue-500 px-2 py-1.5 text-sm tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 sm:w-auto">
        <Link to="/">Take me home</Link>
        </button>
        
        </div>
    </div>)}
      {isLoading && (
        
      <Loader/>
        
      )}
      {Jobdata && ( isSuccess &&
        <motion.div initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} ref={Topref} className="min-h-screen relative border-2 max-md:border striped-border my-2 w-4/5 max-md:w-11/12  max-sm:p-3 p-6 mx-auto " >
{
  jobId &&(
    <div className="absolute  p-0.5 top-1 left-2 z-10 flex items-center gap-x-2">
    <span id="jobid" className="text-[#e85755] dark:text-red-300 max-sm:text-xs max-md:text-sm text-base font-normal tracking-wider">
      Job ID : {jobId}
    </span>
    <button
      onClick={()=>copyToClipboard(jobId)}
      className="text-gray-500 hover:text-blue-500 transition-colors"
      title={copied ? "Copied!" : "Copy Job ID"}
    >
      {copied ? <FaClipboardCheck size={16} className="text-blue-500" /> : <FaCopy size={16} />}
    </button>
  </div>
)

}


 {
  CurrentUser && !CurrentUser.Isorg && CurrentUser && <SkillMatcher userskills={CurrentUser?.candidate?.skills} jobskills={skills} />
 }




{
  applicants && (
    <span className="flex absolute text-[#0C356A] dark:text-blue-200 top-1 right-2 max-md:text-sm max-sm:text-xs z-10 items-center gap-x-1 tracking-wider text-base font-normal">
Total applicants : {applicants.length}
</span>
  )
}
<div className="flex flex-col gap-y-3 my-7">
  <div className="flex flex-row justify-between">
{
  title && (
    <h1 className="text-2xl uppercase max-md:text-xl font-semibold dark:text-blue-400 text-blue-500">
  {title}
  </h1>
  )
}
{
  orgname && (<button onClick={()=>{navigate(`/browsecompanies/profile/${orgname._id}`)}} className="official ">Official page</button>)
}

  </div>

  <div className="flex gap-5 items-center flex-row max-md:flex-col max-md:items-start max-md:gap-2">
   {
    orgname && orgname.orgname &&  <span className="flex items-center gap-x-1 text-[#070F2B] dark:text-gray-50 text-base max-md:text-base">
    <BsBuilding className="text-[#616466] dark:text-gray-300"  /> {orgname.orgname}
  </span>
   }
    {
      city && (
        <span className="flex items-center text-[#070F2B] gap-x-1 capitalize text-base max-md:text-base">
      <MdOutlineLocationOn className="text-[#616466] dark:text-gray-300" /> <span className="dark:text-gray-50" >{city},</span>{state && <span className="dark:text-gray-50">({state})</span>}
      {country && <span className="dark:text-gray-50">{country}</span>}
    </span>
      )
    }
   {
    PostTime && (
      <span className="flex items-center gap-x-1 text-[#070F2B] text-base dark:text-gray-50 max-md:text-base">
      <BsCalendar2Date  className="text-[#616466] dark:text-gray-300" /> Posted : {PostTime}</span>
    )
   }
   {
    salary && (
      <span className="flex dark:text-gray-50 items-center gap-x-1 text-[#070F2B] text-base max-md:text-base">
      <PiMoneyThin  className="text-[#616466] dark:text-gray-300" />
      {salary}
    </span>
    )
   }
  
  </div>
</div>


<div className="flex w-full flex-row gap-y-2">
  <div className="flex  gap-x-2">
    <div className="flex flex-col gap-y-2">
      {jobtype && (
        <span className="flex gap-x-1 max-md:text-base text-lg">
          <span className="capitalize dark:text-white font-semibold">Job Type:</span>
          <span className="capitalize dark:text-gray-50">{jobtype}</span>
        </span>
      )}
      {joblevel && (
        <span className="flex gap-x-1 max-md:text-base text-lg">
          <span className="capitalize dark:text-white font-semibold">Experience Level:</span>
          <span className="capitalize dark:text-gray-50">{joblevel}</span>
        </span>
      )}
      {category && (
        <span className="flex gap-x-1 max-md:text-base text-lg">
          <span className="capitalize dark:text-white font-semibold">Category:</span>
          <span className="capitalize dark:text-gray-50">{category}</span>
        </span>
      )}
    </div>
  </div>

</div>


<div className=" my-8">
{
  skills && skills.length > 0 &&
 <Fragment>
 <span className=" text-xl font-bold dark:text-white">Skills :</span>
 <div className="my-4  flex flex-wrap gap-4">
  {
    skills.map((skill,i)=>{
      const randomIndex = Math.floor(Math.random() *  RandomColor.length);
      // Get the random class 
      const randomClass = RandomColor[randomIndex];
   return   <div  key={i}>
        <strong className={`mb-2 px-3 py-1 max-md:text-sm uppercase shadow-sm  font-normal text-sm rounded-sm cursor-pointer ${randomClass}`}>
        {skill}
      </strong>
    
        </div>

    })
  }
 </div>
 </Fragment>
}
  
</div>
{/* About job */}

<div className=" my-8">
  <span className=" text-xl max-md:text-base font-bold dark:text-white">About this Job Role</span>
 {
  shortdesc && (
    <div className="my-4 break-all">
    <span className="text-lg max-md:text-base dark:text-gray-50">{shortdesc}</span>
    
  </div>
  )
 }
</div>
 {/* Responsiblity*/}
{
  responsibilities && responsibilities.length>0 && (
    <div className=" my-8">
<span className=" text-xl max-md:text-base font-bold dark:text-white">Responsibilities</span>
<div className="my-4">
  <ul className=" mx-6 dark:text-gray-50">
   {
    responsibilities.map(responsibility=> <li key={uuidv4()} className="list-disc break-all leading-loose text-lg max-md:text-base">{responsibility}</li>)
   }
  </ul>
  
</div>
</div>
  )
}

{
  !CurrentUser?.Isorg && (<ApplyTojob CurrentUser={CurrentUser} applicants={applicants}  applyid={_id} />)
}

</motion.div>
      )}
    </div>
      
    );
  });

export default AboutJob;
