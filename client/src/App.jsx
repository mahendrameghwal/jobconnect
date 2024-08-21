import React, { Fragment, lazy, Suspense , useEffect } from "react";
import { ErrorBoundary } from 'react-error-boundary';
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Gotop from "./components/Gotop";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";
import { DiGithubBadge } from "react-icons/di";
// import LoginPopup from "./components/Loginpopup";
// import Errorboundrypage from "./pages/error/ErrorboundryPage";
import Welcome from "../src/pages/Welcome/Welcome";

import AuthChecker from "./components/AuthChecker";
import PasswordResetRequest from "./pages/Auth/ForgotPassword/PasswordResetRequest";
import SentSuccess from "./pages/SentSuccess";
import Home from"./pages/Home"; //public
import FindJobs from"./pages/Job/FindJobs/FindJobs";//public
import ErrorPage from"./pages/ErrorPage";
import AboutJob from "./pages/Aboutjob/AboutJob";//public
import BrowseCompanies from "./pages/Organization/BrowseCompnies/BrowseCompnies";
import Suggestion from "./pages/Suggestion";
import ExcludeFooter from "./utils/ExcludeFooter";
import ExcludeNavbar from "./utils/ExcludeNavbar";
import ResumeTemplateSelector from "./pages/Templates/Selector/ResumeTemplateSelector";
import ResumeBuilder from "./pages/Templates/Builder/ResumeBuilder";


const PrivateRouteForAllUser = lazy(() => import("./routes/PrivateRouteForAllUser"));
const OnlyAdminRoute = lazy(() => import("./routes/OnlyAdminRoute"));
const PrivateCandidateRoute = lazy(() => import("./routes/PrivateCandidateRoute"));
const PrivateOrgRoute = lazy(() => import("./routes/PrivateOrgRoute"));
const CompanyProfile = lazy(() => import("./pages/Organization/CompanyProfile/CompanyProfile"));
const ViewApplication = lazy(() => import("./pages/Organization/ViewApplication/ViewApplication"));
const Login = lazy(() => import("./pages/Auth/Login/Login"));
const Register = lazy(() => import("./pages/Auth/Register/Register"));
const CreateOrg = lazy(() => import("./Forms/organization/CreateOrg"));
const ShortListCandidate = lazy(() => import("./pages/ShortlistCandidate/ShortListCandidate"));
const ResetPassword = lazy(() => import("./pages/Auth/ResetPassword/ResetPassword"));
const CreateCandidate = lazy(() => import("./Forms/candidate/CreateCandidate"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const UpdateProfile = lazy(() => import("./pages/Update/UpdateProfile"));
const Createjob = lazy(() => import("./Forms/job/CreateJob"));
const DeleteAcount = lazy(() => import("./pages/Auth/DeleteAcount/DeleteAcount"));
const ErrorMessage = lazy(() => import("./pages/ErrorMessage"));
const Chat = lazy(() => import("./pages/chats/Chat"));
const Unauthorized = lazy(() => import("./pages/error/Unauthorized"));
const SearchCandidate = lazy(() => import("./pages/Organization/SearchCandidate/SearchCandidate"));
const LayoutDashboard =lazy(() => import("./admin/layout/LayoutDashboard")); ;
const DashboardCandidate = lazy(() => import("./admin/DashboardCandidate"));
const DashboardJobs = lazy(() => import("./admin/DashboardJobs"));
const DashboardOrg = lazy(() => import("./admin/DashboardOrg"));
const DashboardChart = lazy(() => import("./admin/DashboardChart"));
const Pricing = lazy(() => import("./pages/pricing/Pricing"));













function App() {
  const location =useLocation()
 
  useEffect(() => {
    // Scroll to the top of the page with smooth behavior when the component mounts or updates
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  
  // const isauth = useAuth()
  return (
 
  <Fragment>
  <AuthChecker/>
  <Suspense fallback={<Loader/>}>
  
  <main role="main" className="min-h-screen max-h-full">
  <div >
  <Link to='https://github.com/mahendrameghwal/jobconnect' className="github-corner" title="View source on GitHub">
        <svg
          width="60"
          height="60"
          viewBox="0 0 250 250"
          className='fill-[#151513] text-[#fff] absolute top-12 z-1 right-0 max-md:top-10'
          aria-hidden="true"
        >
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
          <path
            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
            fill="currentColor"
            style={{ transformOrigin: '130px 106px' }}
            className="octo-arm"
          />
          <path
            d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
            fill="currentColor"
            className="octo-body"
          />
        </svg>
      </Link>
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          className: "text-white tracking-wider bg-black font-normal text-base rounded-lg text-sm px-2 py-0 text-center mr-2 mt-10",
        }}
      />
      {
        ExcludeNavbar(location.pathname) && <Navbar />
      }
      
    
      
      <Routes>
          {/* Public */}
          <Route path={"/"} index element={<Home />} />
          <Route path="/home" index element={<Home />} />
          <Route path="/browsecompanies" element={<BrowseCompanies />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/error-message" element={<ErrorMessage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/view" element={<ViewApplication />} />
          <Route path="/post/search" element={<FindJobs />} />
          <Route path="/post/search/about/:jobid" element={<AboutJob />} />
          <Route path="/resetnewpassword/:token" element={<ResetPassword />} />
          <Route path="/resetrequest" element={<PasswordResetRequest />} />
          <Route path="/*" element={<ErrorPage />} />
          <Route path="/sendsuccess" element={<SentSuccess />} />
          <Route path="/suggestion" element={<Suggestion />} />
          <Route path="/pricing" element={<Pricing/>} />
       
          
          {/* candidate & org private routes */}
          <Route element={<PrivateRouteForAllUser  />}>
          <Route path="/browsecompanies/profile/:id" element={<CompanyProfile />} />
          <Route path="/user/candidate/:id" element={<UpdateProfile />} />
          <Route path="/delete-acount/:token" element={<DeleteAcount />} />       
          <Route path="/chat/:recipient" element={<Chat/>} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/profile" element={<Profile />} />
       
          </Route>
          
          {/* candidate routes  */}
          <Route  element={<PrivateCandidateRoute />}>
          <Route path="/create-candidate" element={<CreateCandidate />} />
          <Route path="/template" element={<ResumeTemplateSelector />}/>
          <Route path="/resume/:templateId" element={<ResumeBuilder />} />
          </Route>

          {/* Org routes  */}
          <Route  element={<PrivateOrgRoute  />}>
          <Route path="/statistic/:jobid" element={<ShortListCandidate />} />
          <Route path="/createjob" element={<Createjob />} />
          <Route path="/create-company" element={<CreateOrg />} />
          <Route path="/findtalent" element={<SearchCandidate />} />
          </Route>




          <Route  element={<OnlyAdminRoute  />}>
             <Route path="/dashboard" element={<LayoutDashboard />}>
             <Route path="/dashboard/candidate" element={<DashboardCandidate />} />
             <Route path="/dashboard/job" element={<DashboardJobs/>} />
             <Route path="/dashboard/company" element={<DashboardOrg />} />
             <Route path="/dashboard/report" element={<DashboardChart />} />
           
   
           </Route>
          </Route>







          </Routes>
          <Gotop />
          
            {
              ExcludeFooter(location.pathname)&&   <Footer />
            }
          
      
          </main>
          </Suspense>
          </Fragment>
      
  );
}

export default App;
