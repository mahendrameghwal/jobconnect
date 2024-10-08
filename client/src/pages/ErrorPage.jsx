import { Link, useNavigate } from "react-router-dom";
import { LuMoveLeft } from "react-icons/lu";

const ErrorPage = () => {
const navigate =  useNavigate()
  return (
   
    <section className="">
    <div className="container mx-auto flex min-h-screen items-center px-6 py-12">
      <div className="mx-auto flex max-w-sm flex-col items-center text-center">
        <p className="rounded-full bg-blue-50 p-3 text-sm font-medium text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </p>
        <h1 className="mt-3 text-2xl font-semibold dark:text-white text-gray-800">
          Page not found
        </h1>
        <p className="mt-4 text-gray-500 dark:text-gray-300">
          The page you are looking for doesn't exist.
        </p>
        <div className="mt-6 flex w-full shrink-0 items-center gap-x-3 sm:w-auto">
          <button className="flex w-1/2 items-center justify-center gap-x-2 rounded-lg border bg-white hover:bg-gray-100 dark:bg-gray-200 px-5 py-2 text-sm text-gray-700 transition-colors duration-200  sm:w-auto">
           <LuMoveLeft />
            <span onClick={() => navigate(-1)}>Go back</span>
          </button>
          <button className="w-1/2 shrink-0 rounded-lg bg-blue-500 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 sm:w-auto">
            <Link to="/">Take me home</Link>
          </button>
        </div>
      </div>
    </div>
  </section>
 
  );
};

export default ErrorPage;
