import {BiHome} from "react-icons/bi"
import RecommendedJobs from "../../components/RecommendedJobs";
import TopCompnies from "../../components/TopCompnies";
import { Link, useNavigate } from "react-router-dom";
import AppliedJobs from "../../components/AppliedJobs";
import { MdFolderDelete } from "react-icons/md";
import { useCurrentUserQuery, useDelAcountRequestMutation, useMeQuery } from "../../../app/api/authApi";
import toast from "react-hot-toast";
import { useRef, lazy } from 'react';
import { IoCreateOutline } from "react-icons/io5";
import { MdOutlineRememberMe } from "react-icons/md";
import { CiChat1, CiSearch } from "react-icons/ci";
import { FaChartPie } from "react-icons/fa";
import { motion } from "framer-motion";
import Loader from "../../components/Loader";
import CandidateInterviews from "./components/CandidateInterviews";

const PremiumButton = lazy(() => import("../../components/PremiumButton"));
const Subscription = lazy(() => import("../Subscription/Subscription"));


const Profile = () => {
  
const navigate = useNavigate()
  const appliedJobsRef = useRef(null);
  const topCompaniesRef = useRef(null);
  const recommendedJobsRef = useRef(null);
  const {data:currentuser}=useCurrentUserQuery()

  // console.log(currentuser);
  

  // const scrollToRef = (ref) => {
  //   if (ref && ref.current) {
  //     ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   }
  // };
  const [
    delAccountRequest,
    { error: deleteError, isLoading:isDeleteLoading,isError: isDeleteError, isSuccess: isDeleteSuccess, data: deleteData }
  ] = useDelAcountRequestMutation();
    
  if(isDeleteSuccess){
  toast.success(deleteData?.message);

  } 
  if(isDeleteError){
  toast.error(deleteError?.data?.message)
  }

  const {isError,data,error,isLoading}= useMeQuery()
  const {avtar,fullname,orgname, jobs, PermissonForUpdate,Isorg, city,appliedJobs, _id}= data || {}; 
// console.log(data);
  
if (isLoading) {
  return  <Loader/>
}
if(!currentuser){
  navigate("/")
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

  return (
   <main className=" bg-gray-400 bg-opacity-10 pt-8 ">
   <section role="main" className="w-full max-h-full min-h-screen">
   <div className="flex justify-evenly max-md:flex-col  px-2">
   <section className="relative max-h-screen  
dark:bg-gray-900/30 dark:shadow-gray-800/30  bg-white w-1/4 max-md:w-full rounded-md shadow-md">
{/*<section className="absolute right-1">
<PremiumButton/>
</section>*/}
<div className="w-90  max-md:my-2 my-5 mx-auto ">
<div className="flex  flex-col justify-center">
<div className="flex justify-center">
  <div className="relative">
    <img
      className="h-28 dark:border dark:border-gray-600 p-4  max-md:h-24 max-md:drop-shadow-md drop-shadow-lg rounded-full"
      src={
        avtar
          ? avtar
          : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
      }
      alt="user"
    />
    {/*  bottom right of the avatar */}

    {
 currentuser && currentuser.currentSubscription && currentuser.currentSubscription.status==='ACTIVE' &&    <div className="absolute bottom-0 -right-4">
 <PremiumButton />
</div>
    }

  </div>
</div>



{

    <div className="flex mt-2 max-md:mt-1 justify-center">
      <span className="text-xl max-md:text-lg font-sans dark:text-gray-200 text-gray-800 font-medium ">
        {Isorg ? orgname : fullname}
      </span>
     </div>
}

{
  city && <div className="flex mt-2 max-md:mt-1 justify-center">
      <span className="text-xl max-md:text-lg font-normal dark:text-gray-200 text-gray-800 ">
        {Isorg ? city : city}
      </span>
     </div>
}
{
  PermissonForUpdate && <div className="flex dark:text-gray-200 justify-center my-2">
  <Link to={Isorg?`/browsecompanies/profile/${_id}`:`/user/candidate/${_id}`}
    className="cursor-pointer text-center pt-1 w-40 h-8 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-lg transition-colors ease-in-out">
    <span className="group-active:hidden">View & Update</span>
  </Link>
  </div>
}

<div className="flex my-5  max-md:my-3 dark:bg-gray-900/95 bg-blue-50 drop-shadow-md rounded-md p-2 ">

<section className="w-full  border-opacity-40">
<p className=" text-base dark:text-gray-100 text-center">{Isorg ? 'posted Jobs':"Applied Jobs"}</p>
<span className="text-xl max-md:text-lg flex justify-center text-center mt-3 items-center cursor-pointer text-blue-600">{Isorg ? Array.isArray(jobs) && jobs.length : Array.isArray(appliedJobs ) && appliedJobs.length }</span>


</section>


</div>
<Link 
to={
  Isorg 
  ?   
 `/createjob`
 :
  `/home`

}

 className="dark:border-none hover:bg-blue-50 max-md:my-0.5 dark:bg-gray-900/95  flex flex-row items-center justify-center gap-x-2 border py-2 my-1 rounded-md">
 {
  Isorg ? (
    <span className="flex items-center gap-x-2 dark:text-gray-100">Create job <IoCreateOutline size={16} /></span>
  ) : (
    <span className="flex items-center gap-x-2 dark:text-gray-100">Home <BiHome size={16} /></span>
  )
}
</Link>





<Link 
to={
  Isorg 
  ?   
 `/findtalent`
 :
  `/post/search`

}

 className="dark:border-none hover:bg-blue-50 dark:text-gray-100 dark:bg-gray-900/95 max-md:my-0.5  flex flex-row items-center justify-center gap-x-2 border py-2 my-1 rounded-md">
 {
  Isorg ? (
    <span className="flex dark:text-gray-100 items-center gap-x-2">Find Talent<CiSearch  size={16} /></span>
  ) : (
    <span className="flex dark:text-gray-100 items-center gap-x-2">Find Job<CiSearch  size={16} /></span>
  )
}
</Link>




{
  currentuser?.isAdmin && (
    <Link  to='/dashboard'
 className="dark:border-none dark:text-gray-100 dark:bg-gray-900/95 hover:bg-blue-50 max-md:my-0.5  flex flex-row items-center justify-center gap-x-2 border py-2 my-1 rounded-md">
 <span className="flex dark:text-gray-100 items-center gap-x-2">DashBoard<FaChartPie  size={16} /></span>
</Link>
  )
}






<button onClick={()=>navigate(`/resetrequest`)} className="dark:border-none dark:text-gray-100 dark:bg-gray-900/95 hover:bg-blue-50 max-md:my-0.5  flex items-center justify-center gap-x-2 border py-2 my-1 rounded-md">Forget password <MdOutlineRememberMe size={20} /></button>
<button onClick={()=>navigate(`/chat/${_id}`)} className="dark:border-none dark:text-gray-100 dark:bg-gray-900/95 hover:bg-blue-50 max-md:my-0.5  flex items-center justify-center gap-x-2 border py-2 my-1 rounded-md">Chat <CiChat1 size={20} /></button>
{
  PermissonForUpdate && <button disabled={isDeleteLoading} onClick={()=>{delAccountRequest()}} className={`${isDeleteLoading?`bg-red-400`:`bg-red-500 `} hover:bg-red-600 dark:border-none transition duration-300 ease-in-out max-md:my-0.5 text-white flex items-center justify-center gap-x-2 border py-2 my-1 rounded-md`}>
  {isDeleteLoading ?"wait Please...":'Delete Account'}
  <MdFolderDelete size={20} />
</button>
}
</div>
</div>
   </section>
   <section className=" w-2/3 max-md:w-full  py-3 rounded-md ">
    {
      
      <motion.div
      initial={{ opacity: 0, scale: 1 }}
   animate={{ opacity: 1, scale: 1 }}
   transition={{ duration: 0.6 }}
      ref={appliedJobsRef} className="dark:bg-gray-900/30 dark:shadow-gray-950 rounded-lg  shadow-sm p-2 mb-5 bg-white ">
      <AppliedJobs currentuserid={_id} Isorg={Isorg} isLoading={isLoading} applicationdata={Isorg ? jobs :appliedJobs}/>
      {!Isorg && (
        <div className="mt-4">
          <CandidateInterviews />
        </div>
      )}
     </motion.div>
    }

    <motion.div 
    initial={{ opacity: 0, scale: 1 }}
   animate={{ opacity: 1, scale: 1 }}
   transition={{ duration: 0.6 }}
     className="dark:bg-gray-900/30 dark:shadow-gray-800/30 rounded-lg shadow-sm p-2 mb-5 bg-white ">
    <Subscription/>
   </motion.div>

   <motion.div  initial={{ opacity: 0, scale: 1 }}
   animate={{ opacity: 1, scale: 1 }}
   transition={{ duration: 0.6 }} ref={topCompaniesRef} className="dark:bg-gray-900/30 dark:shadow-gray-800/30 rounded-lg shadow-sm p-2 mb-5 bg-white ">
   <TopCompnies/>
    </motion.div>


  


    <motion.div 
    initial={{ opacity: 0, scale: 1 }}
   animate={{ opacity: 1, scale: 1 }}
   transition={{ duration: 0.6 }}
    ref={recommendedJobsRef} className="dark:bg-gray-900/30 dark:shadow-gray-800/30 rounded-lg shadow-sm p-2 mb-5 bg-white ">
    <RecommendedJobs/>
   </motion.div>
      {/*<div className="rounded-lg w-full shadow-sm p-2 mb-5 bg-white "><img src={Banner} alt="" /></div>*/}

     
   </section>
   </div>
   </section>
   </main>
  )
}

export default Profile
