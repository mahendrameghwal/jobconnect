
import useStickyHeader from "../../../hooks/Usesticky";
import { useSingleCandidateQuery, useUpdateCandidateProfileMutation } from "../../../app/api/CandidateApi";
import { Link, useParams } from "react-router-dom";
import { Fragment, lazy, useRef, useState } from "react";
import { format, formatDistanceToNow } from 'date-fns';
import { FiEdit } from "react-icons/fi";
import { toggleBodyScroll } from "../../utils/ToggleScroll";
import { VscLocation } from "react-icons/vsc";
import { PiBabyLight } from "react-icons/pi";
import { MdOutlineWorkOutline } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { CiTimer, CiUser } from "react-icons/ci";
import { BiRupee } from "react-icons/bi";
import { GrStatusGood } from "react-icons/gr";
import { TbPdf } from "react-icons/tb";


const BasicDetailPopup = lazy(() => import("./components/Popup/BasicDetailPopup"));
const ChangeEmploymentPopup = lazy(() => import("./components/Popup/ChangeEmploymentPopup"));
const LanguagePopup = lazy(() => import("./components/Popup/LanguagePopup"));
const SummaryPopup = lazy(() => import("./components/Popup/SummaryPopup"));
const KeySkillsPopup = lazy(() => import("./components/Popup/KeySkillsPopup"));
const EmploymentPopup = lazy(() => import("./components/Popup/EmploymentPopup"));
const ChangeProjectPopup = lazy(() => import("./components/Popup/ChangeprojectPopup"));
const AddprojectPopup = lazy(() => import("./components/Popup/AddprojectPopup"));
const AddEducationPopup = lazy(() => import("./components/Popup/AddEducationPopup"));
const ChangeEducationPopup = lazy(() => import("./components/Popup/ChangeEducationPopup"));
const UpdateSocialPopup = lazy(() => import("./components/Popup/UpdateSocial"));
const UpdateResumePopup = lazy(() => import("./components/Popup/AddresumePopup"));




import { MdDeleteForever  } from "react-icons/md";
import SidebarLink from "./components/SidebarLink";
import EditMode from "../../components/EditMode";
// educationId


