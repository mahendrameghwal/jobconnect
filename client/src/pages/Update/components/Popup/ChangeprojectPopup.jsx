import { motion } from "framer-motion"
import { FaWindowClose } from "react-icons/fa"
import skillcategory from "../../../../data/skillcategory"
import { BiX } from "react-icons/bi"
import { useState } from "react"
import {toast} from "react-hot-toast"
import { useUpdateCandidateProfileMutation } from "../../../../../app/api/CandidateApi"




const ChangeprojectPopup = ({togglePopup, project}) => {
    const [currentSkill, setCurrentSkill] = useState({ category: "", name: "" });
    const [UpdateCandidateProfile, {error,data,isError, isLoading, isSuccess}]=useUpdateCandidateProfileMutation()

    const [ProjectData , setProjectData ] = useState({
        _id:project._id || null,
        title: project.title || "",
        status: project.status || "",
        startdate: project.startdate || "",
        enddate: project.enddate || "",
        sourcelink: project.sourcelink || "",
        livelink: project.livelink || "",
        projectskill: project.projectskill || [],
        description:project.description || ''
    });


       // add skill in project object 
       const handleAddSkill = () => {
        if (currentSkill.category && currentSkill.name) {
            setProjectData (prevData => ({
                ...prevData,
                projectskill: [...prevData.projectskill, currentSkill]
            }));
            setCurrentSkill({ category: "", name: "" });
        }
    };


    // make array of skill
    const handleSkillChange = (e) => {
        const { name, value } = e.target;
        setCurrentSkill(prevSkill => ({ ...prevSkill, [name]: value }));
    };

    // pass data in object from input value   
    const handleChange = (event) => {
        const { name, value } = event.target;
        setProjectData (prevData => ({
            ...prevData,
            [name]: value
        }));     
    };

 // submit to update data of project 

const  HandleSubmitProject = async (e)=>{
    e.preventDefault()
   await UpdateCandidateProfile({section:"project",action:"update",itemId:ProjectData._id, itemData:ProjectData })
   togglePopup()
   }

if(isSuccess){
    toast.success(data?.message || 'an error occurred..')
}
if(isError){
    toast.error(error?.data?.message || 'something went wrong..') 
}

const HandledeleteSkill = (index) => {
    setProjectData(prevData => ({
        ...prevData,
        projectskill: prevData.projectskill.filter((_, i) => i !== index)
    }));
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
          <form onSubmit={HandleSubmitProject} >
          <div  className="flex justify-between">

<div className="my-1 w-45">
<label htmlFor="title"  className="block font-medium text-sm mb-1">Project title</label> 
<input  name="title" onChange={handleChange} value={ProjectData.title} placeholder="Enter Proejct title" className=" focus:border-blue-600    w-full py-2 px-3 rounded-md outline-none border border-gray-400 text-sm" type="text" />
</div>



<div className="my-1 w-45">
<label htmlFor="status" className="block font-medium text-sm mb-1">current status of project</label> 
<select  name="status" onChange={handleChange} value={ProjectData.status} className="w-full py-2 px-3 rounded-md outline-none border focus:border-blue-600  border-gray-400   text-sm">
<option  value="in progress">in progress</option>
<option value="finished">finished</option>

</select>
</div>

</div>

          <div className="flex justify-between">
          
          <div className="my-1 w-45">
  <label htmlFor="startdate" className="block font-medium text-sm mb-1">Start Date</label>
  <input 
    onChange={handleChange} 
   
    value={ProjectData.startdate.slice(0, 7)} 
    name="startdate" 
    type="month" 
    className="w-full py-2 px-3 outline-none focus:border-blue-600 border-gray-400 rounded-md border text-sm"
  />
</div>


<div className="my-1 w-45">
<label htmlFor="enddate" className="block font-medium text-sm mb-1">End Date</label>
<input 
  onChange={handleChange} 
  
  value={ProjectData.enddate.slice(0, 7)} 
  name="enddate" 
  type="month" 
  className="w-full py-2 px-3 outline-none focus:border-blue-600 border-gray-400 rounded-md border text-sm"
/>
</div>
          </div>

          <div  className="flex justify-between">

          <div className="my-1 w-45">
          <label htmlFor="sourcelink"  className="block font-medium text-sm mb-1">Source link</label> 
          <input  name="sourcelink" onChange={handleChange} value={ProjectData.sourcelink} placeholder="Source link of project" className="w-full   focus:border-blue-600  py-2 px-3 rounded-md outline-none border border-gray-400 text-sm" type="text" />
          </div>
          
          <div className="my-1 w-45">
          <label htmlFor="livelink"  className="block font-medium text-sm mb-1">live link</label> 
          <input   name="livelink" onChange={handleChange} value={ProjectData.livelink} placeholder="live link of project" className="w-full py-2 px-3 focus:border-blue-600 rounded-md outline-none border border-gray-400 text-sm" type="text" />
          </div>
          
          
          </div>
          
          <div className="w-full">
          <label className="font-medium text-sm mb-1 block" htmlFor="description">project description</label>
            <textarea placeholder="something about your project..." rows={3} onChange={handleChange} value={ProjectData.description} className="w-full resize-none border-gray-400  border py-2 px-2 focus:border-blue-600 rounded-md outline-none  text-sm" name="description" />

            </div>
            <div className="flex mb-1 justify-between gap-x-2">
            <div className="w-45">
                <label className="font-medium text-sm mb-1 block" htmlFor="skillCategory">Skill category</label>
                <select  
                value={currentSkill.category} 
                onChange={handleSkillChange} 
                className="w-full border py-2 px-2 focus:border-blue-600 rounded-md outline-none text-sm" name="category">
                    <option value="">Select category</option>
                    {skillcategory.map(({type,id}) => (
                        <option key={id} value={type}>{type}</option>
                    ))}
                </select>
            </div>

            <div className="w-45">
                <label className="font-medium text-sm mb-1 block" htmlFor="skillName">Skill name</label>
                <input      value={currentSkill.name}   onChange={handleSkillChange} name="name" placeholder="Add skills here" className="skills max-md:w-full p-2 focus:border-blue-600 rounded-md outline-none border border-gray-200" type="text" />
            </div>
        </div>

        <div className="w-30 flex my-3 items-center">
            <button onClick={handleAddSkill} type="button" className="border px-4 text-white hover:text-slate-100 py-1 text-sm bg-blue-500">Add skill</button>
        </div>

        <section className="flex gap-2 flex-wrap">
            {
                ProjectData.projectskill.map(({name,_id}, index)=>{
                    return  <div key={_id} className="relative  ">
                    <BiX  onClick={()=>HandledeleteSkill(index) } className="absolute -top-2 bg-gray-200/45 text-red-600 -right-1 cursor-pointer "/>
                    <span className="bg-gray-200 font-normal px-3 py-0.5 rounded-sm">{name}</span>  
                    </div>
                })
            }
        </section>
    

          <div className="mt-6 flex justify-end gap-3">
            <button  type="button" onClick={togglePopup} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
              Cancel
            </button>
            <button type="submit" onClick={HandleSubmitProject}  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md">
              Save
            </button>
            </div>
            </form>
        </div>
      </div>
    </motion.dialog>
  )
}

export default ChangeprojectPopup