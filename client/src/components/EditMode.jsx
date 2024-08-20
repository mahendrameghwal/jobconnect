import React from 'react';

const EditMode = ({ isChecked, onToggle }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        className="sr-only" 
        checked={isChecked} 
        onChange={onToggle} 
      />
      <span 
        className={`w-14 h-6 bg-gray-300 rounded-full transition-all duration-300 ease-in-out 
          ${isChecked ? 'bg-green-500' : 'bg-gray-300'}`}
      >
        <span 
          className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ease-in-out 
            ${isChecked ? 'translate-x-8 bg-gray-100' : 'translate-x-0'}`}
        />
      </span>
    </label>
  );
};

export default EditMode;