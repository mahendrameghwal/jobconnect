import { Link } from "react-router-dom";
import { FcVoicePresentation } from "react-icons/fc";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useCurrentUserQuery, useRequestPasswordResetMutation } from "../../../../app/api/authApi";

const PasswordResetRequest = () => {
  const { data: CurrentUser } = useCurrentUserQuery();
  const [email, setEmail] = useState(""); 
  const [RequestPasswordReset, { data, error, isSuccess, isError }] = useRequestPasswordResetMutation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (CurrentUser?.email) {
      setEmail(CurrentUser.email);
    }
  }, [CurrentUser]);

  const HandleEmail = (e) => {
    setEmail(e.target.value); 
  };

  const HandleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await RequestPasswordReset({ email }); 
      
      if (res?.data) {
        toast.success(res?.data?.message);
        setEmail(''); 
      }

      if (isError) {
        if (res?.error?.message) {
          toast.error(res?.error?.message);
        }
        if (res?.error?.data?.message) {
          toast.error(res?.error?.data?.message);
        }
      }

    } catch (error) {
      toast.error(error.message?error.message:'An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-x-4 items-center justify-center">
      <div className="w-1/2 max-md:w-full">
        <main role="main" className="min-h-screen max-h-full max-w-lg mx-auto max-md:p-3">
          <div className="mt-40 max-md:mt-32 bg-gray-200 rounded-sm shadow-xl dark:bg-gray-900/30 dark:border-gray-700">
            <form onSubmit={HandleForgotPassword}>
              <div className="p-4 max-md:p-3">
                <div className="text-center gap-x-2">
                  <h1 className="block text-2xl font-bold text-gray-800 dark:text-gray-100">Forgot password</h1>
                  <Link to="/login">
                    <button className="text-blue-600 dark:text-blue-400 decoration-2 underline font-medium">
                      Login here
                    </button>
                  </Link>
                </div>
                <div className="mt-6">
                  <div className="grid gap-y-4">
                    <div>
                      <label htmlFor='email' className="block text-sm font-normal dark:text-gray-200 mb-1">Email address</label>
                      <div className="relative">
                        <input
                          value={email}
                          onChange={HandleEmail}
                          placeholder="Your Registered email"
                          type="email"
                          name="email"
                          className="outline-none py-2 px-3 block w-full border border-gray-100 rounded-sm text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                          aria-describedby="email-error"
                          required
                        />
                      </div>
                      <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                    </div>
                    <button
                      type="submit"
                      className="py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-normal tracking-wider bg-blue-600 text-white hover:bg-blue-500 focus:outline-none focus:ring-2 transition-all text-sm"
                      disabled={loading}
                    >
                      {loading ? (
                        <>Sending... <FcVoicePresentation size={20} /></>
                      ) : (
                        <>Send Activation Link <FcVoicePresentation size={20} /></>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PasswordResetRequest;
