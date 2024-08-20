import { Link } from 'react-router-dom';
import { FaSearch, FaChartPie } from 'react-icons/fa';
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";

const DashboardHeader = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-20 flex w-full bg-gray-800 drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* Hamburger Toggle BTN */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-99999 block rounded-sm border font-medium bg-transparent p-1 shadow-sm outline-none border-none lg:hidden"
          >
           <HiOutlineBars3BottomLeft className='font-bold text-white  !leading-snug text-xl'/>
          </button>
          {/* Hamburger Toggle BTN */}

       
        </div>

        <div className=" flex">
          <form >
            <div className="relative gap-x-4 text-white flex items-center">
            DashBoard
            <FaChartPie />
            </div>
          </form>
        </div>

      
      </div>
    </header>
  );
};

export default DashboardHeader;
