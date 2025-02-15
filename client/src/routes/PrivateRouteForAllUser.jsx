import {  Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Loginpopup from '../components/Loginpopup';

const PrivateRoute = () => {
  const isAuth = useAuth();
  if (!isAuth) {
    return <Loginpopup show={true} />;
  }

  return <Outlet />;
};

export default PrivateRoute;