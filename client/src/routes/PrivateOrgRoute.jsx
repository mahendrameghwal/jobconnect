import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import LoginPopup from '../components/Loginpopup';
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';
import { useCurrentUserQuery } from '../../app/api/authApi';
const PrivateOrgRoute = () => {

  const { data: CurrentUser, isLoading } = useCurrentUserQuery();

  // if (!CurrentUser || typeof CurrentUser?.Isorg !== 'boolean') {
  //   return <LoginPopup show={true} />;
  // }
  if (isLoading) {
    return <Loader />;
  }

  if (CurrentUser?.Isorg && typeof CurrentUser?.Isorg == 'boolean') {
    return <Outlet/>; 
  }

  return <Navigate to="/unauthorized" replace />;
};

export default PrivateOrgRoute;