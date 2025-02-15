import {  Navigate, Outlet } from 'react-router-dom';
import Loginpopup from '../components/Loginpopup';
import { useCurrentUserQuery } from '../../app/api/authApi';
import Loader from '../components/Loader';


const PrivateRoute = () => {
  const { data: CurrentUser , isLoading } = useCurrentUserQuery();

  if(isLoading){
    return <Loader/>
  }

  if (!CurrentUser || typeof CurrentUser?.Isorg !== 'boolean') {
    return <Navigate to="/unauthorized" replace />;
  }

  if (typeof(CurrentUser?.Isorg == 'boolean')) {
    return <Outlet/>; 
  }

 
};
 


export default PrivateRoute;