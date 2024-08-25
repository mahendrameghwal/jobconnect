import { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaDesktop } from 'react-icons/fa';
import useColorMode from '../../../hooks/useColorMode';

const DarkLightMode = () => {
  const [colorMode, setColorMode] = useColorMode();
  const [isOpen, setIsOpen] = useState(false);

  const handleColorModeChange = (mode) => {
    if (typeof setColorMode === 'function') {
      setColorMode(mode);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const closeDropdown = () => setIsOpen(false);
    document.addEventListener('click', closeDropdown);
    return () => document.removeEventListener('click', closeDropdown);
  }, []);

  const colorModes = [
    { name: 'Light', icon: FaSun, value: 'light' },
    { name: 'Dark', icon: FaMoon, value: 'dark' },
    { name: 'System', icon: FaDesktop, value: 'system' },
  ];

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center items-center w-full rounded-md border dark:bg-gray-700  border-gray-300 shadow-sm px-4 py-1.5 bg-white/95 text-sm font-medium text-gray-700 dark:text-gray-300 dark:border-gray-600 hover:bg-gray-50 focus:outline-none"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        >
        {colorMode === 'system' ? (
          <FaDesktop className="text-gray-500 hover:text-gray-700 transition-colors duration-300" />
        ) : colorMode === 'dark' ? (
          <FaMoon className="text-blue-500 hover:text-blue-700 transition-colors duration-300" />
        ) : (
          <FaSun className="text-yellow-500 hover:text-yellow-700 transition-colors duration-300" />
        )}
          <span className="ml-2">{colorMode.charAt(0).toUpperCase() + colorMode.slice(1)}</span>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 dark:bg-gray-800 dark:ring-gray-700">
  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
    {colorModes.map((mode) => (
      <button
        key={mode.value}
        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 w-full text-left"
        role="menuitem"
        onClick={() => handleColorModeChange(mode.value)}
      >
        <mode.icon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
        {mode.name}
      </button>
    ))}
  </div>
</div>

      )}
    </div>
  );
};

export default DarkLightMode;