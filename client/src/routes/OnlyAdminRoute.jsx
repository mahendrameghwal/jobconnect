
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import LoginPopup from '../components/Loginpopup';
import { useSelector } from 'react-redux';

const OnlyAdminRoute = () => {
  const  isAuth  = useAuth();
  const userInfo = useSelector((state) => state?.auth?.userInfo);

  if (!isAuth) {
    return <LoginPopup show={true} />;
  }

  if (!userInfo?.isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default OnlyAdminRoute;

