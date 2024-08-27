import { Fragment, useCallback, useState  } from 'react';
import logo from "../assets/logo.svg"
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
// import useStickyHeader from '../../hooks/Usesticky';
import DarkLightmode from './theme/DarkLightmode';
import useAuth from "../../hooks/useAuth";
import { useSignOutMutation } from '../../app/api/authApi';
import { logout } from '../../app/slices/Authslice';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from "react-hot-toast"
import { RxAvatar } from "react-icons/rx";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state?.auth?.userInfo);
  const navigate = useNavigate()

  const isauth = useAuth();
  
  const location =useLocation();
  const [SignOut, {isLoading, isError,isSuccess,error,data}] = useSignOutMutation();

  const HandleLogout  = async () => {
    try {
      const response = await SignOut().unwrap(); 
      dispatch(logout());
      if (response.message) {
        toast.success(response.message);
        navigate('/')
      }
    } catch (error) {
      if (error.data.message) {
        toast.error(error.data.message);
      }
    }
  };



 return (
    <Fragment>
    {/*navbar */}
   <nav className=  {"z-40 dark:bg-gray-900/80 bg-slate-200/90 backdrop-blur-md sticky top-0  shadow-md flex  items-center  py-0.5 justify-between px-2 flex-wrap max-md:p-1"}>
   
    {/*logo */}
 
    <Link to={"/"} className="flex items-centerflex-shrink-0  mr-6 lg:mr-72">   <img src={logo} className="w-100 h-7 mr-2" alt="Logo" /> <span className='text-blue-500 font-bold text-lg'>JobConnect</span></Link>

     <div className="block lg:hidden">
       <button
         onClick={() => setIsOpen(!isOpen)}
         className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
       >
         <svg
           className={`fill-current  dark:text-white  h-5 w-6 ${isOpen ? "hidden" : "block"}`}
           viewBox="0 0 20 20"
           xmlns="http://www.w3.org/2000/svg"
         >
           <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
         </svg>
         <svg
           className={`fill-current dark:text-white h-5 w-6  ${isOpen ? "block" : "hidden"}`}
           viewBox="0 0 20 20"
           xmlns="http://www.w3.org/2000/svg"
         >
           <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
         </svg>
       </button>
     </div>
     <div
       className={`w-full my-2 px-2 block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"}`}
     >
     <div className="text-sm lg:flex-grow">
     <NavLink
       to="/post/search"
       className={({ isActive }) =>
         `text-base mr-3 block mt-4 lg:inline-block lg:mt-0 ${isActive ? "text-blue-500 font-semibold" : "text-gray-600 dark:text-gray-300 font-semibold"} transition-colors duration-300`
       }
     >
       Find Jobs
     </NavLink>

     <NavLink
       to="/browsecompanies"
       className={({ isActive }) =>
         `text-base mr-3 block mt-4 lg:inline-block lg:mt-0 ${isActive ? "text-blue-500 font-semibold" : "text-gray-600 dark:text-gray-300 font-semibold"} transition-colors duration-300`
       }
     >
       Browse Companies
     </NavLink>
    

     {userInfo?.Isorg && (
       <NavLink
         to="/findtalent"
         className={({ isActive }) =>
           `text-base mr-3 block mt-4 lg:inline-block lg:mt-0 ${isActive ? "text-blue-500 font-semibold" : "text-gray-600 dark:text-gray-300 font-semibold"} transition-colors duration-300`
         }
       >
         Search Talent
       </NavLink>
     )}
     <NavLink
     to="/pricing"
     className={({ isActive }) =>
       `text-base mr-3 block mt-4 lg:inline-block lg:mt-0 ${isActive ? "text-blue-500 font-semibold" : "text-gray-600 dark:text-gray-300 font-semibold"} transition-colors duration-300`
     }
   >
  Pricing
   </NavLink>
   </div>
       <div className='flex items-center gap-x-2 justify-end '>
      <DarkLightmode/>

      {
        isauth ?
        <button disabled={isLoading || isError}
     onClick={HandleLogout}
       className="inline-flex dark:border-none  rounded-md border hover:border-blue-500   tracking-wider items-center hover:text-gray-700 hover:bg-slate-300 transition-colors bg-blue-500  py-1 px-4 text-white">
       Log out
       </button>
       :
       <Link
       to={'/login'}
       className="inline-flex  rounded-md border dark:border-none hover:border-blue-500   tracking-wider items-center hover:text-gray-700 hover:bg-slate-300 transition-colors bg-blue-500  py-1 px-4 text-white">
       Log in
       </Link>
       }

       {
        isauth && location.pathname!=='/profile' &&
        <Link to={'/profile'}>
       <button  className="inline-flex  items-center px-4 text-black">
       <div className='flex flex-col'>
       <RxAvatar className=' w-8 dark:text-white rounded-full' alt="" />
       <span className='text-xs dark:text-white'>profile</span>
       </div>
       </button>
         </Link>
       }
    
      
  
       
     {
      !isauth && (
        <Link
        to={'/register'}
        className="inline-flex border dark:border-none hover:border-blue-500  rounded-md tracking-wider items-center hover:text-gray-700 hover:bg-slate-300 transition-colors bg-blue-500  py-1 px-4 text-white">
        Register
        </Link>
      )
     }
       
     
        
       </div>
     </div> 
     
   </nav>
   </Fragment>
 );
}
export default Navbar;