import React from 'react';
import { lazy } from 'react';
const Template1 = lazy(() => import("../Resumes/Resume1"));
const Template2 = lazy(() => import("../Resumes/Resume2"));
const Template3 = lazy(() => import("../Resumes/Resume3"));
const Template4 = lazy(() => import("../Resumes/Resume4"));









const ResumePreview = ({ templateId, PersonalInfo,Skillinfo, employmentInfo, EduInfo, ProjectInfo , LangInfo }) => {

  const getTemplate = () => {
    switch (templateId) {
      case '1':
        return <Template1 LangInfo={LangInfo} ProjectInfo={ProjectInfo} EduInfo={EduInfo} employmentInfo={employmentInfo} Skillinfo={Skillinfo} PersonalInfo={PersonalInfo} />;
      case '2':
        return <Template2 LangInfo={LangInfo} ProjectInfo={ProjectInfo} EduInfo={EduInfo} employmentInfo={employmentInfo} Skillinfo={Skillinfo} PersonalInfo={PersonalInfo} />;
      case '3':
        return <Template3 LangInfo={LangInfo} ProjectInfo={ProjectInfo} EduInfo={EduInfo} employmentInfo={employmentInfo} Skillinfo={Skillinfo} PersonalInfo={PersonalInfo} />;
      case '4':
        return <Template4 LangInfo={LangInfo} ProjectInfo={ProjectInfo} EduInfo={EduInfo} employmentInfo={employmentInfo} Skillinfo={Skillinfo} PersonalInfo={PersonalInfo} />;
      default:
        return <div>Invalid template</div>;
    }
  };

  return (
    <div id='resume-preview'>
      {getTemplate()}
    </div>
  );
};

export default ResumePreview;