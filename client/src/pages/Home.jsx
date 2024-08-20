
import Bannner1 from "../components/Bannner1"
import Explores from "../components/Explores"
import FeaturedJobs from "../components/FeaturedJobs"
import LatestJob from "../components/LatestJob"



const Home = () => {
  // console.log(import.meta.env.VITE_SERVER_URL);
  return (
    <div className=" " >
    <Bannner1/>
    <LatestJob/>
    <Explores/>
    <FeaturedJobs/>
    </div>
  )
}

export default Home