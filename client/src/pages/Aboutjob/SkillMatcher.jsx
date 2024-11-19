import React from 'react';
import useSkillMatchPercentage from '../../utils/SkillMatchPercentage';

const SkillMatcher = ({ userskills, jobskills }) => {
  const percentage = useSkillMatchPercentage(userskills, jobskills);
  console.log(percentage);

  let textContent;
  let textColor;

  if (percentage === 100) {
    textContent = 'Congratulations, your skills perfectly match this job!';
    textColor = 'text-green-500';
  } else if (percentage >= 70) {
    textContent = 'Great, your skills match this job well!';
    textColor = 'text-green-500';
  } else if (percentage >= 40) {
    textContent = 'Your skills match this job, but there is room for improvement.';
    textColor = 'text-yellow-500';
  } else {
    textContent = 'Unfortunately, your skills do not match this job.';
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