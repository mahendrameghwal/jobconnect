import { Link } from 'react-router-dom'
import FeaturedJobsCard from './FeaturedJobs.card'


const FeaturedJobs = () => {
    return (
        <div className="container-lg px-4  w-5/6 py-3 mx-auto ">
         <div className="flex justify-between"><span className=" capitalize text-black text-4xl font-bold max-md:text-3xl max-sm:text-2xl "><span className="dark:text-gray-50">Featured</span> <span className="text-blue-500 ">Jobs</span></span>  <Link to={`/post/search`}  className="text-blue-600 underline cursor-pointer">see all</Link></div>
    
        <FeaturedJobsCard/>
        
        </div>
      )
}

export default FeaturedJobs