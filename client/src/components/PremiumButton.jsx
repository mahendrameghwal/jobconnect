import React from 'react';


const PremiumButton = () => {
  const buttonStyle = {
    background: 'linear-gradient(to right, #77530a, #ffd277, #77530a, #77530a, #ffd277, #77530a)',
    backgroundSize: '250%',
    backgroundPosition: 'left',
    transition: 'background-position 1s ease-in-out',
  };

  const beforeStyle = {
    content: '"Premium"',
    color: '#ffd277',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '97%',
    height: '90%',
    borderRadius: '8px',
    transition: 'background-position 1s ease-in-out',
    backgroundColor: 'rgba(0, 0, 0, 0.842)',
    backgroundSize: '200%',
    backgroundPosition: 'left',
  };

  return (
    <button
      style={buttonStyle}
      className=" flex items-center justify-center w-full h-6 border-none rounded-lg text-[#e4b34f] cursor-pointer transition-transform duration-1000 overflow-hidden hover:bg-gradient-to-r hover:from-[#77530a] hover:via-[#ffd277] hover:to-[#77530a] active:scale-95"
      onMouseEnter={(e) => e.currentTarget.style.backgroundPosition = 'right'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundPosition = 'left'}
    >
      <span
        style={beforeStyle}
        className=" rounded-sm  px-4"
      >
      Pro
      </span>
    </button>
  );
};

export default PremiumButton;
