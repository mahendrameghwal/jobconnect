import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const AuthChecker = () => {
  const location = useLocation();
  const isAuthenticated = useAuth(); // Assuming useAuth returns authentication status

  useEffect(() => {
  
  
  }, [location.pathname, isAuthenticated]); // Ensure navigate and isAuthenticated are in the dependency array

  return null;
};

export default AuthChecker;
