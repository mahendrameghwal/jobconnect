import rightarrow from "../../assets/rightarrow.svg"
import AvailableToJoin from "../../data/AvailableToJoin"
import Gender from "../../data/Gender";
import Status from "../../data/Status"
import {useEffect,memo, Fragment, useState , useRef, useCallback, useMemo } from 'react';
import { GoPlus, GoProjectRoadmap } from 'react-icons/go';
import {motion}from "framer-motion"
import { toast } from 'react-hot-toast';
import { IoMdClose, IoMdCloseCircleOutline } from 'react-icons/io';
import { HiMiniInformationCircle } from "react-icons/hi2";
import { useDispatch , useSelector} from 'react-redux';
import { IoBook } from "react-icons/io5";
import { v4 as uuidv4 } from 'uuid';
import {setCity,setState,SetCountry,AddSocial ,DeleteSocial ,SetCandidatedata ,CandidateStatus ,CurrentCandidateStatus ,AddMoreEducation ,updateEducationField  ,updateDeleteEducation ,AddProject ,UpdateProject ,UpdateDeleteproject ,AddInfoSkills ,DeleteSkill ,AddMoreEmployment ,updateEmployment ,UpdateDeleteEmployment ,AddEmploymentSkills ,DeleteEmploymentSkills, AddProjectSkills, DeleteProjectSkills, resetCandidateForm
} from '../../../app/slices/CreateCandidateSlice';
import SocialLink from '../../data/SocialLink';
import { PiSuitcaseSimpleFill } from "react-icons/pi";
import qualifications from '../../data/qualifications';
import {FaAngleRight, FaAngleLeft} from "react-icons/fa"
import skillcategory from '../../data/skillcategory';
import jobCategories from '../../data/JobCategory';
import Joblevel from '../../data/Joblevel';
import Jobtype from '../../data/Jobtypes';
import {loadCities,loadCountries,loadStates} from '../../../app/slices/AddressSlice';
import { useCreateCadidateMutation } from '../../../app/api/CandidateApi';
import { batch } from 'react-redux';
import { validateDateRange } from "../../utils/RangeValidator";
import CurrentEmploymentStatus from "../../data/CurrentemploymentStatus";
import CreatePersonalInforamtion from "./components/CreatePersonalInforamtion";



