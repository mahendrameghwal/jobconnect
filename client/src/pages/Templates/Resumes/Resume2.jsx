import React from "react";
import { DateTime } from 'luxon';

const Resume2 = ({ PersonalInfo, Skillinfo, employmentInfo, EduInfo, ProjectInfo, LangInfo }) => {
  return (
    <div className="border-2  border-gray-300 font-medium mx-auto my-2 bg-white">
      {/* Information */}
      <div className="text-center mb-3 w-full">
        <h2 className="text-2xl font-bold">
          {PersonalInfo?.fullname && (
            <span className="text-yellow-500">{PersonalInfo.fullname}</span>
          )}
        </h2>
        <p className="mt-2 text-sm">
          {PersonalInfo?.city || PersonalInfo?.country || PersonalInfo?.state ? (
            <span className="text-gray-700">
              {PersonalInfo.city}, ({PersonalInfo.state}){PersonalInfo.country}
            </span>
          ) : PersonalInfo?.city ? (
            <span className="text-gray-700">{PersonalInfo.city}</span>
          ) : PersonalInfo?.country ? (
            <span className="text-gray-700">{PersonalInfo.country}</span>
          ) : PersonalInfo?.state ? (
            <span className="text-gray-700">{PersonalInfo.state}</span>
          ) : null}
          &nbsp;|&nbsp;
          {PersonalInfo?.phone && <span className="text-gray-700">+{PersonalInfo.phone}</span>}&nbsp;|&nbsp;
          {PersonalInfo?.email && <span className="text-gray-700">{PersonalInfo.email}</span>}
        </p>
      </div>
      <hr className="bg-yellow-500 h-0.5 w-full" />

      {/* Professional Summary */}
      {PersonalInfo?.summary && (
        <div className="mx-2 mb-4">
          <p className="text-yellow-500 text-xl font-semibold mb-1">
            PROFESSIONAL SUMMARY
          </p>
          <p className="text-gray-800">{PersonalInfo.summary}</p>
        </div>
      )}
      <hr className="my-2" />

      {/* Skills */}
      {Skillinfo && Skillinfo.length > 0 && (
        <div className="mb-4 mx-2">
          <h2 className="text-yellow-500 text-xl font-semibold mb-1" >
            SKILLS
          </h2>
          <div className="flex flex-wrap gap-2">
            {Skillinfo.map((skill, index) => (
              skill.name && (
                <span key={index} className="bg-gray-200 px-4 text-black text-sm rounded-md">
                  {skill.name}
                </span>
              )
            ))}
          </div>
        </div>
      )}
      <hr className="my-2" />

      {/* Projects */}
      {ProjectInfo && ProjectInfo.length > 0 && (
        <div className="mb-4 mx-2">
          <h2 className="text-yellow-500 text-xl font-semibold mb-1" >
            PROJECTS
          </h2>
          <div className="space-y-4">
            {ProjectInfo.map((proj, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <h4 className="text-base font-medium">
                    {proj.title || "Project Title"} | 
                    Status: <span className="ml-2">{proj.status || "Project Status"}</span>
                  </h4>
                  <div className="flex items-end">
                    <span>{DateTime.fromISO(proj.startdate, { setZone: true }).toFormat('MMMM dd, yyyy')}</span>
                    &nbsp;to&nbsp;
                    <span>{DateTime.fromISO(proj.enddate, { setZone: true }).toFormat('MMMM dd, yyyy')}</span>
                  </div>
                </div>
                <div className='flex gap-x-3 mb-2'>
                  <span className="font-medium">Skills Used</span>:
                  {proj.projectskill?.map((skill, ind) => (
                    <span key={ind} className="ml-2">{skill.name}</span>
                  ))}
                </div>
                <ul className="list-none list-inside mt-2 text-gray-800">
                  <li>{proj.description || "Project Description"}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      <hr className="my-2" />

      {/* Education */}
      {EduInfo && EduInfo.length > 0 && (
        <div className="mb-4 mx-2">
          <h2 className="text-yellow-500 text-xl font-semibold mb-1" >
            EDUCATION
          </h2>
          <div className="space-y-4">
            {EduInfo.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <h4 className="text-lg font-semibold">
                    {edu.degree || "Degree"}, {edu.institute || "Institution"}
                  </h4>
                  <span className="text-gray-700">
                    {DateTime.fromISO(edu.startdate, { setZone: true }).toFormat('MMMM dd, yyyy')} - {DateTime.fromISO(edu.enddate, { setZone: true }).toFormat('MMMM dd, yyyy')}
                  </span>
                </div>
                <ul className="list-none list-inside text-gray-700">
                  <li><span className="font-medium">Field of Study:</span> {edu.fieldofstudy || "Field of Study"}</li>
                  <li><span className="font-medium">Percentage:</span> {edu.percentage || "Percentage"}</li>
                  <li><span className="font-medium">Qualification:</span> {edu.qualification || "Qualification"}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      <hr className="my-2" />

      {/* Work Experience */}
      {employmentInfo && employmentInfo.length > 0 && (
        <div className="mb-4 mx-2">
          <h2 className="text-yellow-500 text-xl font-semibold mb-1" >
            WORK EXPERIENCE
          </h2>
          <div className="space-y-4">
            {employmentInfo.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <h4 className="text-lg font-semibold">
                    {exp.position || "Position"}, {exp.orgname || "Organization"}
                  </h4>
                  <span className="text-gray-700">
                    {DateTime.fromISO(exp.startdate, { setZone: true }).toFormat('MMMM dd, yyyy')} - {DateTime.fromISO(exp.enddate, { setZone: true }).toFormat('MMMM dd, yyyy')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <hr className="my-2" />

      {/* Languages */}
      {LangInfo && LangInfo.length > 0 && (
        <div className="mx-2">
          <h2 className="text-yellow-500 text-xl font-semibold mb-1" >
            LANGUAGES
          </h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 border-gray-300 p-2 text-left">Language</th>
                <th className="border-b-2 border-gray-300 p-2 text-left">Proficiency</th>
              </tr>
            </thead>
            <tbody>
              {LangInfo.map((lang, index) => (
                <tr key={index}>
                  <td className="border-b border-gray-300 p-2">{lang.lan || "Language"}</td>
                  <td className="border-b border-gray-300 p-2">{lang.proficiency || "Proficiency"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Resume2;
