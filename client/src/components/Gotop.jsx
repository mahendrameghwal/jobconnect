import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const Gotop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [isVisible]);

  const toggleVisibility = () => {
    if (window.scrollY > 150) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
    return (
    isVisible && ( <button className="flex fixed max-md:w-10 max-md:h-10  bottom-5 max-md:right-5 right-10 z-10 animate-bounce rounded-2xl bg-blue-500 w-12 h-12  justify-center items-center shadow-lg" onClick={scrollToTop}> <FaArrowUp color="white" size={20} /></button>)
    );
};

export default Gotop;
