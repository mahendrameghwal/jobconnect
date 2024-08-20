
import { RiLockPasswordFill } from "react-icons/ri";
import {BiSolidShow} from "react-icons/bi"
import {BiSolidHide} from "react-icons/bi"
import { useState } from "react"
import {useSelector, useDispatch } from "react-redux";
import {Setresetpassowrd,resetpass} from "../../../../app/slices/ResetpasswordSlice";
import {  toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import axios from "axios";

const CreateNewPassword = () => {
  const { token } = useParams();
  const resetpassword = useSelector(state=>state.createnewpassword.User);
  const dispatch =useDispatch();


const [ShowPassword, setShowPassword]= useState(false);
const [ConfrimShowPassword, setConfrimShowPassword]= useState(false);
const [loading, setLoading] = useState(false);
const HandleShowpasword =()=>{
setShowPassword(!ShowPassword)
}
const HandleConfrimPassword=()=>{
    setConfrimShowPassword(!ConfrimShowPassword)
 }


 const Hanleresetpassword = (e) => {
  const { name, value } = e.target;
  dispatch(Setresetpassowrd({ [name]: value }));
  
};

const HandleSubmitpassword =async(e)=>{
  e.preventDefault()
  setLoading(true)
  if (resetpassword.password && resetpassword.confirmpassword && resetpassword.password !== resetpassword.confirmpassword) {
    toast.error('Passwords do not match');
  } else if (!resetpassword.password.trim() || !resetpassword.confirmpassword.trim()) {
    toast.error('Please fill in both password fields');
  }

try {
  const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/user/reset/${token}`, { password:resetpassword.password }, {
      headers: {
        'Content-Type': 'application/json',
      },  withCredentials: true
    });

    if (response.status===200) {
      toast.success(response.data.message);
      dispatch(resetpass())
    }
  
} catch (error) {

  if(error && error.response && error.response.data && error.response.data.message){
    toast.error(error.response.data.message)
  }
  
}finally{
  setLoading(false) 
}





}

    
return (
  
 
  <div className="w-full ">
 
  <main role="main" className=" min-h-screen max-h-full max-w-lg mx-auto p-6">
   <div className="mt-20 max-md:mt-32 bg-blue-100  rounded-md shadow-3xl shadow-current  ">
     <div className="p-4  ">
       <div className="text-center ">
         <h1 className="block text-2xl max-md:text-xl font-medium text-gray-800 "> Create New Password</h1>
       
       </div>

       <form onSubmit={HandleSubmitpassword}>
       <div className="mt-4">
           <div className="grid gap-y-2">
             <div>
               <label htmlFor='password' className="block max-md:font-medium text-sm font-semibold mb-1  dark:text-gray-800">New password</label>
               <div className="relative">
                 <input onChange={Hanleresetpassword} value={resetpassword.password} placeholder="new password" type={ShowPassword?"text":"password"} name="password" className="  outline-none py-2 px-4 block w-full border-2 border-gray-100 rounded-md text-sm shadow-sm" required aria-describedby="password-error"/>
                 <span className="top-0 cursor-pointer px-1  right-0  translate-y-2/3 translate-x-2/4 mx-5 absolute">
               {ShowPassword ?      <BiSolidHide size={17} onClick={HandleShowpasword}/>: <BiSolidShow size={17} onClick={HandleShowpasword}/>}
               </span>
                 </div>
             
             </div>
             <div>
               <label htmlFor='confirmpassword' className="block max-md:font-medium text-sm font-semibold mb-1  dark:text-gray-800">confirm password</label>
               <div className="relative">
                 <input onChange={Hanleresetpassword} value={resetpassword.confirmpassword} placeholder="confirm new password" type={ConfrimShowPassword?"text":"password"} name="confirmpassword" className="  outline-none py-2 px-4 block w-full border-2 border-gray-100 rounded-md text-sm shadow-sm" required aria-describedby="password-error"/>
                 <span className="top-0 cursor-pointer px-1  right-0  translate-y-2/3 translate-x-2/4 mx-5 absolute">
               { ConfrimShowPassword ?  <BiSolidHide size={17} onClick={HandleConfrimPassword}/>: <BiSolidShow size={17} onClick={HandleConfrimPassword}/>}
               </span>
                 </div>
             
             </div>

             <button disabled={loading} onClick={HandleSubmitpassword} type="submit" className="py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-medium bg-blue-500 text-white hover:bg-blue-600 focus:outline-none text-sm  transition-all ">Create password <RiLockPasswordFill  /></button>
           </div>
         
       </div>
       
       </form>
     </div>
   </div>

  
 </main>
  
  </div>
  
  

  )
}

export default CreateNewPassword