import React, { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { FaUserGraduate, FaBriefcase } from 'react-icons/fa';

const RoleSelection = ({ onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    {
      type: 'candidate',
      icon: FaUserGraduate,
      title: 'Job Seeker',
      description: 'Find and apply for exciting job opportunities'
    },
    {
      type: 'organization',
      icon: FaBriefcase,
      title: 'Employer',
      description: 'Post jobs and find talented candidates'
    }
  ];


  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    onRoleSelect(role);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center space-y-6 p-8">
      <h2 className="text-3xl font-bold text-center dark:text-white mb-6">
        I am a
      </h2>

      <RadioGroup value={selectedRole} onChange={handleRoleSelection} className="w-full max-w-md">
        <RadioGroup.Label className="sr-only">Select a Role</RadioGroup.Label>
        <div className="grid grid-cols-2 gap-4">
          {roles.map((role) => (
            <RadioGroup.Option
              key={role.type}
              value={role.type}
              className={({ checked }) =>
                `
                cursor-pointer 
                border 
                rounded-lg 
                p-4 
                text-center 
                transition-all 
                duration-300 
                hover:shadow-md 
                hover:bg-gray-200 
                dark:hover:bg-blue-700
                ${checked 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                  : 'border-gray-300 dark:border-gray-700'}`
              }
            >
              {({ checked }) => (
                <>
                  <role.icon
                    size={30}
                    className={`mx-auto mb-2 ${
                      checked
                        ? 'text-blue-600'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  />
                  <h3 className="text-lg font-semibold dark:text-white mb-1">
                    {role.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {role.description}
                  </p>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>

      {selectedRole && (
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            You selected: <span className="font-bold capitalize">{selectedRole}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default RoleSelection;
