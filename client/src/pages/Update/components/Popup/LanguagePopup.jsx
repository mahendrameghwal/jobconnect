import { motion } from "framer-motion"
import { BiX } from "react-icons/bi"
import { FaWindowClose } from "react-icons/fa"
import { toast } from "react-hot-toast"
import { Fragment, useState } from "react"

import { useUpdateCandidateProfileMutation } from "../../../../../app/api/CandidateApi"
import proficiency from "../../../../data/proficiency"

import languages from "../../../../data/Languages"

const LanguagePopup = ({languagedata , togglePopup}) => {

  const [currentlanguage, setCurrentlanguage] = useState({ proficiency: '', lan: '' });

  
  const [UpdateCandidateProfile, {error,data, isError, isSuccess,isLoading}]=useUpdateCandidateProfileMutation()


  const HandleDeleteLanguage = async(Id)=>{
    await    UpdateCandidateProfile({section:"language",action:"remove",itemId:Id});
    languagedata && Array.isArray(languagedata) && languagedata.length == 1 && toast.error('at least one language is required ');
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentlanguage(prevlanguage => ({ ...prevlanguage, [name]: value }));
  };

  const handleAddlanguage = async () => {
    if (currentlanguage.proficiency && currentlanguage.lan) {
     await UpdateCandidateProfile({
      section:"language",
      action: 'add',
      itemData: currentlanguage,
    });
      setCurrentlanguage({ proficiency: '', lan: '' });
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
     <p className="text-sm font-bold tracking-wider">update language</p>
     <button onClick={togglePopup} type="button" className="absolute top-1 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
     <FaWindowClose className='w-6 h-5 text-red-500' />
   </button>
     </div>
    
      <div  className="flex flex-wrap justify-start gap-x-2 items-center  text-sm py-1 my-1 text-gray-700 rounded-lg tracking-wider   ">

      {
        languagedata && Array.isArray(languagedata) && languagedata.length < 1 &&  <span className="   font-normal text-sm  text-red-500">Provide language</span>
      }
     
    
    <div className="flex w-full flex-col">
    <div className="flex  flex-wrap">
    {languagedata && Array.isArray(languagedata) && languagedata.map(({ proficiency, lan, _id }) => (
       
   <div key={_id} className="relative  my-1 flex bg-gray-300 flex-col  px-1 py-0.5 w-full ">
       <div className="flex  justify-between items-center">
           <span className="cursor-pointer  font-medium text-xs">{proficiency}</span>
           <BiX onClick={() => HandleDeleteLanguage(_id)} title={`delete ${lan} `} className="bg-gray-100 top-0 border cursor-pointer w-5 h-5 rounded-full text-red-600" />
       </div>
       <span className="cursor-pointer  font-medium text-xs">{lan}</span>
   </div>
       
    ))}

  

    
</div>

    </div>
    
      </div>
      <div className="flex w-full flex-wrap gap-x-2 mb-2">
      <div className="w-full  flex flex-col">
          <label className="text-gray-600" htmlFor="proficiency">Language Proficiency</label>
          <select name="proficiency" 
                  onChange={handleInputChange}  
                  value={currentlanguage.proficiency} 
                  className="w-full md:w-45 pl-1 md:pl-0 max-md:my-1 focus:border focus:border-blue-600 outline-none rounded-md py-2 border border-gray-200"
          >
              {proficiency.map(({ level, id }) => (
                  <option key={id} value={level}>{level}</option>
              ))}
          </select>
      </div>
      
      <div className="w-full  flex flex-col">
          <label className="text-gray-600" htmlFor="lan">Language name</label>
          <select name="lan" 
                  onChange={handleInputChange}  
                  value={currentlanguage.lan} 
                  className="w-full md:w-45 pl-1 md:pl-0 max-md:my-1 focus:border focus:border-blue-600 outline-none rounded-md py-2 border border-gray-200"
          >
              {languages.map(({ code,name }) => (
                  <option key={code} value={name}>{name}</option>
              ))}
          </select>
      </div>
  </div>
  
     <button onClick={handleAddlanguage} className="inline-flex max-md:my2 items-center px-6 py-2 max-md:w-fit max-md:mt-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md">Add Skills</button>
      <div className=" p-2 mt-4  flex justify-end gap-x-2 ">
      <button onClick={togglePopup} className="inline-flex items-center px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
      cancel
      </button>
      <button onClick={togglePopup}  className="inline-flex items-center px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md">
        Save
      </button>
    </div>
    
      </div>

        
        </div>
        
    </motion.dialog>
  )
}

export default LanguagePopup