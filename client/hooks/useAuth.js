import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../app/slices/Authslice';
import { useCurrentUserQuery } from '../app/api/authApi';

const useAuth = () => {
 const {data: CurrentUserinfo}= useCurrentUserQuery();
 const dispatch = useDispatch();
 const userInfo = useSelector((state) => state?.auth?.userInfo);
 const loginTimestamp = useSelector((state) => state.auth.loginTimestamp);
 console.log(`this is userInfo`,userInfo)
 console.log(`this is Currentuser`,CurrentUserinfo);

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




