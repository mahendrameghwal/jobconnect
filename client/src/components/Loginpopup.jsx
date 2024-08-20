import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { SetLoginUser, resetuser } from '../../app/slices/Loginslice';
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useLoginMutation } from '../../app/api/authApi';
import { setCredentials } from '../../app/slices/Authslice';

const Loginpopup = ({ show }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const [login, {isLoading}] = useLoginMutation();

  const User = useSelector(state => state.login.User);
  const dispatch = useDispatch();
  const { email, password } = User;


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(User).unwrap();
     
      if (response?.token) {
        setTimeout(() => {
          dispatch(resetuser());
        }, 2000);
        const { Isorg, isAdmin } = response?.token; 
         dispatch(setCredentials({Isorg,isAdmin}))
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
    show && (
      <motion.dialog
        open
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed overflow-hidden min-h-screen top-0 left-0 w-full h-full bg-black/90 backdrop-blur-3xl bg-opacity-60 flex justify-center items-center z-50"
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative  max-md:translate-y-1/4 bg-white rounded-lg shadow">
            <div  className="p-5  border ">
              <h3 className="text-2xl mb-0.5 font-medium"></h3>
              <p className="mb-4 text-sm font-normal text-gray-800"></p>

              <div className="text-center">
                <p className="mb-3 text-2xl font-semibold leading-5 text-slate-800">
                  Login to your account
                </p>
                <p className="mt-2 tracking-wide text-sm leading-4 underline text-slate-600">
                  You must be logged in to perform this action.
                </p>
              </div>
              <form onSubmit={handleLogin} className="w-full">
                <section className=" w-full my-5 max-sm:my-7">
                  <label
                    htmlFor="email"
                    className="relative  block rounded-sm border border-gray-200 shadow-sm focus-within:border-slate-600  focus-within:ring-slate-600"
                  >
                    <input
                    value={email}
                    onChange={HandleUser}
                    name='email'
                      type="email"
                      className="peer  p-1.5 w-full border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                      placeholder="enter email"
                    />

                    <span className="pointer-events-none absolute tracking-wider start-2.5 top-0 -translate-y-2/3 bg-white  capitalize  text-sm font-normal text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                      email
                    </span>
                  </label>
                </section>
                <section className="w-full my-5">
                  <label
                    htmlFor="password"
                    className="relative block rounded-sm border border-gray-200 shadow-sm focus-within:border-slate-600  focus-within:ring-slate-600"
                  >
                    <input
                    value={password}
                    onChange={HandleUser}
                    name='password'
                      type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword state
                      className="peer p-1.5 w-full border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                      placeholder="Enter password"
                    />
                    <span className="pointer-events-none tracking-wider absolute start-2.5 top-0 -translate-y-2/3 bg-white capitalize text-sm font-normal text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                      Password
                    </span>
                    {/* Toggle button to show/hide password */}
                    <button
                      type="button"
                      className="absolute end-2.5 top-1/2 transform -translate-y-1/2 text-gray-400"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <RiEyeOffFill size={20} />
                      ) : (
                        <RiEyeFill size={20} />
                      )}
                    </button>
                  </label>
                </section>
                <Link
                  to={'/resetrequest'}
                  className=" text-sm font-medium text-gray-500"
                >
                  <span className="text-blue-800 hover:text-blue-600">
                    Reset your password?
                  </span>
                </Link>
                <Link to={'/login'}>
                  <button onClick={handleLogin} disabled={isLoading}
                    type="submit"
                    className="inline-flex w-full mt-4 items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-1 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
                  >
                    Continue
                  </button>
                </Link>
              </form>

              <div className="mt-4 flex gap-x-3 justify-center items-center text-center text-sm text-slate-600">
                <Link to="/login" className="font-medium text-[#4285f4]">
                  Log in
                </Link>
                <span>|</span>
                <Link to="/register" className="font-medium text-[#4285f4]">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.dialog>
    )
  );
};

export default Loginpopup;