const UpdateProfile = () => {
  
  const {id}=useParams()
  const sectionRefs = useRef({});
  
  const registerRef = (id) => (el) => {
    if (el) sectionRefs.current[id] = el;
  };
  
  const focusSection = (id) => {
    const ref = sectionRefs.current[id];
    if (ref) {
      ref.focus();
      const offset = 90;
      const elementPosition = ref.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };
  
  
  
  const [UpdateCandidateProfile]= useUpdateCandidateProfileMutation() 
  const [activePopup,SetactivePopup]= useState(null)
  const {isError,data,isSuccess,error,isLoading}= useSingleCandidateQuery(id)
  const isSticky= useStickyHeader()
  const [ShowPopup, setPopup]=useState(false)
  const [ChangeEmp, setChangeEmp]=useState(null)
  const [ChangeProject, setChangeProject]=useState(null)
  const [ChangeEdu, setChangeEdu]=useState(null)
  const [isEditMode, setIsEditMode] = useState(false);

  

 

const togglePopup = (activePopupName) =>{
  setPopup(!ShowPopup);
  SetactivePopup(activePopupName)

}
toggleBodyScroll(ShowPopup);




if(isLoading){
  return(
    <div  className={` min-h-screen flex justify-center items-center max-h-full `}>
    <div className="flex flex-row gap-2 items-center justify-center">
    <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
    <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
    <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
    </div>
    </div>
  )
}
if(isError){
  error && error.data && error.data.message 
  return (
    <div className="min-h-screen flex items-center justify-center ">
    <div className="text-center justify-center flex flex-col">
    <h1 className="bg-transparent uppercase text-gray-700 ">{error.data.message}</h1>
    <Link  to='/' title="Go to home" className="bg-transparent uppercase m-2 text-gray-700  rounded "  > 
  
    </Link>
      </div>
      </div>
    )
  }
  const {Permisson,resume,salary,currentempstatus,project,email,avtar,empstatus,fullname,phone,gender,noticeperiod,city,state,social,createdAt, country,education,summary,skills,employment,language}= data ; 



    const ChangeExistingEmployment = (i)=>{
      togglePopup('employmentchange')
      setChangeEmp(i)
    }
    const ChangeExistingProject = (i)=>{
      
      togglePopup('projectchange')
      setChangeProject(i)
    }

    const ChangeExistingEducation = (i)=>{
     
      togglePopup('educationchange')
      setChangeEdu(i)
    }

    const DeleteEmployment = async (EmpId)=>{
      if(EmpId) {
        await UpdateCandidateProfile({section:"employment",action:"remove",itemId:EmpId})
      }
    }
    

    const DeleteProject = async (projectId)=>{
      if(projectId) {
        
        await UpdateCandidateProfile({section:"project",action:"remove",itemId:projectId})
      }
    }
    const DeleteEducation = async (edID)=>{
      if(edID) {
        
        await UpdateCandidateProfile({section:"education",action:"remove",itemId:edID})
      }
    }



   const handleToggle = () => {
    setIsEditMode((prev)=>!prev);
  };
  
    
  return (
  <div
  className={` ${ ShowPopup ? '!select-none' : ''} min-h-screen relative bg-gray-400 bg-opacity-10 max-h-full p-2`}
>
  {
    activePopup==='profileInfo' && <BasicDetailPopup  salary={salary}
    email={email} country={country} state={state} city={city} phone={phone} gender={gender} 
    noticeperiod={noticeperiod}
    currentempstatus={currentempstatus} empstatus={empstatus}
    fullname={fullname}  togglePopup={togglePopup}/>
  }
{
  activePopup === 'summary' && <SummaryPopup summary={summary}  togglePopup={togglePopup}/>
}

{
  activePopup === 'skills' && <KeySkillsPopup skills={skills}  togglePopup={togglePopup}/>
}
{
  activePopup === 'employment' && <EmploymentPopup   togglePopup={togglePopup}/>

}
{
  activePopup === 'employmentchange' && <ChangeEmploymentPopup employment={employment[ChangeEmp]}  togglePopup={togglePopup}  />
}

{
  activePopup === 'addproject' && <AddprojectPopup togglePopup={togglePopup} />
}
{
  activePopup === 'projectchange' && <ChangeProjectPopup  project={project[ChangeProject]} togglePopup={togglePopup} />
}
{
  activePopup === 'addeducation' && <AddEducationPopup togglePopup={togglePopup} />
  
}
{
  activePopup === 'educationchange' && <ChangeEducationPopup education={education[ChangeEdu]}  togglePopup={togglePopup}  />
}
{
  activePopup === 'updatesocial' && <UpdateSocialPopup social={social}  togglePopup={togglePopup}  />
}
{
  activePopup === 'language' && <LanguagePopup languagedata={language}  togglePopup={togglePopup}  />
}
{
  activePopup === 'addnewresume' && <UpdateResumePopup resume={resume}  togglePopup={togglePopup}  />
}
  <div className="w-3/4 max-md:w-full mx-auto mt-6  max-md:mt-2   p-2  ">
{
  Permisson &&   <div className="flex justify-end items-center gap-x-3  p-4">
  <EditMode isChecked={isEditMode} onToggle={handleToggle} />
  <p className="ml-4 dark:text-white text-sm font-semibold">{isEditMode ? 'Edit Mode On' : 'Edit Mode Off'}</p>
  <Link to='/template' type="button" class="py-1 px-5 max-md:py-0.5 max-md:px-2 me-2 text-base font-normal text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-400 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">Build Your CV</Link>
</div>
}
    {/* basic information */}
    <div  ref={registerRef('profileintro')}
     className="rounded-2xl dark:bg-gray-900/95  relative w-full shadow-md mb-5 bg-white px-4 py-2">
    {
      empstatus && (
        <span className="inline-flex absolute top-0 max-md:top-0.5 max-md:left-0.5  left-0 items-center tracking-wider font-medium border justify-center rounded-sm bg-emerald-100 px-2.5 py-0.5 text-emerald-800 dark:border-none dark:bg-emerald-200/90 dark:text-emerald-900">
    <p className="whitespace-nowrap text-sm">{empstatus}</p>
</span>
      )
    }
    <section className="flex   max-md:pt-6 max-md:flex-col gap-x-4 max-lg:gap-x-1">
   {
    avtar ? (
      <figure className="w-1/4    max-md:w-full max-md:justify-start flex justify-center items-center">
      <img  className="h-32 w-32 max-md:h-24 max-md:w-24  drop-shadow-md rounded-full" src={avtar} alt="avatar" />
      </figure>
    ):(  <figure className="w-1/4    max-md:w-full max-md:justify-start flex justify-center items-center">
      <CiUser  className="h-28 w-28 max-md:h-24 max-md:w-24  drop-shadow-md rounded-full" src={avtar} alt="" />
      </figure>)
   }
    <section className="w-3/4   max-md:w-full max-md:my-2">
    <div className="flex  items-center justify-end">
    {
      Permisson && isEditMode &&
      <FiEdit onClick={()=>togglePopup('profileInfo')} className="h-4 dark:text-gray-100 max-md:absolute max-md:top-3 max-md:right-3 cursor-pointer max-lg:my-0 my-2"  />    
    }
    </div>
    <div className="flex  flex-col w-full">
  {
    fullname && (
      <p className=" text-xl dark:text-white max-md:text-lg font-semibold tracking-wide">{fullname}</p>
    )
  }
    

    <div className=" w-full flex my-5 border-t border-t-gray-300 max-lg:flex-col  max-md:my-3 drop-shadow-md  p-2 "> 
    <section className="px-2 max-md:px-0 max-md:w-full w-1/2  "> 
   <div className="flex-col items-center">
   <span className="flex w-full dark:text-gray-300 flex-wrap text-sm my-2 max-lg:my-1.5 items-center gap-x-2"><VscLocation className="h-5 w-5 "  />
   {
    city && (<span>{city}</span>)
   }
   {
    state && (<span>{state}</span>)
   }
   {
    country && (<span>({country})</span>)
   }
   </span>
   <span className="flex dark:text-gray-300 text-sm my-2 max-lg:my-1.5 items-center gap-x-2"><MdOutlineWorkOutline className="h-5 w-5 "  /><p>0 year 6 Months</p></span>
   <span className="flex dark:text-gray-300 text-sm my-2 max-lg:my-1.5 items-center gap-x-2"><PiBabyLight className="h-5 w-5  " />{gender}</span>
   <span className="flex dark:text-gray-300 text-sm my-2 max-lg:my-1.5 items-center gap-x-2"><GrStatusGood className="h-5 w-5  " />{currentempstatus}</span>
   <span className="flex dark:text-gray-300 text-sm my-2 max-lg:my-1.5 items-center gap-x-2"><BiRupee className="h-5 w-5  " />{salary}</span>

   
   </div>
    </section>
  
    <section className="border-l max-lg:border-none border-l-slate-300  w-1/2 max-md:w-full "> 
   <div className="flex-col items-center"></div>
   {
    phone && (
      <span className="dark:text-gray-300 flex  text-sm my-2 items-center gap-x-2">
   <FiPhone className="h-5 w-5"  />
   <p>{phone}</p>
   </span>
    )
   }
  {
    email && (
      <span className="dark:text-gray-300 flex  text-sm my-2 items-center gap-x-2">
      <AiOutlineMail className="h-5 w-5"  />
      <p>{email}</p>
     
      </span>
    )
  }
   {
    noticeperiod && (
      <span className="dark:text-gray-300 flex text-sm my-2 items-center gap-x-2">
   <CiTimer className="h-5  w-5 "  />
   <p>{noticeperiod}</p>
   </span>
    )
   }
   {
    createdAt && (
      <span className="dark:text-green-400 flex text-sm my-2 pl-2 text-green-600 items-center gap-x-2">
   <p>created {formatDistanceToNow(new Date(createdAt))} ago</p>
   </span>
    )
   }
    </section>
    </div>
    </div>
</section>
    
    </section>
    </div>
    {/* Sidebar */}
  <div className="" >
 <div className="flex gap-x-3 max-md:gap-0">
<SidebarLink Permisson={Permisson} focusSection={focusSection} />
 <section className="dark:bg-gray-900/95  min-h-screen rounded-2xl  relative  w-full shadow-md  bg-white  px-2 py-2">

 <div ref={registerRef('resume')}
 
   className="w-full mb-3  relative">
 <p className="text-lg font-medium  dark:text-white  max-md:text-base ">Resume</p>
 <label className="flex flex-col items-center  py-6   dark:border-gray-600 text-blue  tracking-wide  border border-blue  ">
 {
  Permisson &&  isEditMode &&(
    <button
      type="button"
      onClick={() => togglePopup('addnewresume')}
      className="text-blue-700 dark:text-blue-400  transition-colors duration-300 capitalize absolute w-fit right-0 top-1 cursor-pointer underline"
    >
      add new resume
    </button>
  )
}

 {
  resume?.UploadAt && (
    <span  className=" absolute text-gray-500 bottom-0 right-2 text-sm">
 <p>upload {formatDistanceToNow(new Date( resume?.UploadAt ))} ago</p>
 </span>
  )
 }

<TbPdf className="w-8 h-7 dark:text-gray-300 cursor-pointer"/>
<Link to={resume?.url} className="mt-2 text-base underline dark:text-blue-400 hover:text-blue-600 text-blue-900 leading-normal cursor-pointer">
{resume?.filename}
</Link>
 </label>
</div>
{/* summary */}
<div className="w-full  my-5 ">
 <div className="flex items-center gap-x-2">
 <p className="text-lg  max-md:text-base my-1 font-medium dark:text-white ">Quick summary</p>
 {
  Permisson &&  isEditMode &&
  <FiEdit onClick={()=>togglePopup('summary')} className="h-4  dark:text-gray-100 cursor-pointer"  />
 }
 </div>
 {
  summary && (
   <Fragment>
   <label htmlFor="summary">
   </label>
   <div  className="flex items-center dark:bg-gray-900/95   text-sm p-3 bg-white  text-gray-700 rounded-sm tracking-wide  border dark:border-gray-600  ">
   <p className='dark:text-gray-300'>{summary}</p>
   </div>
   </Fragment>
  )
 }
</div>

{/* employment */}

<div ref={registerRef('employment')}
 className="w-full  my-5 bg-grey-lighter">
<div className="flex   items-center justify-between">
   <div className="flex items-center gap-x-2 ">
   <p className="text-lg  max-md:text-base dark:text-white  my-1 font-medium">Employment</p>
   </div>{
    Permisson &&  isEditMode &&
    <button type="button" onClick={()=>togglePopup('employment')} className="text-blue-700 dark:text-blue-400 capitalize  cursor-pointer underline">add employment</button>
   }
    </div>
{
  employment && employment.length > 0 && (
    
      employment.map(({orgname,position,startdate,enddate,emptype ,emplevel,_id }, index)=>{
        return(
        <Fragment key={_id}>
        
    <label htmlFor="employment">
    </label>
    <div  className="flex mb-2 flex-wrap gap-3 items-center  text-sm p-3 dark:bg-gray-900/95 dark:border-gray-600 bg-white text-gray-700 tracking-wider  border border-blue  ">
    <div className="flex-col ">
    <section className="flex items-center gap-x-4 ">
   
   {
    position && (
      <p className="text-base font-normal dark:text-white text-black">{position}  </p>
    )
   }
   {
    Permisson && isEditMode &&
 <Fragment>
 <FiEdit onClick={()=>ChangeExistingEmployment(index)} className="dark:text-gray-300 h-4 w-6 ml-3 cursor-pointer text-gray-700"  />
 <MdDeleteForever   onClick={()=>DeleteEmployment(_id)} className="dark:text-red-400 h-5 w-6 ml-3 cursor-pointer text-red-500"  />
 </Fragment>
   }
   </section>
   {
    orgname && (
      <div className="text-sm flex dark:text-gray-400 text-gray-900">
        <p>{orgname}</p>
        <span className="text-black dark:text-gray-200 px-2">|</span>
        <p className="text-gray-400 dark:text-gray-400">{emplevel}</p>
      </div>
    )
  }
  <p className="text-gray-400">{emptype} <span className="!text-black"> | </span> {
    startdate && (format(new Date(startdate), 'MMMM yyyy'))
  } &nbsp;to  {
    enddate && (format(new Date(enddate), 'MMMM yyyy'))
  } </p>
   </div>
    </div>
    </Fragment>
      )
    })
   
   
    
  )
}

</div>

<div ref={registerRef('project')}
 className="w-full   my-5 bg-grey-lighter">
 <div   className="flex items-center justify-between">
<div   className="flex  items-center gap-x-2 ">
<label htmlFor="eduacation" className="text-lg dark:text-white max-md:text-base tracking-wider  my-1 font-medium">Projects</label>
</div>{
  Permisson &&  isEditMode &&
  <button onClick={()=>togglePopup('addproject')} className="text-blue-700 dark:text-blue-400 capitalize  cursop underline">add project </button>
}
 </div>

 {
  project && project.length > 0 ? (
    <div className="flex max-md:flex-col flex-wrap w-full gap-x-2">
      {
        project.map(({ title, status, description, sourcelink, livelink, startdate, enddate, _id, projectskill }, index) => (
          <div key={_id} className="py-4 px-2 max-md:w-full mt-2 w-full bg-white border dark:bg-gray-900 dark:border-gray-700">

            <aside className="flex items-center">
              <span className="title font-semibold text-blue-600 dark:text-blue-400 capitalize">{title}</span>
              {
                Permisson && isEditMode &&
                <Fragment>
                  <FiEdit onClick={() => ChangeExistingProject(index)} className="h-4 w-6 ml-3 cursor-pointer text-gray-700 dark:text-gray-300" />
                  <MdDeleteForever onClick={() => DeleteProject(_id)} className="h-5 w-6 ml-3 cursor-pointer text-red-500 dark:text-red-400" />
                </Fragment>
              }
            </aside>

            <div className="flex justify-between items-center flex-wrap gap-x-3">
              <span className="description flex gap-x-2 font-medium text-sm text-gray-700 dark:text-gray-300">
                {status} |
                <span className="font-medium text-sm text-gray-500 dark:text-gray-500">
                  <span>{format(new Date(startdate), 'MMM yyyy')}</span> to <span>{format(new Date(enddate), 'MMM yyyy')}</span>
                </span>
              </span>
            </div>

            <div className="flex gap-x-1.5 items-center flex-wrap">
              <p className="font-medium lowercase text-sm text-gray-700 dark:text-gray-300">skill Used :</p>
              {
                projectskill.map(({ name }, index) => (
                  <Fragment key={index}>
                    <p className="description font-medium text-sm text-blue-600 dark:text-blue-400">{name}</p>
                    {index !== projectskill.length - 1 && ', '}
                  </Fragment>
                ))
              }
            </div>

            <p className="description text-sm text-gray-600 dark:text-gray-400">{description}</p>

            <div className="flex gap-x-3 mt-3">
              <Link to={sourcelink} className="font-normal dark:border-none bg-gray-500/40 hover:border-black border text-black dark:text-blue-400 rounded focus:outline-none px-2 py-0.5 capitalize transition-colors tracking-widest duration-150 ease-in-out text-xs dark:bg-gray-800 dark:hover:border-gray-500">Source</Link>
              <Link to={livelink} className="font-normal dark:border-none bg-gray-500/40 hover:border-black border text-black dark:text-blue-400 rounded focus:outline-none px-2 py-0.5 capitalize transition-colors tracking-widest duration-150 ease-in-out text-xs dark:bg-gray-800 dark:hover:border-gray-500">Link</Link>
            </div>

          </div>
        ))
      }
    </div>
  ) : <div className="flex justify-center ">
  <p className="text-gray-400">You don't have added any project</p>
  </div>
}





{/* key skills */}
<div ref={registerRef('skill')}
 className="w-full my-5 bg-grey-lighter">
 <div className="flex items-center gap-x-2">
 <p className="text-lg  max-md:text-base  my-1 font-medium  dark:text-white">Skills</p>
 {
  Permisson && isEditMode &&
 <FiEdit type="button" onClick={()=>togglePopup('skills')} title="update or delete skills" className="h-4 cursor-pointer"  />

 }
 </div>
 <label htmlFor="skills">
 </label>
 <div className="flex flex-wrap gap-3 items-center text-sm bg-white text-gray-700 rounded-sm tracking-wider dark:bg-gray-900/95 dark:text-gray-300">
 {
   skills && skills.length > 0 && (
     skills.map(({ name, skilltype, _id }) => (
       <span key={_id} className="bg-gray-200 border px-1 font-medium text-sm max-md:text-xs uppercase rounded-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
         {name}
       </span>
     ))
   )
 }
</div>

</div>


</div>

{/* education */}

<div ref={registerRef('education')}
 className="w-full my-5 bg-grey-lighter">
<div className="flex  items-center justify-between">
<div className="flex items-center gap-x-2 ">
<p className="text-lg  max-md:text-base dark:text-white  my-1 font-medium">Education</p>
</div>
{
Permisson && isEditMode &&
  <button type="button" onClick={()=>togglePopup('addeducation')} className="text-blue-700 dark:text-blue-400 capitalize  cursop underline">add Education</button>
}
 </div>
 {
  education && education.length > 0 ? (
    education.map(({ startdate, enddate, degree, fieldofstudy, percentage, institute, qualification, _id }, index) => (
      <Fragment key={_id}>
        <div className="flex mb-2 flex-wrap gap-3 items-center text-sm p-3 text-gray-700 dark:text-gray-300 tracking-wider border border-blue dark:border-gray-600">
          <div className="flex-col">
            <section className="flex items-center gap-x-4">
              {institute && (
                <p className="text-base font-normal text-black dark:text-gray-100">
                  {institute} | {degree && (<span>{degree}</span>)}
                </p>
              )}
              {Permisson && isEditMode && (
                <>
                  <FiEdit onClick={() => ChangeExistingEducation(index)} className="h-3 w-5 cursor-pointer dark:text-gray-300" />
                  <MdDeleteForever onClick={() => DeleteEducation(_id)} className="h-5 w-6 ml-3 cursor-pointer text-red-500 dark:text-red-400" />
                </>
              )}
            </section>
            <span className="flex gap-x-2">
              {fieldofstudy && (
                <span className="text-sm text-gray-900 dark:text-gray-200 flex gap-x-2">
                  <span>field of study: </span>{fieldofstudy}
                </span>
              )}
              |
              {percentage && (
                <span className="text-sm text-gray-900 dark:text-gray-200 flex gap-x-2">
                  <span>percentage: </span>{percentage}
                </span>
              )}
            </span>
            <p className="text-gray-400 dark:text-gray-500">
              {qualification} | {startdate && (format(new Date(startdate), 'MMMM yyyy'))} &nbsp;to {enddate && (format(new Date(enddate), 'MMMM yyyy'))}
            </p>
          </div>
        </div>
      </Fragment>
    ))
  ) : (
    <div className="flex justify-center">
      <p className="text-gray-400 dark:text-gray-500">You don't have added any education</p>
    </div>
  )
}



</div>

{/* social */}
<div ref={registerRef('social')}
 className="w-full my-5 bg-grey-lighter">
 <div className="flex items-center justify-between">
<div className="flex items-center gap-x-2 ">
<label htmlFor="eduacation" className="text-lg dark:text-white  max-md:text-base  my-1 font-medium">Social Links</label>
</div>
{
  Permisson && isEditMode &&
<button onClick={()=>togglePopup('updatesocial')} type="button" className="text-blue-700 dark:text-blue-400 capitalize  cursor-pointer underline">Update social </button>

}
 </div>

 <div  className="flex flex-wrap gap-3 items-center  text-sm p-3  text-gray-700  tracking-wider  border   dark:border-gray-600">
<div className="flex-row flex w-full gap-x-2 ">

{
  social && social.length> 0 && (
 social.map(({name,link,_id})=>
 <div key={_id} className="flex flex-wrap gap-x-3 ">
 {
  link && <Link to={link} className="flex  flex-wrap">
  <button className="inline-block appearance-none dark:bg-gray-800 dark:border-none bg-gray-50 border dark:bg-bl border-gray-200 rounded-md shadow-sm text-blue-700 dark:text-blue-400   px-1 cursor-pointer text-sm font-normal leading-6 transition duration-200 ease-in-out   hover:bg-gray-100 focus:outline-none active:bg-gray-200">{name}</button>
</Link>
 } 
</div>
 )

  )
}

</div>

 </div>

</div>



<div 
ref={registerRef('language')}

className="w-full dark:text-white my-5 bg-grey-lighter">
 <div className="flex items-center justify-between">
<div className="flex items-center gap-x-2 ">
<label htmlFor="eduacation" className="text-lg  max-md:text-base  my-1 font-medium">Language </label>
</div>
{
  Permisson &&  isEditMode &&
  <button onClick={()=>togglePopup('language')} type="button" className="text-blue-700 dark:text-blue-400 capitalize  cursor-pointer underline">add language </button>
}
 </div>

 <div >
 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
  <thead className="bg-gray-50 dark:bg-gray-800">
    <tr>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
        Language
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
        Proficiency
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
    {language && language.length > 0 && (
      language.map(({ proficiency, lan, _id }) => (
        <tr key={_id}>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
            {lan}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
            {proficiency}
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>

</div>



</div>

{/*language */}


 </section>
 </div>
  
  
  </div>

    
    </div>
    
    
    
    </div>
  )
}

export default UpdateProfile