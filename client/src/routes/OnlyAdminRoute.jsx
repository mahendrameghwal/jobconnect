import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUserQuery } from '../../app/api/authApi';
import LoginPopup from '../components/Loginpopup';
import Loader from '../components/Loader';
Loader

const OnlyAdminRoute = () => {
  const { data: CurrentUser, isLoading } = useCurrentUserQuery();

  // if (!CurrentUser || typeof CurrentUser?.isAdmin !== 'boolean') {
  //   return <LoginPopup show={true} />;
  // }
  if (isLoading) {
    return <Loader />;
  }
  if (CurrentUser && CurrentUser.isAdmin === true && typeof CurrentUser.isAdmin === 'boolean') {
    return <Outlet />;
  }

  return <Navigate to="/unauthorized" replace />;
};

export default OnlyAdminRoute;