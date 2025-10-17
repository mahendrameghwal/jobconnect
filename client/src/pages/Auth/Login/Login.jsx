import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetLoginUser, resetuser } from "../../../../app/slices/Loginslice";
import { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import {toast} from "react-hot-toast";
import authApi, {useLoginMutation, useGetGoogleAuthUrlQuery } from "../../../../app/api/authApi";
import { MdOutlineAlternateEmail ,MdOutlineLock } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";


const Login = () => { 
  const [login, { isLoading }] = useLoginMutation();
  const [Showpassword, setShowpassword] = useState(false);
  const navigate = useNavigate();
  const User = useSelector(state => state.login.User);
  const dispatch = useDispatch();
  const { email, password } = User;
  const { data: googleUrlData } = useGetGoogleAuthUrlQuery();


const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await login(User).unwrap();
    if (response?.token) {
      setTimeout(() => {
        dispatch(resetuser());
      }, 2000);
      dispatch(authApi.util.invalidateTags(['CurrentUser']));
      response.message && toast.success(response.message);
      navigate('/');
    }
  } catch (error) {
    if (error?.data?.details) {
      toast.error('Please fill in all required fields before submitting');
    } else {
      error.data.message && toast.error(error.data.message);
    }
  }
  
};


const HandleUser = e => {
  const { name, value } = e.target;
  dispatch(SetLoginUser({ [name]: value }));
}

 


  return (
    <div className="min-h-screen max-h-full">

      <div className="h-screen md:flex">
        <div className="relative  overflow-hidden md:flex w-1/2 dark:from-gray-900  dark:to-gray-900/30  bg-gradient-to-r from-gray-900 to-blue-700  justify-around items-center hidden">
          <div>
            <h1 className="text-white font-bold text-4xl font-sans">JobConnect</h1>
            <p className="text-white mt-1">Looking for a New Job?</p>
            <button className="block w-40 bg-white text-indigo-800 mt-4 py-1 rounded-md font-bold mb-2">
              Read More
            </button>
          </div>
          <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        </div>
        <form
          onSubmit={handleLogin}
          className="flex dark:bg-gray-900  max-md:flex max-md:items-center max-md:h-screen md:w-1/2 justify-center py-10 items-center bg-white"
        >
          <div className=" max-md:w-4/5 w-1/2">
            <h1 className="text-gray-800 dark:text-white font-bold text-2xl mb-1">
              Hello Welcome
            </h1>
            <p className="text-sm font-normal dark:text-gray-50 text-gray-600 mb-7">
              Welcome Back
            </p>
            <div className={`flex items-center dark:border-gray-600 border-2 py-2 px-3  rounded-md mb-4`}>
              <MdOutlineAlternateEmail className="h-6 dark:text-white" alt="email" />

              <input
                value={email}
                onChange={HandleUser}
                className="pl-2 dark:text-gray-50 dark:bg-gray-900  outline-none border-none w-full"
                type="text"
                name="email"
                placeholder="Email Address"
                id="email"
              /> 
              </div>
          
            <div className={`flex relative dark:border-gray-600  items-center border-2 py-2 px-3 rounded-md mb-4`}>
              <MdOutlineLock className="h-6 dark:text-white"  alt="password" />
              {Showpassword ? (
                <BiHide
                  onClick={() => {
                    setShowpassword(!Showpassword);
                  }}
                  size={20}
                  className=" right-3 dark:text-white absolute cursor-pointer"
                />
              ) : (
                <BiShow
                  onClick={() => {
                    setShowpassword(!Showpassword);
                  }}
                  size={20}
                  className=" right-3 dark:text-white absolute cursor-pointer"
                />
              )}
              <input
                value={password}
                onChange={HandleUser}
                className="pl-2 dark:text-gray-50 outline-none dark:bg-gray-900 border-none w-full"
                type={Showpassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                id="password"
                
              />
            </div>

            <button id='login-button'
            disabled={isLoading}
              onClick={handleLogin}
              type="submit"
              className="block w-full bg-gradient-to-r from-gray-900 to-blue-700 mt-4 py-2 rounded-md text-white max-md:text-sm tracking-wider font-medium mb-2"
            >
              {isLoading ?'logging in..':'Login'}
            </button>
            <button type="button" className="flex w-full hover:bg-gray-100 hover:dark:bg-gray-700 items-center dark:text-gray-50 justify-center gap-3.5 rounded-md tracking-wide border border-gray-500 bg-gray py-1.5 my-2  "
              onClick={() => { if (googleUrlData?.url) window.location.href = googleUrlData.url; }}
            >
            <span>
              <FcGoogle/>
            </span>
            Login with Google
          </button>


            <button type="button" role="button"
              onClick={() => {
                navigate("/resetrequest");
              }}
              className="text-sm ml-2 underline text-blue-500 cursor-pointer"
            >
              Forgot Password..?
            </button>
            <button type="button" role="button"
            onClick={() => {
              navigate("/register");
            }}
            className="text-sm ml-2 underline text-blue-500 cursor-pointer"
          >
            create acount..?
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
// ${ErrorMessages && ErrorMessages.password ? 'mb-2':'mb-4'}