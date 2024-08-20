import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
const useDecodedToken = (cookieName) => {
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const getCookie = (name) => {
      const cookieMatch = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  
      return cookieMatch ? cookieMatch[1] : null;
    };

    const accessToken = getCookie(cookieName);


    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      setDecodedToken(decoded);
    }
  }, [cookieName]);

  return decodedToken;
};

export default useDecodedToken;
