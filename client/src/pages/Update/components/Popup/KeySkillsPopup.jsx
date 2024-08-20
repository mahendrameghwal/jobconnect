import { motion } from "framer-motion"

import skillcategory from "../../../../data/skillcategory"
import { BiX } from "react-icons/bi"
import { FaWindowClose } from "react-icons/fa"
import { useUpdateCandidateProfileMutation } from "../../../../../app/api/CandidateApi"
import { toast } from "react-hot-toast"
import { useState } from "react"


const KeySkillsPopup = ({skills , togglePopup}) => {
  
  const [currentSkill, setCurrentSkill] = useState({ skilltype: '', name: '' });

  const [UpdateCandidateProfile, {error,data, isError, isSuccess,isLoading}]=useUpdateCandidateProfileMutation()


  const HandleDeleteSkill = async(Id)=>{
    await    UpdateCandidateProfile({section:"skills",action:"remove",itemId:Id});
   skills && Array.isArray(skills) && skills.length == 1 && toast.error('at least one skills is required ');
  }
 
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentSkill(prevSkill => ({ ...prevSkill, [name]: value }));
  };

  const handleAddSkill = async () => {
    if (currentSkill.skilltype && currentSkill.name) {
     await UpdateCandidateProfile({
      section:"skills",
      action: 'add',
      itemData: currentSkill,
    });
      setCurrentSkill({ skilltype: '', name: '' });
    }
  };



  return (
    <motion.dialog
    open
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -50, opacity: 0 }}
    className="fixed min-h-screen  top-0 left-0 w-full h-full bg-black/80 backdrop-blur-sm bg-opacity-60 flex justify-center items-center z-50"
    >
    <div  role="alert" className="container  mx-auto w-11/12 md:w-2/3 max-w-2xl">
        <div className="relative py-2 px-3 bg-white shadow-md rounded border border-gray-400">
    
     <div className="flex justify-between mb-3 max-md:mb-1">
     <p className="text-sm font-bold tracking-wider">update or delete skills</p>
     <button onClick={togglePopup} type="button" className="absolute top-1 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
     <FaWindowClose className='w-6 h-5 text-red-500' />
   </button>
     </div>
    
      <div  className="flex flex-wrap justify-start gap-x-2 items-center  text-sm py-1 my-1 text-gray-700 rounded-lg tracking-wider   ">

      {
        skills && Array.isArray(skills) && skills.length < 1 &&  <span className="   font-normal text-base max-md:text-sm  text-red-500">Provide add some Skills</span>
      }
     
    
      {
        skills && Array.isArray(skills) && skills.length > 0 && skills.map(({name, _id})=>(<div key={_id} className="relative px-3 py-0.5 mb-1">
        <BiX onClick={()=>HandleDeleteSkill(_id)} title={`delete ${name}`}className="absolute right-1 bg-gray-300 border cursor-pointer w-5 h-5 rounded-full -top-2  text-red-600"/>
        <span className="cursor-pointer bg-gray-200/60  my-1 font-medium text-base max-md:text-sm  px-3 py-1 ">{name}</span>
        </div>))
      }
    
      </div>
     <div className="flex max-md:flex-col mb-2 justify-between gap-x-2">
     {
      skillcategory && <select name="skilltype" 
      onChange={handleInputChange}  value={currentSkill.skilltype}
      className="w-45 pl-1 max-md:my-1 focus:border focus:border-blue-600 outline-none rounded-md py-2 border border-gray-200"
      
      >
      {skillcategory.map(({ type },i) => (
        <option key={i} value={type}>{type}</option>
      ))}
    </select>
     }
     <input  onChange={handleInputChange}   value={currentSkill.name}
     name="name"
     placeholder="add your skills" className=" skills  w-4/5 max-md:w-full p-2 focus:border-blue-600 rounded-md outline-none  border border-gray-200" type="text" />
     </div>
     <button onClick={handleAddSkill} className="inline-flex max-md:my2 items-center px-6 py-2 max-md:w-fit max-md:mt-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md">Add Skills</button>
      <div className=" p-2 mt-4  flex justify-end gap-x-2 ">
      <button disabled={isLoading} onClick={togglePopup} className="inline-flex items-center px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
      cancel
      </button>
      <button onClick={togglePopup} className="inline-flex items-center px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md">
        Save
      </button>
    </div>
    
      </div>

        
        </div>
        
    </motion.dialog>
  )
}

export default KeySkillsPopup