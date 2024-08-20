import { useState, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useColorMode = () => {
  const [colorMode, setColorModeStorage] = useLocalStorage('color-theme', 'system');
  const [effectiveColorMode, setEffectiveColorMode] = useState(colorMode);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (colorMode === 'system') {
        setEffectiveColorMode(mediaQuery.matches ? 'dark' : 'light');
      } else {
        setEffectiveColorMode(colorMode);
      }
    };

    handleChange();
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [colorMode]);

  useEffect(() => {
    const className = 'dark';
    const bodyClass = window.document.body.classList;

    if (effectiveColorMode === 'dark') {
      bodyClass.add(className);
    } else {
      bodyClass.remove(className);
    }
  }, [effectiveColorMode]);

  const setColorMode = (newMode) => {
    setColorModeStorage(newMode);
    if (newMode !== 'system') {
      setEffectiveColorMode(newMode);
    }
  };

  return [effectiveColorMode, setColorMode];
};

export default useColorMode;