const CreateCandidate = memo(() => {
  const dispatch = useDispatch();
  const Candidate = useSelector((state) => state.CreateCandidate.CandidateData);
  const address = useSelector((state) => state.address);
  const Topref = useRef(null)
  const [createCadidate] = useCreateCadidateMutation();
  useEffect(() => {
    dispatch(loadCountries());
  }, [dispatch]);

  {/*  handle  data from redux-toolkit slice   */}
  
  const [step, setStep] = useState(1);
  const [fileInputState, setFileInputState] = useState();
  const [previewSource, setPreviewSource] = useState('');


  

  const previewFile = useCallback((file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      dispatch(SetCandidatedata({ avtar: reader.result }));
    };
    reader.readAsDataURL(file);
  }, []);
  



  const handleFileInputChange =useCallback( (e) => {
    const file = e.target.files[0];
    previewFile(file);
  },[]);
  
 
  

{/*  handle education field  */}


const handleEducationChange = useCallback((event, index) => {
  const { name, value } = event.target;
  const currentEducation = Candidate.education[index];

  if (name === 'startdate' || name === 'enddate') {
    const isValid = validateDateRange(
      name === 'startdate' ? value : currentEducation.startdate,
      name === 'enddate' ? value : currentEducation.enddate,
      name
    );

    if (!isValid) return;
  }

  dispatch(updateEducationField({ index, name, value }));
}, [Candidate.education, dispatch]);

{/*  handle delete education   */}

const DeletEducation = useCallback((hell) => {
  dispatch(updateDeleteEducation(hell));
}, [dispatch]);


{/*  handle employment field  */}

  const handleEmploymentChange = useCallback((event, index) => {
    const { name, value } = event.target;
    const CurrentEmployment = Candidate.employment[index];

    if (name === 'startdate' || name === 'enddate') {
      const isValid = validateDateRange(
        name === 'startdate' ? value : CurrentEmployment.startdate,
        name === 'enddate' ? value : CurrentEmployment.enddate,
        name
      );
      if (!isValid) return;
    }
    dispatch(updateEmployment({ index, name, value }));
  },[Candidate.employment, dispatch]);


  {/*  handle delete employment   */ }
  const DeletEmployment = useCallback((hell) => {
    dispatch(UpdateDeleteEmployment(hell));
  }, [ dispatch ]);


    const handleProjectChange = useCallback((event, index) => {
    const { name, value } = event.target;
    const CurrentProject = Candidate.project[index];

    if (name === 'startdate' || name === 'enddate') {
      const isValid = validateDateRange(
        name === 'startdate' ? value : CurrentProject.startdate,
        name === 'enddate' ? value : CurrentProject.enddate,
        name
      );
  
      if (!isValid) return;
    }

    dispatch(UpdateProject({ index, name, value }));
},[Candidate.project,dispatch]);

const HandleProjectSkills = useCallback(
  (index) => {
    if (seletctedSkillType && Skillname.trim()!=='') {
      dispatch(AddProjectSkills({ index,  category: seletctedSkillType, name: Skillname}));
      setseletctedSkillType('')
      setSkillname('')
    } else {
      toast.error(`Please ${!seletctedSkillType?'select a category of skill':''} ${!seletctedSkillType && !Skillname.trim() ? 'and':''}${!Skillname.trim()?'provide a Skill name':''}`);
    }
  }
  ,[])


{/*  handle delete education   */}
 const DeleteProject =useCallback((hell)=>{
  dispatch(UpdateDeleteproject(hell))
},[])



{/* close preview of avatar */}
const ClosePreview =()=>{
  setPreviewSource("")
  setFileInputState('')
  dispatch(SetCandidatedata({ avtar:"" }));
}
  


const handleCountry = useCallback((country) => {
  if (country) {
    dispatch(SetCountry(country));
    const CountiresArr = address.countries;
    const ResultCountry = CountiresArr.find(findcountry => findcountry.name === country);
    ResultCountry.isoCode && dispatch(loadStates(`${ResultCountry.isoCode}`));
    ResultCountry.isoCode && dispatch(loadCities(`${ResultCountry.isoCode}`));
  }
}, [address.countries, dispatch]);
  


  
  
  const [selectedSocial, setSelectedSocial] = useState('');
  const [link, setLink] = useState('');

  const handleAddSocial = () => {
    if (selectedSocial && link.trim()!=='') {
      dispatch(AddSocial({ name:selectedSocial, link }));
      setSelectedSocial('')
      setLink('')
    } else {
      toast.error(`Please ${!selectedSocial?'select a social network':''}${!selectedSocial && !link.trim() ? 'and':''}${!link.trim()?'provide a link':''}`);
    }
  };
  
  const [seletctedSkillType, setseletctedSkillType] = useState('');
  const [Skillname, setSkillname] = useState('');

  const HandleAddSkill = () => {
    
    if (seletctedSkillType && Skillname.trim()!=='') {
      dispatch(AddInfoSkills({  skilltype: seletctedSkillType, name: Skillname}));
      setseletctedSkillType('')
      setSkillname('')
    } else {
      toast.error(`Please ${!seletctedSkillType?'select a category of skill':''} ${!seletctedSkillType && !Skillname.trim() ? 'and':''}${!Skillname.trim()?'provide a Skill name':''}`);
    }
  };

  
  const HandleEmployemtSkills = (index) => {
    if (seletctedSkillType && Skillname.trim()!=='') {
      dispatch(AddEmploymentSkills({ index,  category: seletctedSkillType, name: Skillname}));
      setseletctedSkillType('')
      setSkillname('')
    } else {
      toast.error(`Please ${!seletctedSkillType?'select a category of skill':''} ${!seletctedSkillType && !Skillname.trim() ? 'and':''}${!Skillname.trim()?'provide a Skill name':''}`);
    }
  };

const GoToTop =()=>{
  if (Topref.current) {
    Topref.current.scrollIntoView({ top:0, behavior: 'smooth' });
  }
}



  
const HandleSubmitForm = useCallback(async (event) => {
  event.preventDefault();
  const { data, error } = await createCadidate(Candidate);
  
  if (data) {
    toast.success('Successfully created Your profile');
    dispatch(resetCandidateForm());
    setPreviewSource('');
    setFileInputState('');
    dispatch(SetCandidatedata({ avtar: '' }));
  } else if (error) {
    
    error.data.error && toast.error(error.data.error) || 
    error.data.message && toast.error(error.data.message) ||
    toast.error('something went wrong');
  }
}, [createCadidate, Candidate, dispatch, resetCandidateForm]);



{/* handle value of form  */}
const Handlecandidate = useCallback((e) => {
  if (e && e.target) {
    const { name, value } = e.target;
    batch(() => {
      dispatch(SetCandidatedata({ [name]: value }));
    });
  }
}, [HandleSubmitForm]);




  const countryLoading = address.countries.length === 0;
  const stateLoading = address.states.length === 0;
  const cityLoading = address.cities.length === 0;
  const [visibleCities, setVisibleCities] = useState(1000);
  const totalCities = address.cities.length;
  const remainingCities = totalCities - visibleCities;
  const showLoadMore = remainingCities > 0;

 
  const handleLoadMore = useCallback(() => {
    setVisibleCities((prevVisibleCities) => prevVisibleCities + 1000);
  }, [setVisibleCities]);
  
return (
  <div ref={Topref} className="min-h-screen w mx-auto  max-h-full w-95 ">
    <p className="bg-gradient-to-t  from-green-500 via-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent text-center my-7 max-md:text-xl">Fill Out Your Personal Information</p>
   
  <div className=" px-2 ">
  <span className='text-sm tracking-wide text-red-500'><span className='!font-bold'>*</span>All are Required</span>
  
    <div className="p-3 w-fit">
      {
   
        previewSource && 

       <Fragment>
       <p className= " bg-gradient-to-t from-green-500 via-blue-600 to-purple-500 bg-clip-text text-sm font-bold text-transparent">Profile Image</p>
       <div className="relative my-3">
       <IoMdClose onClick={ClosePreview} className="absolute cursor-pointer  text-red-500 border-2 border-red-600 right-0 rounded -top-2 " size={20}/>
       <img className=" h-20 w-20 border border-gray-300 p-0.5 object-contain rounded-full " src={previewSource}  alt="img"  />
       </div> 
       </Fragment>
       
      }
      
      </div>
      <form onSubmit={HandleSubmitForm} >
      
      <div className="mb-6 ">
      { /* profile summary */}
 {

   step===1&& 
 
(
<Fragment>
  <CreatePersonalInforamtion
  Handlecandidate={Handlecandidate}
  handleFileInputChange={handleFileInputChange}
  fileInputState={fileInputState}
  HandleAddSkill={HandleAddSkill}
  handleCountry={handleCountry}
  countryLoading={countryLoading}
  visibleCities={visibleCities}
  handleLoadMore={handleLoadMore}
  remainingCities={remainingCities}
  selectedSocial={selectedSocial}
  setSelectedSocial={setSelectedSocial}
  link={link}
  setLink={setLink}
  handleAddSocial={handleAddSocial}
  seletctedSkillType={seletctedSkillType}
  setseletctedSkillType={setseletctedSkillType}
  setSkillname={setSkillname}
  Skillname={Skillname}
  stateLoading ={stateLoading}
  cityLoading={cityLoading}
  showLoadMore ={showLoadMore }
  DeleteSkill={DeleteSkill}
  />

     
      </Fragment>
  )
}



 {
  step===2 && (
    <div className='w-full mb-6 md:mb-0 '>
   
    <div className="flex   items-center justify-between  flex-wrap w-full  mt-5  ">
   <p className="text-base dark:text-white font-semibold bg-gradient-to-t text-transparent   from-green-500 via-blue-600 to-purple-600 bg-clip-text">Education</p>
   <button type="button" onClick={()=>{dispatch(AddMoreEducation())}} 
   className="group relative inline-flex items-center overflow-hidden tracking-wider rounded bg-indigo-600  px-4 py-1 text-white focus:outline-none focus:ring-2 active:bg-indigo-500">
   <span className="absolute -start-full transition-all group-hover:start-4">
    <GoPlus color='white' className='h-7  font-black ' />
   </span>
   
   <span className="text-sm font-medium transition-all group-hover:ms-4">
   Add education
   </span>
   </button>
   </div>
   
{
  
  Candidate.education && Candidate.education.map((edu, index) => (
 
    

    <Fragment key={index}>
 <div className='flex justify-end'> 
 <button type="button" onClick={()=>{DeletEducation(index)}}
   className=" relative text-sm inline-flex items-center overflow-hidden rounded bg-red-500 my-2 px-3 py-1 text-white/95 focus:outline-none "
   >Delete education</button></div>
   <motion.div 
   initial={{ y: -50, opacity: 0 }}
   animate={{ y: 0, opacity: 1 }}
   exit={{ y: -50, opacity: 0 }}
   className="flex flex-wrap items-center max-md:flex-col justify-between">
    <div className="w-30 max-md:w-full my-2 md:mb-0">
    <label htmlFor='institute' className="block uppercase tracking-wide text-gray-700 dark:text-gray-50 text-xs font-bold mb-2">
    institute
    </label>
    
    <input
    className="  max-md:placeholder:text-sm  block w-full  bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800"
    type="text" name='institute' onChange={(e)=>handleEducationChange(e, index)} value={edu.institute}
    placeholder="school or institute name "
    />
    
     
    </div>
    <div className="w-30 max-md:w-full my-2 md:mb-0">
    <label htmlFor='degree' className="block uppercase tracking-wide text-gray-700 dark:text-gray-50 text-xs font-bold mb-2">
    Deegree name 
    </label>
    
    <input
    className="  max-md:placeholder:text-sm  block w-full  bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800"
    type="text" name='degree'   
    placeholder="Deegree name" onChange={(e)=>handleEducationChange(e, index)} value={edu.degree}
    />
    
    </div>
    <div className="w-30 max-md:w-full my-2 md:mb-0">
    <label htmlFor='fieldofstudy' className="block uppercase tracking-wide text-gray-700 dark:text-gray-50 text-xs font-bold mb-2">
    field of study
    </label>
    
    <input
    className="  max-md:placeholder:text-sm  block w-full  bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800"
    type="text" name="fieldofstudy"
    placeholder="computer science"  onChange={(e)=>handleEducationChange(e, index)} value={edu.fieldofstudy}
    />
    
    </div>
    
    <div className="w-30 max-md:w-full my-2 md:mb-0">
    <label htmlFor='startdate' className="block uppercase tracking-wide text-gray-700 dark:text-gray-50 text-xs font-bold mb-2">
    start date :
    </label>
    
    <input placeholder='date' onChange={(e)=>handleEducationChange(e, index)} value={edu.startdate}
    className="  max-md:placeholder:text-sm  block w-full  bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800"
    type="month"  name="startdate" 
    />
    
    </div>
    <div className="w-30 max-md:w-full my-2 md:mb-0">
    <label htmlFor='enddate' className="block uppercase tracking-wide text-gray-700 dark:text-gray-50 text-xs font-bold mb-2">
    End date (or expected)
    </label>
    
    <input
    className="  max-md:placeholder:text-sm  block w-full  bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800"
    type="month"  name="enddate"  onChange={(e)=>handleEducationChange(e, index)} value={edu.enddate}
    />
     
    </div>
    
    <div className="w-30 max-md:w-full my-2 md:mb-0">
    <label htmlFor='percentage' className="block uppercase tracking-wide text-gray-700 dark:text-gray-50 text-xs font-bold mb-2">
    Percentage
    </label>
    
    <input
    className="  max-md:placeholder:text-sm  block w-full  bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800"
    type="text"  name="percentage"    onChange={(e)=>handleEducationChange(e, index)} value={edu.percentage}
    />
    
    </div>
    
    <div className="w-1/4 max-md:w-full my-2 md:mb-0">
   <label htmlFor='qualification' className="block uppercase tracking-wide text-gray-700 dark:text-gray-50 text-xs font-bold mb-2">
Qualification
</label>
  <select name='qualification'  onChange={(e)=>handleEducationChange(e, index)} value={edu.qualification}
  className="max-md:placeholder:text-sm overflow-scroll block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800 focus:border-gray-500"
  
  >
  <option  className='!text-sm' value=''>Select a Qualification</option>
  {
    qualifications&&qualifications.map(({id,level, description}) => ( 
    <option key={id}  value={level}> 
      {level} {(description)}
       </option>
  ))
  }
  </select>
  
  </div>
    </motion.div>
    </Fragment>
  ))
} 
   </div>
   )
 }

 

 


 {
  step===3 && (
    <div className='w-full mb-6 md:mb-0 '>
   
    <div className="flex   items-center justify-between  flex-wrap w-full  mt-5  ">
   <p className="text-base font-semibold bg-gradient-to-t text-transparent   from-green-500 via-blue-600 to-purple-600 bg-clip-text">Exprience</p>
   <button type="button" onClick={()=>{dispatch(AddMoreEmployment())}} 
   className="group relative inline-flex items-center overflow-hidden tracking-wider rounded bg-indigo-600  px-4 py-1 text-white focus:outline-none focus:ring-2 active:bg-indigo-500">
   <span className="absolute -start-full transition-all group-hover:start-4">
   <GoPlus color='white' className='h-7  font-black ' />
   </span>
   
   <span className="text-sm font-medium transition-all group-hover:ms-4">
   Add Exprience
   </span>
   </button>
   </div>
   
{

  Candidate.employment.map((employment, ind) => (
 
    

    <Fragment key={ind}>
 <div className='flex justify-end'> 
 <button type="button" onClick={()=>{DeletEmployment(ind)}}
   className=" relative text-sm inline-flex items-center overflow-hidden rounded bg-red-500 my-2 px-3 py-1 text-white/95 focus:outline-none "
   >Delete Exprience</button></div>
    <motion.div 
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -50, opacity: 0 }}
    
     className="flex flex-wrap items-center max-md:flex-col justify-between">

     <div className="w-30 max-md:w-full my-2 md:mb-0">
     <label htmlFor='orgname' className="block uppercase tracking-wide text-gray-700 dark:text-gray-50 text-xs font-bold mb-2">
     Organization name
     </label>
     
     <input
     className="  max-md:placeholder:text-sm  block w-full  bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800"
     type="text" name='orgname'   
     placeholder="Organization name" onChange={(e)=>handleEmploymentChange(e, ind)} value={employment.orgname}
     />
     
     </div>

     <div className="w-30 max-md:w-full my-2 md:mb-0">
    <label htmlFor='position' className="block uppercase tracking-wide text-gray-700 dark:text-gray-50 text-xs font-bold mb-2">
    position name
    </label>
    
    <input
    className="  max-md:placeholder:text-sm  block w-full  bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800"
    type="text" name='position' onChange={(e)=>handleEmploymentChange(e, ind)} value={employment.position}
    placeholder="Position name "
    />
    
    </div>

    <div className="w-30 max-md:w-full my-2 md:mb-0">
    <label htmlFor='empcategory' className="block uppercase tracking-wide text-gray-700 dark:text-gray-50 text-xs font-bold mb-2">
    Job Category
    </label>
    
  <select value={employment.empcategory} onChange={(e)=>handleEmploymentChange(e, ind)}
  className="  max-md:placeholder:text-sm  block w-full  bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800"
  name="empcategory" id="">
  <option value="">Select a Job Category</option>
{
  jobCategories && 
  jobCategories.map(({id,name})=>(
    <option key={id} value={name}>{name}</option>
  ))
}
  </select>
    
    </div>


    <div className="w-30 max-md:w-full my-2 md:mb-0">
    <label htmlFor='emplevel' className="block uppercase tracking-wide text-gray-700 dark:text-gray-50 text-xs font-bold mb-2">
    Level
    </label>
    
  <select  value={employment.emplevel} onChange={(e)=>handleEmploymentChange(e, ind)}
  className="max-md:placeholder:text-sm  block w-full  bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800"
  name="emplevel" id="">
  <option value="">Select a Job Level</option>
{
  Joblevel && 
  Joblevel.map(({level, id})=>(
    <option className='!capitalize' key={id} value={level}>{level}</option>
  ))
}
  </select>
    
    </div>



    <div className="w-30 max-md:w-full my-2 md:mb-0">
    <label htmlFor='emptype' className="block uppercase tracking-wide text-gray-700 dark:text-gray-50 text-xs font-bold mb-2">
    Job Type
    </label>
    
  <select value={employment.emptype} onChange={(e)=>handleEmploymentChange(e, ind)}
  className="  max-md:placeholder:text-sm  block w-full  bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800"
  name="emptype" id="">
  <option value="">Select a Job Type</option>
{
  Jobtype && 
  Jobtype.map(({id,time})=>(
    <option className='!capitalize' key={id} value={time}>{time}</option>
  ))
}
  </select>
    
    </div>
    
    <div className="w-30 max-md:w-full my-2 md:mb-0">
    <label htmlFor='startdate' className="block uppercase tracking-wide text-gray-700 dark:text-gray-50 text-xs font-bold mb-2">
    start date :
    </label>
    
    <input placeholder='date' onChange={(e)=>handleEmploymentChange(e, ind)} value={employment.startdate}
    className="  max-md:placeholder:text-sm  block w-full  bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800"
    type="month"  name="startdate" 
    />
    
    </div>
    <div className="w-30 max-md:w-full my-2 md:mb-0">
    <label htmlFor='enddate' className="block uppercase tracking-wide text-gray-700 dark:text-gray-50 text-xs font-bold mb-2">
    End date (or expected)
    </label>
    <input
    className="  max-md:placeholder:text-sm  block w-full  bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800"
    type="month"  name="enddate"  onChange={(e)=>handleEmploymentChange(e, ind)} value={employment.enddate}
    />
     
    </div>


   <div className='w-full max-md:flex-col gap-x-2 items-center flex '>
   <div  className="w-1/3 max-md:w-full  my-2 max-md:my-1 md:mb-0">
     <label className="block uppercase tracking-wide text-gray-700 dark:text-gray-50 text-xs font-bold mb-2 max-md:mb-1" htmlFor='category'>
     Skill category
     </label>
     <select name="category"   onChange={(e)=>setseletctedSkillType(e.target.value)} value={seletctedSkillType}
     className=" max-md:placeholder:text-sm  block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-3 leading-tight focus:outline-none focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800 focus:border-gray-500"
     
     >
     <option className='!text-sm' value=''>--select a category--</option>
     {
       
       skillcategory && skillcategory.map(({id,type})=>(
       <option  key={id} value={type}>{type}</option>
     ))
     }
     
     
     </select>
     
     
     </div>
   
     <div className="w-1/3 max-md:w-full  my-2 md:mb-0">
     <label className="block uppercase tracking-wide text-gray-700 dark:text-gray-50 text-xs font-bold mb-2" htmlFor='name'>
     Add Skills
     </label>
     <input placeholder='Add skill here'
     name="name"
     value={Skillname}
     onChange={(e) => setSkillname(e.target.value)}
     className=" max-md:placeholder:text-sm  block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800 focus:border-gray-500"/>
     
     
     </div>
     
     <div className="w-1/3 max-md:w-full px-3 my-2  md:mb-0">
    

   <span onClick={()=>{HandleEmployemtSkills(ind)}} className="relative cursor-pointer mt-1 items-center justify-center inline-block p-3 px-5 max-md:py-1.5 py-2.5 max-md:rounded-md overflow-hidden font-medium text-indigo-600 rounded-lg shadow-xl group">
   <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-blue-600 rounded-full blur-md ease"></span>
   <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
   <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-blue-400 rounded-full blur-md"></span>
   <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-blue-400 rounded-full blur-md"></span>
   </span>
   <span className="relative -tracking-tighter text-white">Add Skills</span>
   </span>
     </div>
     </div>
     
     <div className="grid px-1 grid-cols-4 w-full gap-2 max-md:lg:gap-1 max-md:grid-cols-2 ">
     
     { 
      Candidate.employment[ind].workskills[0].category!==''&& Candidate.employment[ind].workskills[0].name!=='' &&   Candidate.employment[ind].workskills.map(({category, name},index)=>(
     <div key={index}>
     <div className='flex relative'>
     <span>{category}</span>
     <IoMdCloseCircleOutline onClick={()=>{dispatch(DeleteEmploymentSkills({ind,index}))}} color='black' className='h-5 w-5 absolute !cursor-pointer top-4 -right-1' />
     </div>
     <div className="rounded-md p-2  bg-blue-100 my-1">{name}</div>
     
     
     
     
     </div>
       ))
    
     }
     
     
     </div>


    </motion.div>
    </Fragment>
  ))
}   

</div>

)
}



