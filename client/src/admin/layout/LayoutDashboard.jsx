import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';

const LayoutDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Check if the current route matches the dashboard base path without specific sub-routes
  const isDashboardBase = location.pathname === '/dashboard';

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 relative">
          {isDashboardBase ? (
            <div className="absolute inset-0 flex items-center justify-center p-4 md:p-6 2xl:p-10">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-200 mb-4">Welcome to the Dashboard</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Select an option from the sidebar to view more details.
                </p>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0  z-1 p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default LayoutDashboard;