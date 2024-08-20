import { motion } from "framer-motion";
import { FaWindowClose } from "react-icons/fa";
import { useEditCandidateInformationMutation } from "../../../../../app/api/CandidateApi";
import { useState } from "react";
import toast from "react-hot-toast";


const SummaryPopup = ({togglePopup, summary}) => {
  
  const [formdata, setFormData]= useState({   summary: summary || '',})
  const [EditCandidateInformation]=useEditCandidateInformationMutation()
  
  
  const HandleInput= (value)=>{
  
    setFormData({summary:value})
  }
  
   const HandleSubmitSummary = async (e)=>{
         e.preventDefault()
         const { data, error } = await EditCandidateInformation(formdata);
         if (data.message) {
           togglePopup();
           toast.success(data.message);
         }
         if (error) {
           toast.error(error.message);
         }
   }

  return (
    <motion.dialog 
    open
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -50, opacity: 0 }}
    className="fixed min-h-screen top-0 left-0 w-full h-full bg-black/80 backdrop-blur-sm bg-opacity-60 flex justify-center items-center z-50"
    >
    <form onSubmit={HandleSubmitSummary} role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
        <div className="relative py-2 px-3 bg-white shadow-md rounded border border-gray-400">
    
     <div className="flex justify-between mb-1">
     <p className="text-sm font-bold tracking-wider"> Summary</p>
     <button onClick={togglePopup} type="button" className="absolute top-1 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
     <FaWindowClose className='w-6 h-5 text-red-500' />
   </button>
     </div>
      <div className="my-1">
      <span className="text-sm text-center   text-gray-500">
      It is the first thing recruiters notice in your profile. Write concisely what makes you unique and right person for the job you are looking for.
      </span>
      </div>
      <textarea onChange={(e)=>HandleInput(e.target.value)} defaultValue={summary} rows="5" cols="33" placeholder=" explain your summary here " className="w-full p-2 focus:border-blue-600 rounded-md outline-none shadow-lg border border-gray-400" type="text" />
        
      <div className=" p-2 flex justify-end gap-x-2">
      <button onClick={togglePopup} className="inline-flex items-center px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
      
      cancel
    
      </button>
    
    
    
      <button type="submit" onSubmit={HandleSubmitSummary} className="inline-flex items-center px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md">
        Save
      </button>
    </div>
    
      </div>

        
        </form>
        
    </motion.dialog>

  )
}

export default SummaryPopup