{
  step===4 && (
    <div className='w-full mb-6 md:mb-0 '>
   
    <div className="flex   items-center justify-between  flex-wrap w-full  mt-5  ">
   <p className="text-base font-semibold bg-gradient-to-t text-transparent   from-green-500 via-blue-600 to-purple-600 bg-clip-text">Project</p>
   <button type="button" onClick={()=>{dispatch(AddProject())}} 
   className="group relative inline-flex items-center overflow-hidden tracking-wider rounded bg-indigo-600  px-4 py-1 text-white focus:outline-none focus:ring-2 active:bg-indigo-500">
   <span className="absolute -start-full transition-all group-hover:start-4">
    <GoPlus color='white' className='h-7  font-black ' />
   </span>
   
   <span className="text-sm font-medium transition-all group-hover:ms-4">
   Add More Project
   </span>
   </button>
   </div>
   
{
  
  Candidate.project.map((
    {title,status,description,startdate, enddate,sourcelink, livelink,role_desc, projectrole, client}
    , index) => (
 
    

    <Fragment key={index}>
 <div className='flex justify-end'> 
 <button type="button" onClick={()=>{DeleteProject(index)}}
   className=" relative text-sm inline-flex items-center overflow-hidden rounded bg-red-500 my-2 px-3 py-1 text-white/95 focus:outline-none "
   >Delete Project</button></div>
   <motion.div 
   initial={{ y: -50, opacity: 0 }}
   animate={{ y: 0, opacity: 1 }}
   exit={{ y: -50, opacity: 0 }} 
   className="flex flex-wrap items-center max-md:flex-col justify-between">
    <div className="w-30 max-md:w-full my-2 md:mb-0">
    <label htmlFor='title' className="block uppercase tracking-wide text-gray-700 dark:text-gray-50 text-xs font-bold mb-2">
    Title
    </label>
    
    <input 
    className="  max-md:placeholder:text-sm  block w-full  bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800"
    type="text" name='title' onChange={(e)=>handleProjectChange(e, index)} value={title}
    placeholder="Project title "
    />
    
     
    </div>

   
       
    <div className="w-30 max-md:w-full my-1 md:mb-0">
    <label className="block uppercase tracking-wide text-gray-700 dark:text-gray-50 text-xs font-bold mb-2">
    Project Status
    </label>
    
  <ul className="items-center w-full bg-gray-100 border  dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800 border-gray-300 text-sm rounded-lg sm:flex">
    <li className="w-full border-b  sm:border-b-0 ">
        <div className="flex items-center ps-3">
            <input  type="radio"
            checked={status === "in progress"}
            onChange={(e)=>handleProjectChange(e, index)}
             value={"in progress"} name="status" className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100  "/>
            <label htmlFor="status" className="w-full py-3 ms-2 text-sm font-normal ">In Progress </label>
        </div>
    </li>
    <li className="w-full border-b  sm:border-b-0 ">
        <div className="flex items-center ps-3">
            <input  type="radio"
            checked={status === "finished"}
            onChange={(e)=>handleProjectChange(e, index)}
             value={"finished"} name="status" className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100  "/>
            <label htmlFor="status" className="w-full py-3 ms-2 text-sm font-normal ">Finished </label>
        </div>
    </li>
    
    </ul>
    
    </div>
    
    
  
    <div className="w-1/3 max-md:w-full my-2 md:mb-0">
    <label htmlFor='startdate' className="block uppercase tracking-wide text-gray-700 dark:text-gray-50 text-xs font-bold mb-2">
    start date :
    </label>
    
    <input placeholder='date' onChange={(e)=>handleProjectChange(e, index)} value={startdate}
    className="max-md:placeholder:text-sm  block w-full  bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800"
    type="month"  name="startdate" 
    />
    
    </div>
    <div className="w-30 max-md:w-full my-2 md:mb-0">
    <label htmlFor='enddate' className="block uppercase tracking-wide text-gray-700 dark:text-gray-50 text-xs font-bold mb-2">
    End date (or expected)
    </label>
    
    <input onChange={(e)=>handleProjectChange(e, index)} value={enddate}
    className="  max-md:placeholder:text-sm  block w-full  bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800"
    type="month"  name="enddate" 
    />
     
    </div>
    


    <div className="w-30 max-md:w-full my-2 md:mb-0">
    <label htmlFor='sourcelink' className="block uppercase tracking-wide text-gray-700 dark:text-gray-50 text-xs font-bold mb-2">
    Source link :
    </label>
    
    <input placeholder='github link or code link' onChange={(e)=>handleProjectChange(e, index)} value={sourcelink}
    className="  max-md:placeholder:text-sm  block w-full  bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800"
    type="text"  name="sourcelink" 
    />
    
    </div>



    <div className="w-30 max-md:w-full my-2 md:mb-0">
    <label htmlFor='livelink' className="block uppercase tracking-wide text-gray-700 dark:text-gray-50 text-xs font-bold mb-2">
    Live link
    </label>
    
    <input
    className="max-md:placeholder:text-sm  block w-full  bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800"
    type="text"  placeholder='live link Add here' name="livelink"  onChange={(e)=>handleProjectChange(e, index)} value={livelink}
    />
     
    </div>

    <div className="w-full max-md:w-full my-2 md:mb-0">
    <label htmlFor='description' className="block uppercase tracking-wide text-gray-700 dark:text-gray-50 text-xs font-bold mb-2">
   Project Description
    </label>
    
    <textarea placeholder='Type here...' onChange={(e)=>handleProjectChange(e, index)} value={description}
    className="  max-md:placeholder:text-sm  block w-full  bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800"
    type="text"  name="description" 
    />
    
    </div>
 

    <div className='w-full max-md:flex-col items-center flex  gap-x-2'>
<div  className="w-1/3 max-md:w-full  my-2 max-md:my-1 md:mb-0">
  <label className="block dark:text-gray-200 uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 max-md:mb-1" htmlFor='currentempstatus'>
  Skill
  </label>
  <select name="category"   onChange={(e)=>setseletctedSkillType(e.target.value)} value={seletctedSkillType}
  className=" max-md:placeholder:text-sm  block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800"
  
  >
  <option className='!text-sm' value=''>-- select a category --</option>
  {

    skillcategory && skillcategory.map(({id,type})=>(
    <option key={id} value={type}>{type}</option>
  ))
  }
  
  
  </select>
  
  
  </div>

  <div className="w-1/3 max-md:w-full  my-2 md:mb-0">
  <label className="block uppercase tracking-wide text-gray-700 dark:text-gray-50 text-xs font-bold mb-2" htmlFor='link'>
  Add Skills
  </label>
  <input placeholder='Add skill here'
  name="name"
  value={Skillname}
  onChange={(e) => setSkillname(e.target.value)}
  className=" max-md:placeholder:text-sm  block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800"/>
  
  
  </div>

  <div className="w-1/3 max-md:w-full px-3 my-2  md:mb-0">
 

<span onClick={()=>{HandleProjectSkills(index)}} className="relative cursor-pointer mt-1 items-center justify-center inline-block p-3 px-5 max-md:py-1.5 py-2.5 max-md:rounded-md overflow-hidden font-medium text-indigo-600 rounded-lg shadow-xl group">
<span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-blue-500 rounded-full blur-md ease"></span>
<span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
<span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-blue-600 rounded-full blur-md"></span>
<span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-blue-600 rounded-full blur-md"></span>
</span>
<span className="relative -tracking-tighter text-white">Add Skills</span>
</span>





  </div>


  
  </div>
  <div className="grid px-1 grid-cols-4 w-full gap-2 max-md:lg:gap-1 max-md:grid-cols-2 ">
     
  { 
   Candidate.project[index].projectskill[0].category!==''&& Candidate.project[index].projectskill[0].name!=='' &&   Candidate.project[index].projectskill.map(({category, name},skillindex)=>(
  <div key={skillindex}>
  <div className='flex relative'>
  <span>{category}</span>
  <IoMdCloseCircleOutline onClick={()=>{dispatch(DeleteProjectSkills({index,skillindex}))}} color='black' className='h-5 w-5 absolute !cursor-pointer top-4 -right-1' />
  </div>
  <div className="rounded-md p-2  bg-blue-100 my-1">{name}</div>
  
  
  
  
  </div>
    ))
 
  }
  
  
  </div>
    
   
    </motion.div>
    </Fragment>
  ))
} 
   </div>
   )
 }
   










   {/* steps */}

  <div className='w-full flex max-md:flex-col mt-3 '>
   <div className='max-md:w-full w-3/4 '>
  
   
   <div className=''>
   <ol className="grid gap-2  grid-cols-1 divide overflow-hidden   text-xs  sm:grid-cols-4">
       <li onClick={()=>{setStep(1), GoToTop()}} className=
       { 
        step ===1 ?
        "flex py-2 mx-1 border rounded-md text-gray-600 dark:text-gray-300 border-gray-400 dark:border-gray-600 bg-gray-400 dark:bg-gray-600 cursor-pointer bg-opacity-20 items-center justify-center gap-2 px-4"
        : "flex py-2 mx-1 border rounded-md text-gray-400 dark:text-gray-500 border-gray-300 dark:border-gray-500 cursor-pointer bg-opacity-20 items-center justify-center gap-2 px-4" 
      }  
      >
        
         <p  className="leading-none flex gap-x-1">
         <strong className="block font-semibold"> Personal </strong>
           <HiMiniInformationCircle  className="max-md:hidden" /> 
           </p>
           </li>
 
           <li  onClick={()=>{setStep(2), GoToTop()}} className= 
       { 
         step ===2 ?
         "flex py-2 mx-1 border rounded-md text-gray-600 dark:text-gray-300 border-gray-400 dark:border-gray-600 bg-gray-400 dark:bg-gray-600 cursor-pointer bg-opacity-20 items-center justify-center gap-2 px-4"
         : "flex py-2 mx-1 border rounded-md text-gray-400 dark:text-gray-500 border-gray-300 dark:border-gray-500 cursor-pointer bg-opacity-20 items-center justify-center gap-2 px-4" 
      }  >
        
      <p className="leading-none flex gap-x-1">
           <strong className="block font-semibold"> Education </strong>
           <IoBook  className="max-md:hidden" /> 
         </p>
         </li>
 
         <li  onClick={()=>{setStep(3), GoToTop()}} className= 
       { 
         step ===3 ?
          "flex py-2 mx-1 border rounded-md text-gray-600 dark:text-gray-300 border-gray-400 dark:border-gray-600 bg-gray-400 dark:bg-gray-600 cursor-pointer bg-opacity-20 items-center justify-center gap-2 px-4"
         : "flex py-2 mx-1 border rounded-md text-gray-400 dark:text-gray-500 border-gray-300 dark:border-gray-500 cursor-pointer bg-opacity-20 items-center justify-center gap-2 px-4"       
        } >
        
         <p className="leading-none flex gap-x-1">
         <strong className="block font-semibold"> Employment </strong>
           <PiSuitcaseSimpleFill  className="max-md:hidden" /> 
         </p>
         </li>


         <li  onClick={()=>{setStep(4), GoToTop()}} className= 
       { 
         step ===4 ?
         "flex py-2 mx-1 border rounded-md text-gray-600 dark:text-gray-300 border-gray-400 dark:border-gray-600 bg-gray-400 dark:bg-gray-600 cursor-pointer bg-opacity-20 items-center justify-center gap-2 px-4"
         : "flex py-2 mx-1 border rounded-md text-gray-400 dark:text-gray-500 border-gray-300 dark:border-gray-500 cursor-pointer bg-opacity-20 items-center justify-center gap-2 px-4" 
        } >
        
         <p className="leading-none flex gap-x-1">
         <strong className="block font-semibold"> Project </strong>
         <GoProjectRoadmap className="max-md:hidden" />
         </p>
         </li>
         </ol>
         </div>

         

         
 </div>
 
 <div className=' w-1/2  max-md:w-full  max-md:mt-4 '>

 
 <div className='w-full  flex justify-end '>
   <ol
   className=" divide overflow-hidden  gap-x-5 text-xs  flex justify-end"
   >
   {
    step !==1 && (
      <button 
     onClick={() => {
      setStep((prevStep) => {
        if (prevStep > 1) {
          return prevStep - 1; 
        } else {
          return 1; 
        }
      }), GoToTop()
    }}
     type='button'
     className="flex py-2.5 mx-1 border rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-400 dark:border-gray-600 bg-gray-400 dark:bg-gray-600 cursor-pointer bg-opacity-20 items-center justify-center gap-2 px-4">
      
       <p  className="leading-none flex gap-x-1">
       <FaAngleLeft/> 
         <strong className="block font-semibold"> Previous </strong>
         </p>
     </button>
    )
   }

    {
      step !==4 &&
      (
        <button 
      onClick={() => {
        setStep((prevStep) => {
         if (prevStep < 4) {
           return prevStep + 1; 
         } else {
           return 4; 
         }
       }),  GoToTop()
     }}
     type='button'
     className="flex py-2.5 mx-1 border rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-400 dark:border-gray-600 bg-gray-400 dark:bg-gray-600 cursor-pointer bg-opacity-20 items-center justify-center gap-2 px-4">
       <p className="leading-none flex gap-x-1">
         <strong className="block font-semibold"> Next </strong>
         <FaAngleRight/>
       </p>
      </button>
      )
    }

     
     </ol>
     </div>
</div>

 </div>
 
    <div className=" w-full mx-3 my-3 ">
      
    <button type='submit'    onClick={HandleSubmitForm}
  className="group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-2 text-white focus:outline-none focus:ring-2 active:bg-indigo-500">
  <span className="absolute -start-full  transition-all group-hover:start-4">
   <img src={rightarrow} className="h-5 " alt="" />
  </span>
  <span className="text-sm font-medium transition-all group-hover:ms-4">
  Submit Information
  </span>
  </button>
        
        </div>
        



     
     </div>
      </form>
    </div>
    </div>
    )
})

export default CreateCandidate






