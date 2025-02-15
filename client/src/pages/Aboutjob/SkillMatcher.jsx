import React from 'react';
import useSkillMatchPercentage from '../../utils/SkillMatchPercentage';

const SkillMatcher = ({ userskills, jobskills }) => {
  const percentage = useSkillMatchPercentage(userskills, jobskills);


  let textContent;
  let textColor;

  if (percentage === 100) {
    textContent = 'Skill Match score';
    textColor = 'text-green-500';
  } else if (percentage >= 70) {
    textContent = 'Skill Match score';
    textColor = 'text-green-500';
  } else if (percentage >= 40) {
    textContent = 'Skill Match score';
    textColor = 'text-yellow-500';
  } else {
    textContent = 'Skill Match score';
    textColor = 'text-red-500';
  }

  return (
    <span
      className={`my-2 skill-match dark:text-gray-200 text-gray-600 text-sm font-medium ${textColor}`}
    >
      {textContent} {percentage}%
    </span>
  );
};

export default SkillMatcher;