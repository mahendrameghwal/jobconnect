import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCurrentUserQuery } from '../../app/api/authApi';
import Loginpopup from '../components/Loginpopup';
import Loader from '../components/Loader';

const PrivateCandidateRoute = () => {
  const { data: CurrentUser, isLoading } = useCurrentUserQuery();

  // if (!CurrentUser || typeof CurrentUser?.Isorg !== 'boolean') {
  //   return <Loginpopup show={true} />;
  // }
  if (isLoading) {
    return <Loader />;
  }

  if (CurrentUser.Isorg === false && typeof CurrentUser.Isorg === 'boolean') {
    return <Outlet/>; // or any other component you want to show
  }

  return <Navigate to="/unauthorized" replace />;
};

export default PrivateCandidateRoute;