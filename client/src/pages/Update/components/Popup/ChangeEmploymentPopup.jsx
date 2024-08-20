import { motion } from "framer-motion"
import skillcategory from "../../../../data/skillcategory"
import Joblevel from "../../../../data/Joblevel"
import Jobtype from "../../../../data/Jobtypes"
import jobCategories from "../../../../data/JobCategory"
import { FaWindowClose } from "react-icons/fa"
import { useState } from "react"
import {formatISO}  from "date-fns"
import { useUpdateCandidateProfileMutation } from "../../../../../app/api/CandidateApi"
import toast from "react-hot-toast"
import { BiX } from "react-icons/bi"

const ChangeEmploymentPopup = ({togglePopup, employment}) => {
    const [currentSkill, setCurrentSkill] = useState({ category: "", name: "" });
    const [UpdateCandidateProfile, {error,data,isError, isLoading, isSuccess}]=useUpdateCandidateProfileMutation()

    const [EmploymentData, setEmploymentData] = useState({
        _id:employment._id || null,
        orgname: employment.orgname || "",
        position: employment.position || "",
        startdate: employment.startdate || "",
        enddate: employment.enddate || "",
        empcategory: employment.empcategory || "",
        emptype: employment.emptype || "",
        emplevel: employment.emplevel || "",
        workskills: employment.workskills || []
         
    });


   // add skill in employment object 
    const handleAddSkill = () => {
        if (currentSkill.category && currentSkill.name) {
            setEmploymentData(prevData => ({
                ...prevData,
                workskills: [...prevData.workskills, currentSkill]
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
        setEmploymentData(prevData => ({
            ...prevData,
            [name]: value
        }));     
    };




 // submit to update data of employment 

const  HandleSubmitUpdateEmployment = async (e)=>{
    e.preventDefault()
   await UpdateCandidateProfile({section:"employment",action:"update",itemId:EmploymentData._id,itemData:EmploymentData})
 togglePopup()

  

}

if(isSuccess){
    toast.success(data.message)
}
if(isError){
    toast.error(error?.data?.message)
}



const HandledeleteSkill = (index) => {
    setEmploymentData(prevData => ({
        ...prevData,
        workskills: prevData.workskills.filter((_, i) => i !== index)
    }));
};


    return (
        <motion.dialog
        open
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="fixed min-h-screen top-0 left-0 w-full h-full bg-black/80 backdrop-blur-sm bg-opacity-60 flex justify-center items-center z-50"
        >
        <div role="alert" className="max-md:w-11/12 overflow-auto container mx-auto w-full md:w-2/3 max-w-screen-lg">
            <form onSubmit={HandleSubmitUpdateEmployment} className="relative py-2 px-4 md:py-2 md:px-6 bg-white shadow-md rounded border border-gray-400">
                <div className="flex justify-between mb-1">
                    <p className="text-sm font-bold tracking-wider">Add employment</p>
                    <button onClick={togglePopup} type="button" className="absolute top-1 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                        <FaWindowClose className='w-6 h-5 text-red-500' />
                    </button>
                </div>

                <div className="flex justify-between">
                    <div className="my-1 w-45">
                        <label htmlFor="orgname" className="block font-medium text-sm mb-1">Company name</label> 
                        <input value={EmploymentData.orgname} onChange={handleChange} name="orgname" placeholder="Enter company name" className="w-full py-2 px-3 rounded-md outline-none border border-gray-400 text-sm" type="text" />
                    </div>

                    <div className="my-1 w-45">
                        <label htmlFor="position" className="block font-medium text-sm mb-1">Position</label> 
                        <input value={EmploymentData.position} onChange={handleChange} name="position" placeholder="Enter your position" className="w-full py-2 px-3 rounded-md outline-none border border-gray-400 text-sm" type="text" />
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="my-1 w-45">
                        <label htmlFor="startdate" className="block font-medium text-sm mb-1">Start Date</label>
                        <input defaultValue={EmploymentData.startdate.slice(0, 7)} 
                        onChange={handleChange} name="startdate" type="month" className="w-full py-2 px-3 rounded-md border border-gray-400 text-sm" />
                    </div>

                    <div className="my-1 w-45">
                        <label htmlFor="enddate" className="block font-medium text-sm mb-1">End Date</label>
                        <input defaultValue={EmploymentData.enddate.slice(0, 7)} 
                        onChange={handleChange}   name="enddate" type="month" className="w-full py-2 px-3 rounded-md border border-gray-400 text-sm" />
                    </div>
                </div>

                <div className="my-1 flex justify-between">
                    <div className="w-45">
                        <label className="font-medium text-sm mb-1 block" htmlFor="empcategory">Category</label>
                        <select value={EmploymentData.empcategory} onChange={handleChange} className="w-full border py-2 px-3 focus:border-blue-600 rounded-md outline-none text-sm" name="empcategory">
                            <option value="">Select category</option>
                            {jobCategories.map(({name,id}) => (
                                <option key={id} value={name}>{name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-45">
                        <label className="font-medium text-sm mb-1 block" htmlFor="emptype">Type</label>
                        <select value={EmploymentData.emptype} onChange={handleChange} className="w-full border py-2 px-3 focus:border-blue-600 rounded-md outline-none text-sm" name="emptype">
                            <option value="">Select type</option>
                            {Jobtype.map(({time,id}) => (
                                <option key={id} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="w-full">
                    <label className="font-medium text-sm mb-1 block" htmlFor="emplevel">Level</label>
                    <select value={EmploymentData.emplevel} onChange={handleChange} className="w-full border py-2 px-2 focus:border-blue-600 rounded-md outline-none text-sm" name="emplevel">
                        <option value="">Select level</option>
                        {Joblevel.map(({level,id}) => (
                            <option key={id} value={level}>{level}</option>
                        ))}
                    </select>
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
                        EmploymentData.workskills.map(({name}, index)=>{
                            return  <div className="relative  ">
                            <BiX  onClick={()=>HandledeleteSkill(index) } className="absolute -top-2 bg-gray-200/45 text-red-600 -right-1 cursor-pointer "/>
                            <span className="bg-gray-200 font-normal px-3 py-0.5 rounded-sm">{name}</span>  
                            </div>
                        })
                    }
                </section>

                <div className="mt-6 flex justify-end gap-3">
                    <button disabled={isLoading} onClick={togglePopup} type="button" className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
                        Cancel
                    </button>
                    <button disabled={isLoading} onSubmit={HandleSubmitUpdateEmployment} type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md">
                        Save
                    </button>
                </div>
            </form>
        </div>
        </motion.dialog>
    )
}

export default ChangeEmploymentPopup