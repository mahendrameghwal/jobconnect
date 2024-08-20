import { useState, useEffect } from "react";
import debounce from "lodash/debounce";
const useSticky = () => {
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = debounce(() => {
      if (window.scrollY > 120) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }, 100);
    window.addEventListener("scroll", handleScroll);
    
  }, []);
  return isSticky;
};
export default useSticky;
