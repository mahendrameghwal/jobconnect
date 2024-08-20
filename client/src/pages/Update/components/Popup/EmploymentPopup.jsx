import { motion } from "framer-motion"
import jobCategories from "../../../../data/JobCategory"
import { FaWindowClose } from "react-icons/fa"
import Jobtype from "../../../../data/Jobtypes"
import skillcategory from "../../../../data/skillcategory"
import { BiX } from "react-icons/bi"
import Joblevel from "../../../../data/Joblevel";
import { useState } from "react"
import {toast} from "react-hot-toast"
import { useUpdateCandidateProfileMutation} from "../../../../../app/api/CandidateApi"



const EmploymentPopup = ({togglePopup, employment}) => {
  const [workSkills, setWorkSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ category: '', name: '' });
  
  const [UpdateCandidateProfile, {error,data,isError, isSuccess,isLoading}]=useUpdateCandidateProfileMutation()
  const [EmpData, setEmpData] = useState({
    empcategory: "",
    emplevel: "",
    emptype: "",
    enddate: "",
    orgname: "",
    position: "",
    startdate: "",
    workskills: workSkills
  });

 const HandleSubmitEmployment =async()=>{
  await UpdateCandidateProfile({section:"employment",action:"add",itemData:EmpData})
  togglePopup()

 }

 if(isError){
  toast.error(error.data?.message ||'an error occurred...');
}
if(isSuccess)
{
  toast.success(data?.message ||'something went wrong...');

}

  

