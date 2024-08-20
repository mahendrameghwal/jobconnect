import React from "react";
import { ImMobile } from "react-icons/im";
import { TfiEmail } from "react-icons/tfi";
import { TbWorld } from "react-icons/tb";
import { GrLocation } from "react-icons/gr";
import { DateTime } from 'luxon';
import { GiModernCity } from "react-icons/gi"

const Resume3 = ({ PersonalInfo, Skillinfo, employmentInfo, EduInfo, ProjectInfo, LangInfo }) => {
  return (
    <div className="border border-gray-300 font-sans mx-auto my-2 bg-white">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold">
          {PersonalInfo?.fullname || "Your Name"}
        </h1>
       
      </div>
      <hr className="bg-gray-600 h-0.5" />

      {/* Contact and Expertise Section */}
      <div className="flex flex-wrap gap-8 mt-6 mx-4">
        {/* Contact */}
        {PersonalInfo && (
          <div className="w-full md:w-1/3 mb-6">
            <p className="text-xl font-bold mb-2">CONTACT</p>
            <div className="space-y-2">
              {PersonalInfo.phone && (
                <p className="flex items-center">
                  <ImMobile className="mr-2 text-xl" />
                  <span>{PersonalInfo.phone}</span>
                </p>
              )}
              {PersonalInfo.email && (
                <p className="flex items-center">
                  <TfiEmail className="mr-2 text-xl" />
                  <span>{PersonalInfo.email}</span>
                </p>
              )}
              {PersonalInfo.city && (
                <p className="flex items-center">
                  <GiModernCity className="mr-2 text-xl" />
                  <span>{PersonalInfo.city}</span>  ({PersonalInfo.state && <span>{PersonalInfo.state}</span>}) 
                </p>
              )}
            </div>
            <hr className="bg-gray-300 mt-4" />
          </div>
        )}

        {/* Expertise */}
        {Skillinfo && Skillinfo.length > 0 && (
          <div className="w-full md:w-1/3 mb-6">
            <p className="text-xl font-bold mb-2">SKills</p>
            <ul className="list-none flex gap-x-3 items-center list-inside">
              <li>
                {Skillinfo.map(skill => skill.name).join(', ')}
              </li>
            </ul>
           
          </div>
        )}
      
      </div>

      {/* Work Experience Section */}
      {employmentInfo && employmentInfo.length > 0 && (
        <div className="mx-4 mt-6">
          <p className="text-xl font-bold mb-4">WORK EXPERIENCE</p>
          <div className="space-y-6">
            {employmentInfo.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <h3 className="text-lg font-semibold">{exp.position || "Position"}, {exp.orgname || "Organization"}</h3>
                  <span className="text-gray-700">
                    {DateTime.fromISO(exp.startdate).toFormat('MMMM yyyy')} - {DateTime.fromISO(exp.enddate).toFormat('MMMM yyyy')}
                  </span>
                </div>
                <ul className="list-disc list-inside pl-5 space-y-2 text-gray-800">
                  {exp.responsibilities?.map((resp, ind) => (
                    <li key={ind}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {EduInfo && EduInfo.length > 0 && (
        <div className="mx-4 mt-6">
          <p className="text-xl font-bold mb-4">EDUCATION</p>
          <div className="space-y-6">
            {EduInfo.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <h3 className="text-lg font-semibold">
                    {edu.degree || "Degree"}, {edu.institution || "Institution"}
                  </h3>
                  <span className="text-gray-700">
                    {DateTime.fromISO(edu.startdate).toFormat('MMMM yyyy')} - {DateTime.fromISO(edu.enddate).toFormat('MMMM yyyy')}
                  </span>
                </div>
                <p className="text-gray-700">Field of Study: {edu.fieldofstudy || "Field of Study"}</p>
                <p className="text-gray-700">Percentage: {edu.percentage || "Percentage"}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {ProjectInfo && ProjectInfo.length > 0 && (
        <div className="mx-4 mt-6">
          <p className="text-xl font-bold mb-4">PROJECTS</p>
          <div className="space-y-6">
            {ProjectInfo.map((proj, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <h3 className="text-lg font-semibold">
                    {proj.title || "Project Title"}
                  </h3>
                  <span className="text-gray-700">
                    {DateTime.fromISO(proj.startdate).toFormat('MMMM yyyy')} - {DateTime.fromISO(proj.enddate).toFormat('MMMM yyyy')}
                  </span>
                </div>
                <p className="text-gray-700">Description: {proj.description || "Project Description"}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages Section */}
      {LangInfo && LangInfo.length > 0 && (
        <div className="mx-4 mt-6">
          <p className="text-xl font-bold mb-4">LANGUAGES</p>
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

export default Resume3;
