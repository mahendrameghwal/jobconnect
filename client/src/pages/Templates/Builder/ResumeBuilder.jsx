import React, {useState,useCallback, useEffect,lazy} from 'react';
import { useParams } from 'react-router-dom';
import ResumeEditor from '../Editor/ResumeEditor';
import ResumePreview from '../Preview/ResumePreview';
import { useCurrentUserQuery, useMeQuery } from '../../../../app/api/authApi';
import PDFbutton from './generatePDF';
import toast from 'react-hot-toast';
import axios from "axios"
import 'jspdf-autotable';
import html2pdf from 'html2pdf.js';
const BuySubscriptionButton = lazy(() => import("./BuySubscriptionButton"));

const ResumeBuilder = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const { isError, data: resumeData, error, isLoading } = useMeQuery();
  const { templateId } = useParams();
  const [PersonalInfo, setPersonalInfo] = useState({
    fullname: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    summary: ''
  });
  const [Skillinfo,setSkillinfo] = useState(resumeData?.skills || []);
  const [employmentInfo,setemploymentInfo] = useState(resumeData?.employment || []);
  const [EduInfo,setEduInfo] = useState(resumeData?.education || []);
  const [ProjectInfo,setProjectInfo] = useState(resumeData?.project || []);
  const [LangInfo,setLangInfo] = useState(resumeData?.language || []);

  const {data:currentuser}  = useCurrentUserQuery()
  // console.log(currentuser);


  // intial set input for personal information
  useEffect(() => {
    if (resumeData) {
      setPersonalInfo({
        fullname: resumeData.fullname || '',
        email: resumeData.email || '',
        phone: resumeData.phone || '',
        country: resumeData.country || '',
        state: resumeData.state || '',
        city: resumeData.city || '',
        summary: resumeData.summary || ''
      });
      setSkillinfo(resumeData?.skills);
      setemploymentInfo(resumeData?.employment);
      setEduInfo(resumeData?.education)
      setProjectInfo(resumeData?.project)
      setLangInfo(resumeData?.language)
    }
  }, [resumeData]);




  // change personal information
    const handlePersonalInfochange = (e) => {
     
      const { name, value } = e.target;
      setPersonalInfo(prevData => ({
        ...prevData,
        [name]: value
      }));
    };
   


  // for skill 
  const HandleDeleteSkill = useCallback((index) => {
    if (Skillinfo.length === 1) {
      toast.error('At least one skill is required');
      return;
    }
    const updatedSkills = Skillinfo.filter((_, i) => i !== index);
    setSkillinfo(updatedSkills);
  },[Skillinfo])



  const handleSkillInputChange = useCallback(
    (index, e) => {
      const { name, value } = e.target;
      setSkillinfo(prevSkills => {
        const updatedSkills = [...prevSkills];
        updatedSkills[index] = { ...updatedSkills[index], [name]: value };
        return updatedSkills;
      });
    },[Skillinfo]);

  const handleAddSkill = useCallback(() => {
    setSkillinfo([...Skillinfo, {name: '' }]);
  },[Skillinfo])



//  for employment 
 const HandleDeleteEmployment = useCallback((index) => {
  if (employmentInfo.length === 1) {
    toast.error('At least one employment required');
    return;
  }
  const updatedemployment= employmentInfo.filter((_, i) => i !== index);
  setemploymentInfo(updatedemployment);
},[employmentInfo]);



const handleEmploymentInputChange = useCallback((index, e) => {
    const { name, value } = e.target;
    setemploymentInfo(prevEmp => {
      const updatedemployment = [...prevEmp];
      updatedemployment[index] = { ...updatedemployment[index], [name]: value };
      return updatedemployment;
    });
  },[employmentInfo])


const handleAddEmployment = useCallback(() => {
  setemploymentInfo([...employmentInfo, { 
    position: '', 
    orgname: '', 
    emptype:'',
    startdate:"",
    enddate:""
  }]);
},[employmentInfo])




// for education 
const HandleDeleteEdu = useCallback((index) => {
  if (EduInfo.length === 1) {
    toast.error('At least one education is required');
    return;
  }
  const updatedEduInfo= EduInfo.filter((_, i) => i !== index);
  setEduInfo(updatedEduInfo);
},[EduInfo]);



const handleEduInputChange = useCallback((index, e) => {
    const { name, value } = e.target;
    setEduInfo(prevEdu => {
      const updatedEdu = [...prevEdu];
      updatedEdu[index] = { ...updatedEdu[index], [name]: value };
      return updatedEdu;
    });
  },[EduInfo])


const handleAddEdu = useCallback(() => {
  setEduInfo([...EduInfo, { 
    degree: "",
enddate: "",
fieldofstudy: "",
institute: "",
percentage:"",
qualification: "",
startdate:""


  }]);
},[EduInfo])



//for project
const HandleDeleteProject = useCallback((index) => {
  if (ProjectInfo.length === 1) {
    toast.error('At least one project is required');
    return;
  }
  const updatedProjectInfo= ProjectInfo.filter((_, i) => i !== index);
  setProjectInfo(updatedProjectInfo);
},[ProjectInfo]);



const handleProjectChange = useCallback((index, e) => {
    const { name, value } = e.target;
    setProjectInfo(prevProj => {
      const updatedProj= [...prevProj];
      updatedProj[index] = { ...updatedProj[index], [name]: value };
      return updatedProj;
    });
  },[ProjectInfo])

