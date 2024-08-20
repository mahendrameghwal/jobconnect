import { Fragment } from "react";
import { DateTime } from 'luxon';

const Resume1 = ({ PersonalInfo, Skillinfo, employmentInfo, EduInfo, ProjectInfo, LangInfo }) => {

  
  return (
    <div className="border border-gray-300 font-sans mx-auto my-2 bg-white">
      {/* Information */}
      <div className="text-center mb-1">
        {PersonalInfo.fullname && <h2 className="text-2xl font-bold">{PersonalInfo.fullname}</h2>}
        {PersonalInfo.email && <span>{PersonalInfo.email}</span>} | 
        {PersonalInfo.phone && <span>{PersonalInfo.phone}</span>} |{" "}
        <span>{PersonalInfo.city}</span>
      </div>

      {/* Summary */}
      {PersonalInfo.summary && (
        <div className="mb-1">
          <h2 style={{ backgroundColor: '#afcfcc', paddingLeft: '14px', color: 'white', fontWeight: '500' }}>
            SUMMARY
          </h2>
          <p className='px-2'>{PersonalInfo.summary}</p>
        </div>
      )}

      {/* Skill */}
      {Skillinfo && Skillinfo.length > 0 && (
        <div className="mb-1">
          <h2 style={{ backgroundColor: '#afcfcc', paddingLeft: '14px', color: 'white', fontWeight: '500' }}>
            SKILLS
          </h2>
          <div className="px-6 py-4 w-full">
            <ul className="flex flex-wrap gap-x-6 gap-y-4 list-none">
              {Skillinfo.map((skill, index) => (
                <Fragment key={index}>
                  <li>{skill?.name}</li>
                </Fragment>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Project */}
      {ProjectInfo && ProjectInfo.length > 0 && (
        <div className="mb-1">
          <h2 style={{ backgroundColor: '#afcfcc', paddingLeft: '14px', color: 'white', fontWeight: '500' }}>
            PROJECTS
          </h2>
          <div className="px-6 py-4">
            {ProjectInfo.map((proj, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-base font-medium">
                    {proj?.title ? proj.title : "Add project title"} | 
                    Status:<span className="ml-2">{proj?.status ? proj.status : "Project status"}</span>
                  </h4>
                  <div className="flex items-end">
                    <span>{DateTime.fromISO(proj.startdate, { setZone: true }).toFormat('MMMM dd, yyyy')}</span>
                    &nbsp;to&nbsp;
                    <span>{DateTime.fromISO(proj.enddate, { setZone: true }).toFormat('MMMM dd, yyyy')}</span>
                  </div>
                </div>
                <div className='flex gap-x-3'>
                  <span className="font-medium">Skill used</span>&nbsp;:
                  {proj?.projectskill?.map(({ name }, ind) => (
                    <span key={ind}>{name}</span>
                  ))}
                </div>
                <ul className="list-none list-inside mt-2">
                  <li>{proj.description}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {EduInfo && EduInfo.length > 0 && (
        <div className="mb-1">
          <h2 style={{ backgroundColor: '#afcfcc', paddingLeft: '14px', color: 'white', fontWeight: '500' }}>
            EDUCATION
          </h2>
          <div className="px-6 py-4">
            {EduInfo.map((experience, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-2">
                  <h4 className="text-lg font-semibold">
                    {experience.degree}&nbsp;|&nbsp;{experience.institute}
                  </h4>
                  <span>{DateTime.fromISO(experience.startdate, { setZone: true }).toFormat('MMMM dd, yyyy')} - {DateTime.fromISO(experience.enddate, { setZone: true }).toFormat('MMMM dd, yyyy')}</span>
                </div>
                <ul className="flex list-none gap-x-2 list-inside">
                  <li className="text-capitalize"><span className="text-base font-medium">Field of Study</span>: {experience.fieldofstudy}</li>
                  <li className="text-capitalize"><span className="text-base font-medium">Percentage</span>: {experience.percentage}</li>
                  <li className="text-capitalize"><span className="text-base font-medium">Qualification</span>: {experience.qualification}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Work Experience */}
      {employmentInfo && employmentInfo.length > 0 && (
        <div className="mb-1">
          <h2 style={{ backgroundColor: '#afcfcc', paddingLeft: '14px', color: 'white', fontWeight: '500' }}>
            EXPERIENCE
          </h2>
          <div className="px-6 py-4">
            {employmentInfo.map((experience, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between mb-2">
                  <h4 className="text-base font-medium">{experience.position} | {experience.orgname}</h4>
                  <span>{DateTime.fromISO(experience.startdate, { setZone: true }).toFormat('MMMM dd, yyyy')}</span>
                  <span>{DateTime.fromISO(experience.enddate, { setZone: true }).toFormat('MMMM dd, yyyy')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {LangInfo && LangInfo.length > 0 && (
        <div>
          <h2 style={{ backgroundColor: '#afcfcc', paddingLeft: '14px', color: 'white', fontWeight: '500' }}>
            LANGUAGES
          </h2>
          <div className="px-6 py-1">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '8px' }}>Language</th>
                  <th style={{ textAlign: 'left', padding: '8px' }}>Proficiency</th>
                </tr>
              </thead>
              <tbody>
                {LangInfo.map((language, index) => (
                  <tr key={index}>
                    <td className='border-b-slate-300 p-1'>{language.lan}</td>
                    <td className='border-b-slate-300 p-1'>{language.proficiency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resume1;
