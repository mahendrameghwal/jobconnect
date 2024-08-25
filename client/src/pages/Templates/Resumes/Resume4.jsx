import { AiOutlineMail, AiFillLinkedin } from 'react-icons/ai';
import { BsFillPhoneFill } from 'react-icons/bs';
import { ImLocation2 } from 'react-icons/im';
import { DateTime } from 'luxon';

const Resume4 = ({ PersonalInfo, Skillinfo, employmentInfo, EduInfo, ProjectInfo, LangInfo}) => {
  return (
    <div className="border-2 bg-white border-black w-full mx-auto my-2 font-sans text-base">
      {/* Main Info */}
      <div className="my-5 px-2">
        {PersonalInfo.fullname && <h2 className="text-2xl font-bold">{PersonalInfo.fullname}</h2>}
        {PersonalInfo.summary && (
          <p className="mt-2 leading-relaxed">
            {PersonalInfo.summary}
          </p>
        )}
      </div>
      <hr />

      {/* Contact Details */}
      <div className="bg-gray-700 text-white py-1">
        <div className="flex justify-center px-2 space-x-8">
          {PersonalInfo.email && <span className='flex items-center gap-x-1 text-sm'><AiOutlineMail /> {PersonalInfo.email}</span>}
          {PersonalInfo.phone && <span className='flex items-center gap-x-1 text-sm'><BsFillPhoneFill /> {PersonalInfo.phone}</span>}
          {PersonalInfo.city && <span className='flex items-center gap-x-1 text-sm'><ImLocation2 /> {PersonalInfo.city}</span>}
        </div>
      </div>

      {/* Skills */}
      {Array.isArray(Skillinfo) && Skillinfo.length > 0  && (
        <div className="my-2 px-2">
          <h2 className="text-xl font-bold">Skills</h2>
          <div className="flex flex-wrap  gap-x-8 mt-2">
            {Array.isArray(Skillinfo) && Skillinfo.map((skill, index) => (
              <span key={index} className=" px-2 ">{skill.name}</span>
            ))}
          </div>
        </div>                                                                                                                                 
      )}

      {/* Work Experience */}
      {Array.isArray(employmentInfo) && employmentInfo.length > 0 && (
        <div className="my-10 px-2">
          <h2 className="text-xl font-bold">Work Experience</h2>
          {employmentInfo.map((exp, index) => (
            <div key={index} className="mt-4 flex items-center " >
              <h3 className="text-lg font-semibold">{exp.position}</h3>&nbsp;|&nbsp;<h3 className="text-lg font-semibold">{exp.orgname}</h3>
              <ul className="list-disc ml-5 mt-2">
                <div className="flex  ">
                  <span>{DateTime.fromISO(exp.startdate, { setZone: true }).toFormat('MMM yyyy')} - {DateTime.fromISO(exp.enddate, { setZone: true }).toFormat('MMM yyyy')}</span>
    
                </div>
              
              </ul>
            </div>
          ))}
        </div>
      )}


      {ProjectInfo && ProjectInfo.length > 0 && (
        <div className="my-10 px-2">
        <h2 className="text-xl font-bold">Project</h2>
          <div className=" py-2">
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
      {Array.isArray(EduInfo) && EduInfo.length > 0 && (
        <div className="my-10 px-2">
          <h3 className="text-lg font-semibold">Education</h3>
          {EduInfo.map((edu, index) => (
            <div key={index} className="mt-4 flex items-center " >
            <h3 className="text-lg font-semibold">{edu.degree} {edu?.fieldofstudy &&  (edu.fieldofstudy)}</h3>&nbsp;|&nbsp;<h3 className="text-lg font-semibold">{edu.institute}</h3>
            <ul className="list-disc ml-5 mt-2">
              <div className="flex  ">
                <span>{DateTime.fromISO(edu.startdate, { setZone: true }).toFormat('MMM yyyy')} - {DateTime.fromISO(edu.enddate, { setZone: true }).toFormat('MMM yyyy')}</span>
              </div>
            
            </ul>
          </div>
          ))}
        </div>
      )}

  

      {/* Languages */}
      {Array.isArray(LangInfo) && LangInfo.length > 0 && (
        <div className="my-10 px-2">
          <h3 className="text-lg font-semibold">Languages</h3>
          {LangInfo.map((lang, index) => (
            <div key={index} className="mt-2">
            <ul className="list-disc ml-2">
              <div className="flex border-b border-gray-300 justify-between pb-1">
                <span>{lang.lan}</span>
                <span>{lang.proficiency}</span>
              </div>
            </ul>
          </div>
          
          ))}
        </div>
      )}
    </div>
  );
};

export default Resume4;
