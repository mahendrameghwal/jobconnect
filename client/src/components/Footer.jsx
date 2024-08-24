import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
const Footer = () => {

  const now = new Date();
  const currentYear = now.getFullYear();
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const currentDate = now.toLocaleDateString(undefined, options);


  return (
    <div className="bottom-0 ">

      <footer className="p-4 mt-0.5 sm:p-6  bg-gradient-to-r from-gray-900 to-blue-950">
        <div className="md:flex md:justify-between">
          <div className=" md:mb-2 py-2">
            <div className="flex items-center ">
              <img src={logo} className="mr-4 max-md:h-5 h-7" alt="Logo"/>
              <span className="self-center text-xl font-semibold whitespace-nowrap text-white">JobConnect</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase text-white">Follow us</h3>
              <ul>
                <li className="mb-2">
                  <div
                    className=" hover:underline dark:text-gray-200 text-gray-400">Github</div>
                </li>
                <li>
                  <div
                    className=" hover:underline dark:text-gray-200 text-gray-400">Discord</div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold  uppercase text-white">Legal</h3>
              <ul>
                <li className="mb-2">
                  <div className=" hover:underline dark:text-gray-200 text-gray-400">Privacy
                    Policy</div>
                </li>
                <li>
                  <div className=" hover:underline dark:text-gray-200 text-gray-400">Terms
                    &amp; Conditions</div>
                </li>
                <li className="mb-4">
                <Link to="/suggestion" className=" hover:underline dark:text-gray-200 text-gray-400">Suggestion</Link>
              </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4"/>
        <div className="sm:flex sm:items-center sm:justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
        © {currentYear} <Link to="https://github.com/mahendrameghwal" className="px-2">designed by Mahendra</Link>All Rights Reserved.
        <span className="max-md:hidden">{currentDate}</span>
      </span>
      <div className="flex mt-2 space-x-6 sm:justify-center sm:mt-0">
      <button className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
        <FaFacebookF className="w-5 h-5 max-md:w-3 max-md:h-3" />
      </button>
      <button className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
        <FaInstagram className="w-5 h-5 max-md:w-3 max-md:h-3" />
      </button>
      <button className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
        <FaTwitter className="w-5 h-5 max-md:w-3 max-md:h-3" />
      </button>
      <button className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
        <FaLinkedinIn className="w-5 h-5 max-md:w-3 max-md:h-3" />
      </button>
    </div>
        </div>
      </footer>
    

    
    
    
    </div>
  )
}

export default Footer