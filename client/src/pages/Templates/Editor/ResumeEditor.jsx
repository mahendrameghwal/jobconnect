import { Fragment } from "react";
import proficiency from "../../../data/proficiency"


const ResumeEditor = ({
  // resumeData,
  // handleInputChange,
  PersonalInfo,
  handlePersonalInfochange,
  activeSection,
  setActiveSection,
  handleAddSkill,
  HandleDeleteSkill,
  handleSkillInputChange,
  Skillinfo,
  handleEmploymentInputChange,
  handleAddEmployment,
  HandleDeleteEmployment,
  employmentInfo,
  HandleDeleteEdu,
  handleEduInputChange,
  handleAddEdu,
  EduInfo,
  HandleDeleteProject,
  handleProjectChange,
  handleAddProject,
  ProjectInfo,
  handleProjectSkill,
  ProjectaddSkill,
  LangInfo,
  handleLangInputChange,
  HandleLangDelete,
  handleAddLang
}) => {
  

  const renderPersonalInfo = () => (
    <div className="p-4 bg-gray-100 rounded-lg ">
      <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
      <input
        type="text"
        name="fullname"
        value={PersonalInfo?.fullname}
        onChange={handlePersonalInfochange}
        placeholder="Full Name"
        className="block w-full p-1 focus:ring-1 ring-blue-400 outline-none mb-2 border rounded"
      />
      <input
        type="text"
        name="email"
        value={PersonalInfo?.email}
        onChange={handlePersonalInfochange}
        placeholder="Email"
        className="block w-full p-1 focus:ring-1 ring-blue-400 outline-none mb-2 border rounded"
      />
      <input
        type="text"
        name="phone"
        value={PersonalInfo?.phone}
        onChange={handlePersonalInfochange}
        placeholder="Phone"
        className="block w-full p-1 focus:ring-1 ring-blue-400 outline-none mb-2 border rounded"
      />
      <input
        type="text"
        name="city"
        value={PersonalInfo?.city}
        onChange={handlePersonalInfochange}
        placeholder="City"
        className="block w-full p-1.5 focus:ring-1 ring-blue-400 outline-none mb-2 border rounded"
      />
      <input
        type="text"
        name="state"
        value={PersonalInfo?.state}
        onChange={handlePersonalInfochange}
        placeholder="State"
        className="block w-full p-1.5 focus:ring-1 ring-blue-400 outline-none mb-2 border rounded"
      />
      <input
        type="text"
        name="country"
        value={PersonalInfo?.country}
        onChange={handlePersonalInfochange}
        placeholder="Country"
        className="block w-full p-1.5 focus:ring-1 ring-blue-400 outline-none mb-2 border rounded"
      />
      <textarea
        name="summary"
        value={PersonalInfo?.summary}
        onChange={handlePersonalInfochange}
        placeholder="Professional Summary"
        className="block w-full p-1.5 focus:ring-1 ring-blue-400 outline-none mb-2 border rounded h-32"
      />
    </div>
  );

  const renderSkills = () => (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Skills</h3>
      {Skillinfo?.map((skill, index) => (
        <div key={index} className="mb-4 p-4 bg-white border rounded shadow-sm">
         
          <input
            type="text"
            name="name"
            value={skill?.name}
            onChange={(e)=>handleSkillInputChange(index,e)}
            placeholder="Skill Name"
            className="block w-full p-1 focus:ring-1 ring-blue-400 outline-none mb-1 border rounded"
          />
          <button
          onClick={()=>HandleDeleteSkill(index)}
            className=" text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={handleAddSkill}
        className="py-1 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Skill
      </button>
    </div>
  );

  const renderEmployment = () => (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Employment History</h3>
      {employmentInfo && Array.isArray(employmentInfo) && employmentInfo.map((job, index) => (
        <div key={index} className="mb-4 p-4 bg-white border rounded shadow-sm">
          <input
            type="text"
            name="position"
            value={job.position}
            onChange={(e)=>handleEmploymentInputChange(index,e)}
            placeholder="Position"
            className="block w-full p-2 mb-2 border rounded focus:ring-1 ring-blue-400 outline-none"
          />
          <input
            type="text"
            name="orgname"
            value={job.orgname}
            onChange={(e)=>handleEmploymentInputChange(index,e)}
            placeholder="Organization Name"
            className="block w-full p-2 mb-2 border rounded focus:ring-1 ring-blue-400 outline-none "
          />
          <input
            type="text"
            name="emptype"
            value={job.emptype}
            onChange={(e)=>handleEmploymentInputChange(index,e)}
            placeholder="Employment Type"
            className="block w-full p-2 mb-2 border rounded focus:ring-1 ring-blue-400 outline-none"
          />
          <input
            type="date"
            name="startdate"
            value={job.startdate.split('T')[0]}
            onChange={(e)=>handleEmploymentInputChange(index,e)}
            className="block w-full p-2 mb-2 border rounded focus:ring-1 ring-blue-400 outline-none"
          />
          <input
            type="date"
            name="enddate"
            value={job.enddate.split('T')[0]}
            onChange={(e)=>handleEmploymentInputChange(index,e)}
            className="block w-full p-2 mb-2 border rounded focus:ring-1 ring-blue-400 outline-none"
          />
          <button
            onClick={()=>HandleDeleteEmployment(index)}
            className="mt-2 text-red-500 hover:text-red-700 focus:ring-1 ring-blue-400 outline-none"
          >
            Remove
          </button>
        </div>
      ))}
      <button
       onClick={handleAddEmployment}
        className="py-1 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Job
      </button>
    </div>
  );


  const renderEducation = () => (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Education</h3>
      {EduInfo && Array.isArray(EduInfo) &&  EduInfo.map((edu, index) => (
        <div key={index} className="mb-4 p-4 bg-white border rounded shadow-sm">
          <input
            type="text"
            name="institute"
            value={edu.institute}
                      onChange={(e)=>handleEduInputChange(index,e)}

            placeholder="Institute"
            className="block w-full p-2 focus:ring-1 ring-blue-400 outline-none mb-2 border rounded"
          />
          <input
            type="text"
            name="degree"
            value={edu.degree}
                      onChange={(e)=>handleEduInputChange(index,e)}

            placeholder="Degree"
            className="block w-full p-2 focus:ring-1 ring-blue-400 outline-none mb-2 border rounded"
          />
          <input
            type="text"
            name="fieldofstudy"
            value={edu.fieldofstudy}
                      onChange={(e)=>handleEduInputChange(index,e)}

            placeholder="Field of Study"
            className="block w-full p-2 focus:ring-1 ring-blue-400 outline-none mb-2 border rounded"
          />
          <input
            type="date"
            name="startdate"
            value={edu.startdate.split('T')[0]}
              onChange={(e)=>handleEduInputChange(index,e)}

            className="block w-full p-2 focus:ring-1 ring-blue-400 outline-none mb-2 border rounded"
          />
          <input
            type="date"
            name="enddate"
            value={edu.enddate.split('T')[0]}
                      onChange={(e)=>handleEduInputChange(index,e)}

            className="block w-full p-2 focus:ring-1 ring-blue-400 outline-none mb-2 border rounded"
          />
          <input
            type="text"
            name="percentage"
            value={edu.percentage}
                      onChange={(e)=>handleEduInputChange(index,e)}

            placeholder="Percentage/GPA"
            className="block w-full p-2 focus:ring-1 ring-blue-400 outline-none mb-2 border rounded"
          />
          <button
           onClick={()=>HandleDeleteEdu(index)}
            className="mt-2 text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ))}
      <button
   onClick={handleAddEdu}
        className="py-1 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Education
      </button>
    </div>
  );

  const renderProjects = () => (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Projects</h3>
     {ProjectInfo && Array.isArray(ProjectInfo) &&  ProjectInfo.map((proj, index) => (
        <div key={index} className="mb-4 p-4 bg-white border rounded shadow-sm">
          <input
            type="text"
            name="title"
            value={proj.title}
            onChange={(e)=>handleProjectChange(index,e)}
            placeholder="Project Title"
            className="block w-full p-2 focus:ring-1 ring-blue-400 outline-none mb-2 border rounded"
          />
         

          <select        onChange={(e)=>handleProjectChange(index,e)} name="status" value={proj.status} className="block  w-full p-2 focus:ring-1 ring-blue-400 outline-none mb-2 border rounded">
<option  value="in progress">in progress</option>
<option value="finished">finished</option>

</select>
          <textarea
            name="description"
            value={proj.description}
            onChange={(e)=>handleProjectChange(index,e)}
            placeholder="Description"
            className="block w-full p-2 mb-2 focus:ring-1 ring-blue-400 outline-none border rounded h-32"
          />
          <input
            type="date"
            name="startdate"
            value={proj.startdate.split('T')[0]}
            onChange={(e)=>handleProjectChange(index,e)}
            className="block w-full p-2 mb-2 border rounded focus:ring-1 ring-blue-400 outline-none"
          />
          <input
            type="date"
            name="enddate"
            value={proj.enddate.split('T')[0]}
            onChange={(e)=>handleProjectChange(index,e)}
            className="block w-full p-2 mb-2 border rounded focus:ring-1 ring-blue-400 outline-none"
          />
       
           
    {proj?.projectskill.map((skill, ind) => (

  <input
    key={ind} 
    type="text"
    name={`skill-${ind}`} 
    value={skill?.name || ''} 
    onChange={(e) => handleProjectSkill(index, ind, e)} 
    placeholder="Skill"
    className="block w-full p-2 mb-2 border focus:ring-1 ring-blue-400 outline-none rounded"
  />


))}

 <section className='flex justify-start flex-wrap gap-x-5 items-center'>
  <button
  type="button"
  onClick={() => ProjectaddSkill(index)} // Call addSkill with the current project index
  className=" py-1 px-2 bg-blue-500 text-white rounded focus:ring-1 ring-blue-400 outline-none"
>
  Add Skill
</button>



          <button
          onClick={()=>HandleDeleteProject(index)}
            className=" text-red-500 hover:text-red-700"
          >
            Remove
          </button>
 </section>
        </div>
      ))}
      <button
        onClick={handleAddProject}
        className="py-1 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Project
      </button>
    </div>
  );

  const renderLanguages = () => (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold mb-4">Languages</h3>
    {LangInfo?.map((lang, index) => (
      <div key={index} className="mb-4 p-4 bg-white border rounded shadow-sm">
        <input
          type="text"
          name="lan"
    
          value={lang.lan}
            onChange={(e)=>handleLangInputChange(index,e)}

          placeholder="Language"
          className="block w-full p-2 mb-2 border rounded focus:ring-1 ring-blue-400 outline-none"
        />
        <select
          name="proficiency"
          value={lang.proficiency}
           onChange={(e)=>handleLangInputChange(index,e)}
          className="block w-full p-2 mb-2 border rounded focus:ring-1 ring-blue-400 outline-none"
        >
          <option value="" disabled>Select Proficiency</option>
          {proficiency?.map((level) => (
            <option key={level.id} value={level.level}>
              {level.level}
            </option>
          ))}
        </select>
        <button
            onClick={()=>HandleLangDelete(index)}
          className="mt-2 text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>
    ))}
    <button
      onClick={handleAddLang}
      className="py-1 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Add Language
    </button>
  </div>

  );

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg ">
      <h2 className="text-2xl font-bold mb-6">Edit Your Resume</h2>
     <div className="flex flex-wrap gap-2 border-b border-gray-200">
  <button
    onClick={() => setActiveSection('personal')}
    className={`py-2 px-4 font-medium text-sm focus:outline-none ${
      activeSection === 'personal'
        ? 'text-blue-600 border-b-2 border-blue-600 '
        : 'text-gray-500 hover:text-gray-700'
    }`}
  >
    Personal
  </button>
  <button
    onClick={() => setActiveSection('skills')}
    className={`py-2 px-4 font-medium text-sm focus:outline-none ${
      activeSection === 'skills'
        ? 'text-blue-600 border-b-2 border-blue-600 '
        : 'text-gray-500 hover:text-gray-700'
    }`}
  >
    Skills
  </button>
  <button
    onClick={() => setActiveSection('employment')}
    className={`py-2 px-4 font-medium text-sm focus:outline-none ${
      activeSection === 'employment'
        ? 'text-blue-600 border-b-2 border-blue-600 '
        : 'text-gray-500 hover:text-gray-700'
    }`}
  >
    Employment
  </button>
  <button
    onClick={() => setActiveSection('education')}
    className={`py-2 px-4 font-medium text-sm focus:outline-none ${
      activeSection === 'education'
        ? 'text-blue-600 border-b-2 border-blue-600 '
        : 'text-gray-500 hover:text-gray-700'
    }`}
  >
    Education
  </button>
  <button
    onClick={() => setActiveSection('projects')}
    className={`py-2 px-4 font-medium text-sm focus:outline-none ${
      activeSection === 'projects'
        ? 'text-blue-600 border-b-2 border-blue-600 '
        : 'text-gray-500 hover:text-gray-700'
    }`}
  >
    Projects
  </button>
  <button
    onClick={() => setActiveSection('languages')}
    className={`py-2 px-4 font-medium text-sm focus:outline-none ${
      activeSection === 'languages'
        ? 'text-blue-600 border-b-2 border-blue-600 '
        : 'text-gray-500 hover:text-gray-700'
    }`}
  >
    Languages
  </button>
</div>
      <div className="active-section">
        {activeSection === 'personal' && renderPersonalInfo()}
        {activeSection === 'skills' && renderSkills()}
        {activeSection === 'employment' && renderEmployment()}
        {activeSection === 'education' && renderEducation()}
        {activeSection === 'projects' && renderProjects()}
       {activeSection === 'languages' && renderLanguages()}
      </div>
    </div>
  );
};

export default ResumeEditor;
