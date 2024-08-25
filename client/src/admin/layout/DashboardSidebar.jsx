import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  FaBuilding,
  FaUser,
  FaCog,
  FaBars,
} from 'react-icons/fa';
import { FaChartPie } from "react-icons/fa6";
import SidebarLinkGroup from '../SidebarLinkGroup';
import { PiSuitcaseSimpleFill } from "react-icons/pi";

const DashboardSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen]);

  //esc 
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen]);

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <>
      {/* Sidebar toggle button */}
      <button
        ref={trigger}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-controls="sidebar"
        aria-expanded={sidebarOpen}
        className="absolute top-5 left-5 z-20 block lg:hidden"
      >
        <FaBars className="text-white text-xl" />
      </button>

      <aside
        ref={sidebar}
        className={`fixed left-0 border dark:border-gray-600 border-none top-0 z-10 flex h-screen w-72.5 flex-col overflow-y-hidden bg-gray-800 duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* SIDEBAR HEADER */}

        {/* SIDEBAR HEADER */}

        <div className="flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* Sidebar Menu */}
          <nav className="mt-10 py-5 px-4 lg:mt-9 lg:px-6">
            {/* Menu Group */}
            <div>
            

              <ul className="mb-6 flex flex-col gap-1.5">
                {/* Menu Items */}
                <li>
                  <NavLink
                    to="/dashboard/candidate"
                    className={`flex items-center text-white hover:text-gray-400  gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
                      pathname.includes('dashboard') ? 'bg-graydark' : ''
                    }`}
                  >
                  <FaUser />
                    Candidate
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/company"
                    className={`flex items-center text-white hover:text-gray-400  gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark     }`}
                  >
                    <FaBuilding />
                    Companies
                  </NavLink>
                </li>
                <li>
                  <NavLink
                to="/dashboard/job"
                    className={`flex items-center text-white hover:text-gray-400  gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark `}
                  >
                  <PiSuitcaseSimpleFill/>
                    Jobs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/report"
                    className={`flex items-center text-white hover:text-gray-400  gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark `}
                  >
                    <FaChartPie />
                    Report
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/settings"
                    className={`flex items-center text-white hover:text-gray-400  gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark `}
                  >
                    <FaCog />
                    Settings
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
          {/* Sidebar Menu */}
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
