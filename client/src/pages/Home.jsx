
import Bannner1 from "../components/Bannner1"
import Explores from "../components/Explores"
import LatestJob from "./Job/LatestJob/LatestJob"
import JobConnectProjectFlow from "../components/JobConnectProjectFlow"




const Home = () => {

  return (
    <div className=" " >
    <Bannner1/>
    <LatestJob/>
    <Explores/>
    <JobConnectProjectFlow/>
    </div>
  )
}

export default Home