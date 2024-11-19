import { useState, useEffect } from 'react';

/* to calculate the percentage of user's skills that match the job's required skills.*/

const useSkillMatchPercentage = (userSkills,jobSkills) => {
    const [matchPercentage, setMatchPercentage] = useState(0);

    console.log(userSkills,jobSkills);
    useEffect(() => {
      const matchedSkills = userSkills?.filter((userSkill) => {
        return jobSkills.some((jobSkill) => jobSkill.trim().toLowerCase() === userSkill.name.trim().toLowerCase());
      });
  
      const matchPercentage = (matchedSkills.length / jobSkills.length) * 100;
      setMatchPercentage(matchPercentage);
    }, [userSkills, jobSkills]);
  
    return matchPercentage.toFixed(0);
};

export default useSkillMatchPercentage;