const deleteSkill = (index)=>{
 
   const UndeletedSkill = workSkills.filter(x=>x.name!==workSkills[index].name)
   
setWorkSkills(UndeletedSkill)
}
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmpData(prev => ({ ...prev,[name]: value}));
  };


  const handleSkillChange = (e) => {
    const { name, value } = e.target;
    setNewSkill(prev => ({ ...prev, [name]: value }));
  };

  const addSkill = () => {
    if (newSkill.category && newSkill.name) {
      setWorkSkills(prev => [...prev, newSkill]);
      setEmpData(prev => ({...prev,workskills: [...prev.workskills, newSkill]}));
      setNewSkill({ category: '', name: '' });
    }else{
           toast.error('Please Provide some skill')      
    }
  };

  return (
    <motion.dialog
      open
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      className="fixed min-h-screen overflow-hidden max-h-full top-0 left-0 w-full h-full bg-black/80 backdrop-blur-sm bg-opacity-60 flex justify-center items-center z-50"
    >


    <div role="alert" className="max-md:w-11/12 overflow-auto container mx-auto w-full md:w-2/3 max-w-screen-lg">
        <div className="relative  py-2 px-4 md:py-2 md:px-6 bg-white shadow-md rounded border border-gray-400">
          <div className="flex justify-between mb-1">
            <p className="text-sm font-bold tracking-wider">Add employment</p>
            <button onClick={togglePopup} type="button" className="absolute top-1 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
            <FaWindowClose className='w-6 h-5 text-red-500' />
          </button>
          </div>
          <div  className="flex justify-between">

<div className="my-1 w-45">
<label htmlFor="orgname"  className="block font-medium text-sm mb-1">Company name</label> 
<input  name="orgname" onChange={handleInputChange} value={EmpData.orgname} placeholder="Enter company name" className="w-full py-2 px-3 rounded-md outline-none border border-gray-400 text-sm" type="text" />
</div>



<div className="my-1 w-45">
<label htmlFor="position" className="block font-medium text-sm mb-1">Position</label> 
<input  name="position" onChange={handleInputChange}  value={EmpData.position} placeholder="Enter your position" className="w-full py-2 px-3 rounded-md outline-none border border-gray-400 text-sm" type="text" />
</div>

</div>

          <div className="flex justify-between">
          <div className="my-1 w-45">
            <label htmlFor="startdate" className="block font-medium text-sm mb-1">Start Date</label>
            <input  onChange={handleInputChange} value={EmpData.startdate} name="startdate" type="month" className="w-full py-2 px-3 rounded-md border border-gray-400 text-sm" />
          </div>

          <div className="my-1 w-45">
            <label htmlFor="enddate" className="block font-medium text-sm mb-1">End Date</label>
            <input onChange={handleInputChange} value={EmpData.enddate} name="enddate" type="month" className="w-full py-2 px-3 rounded-md border border-gray-400 text-sm" />
          </div>
          </div>

          <div className="my-1 flex justify-between">
            <div className="w-45">
            <label className="font-medium text-sm mb-1 block" htmlFor="empcategory"> category</label>
            <select value={EmpData.empcategory} onChange={handleInputChange}  className="w-full border py-2 px-3 focus:border-blue-600 rounded-md outline-none  text-sm" name="empcategory" >
              <option disabled value="">Select category</option>
              {jobCategories.map(({name,id}) => (
                <option key={id} value={name}>{name}</option>
              ))}
            </select>
            </div>
            <div className="w-45">
            <label className="font-medium text-sm mb-1 block" htmlFor="emptype"> type</label>
            <select onChange={handleInputChange} value={EmpData.emptype} className="w-full border py-2 px-3 focus:border-blue-600 rounded-md outline-none  text-sm" name="emptype" id="">
              <option disabled value="">Select type</option>
              {Jobtype.map(({time,id}) => (
                <option key={id} value={time}>{time}</option>
              ))}
            </select>
            </div>
          </div>
          <div className="w-full">
          <label className="font-medium text-sm mb-1 block" htmlFor="emplevel">Level</label>
            <select onChange={handleInputChange} value={EmpData.emplevel} className="w-full border py-2 px-2 focus:border-blue-600 rounded-md outline-none  text-sm" name="emplevel" >
              <option disabled value="">Select category</option>
              {Joblevel.map(({level,id}) => (
                <option key={id} value={level}>{level}</option>
              ))}
            </select>
            </div>

    

          <div className="flex  mb-1 justify-between gap-x-2">
          <div className="w-45">
          <label  className="font-medium text-sm mb-1 block" htmlFor="category">Skill category</label>
            <select   value={newSkill.category}
            onChange={handleSkillChange} className="w-full border py-2 px-2 focus:border-blue-600 rounded-md outline-none  text-sm" name="category" id="">
              <option disabled value="">Select category</option>
              {skillcategory.map(({type,id}) => (
                <option key={id} value={type}>{type}</option>
              ))}
            </select>
            </div>


            <div className="w-45 ">
            <label className="font-medium text-sm mb-1 block" htmlFor="name">Skill name</label>
            <input value={newSkill.name}
            onChange={handleSkillChange}
            name="name"
            placeholder="add skills here" className=" skills   max-md:w-full p-2 focus:border-blue-600 rounded-md outline-none  border border-gray-200" type="text" />
            
            </div>

            </div>
            <div className="w-30 flex my-3 items-center">
          
           <button onClick={addSkill} className="border px-4 text-white hover:text-slate-100 py-1 text-sm bg-blue-500">Add skill</button>
            </div>
            <section className="flex gap-2 flex-wrap">
   {
    workSkills.map(({name},index)=>(
      <div className="relative px-1 py-0.5 mb-0.5">
      <BiX onClick={()=>deleteSkill(index)} className="absolute -right-1  bg-gray-300 border cursor-pointer w-5 h-5 rounded-full -top-2  text-red-600"/>
      <span className="bg-gray-200/60  my-1 font-normal text-sm max-md:text-sm  px-3 py-1 ">{name}</span>
      </div>
    ))
   }
  
      </section>
          <div className="mt-6 flex justify-end gap-3">
            <button disabled={isLoading} onClick={togglePopup} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
              Cancel
            </button>
            <button onClick={HandleSubmitEmployment} disabled={isLoading} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md">
              Save
            </button>
          </div>
        </div>
      </div>
    </motion.dialog>
  )
}

export default EmploymentPopup