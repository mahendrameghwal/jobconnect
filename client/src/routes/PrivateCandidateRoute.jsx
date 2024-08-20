import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import LoginPopup from '../components/Loginpopup';
import { useSelector } from 'react-redux';
const PrivateCandidateRoute = () => {
  const userInfo = useSelector((state) => state?.auth?.userInfo);
  const  isAuth  = useAuth();

  if (!isAuth) {
    return <LoginPopup show={true} />;
  }

  if (userInfo.Isorg) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateCandidateRoute;