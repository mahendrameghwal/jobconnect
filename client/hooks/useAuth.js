import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../app/slices/Authslice';

const useAuth = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state?.auth?.userInfo);
  const loginTimestamp = useSelector((state) => state.auth.loginTimestamp);
 

  if (userInfo && loginTimestamp) {
    const currentTime = Date.now();
    const timeDifference = currentTime - loginTimestamp;
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    if (hoursDifference > 24) {
      localStorage.removeItem('persist:root');
      dispatch(logout());
      return false;
    }
    return true;
  }

  return false;
};

export default useAuth;