// onchange project skill
  const handleProjectSkill = useCallback((projIndex, skillIndex, e) => {
    const { value } = e.target;
    setProjectInfo(prevProj => {
      const updatedProj = [...prevProj];
      const updatedSkills = [...updatedProj[projIndex].projectskill];
      updatedSkills[skillIndex] = {
        ...updatedSkills[skillIndex],
        name: value
      };
      updatedProj[projIndex] = {
        ...updatedProj[projIndex],
        projectskill: updatedSkills
      };
      return updatedProj;
    });
  }, [setProjectInfo]);


  const ProjectaddSkill = useCallback((projIndex) => {
    setProjectInfo(prevProj => {
      const updatedProj = prevProj.map((project, index) => {
        if (index === projIndex) {
          return {
            ...project,
            projectskill: [...project.projectskill, { name: '' }]
          };
        }
        return project;
      });
      return updatedProj;
    });
  }, [setProjectInfo]);



const handleAddProject = useCallback(() => {
  setProjectInfo([...ProjectInfo, { 
      title: '',
      status: '',
      description: '',
      startdate:'',
      enddate: '',
      sourcelink: '',
      livelink: '',
      projectskill: [{name:""}]
  }]);
},[ProjectInfo])



const HandleLangDelete = useCallback((index) => {
  if (LangInfo.length === 1) {
    toast.error('At least one language is required');
    return;
  }
  const updatedLangInfo= LangInfo.filter((_, i) => i !== index);
  setLangInfo(updatedLangInfo);
},[LangInfo]);


//for language
const handleLangInputChange = useCallback((index, e) => {
    const { name, value } = e.target;
    setLangInfo(prevLang => {
      const updatedLang = [...prevLang];
      updatedLang[index] = { ...updatedLang[index], [name]: value };
      return updatedLang;
    });
  },[LangInfo])



  const handleAddLang = useCallback(() => {
    setLangInfo([...LangInfo, { lan: '', proficiency: ''}]);
  },[LangInfo])


  const handleInputChange = (e, section, index = null) => {
    const { name, value } = e.target;
  
    if (index !== null) {
      let updatedData = { ...resumeData };

      updatedData[section][index] = { ...updatedData[section][index], [name]: value };
    } else if (section === 'personal') {
      
      resumeData[name] = value;
    } else {
      let updatedData = { ...resumeData };

      updatedData[section] = { ...updatedData[section], [name]: value };
    }
  };


  const downloadPDF = async () => {
    try {
      const resumeContent = document.getElementById('resume-all').innerHTML;
  
      // Add the Tailwind CSS CDN link in the frontend
      const tailwindCSS = `<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">`;
      const fullHTML = `
        <html>
          <head>
            ${tailwindCSS}
          </head>
          <body>
            ${resumeContent}
          </body>
        </html>
      `;
  
      // Send the HTML content to the backend
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/candidate/generate-pdf`, { html: fullHTML }, {
        withCredentials: true
      });
  
      // Get the HTML from the response
      const { html } = response.data;
  
      // Generate the PDF using html2pdf.js with selectable text
      const element = document.createElement('div');
      element.innerHTML = html;
  
      const opt = {
        margin: 1,
        filename: `${PersonalInfo?.fullname}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2, // Adjust scale for better quality
          useCORS: true, // Enable CORS to load external stylesheets and images
          logging: true,
          letterRendering: true ,
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
  
      html2pdf().from(element).set(opt).save();
      toast.success("resume download successfully")
    } catch (error) {
     toast.error(error?.message?error.message:"something went wrong")
    }
  }
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className=" min-h-screen max-h-full  dark:bg-black  bg-gray-100 ">
      <div className="flex max-md:flex-col  flex-grow mt-2">
        <div className="w-full md:w-1/2 rounded-lg shadow-md">
          <ResumeEditor 
          resumeData={resumeData}
          PersonalInfo={PersonalInfo}
          handlePersonalInfochange={handlePersonalInfochange}
          handleInputChange={handleInputChange}
          setPersonalInfo={setPersonalInfo}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          handleAddSkill={handleAddSkill}
          HandleDeleteSkill={HandleDeleteSkill}
          handleSkillInputChange={handleSkillInputChange}
          Skillinfo={Skillinfo}
          handleEmploymentInputChange={handleEmploymentInputChange}
          handleAddEmployment={handleAddEmployment}
          HandleDeleteEmployment={HandleDeleteEmployment}
          employmentInfo={employmentInfo}
          HandleDeleteEdu={HandleDeleteEdu}
          handleEduInputChange={handleEduInputChange}
          handleAddEdu={handleAddEdu}
          EduInfo={EduInfo}
          HandleDeleteProject={HandleDeleteProject}
          handleProjectChange={handleProjectChange}
          handleAddProject={handleAddProject}
          ProjectInfo={ProjectInfo}
          handleProjectSkill={handleProjectSkill}
          ProjectaddSkill={ProjectaddSkill}
          LangInfo={LangInfo}
          handleLangInputChange={handleLangInputChange} 
          HandleLangDelete={HandleLangDelete}
          handleAddLang={handleAddLang}
          />
        </div>
        <div className=" w-full md:w-1/2 md:block p-2 bg-white dark:bg-gray-900/30 rounded-lg  max-md:m-1 ">
        
            <div className='flex justify-between'>
            <h2 className="text-2xl font-bold dark:text-white ">Resume Preview</h2>
            {
            currentuser && currentuser.currentSubscription && currentuser.currentSubscription.status==='ACTIVE'?<PDFbutton  downloadPDF={downloadPDF} />
            : <div className="flex justify-end">
    <BuySubscriptionButton/>
    </div>
            }
            
            </div>
        
          <ResumePreview
          PersonalInfo={PersonalInfo}
          Skillinfo={Skillinfo}
          employmentInfo={employmentInfo}
          templateId={templateId} 
          EduInfo={EduInfo}
          ProjectInfo={ProjectInfo}
         LangInfo={LangInfo}
           />
        </div>
      </div>
     
    </div>
  );
};

export default ResumeBuilder;