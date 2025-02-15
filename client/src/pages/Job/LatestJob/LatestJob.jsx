import { Link } from "react-router-dom";
import { useGetJobsQuery } from "../../../../app/api/JobApi";
import LatestJobCard from "./LatestJob.card"
import LatestJobSkeleton from "../JobSkeleton";



const LatestJob = () => {

  const { data: jobs, error , isError, isLoading } = useGetJobsQuery({ sort: 'latest' , limit:8});
  if (isLoading) {
    return (
      <div className="container-lg w-5/6 mx-auto grid grid-cols-1 grid-flow-dense sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-16 max-md:my-12 px-4">
        {Array(4).fill().map((_, index) => (
          <LatestJobSkeleton key={index} />
        ))}
      </div>
    );
  }
  
  if(Array.isArray(jobs)&& jobs.length < 1){
    return (
      <div className="flex justify-center items-center h-28">
     <div className="flex justify-center text-red-500 dark:text-red-300 items-center"><pre>jobs not found...</pre></div>
     </div>
    )
  }
  
  if(isError){
    return (
      <div className="flex justify-center items-center h-28">

     <div className="flex justify-center text-red-500 items-center"><pre>{error?.data?.message? error?.data?.message :'something went wrong..'}</pre></div>
     </div>
    )
  }

    return (
        <div className="bg-cover my-6 py-1 bg-center bg-no-repeat   container-lg px-1  w-5/6   mx-auto ">
         <div className="flex justify-between"><span className=" capitalize text-black text-4xl font-bold max-md:text-3xl max-sm:text-2xl "><span className="dark:text-gray-50">Latest </span> <span className="text-blue-500 ">Jobs Open</span></span>  <Link to={`/post/search`}  className="text-blue-600 underline cursor-pointer">see all</Link></div>
      
      {
         Array.isArray(jobs)&& jobs.length > 0 &&  <LatestJobCard jobs={jobs}/>
      }
        
        </div>
      )
}

export default LatestJob