import User from "../../../assets/user.svg"
import Usernameicon from "../../../assets/username.svg"
import lock from "../../../assets/lock.svg"
import emailicon from "../../../assets/email.svg"
import { useNavigate } from "react-router-dom"
import { SetregisterUser, resetUser } from "../../../../app/slices/RegisterSlice"
import {useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { toast } from "react-hot-toast"
import {BiShow, BiHide} from "react-icons/bi"
import { useRegisterMutation } from "../../../../app/api/authApi"
import { FcGoogle } from "react-icons/fc";
import { FaRegUser , FaFingerprint } from "react-icons/fa"
import { MdOutlineAlternateEmail , MdOutlineLock} from "react-icons/md"


const Register = () =>{
    const navigate =useNavigate()
    const Registerdata = useSelector(state=>state?.register?.User);
    const [register, { isLoading, error}] = useRegisterMutation();
    const dispatch =useDispatch();
    const {fullname, username, email, password}= Registerdata;
   const [Showpassword, setShowpassword] = useState(false)
 

  
   const HandleUser = (e) => {
        const { name, value } = e.target;
     
        if (name === 'Isorg') {
            const isOrgValue = value === 'candidate' ? false : true;
            dispatch(SetregisterUser({ Isorg: isOrgValue }));
          } else {

            dispatch(SetregisterUser({ [name]: value }));
        }
      
      };
      

      const HandleRegister = async (e) => {
        e.preventDefault();

        const { data, error } = await register(Registerdata);
        if (data) {
          if(data?.message){
            toast.success(data?.message)
            dispatch(resetUser())
            navigate('/welcome');
          }
        } else if (error) {
          if(error?.data?.message){
          toast.error(error?.data?.message)
          }else if (error.data?.error){
          toast.error(error.data?.error)
          }
        }
      };

   
    return (
   
      <div className="h-screen md:flex ">
      
      <div
     
          className=" relative overflow-hidden md:flex w-1/2  dark:from-gray-900/30  dark:to-gray-900/30  bg-gradient-to-r from-gray-900  to-blue-700  justify-around items-center hidden">
          <div>
              <h1 className="text-white font-bold text-4xl font-sans">JobConnect</h1>
              <p className="text-white mt-1">Create Your Acount </p>
              <button type="submit" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Read More</button>
          </div>
          <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>
      <form className="flex dark:bg-gray-900/30   md:w-1/2 justify-center py-5 items-center bg-white" onSubmit={HandleRegister}>
      
          <div className="mt-11 max-md:mt-0 max-md:w-90 ">
          <span
          className="inline-flex items-center justify-center rounded-md bg-green-100 px-1  text-green-700">
           <p className="whitespace-nowrap text-xs ">default role will candidate</p>
        </span>
              <h1 className="text-gray-800 dark:text-white font-bold text-2xl mb-1">Hello Dear!</h1>
              <p className="text-sm font-normal dark:text-gray-50 text-gray-600 mb-3">Welcome here</p>
             
              <div className={`flex items-center dark:border-gray-600 border-2 py-2 px-3 rounded-md mb-3`}>
              <FaRegUser className="h-6 dark:text-white"  alt="fullname" />
                  <input value={fullname} onChange={HandleUser} className="pl-2 w-full dark:text-gray-50 dark:bg-gray-800  outline-none border-none" type="text" name="fullname"  placeholder="Full name" />
        </div>
      
        {
          error && error.data && error.data.details && error.data.details?.fullname && ( <div className="flex justify-start my-1"><span className="text-xs text-red-600">{error.data.details?.fullname}</span></div>)
         }
                  <div className={`flex items-center dark:border-gray-600 border-2 py-2 px-3 rounded-md mb-3 `}>
                  <FaFingerprint className="h-6  dark:text-white"  alt="username" />
                      <input onChange={HandleUser}  value={username} className="pl-2  dark:text-gray-50 dark:bg-gray-800  w-full outline-none border-none" type="text" name="username"  placeholder="Username" />
                      </div>
                    {
          error && error.data && error.data.details && error.data.details?.username && ( <div className="flex justify-start my-1"><span className="text-xs text-red-600">{error.data.details?.username}</span></div>)
         }
             
                      <div className={`flex items-center  dark:border-gray-600 border-2 py-2 px-3 rounded-md mb-3 `}>
                  <MdOutlineAlternateEmail className="h-6  dark:text-white" alt="email" />
                     
                          <input  onChange={HandleUser}  value={email} className="pl-2 dark:text-gray-50 dark:bg-gray-800  w-full outline-none border-none" type="email" name="email"  placeholder="Email Address" />
        </div>
      {
          error && error.data && error.data.details && error.data.details?.email && ( <div className="flex justify-start my-1"><span className="text-xs text-red-600">{error.data.details?.email}</span></div>)
         }
    
             
                          <div className={`flex items-center relative dark:border-gray-600 border-2 py-2 px-3 rounded-md mb-3 `}>
                         <MdOutlineLock className="h-6  dark:text-white"  alt="password" />
                        {
                          Showpassword ?
                          <BiHide onClick={()=>{setShowpassword(!Showpassword)}}  size={20} className="dark:text-white right-3 absolute cursor-pointer" />
                          :
                          <BiShow onClick={()=>{setShowpassword(!Showpassword)}}  size={20} className="dark:text-white right-3 absolute cursor-pointer" />
                        }
                               <input  onChange={HandleUser}  value={password} className="pl-2 dark:text-gray-50 dark:bg-gray-800  w-full outline-none border-none" type={Showpassword ?"text":"password"} name="password"  placeholder="Password" />
                          
                               </div>
                               {
                                error && error.data && error.data.details && error.data.details?.password && ( <div className="flex justify-start my-1"><span className="text-xs text-red-600">{error.data.details?.password}</span></div>)
                               }
     
        
        <div className=" gap-y-3 max-md:gap-y-1 flex max-sm:!w-full flex-wrap gap-x-1 items-center mt-3 justify-between">
        <label className="text-custom-blue dark:text-gray-100" htmlFor="Isorg ">Register acount for: </label>
        <select  name="Isorg" onChange={HandleUser} className="max-sm:!w-full  dark:text-gray-50  border-2 dark:bg-gray-800 border-gray-400 rounded-md text-gray-600 h-10 px-3   focus:outline-none ">
          <option  className=" dark:text-gray-50 text-sm rounded-md" value="">Select role</option>
          <option  className=" dark:text-gray-50 text-sm rounded-md" value='candidate'>candidate</option>
          <option  className=" dark:text-gray-50 text-sm rounded-md" value='organization'>organization</option>
        </select>
      </div>         
       <button onClick={HandleRegister} type="submit" disabled={isLoading} className="block w-full bg-gradient-to-r from-gray-900 to-blue-700  mt-1 py-2 rounded-md text-white font-medium mb-1">{isLoading ?'creating acount..':'Register'}</button>
      
       <button className="flex w-full items-center dark:text-gray-50 justify-center gap-3.5 rounded-lg border border-gray-500 bg-gray py-1.5 my-1  dark:hover:bg-opacity-50">
                  <span>
               <FcGoogle/>
                  </span>
                  continue with Google
                </button>

                      
      <div className="flex justify-between mt-2">
                            <span onClick={()=>{navigate('/forgetpassowrd')}} className="text-sm underline dark:text-blue-300 text-blue-600 cursor-pointer">have an acount  ?</span>
                            <span onClick={()=>{navigate('/login')}} className="text-sm underline dark:text-blue-300 text-blue-600 cursor-pointer">login here</span>
                            </div>

                           
          </div>
   
      </form>  
  </div>
      
      
      
      
      
      
      
    )
  }
  
  export default Register