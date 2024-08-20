import { motion } from "framer-motion"
import { FaWindowClose } from "react-icons/fa"
import skillcategory from "../../../../data/skillcategory"
import { BiX } from "react-icons/bi"
import { useState } from "react"
import {toast} from "react-hot-toast"
import { useUpdateCandidateProfileMutation } from "../../../../../app/api/CandidateApi"




const AddprojectPopup = ({togglePopup}) => {
  const [Projectskill, setProjectskill] = useState([]);
  const [newSkill, setNewSkill] = useState({ category: '', name: '' });
  const [UpdateCandidateProfile, {isError,isSuccess,error,}] =useUpdateCandidateProfileMutation()

  const [ProjectData, setProjectData] = useState({
    title: "",
    status: "",
    description: "",
    startdate: "",
    enddate: "",
    sourcelink: "",
    livelink: "",
    projectskill: Projectskill
  });




 const SubmitPorject =async(e)=>{
  e.preventDefault()
  await UpdateCandidateProfile({section:"project",action:"add",itemData:ProjectData})
  togglePopup()

 }
 
if(isError ){
  toast.error(error.data?.message || "An error occurred");
}
if(isSuccess){
  toast.error(data?.message || "something went wrong");
}


  

const deleteSkill = (index)=>{
   const UndeletedSkill = Projectskill.filter(x=>x.name!==Projectskill[index].name)
   setProjectskill(UndeletedSkill)
}
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData(prev => ({ ...prev,[name]: value}));
  };

  const handleSkillChange = (e) => {
    const { name, value } = e.target;
    setNewSkill(prev => ({ ...prev, [name]: value }));
  };

  const addSkill = () => {
    if (newSkill.category && newSkill.name) {
      setProjectskill(prev => [...prev, newSkill]);
      setProjectData(prev => ({...prev,projectskill: [...prev.projectskill, newSkill]}));
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


    <div role="alert" className="max-md:w-11/12 overflow-auto container mx-auto w-full md:w-1/2 max-w-screen-lg">
        <div className="relative  py-2 px-4 md:py-2 md:px-6 bg-white shadow-md rounded border border-gray-400">
          <div className="flex justify-between mb-1">
            <p className="text-sm font-bold tracking-wider">Add a project</p>
            <button onClick={togglePopup} type="button" className="absolute top-1 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
            <FaWindowClose className='w-6 h-5 text-red-500' />
          </button>
          </div>
          <form onSubmit={SubmitPorject} >
          <div  className="flex justify-between">

<div className="my-1 w-45">
<label htmlFor="title"  className="block font-medium text-sm mb-1">Project title</label> 
<input  name="title" onChange={handleInputChange} value={ProjectData.title} placeholder="Enter company name" className=" focus:border-blue-600    w-full py-2 px-3 rounded-md outline-none border border-gray-400 text-sm" type="text" />
</div>



<div className="my-1 w-45">
<label htmlFor="status" className="block font-medium text-sm mb-1">current status of project</label> 
<select   onChange={handleInputChange}  value={ProjectData.status}  className="w-full py-2 px-3 rounded-md outline-none border focus:border-blue-600  border-gray-400   text-sm" name="status" id="">
<option  value="in progress">in progress</option>
<option value="finished">finished</option>

</select>
</div>

</div>

          <div className="flex justify-between">
          <div className="my-1 w-45">
            <label htmlFor="startdate" className="block font-medium text-sm mb-1">Start Date</label>
            <input  onChange={handleInputChange} value={ProjectData.startdate} name="startdate" type="month" className="w-full py-2 px-3 outline-none  focus:border-blue-600  border-gray-400 rounded-md border  text-sm" />
          </div>

          <div className="my-1 w-45">
            <label htmlFor="enddate" className="block font-medium text-sm mb-1">End Date</label>
            <input onChange={handleInputChange} value={ProjectData.enddate} name="enddate" type="month" className="w-full py-2 px-3 outline-none  focus:border-blue-600  border-gray-400 rounded-md border  text-sm"/>
          </div>
          </div>

          <div  className="flex justify-between">

          <div className="my-1 w-45">
          <label htmlFor="sourcelink"  className="block font-medium text-sm mb-1">Source link</label> 
          <input  name="sourcelink" onChange={handleInputChange} value={ProjectData.sourcelink} placeholder="Source link of project" className="w-full   focus:border-blue-600  py-2 px-3 rounded-md outline-none border border-gray-400 text-sm" type="text" />
          </div>
          
          <div className="my-1 w-45">
          <label htmlFor="livelink"  className="block font-medium text-sm mb-1">live link</label> 
          <input   name="livelink" onChange={handleInputChange} value={ProjectData.livelink} placeholder="live link of project" className="w-full py-2 px-3 focus:border-blue-600 rounded-md outline-none border border-gray-400 text-sm" type="text" />
          </div>
          
          
          </div>
          
          <div className="w-full">
          <label className="font-medium text-sm mb-1 block" htmlFor="description">project description</label>
            <textarea placeholder="something about your project..." rows={3} onChange={handleInputChange} value={ProjectData.description} className="w-full resize-none border-gray-400  border py-2 px-2 focus:border-blue-600 rounded-md outline-none  text-sm" name="description" />

            </div>

    

          <div className="flex  mb-1 justify-between gap-x-2">
          <div className="w-45">
          <label  className="font-medium text-sm mb-1 block" htmlFor="category">Skill category</label>
            <select   value={newSkill.category}
            onChange={handleSkillChange} className="w-full border py-2 px-2  border-gray-400 focus:border-blue-600 rounded-md outline-none  text-sm" name="category" id="">
              <option disabled value="">Select category</option>
              {skillcategory.map(({type,id}) => (
                <option key={id} value={type}>{type}</option>
              ))}
            </select>
            </div>


            <div className="w-45 ">
            <label className="font-medium text-sm mb-1 block " htmlFor="name">Skill name</label>
            <input value={newSkill.name}
            onChange={handleSkillChange}
            name="name"
            placeholder="add skills here" className="  border-gray-400   max-md:w-full p-2 focus:border-blue-600 rounded-md outline-none  border " type="text" />
            
            </div>

            </div>
            <div className="w-30 flex my-3 items-center">
          
           <button onClick={addSkill} className="border px-4 text-white hover:text-slate-100 py-1 text-sm bg-blue-500">Add skill</button>
            </div>
            <section className="flex gap-2 flex-wrap">
   {
    Projectskill.map(({name},index)=>(
      <div className="relative px-1 py-0.5 mb-0.5">
      <BiX type="button" onClick={()=>deleteSkill(index)} className="absolute -right-1  bg-gray-300 border cursor-pointer w-5 h-5 rounded-full -top-2  text-red-600"/>
      <span className="bg-gray-200/60  my-1 font-normal text-sm max-md:text-sm  px-3 py-1 ">{name}</span>
      </div>
    ))
   }
  
      </section>
          <div className="mt-6 flex justify-end gap-3">
            <button  type="button" onClick={togglePopup} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
              Cancel
            </button>
            <button type="submit" onClick={SubmitPorject}  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md">
              Save
            </button>
            </div>
            </form>
        </div>
      </div>
    </motion.dialog>
  )
}

export default AddprojectPopup