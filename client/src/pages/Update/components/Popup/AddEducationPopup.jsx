import { motion } from "framer-motion"
import { FaWindowClose } from "react-icons/fa"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { useUpdateCandidateProfileMutation } from "../../../../../app/api/CandidateApi"
import { validateDateRange } from "../../../../utils/RangeValidator"

const AddEducationPopup = ({ togglePopup }) => {
  const [UpdateCandidateProfile, {error,data, isError, isSuccess}] = useUpdateCandidateProfileMutation()
  
  const [educationData, setEducationData] = useState({
    institute: "",
    degree: "",
    fieldofstudy: "",
    qualification: "",
    startdate: "",
    enddate: "",
    percentage: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'startdate' || name === 'enddate') {
      const isValid = validateDateRange(
        name === 'startdate' ? value : educationData.startdate,
        name === 'enddate' ? value : educationData.enddate,
        name
      );
  
      if (!isValid) return;
    }
    setEducationData(prev => ({ ...prev, [name]: value }));
  };

  const submitEducation = async (e) => {
    e.preventDefault()
    try {
      await UpdateCandidateProfile({section:"education", action: "add", itemData: educationData })
      togglePopup()
     
    } catch (error) {
        toast.error(error.data?.message || "An error occurred");
    }
}

if(isError){
    toast.error(error.data?.message || "An error occurred");
}
if(isSuccess){
    toast.error(data?.message || "something went wrong");
}




  return (
    <motion.dialog
      open
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      className="fixed min-h-screen overflow-hidden max-h-full top-0 left-0 w-full h-full bg-black/80 backdrop-blur-sm bg-opacity-60 flex justify-center items-center z-50"
    >
      <div role="alert" className="max-md:w-11/12 overflow-auto container mx-auto w-full md:w-1/2 max-w-screen-lg">
        <div className="relative py-2 px-4 md:py-2 md:px-6 bg-white shadow-md rounded border border-gray-400">
          <div className="flex justify-between mb-1">
           
            <button  onClick={togglePopup} type="button" className="absolute top-1 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
              <FaWindowClose className='w-6 h-5 text-red-500' />
            </button>
          </div>
          <form onSubmit={submitEducation}>
            <div className="flex justify-between">
              <div className="my-1 w-45">
                <label htmlFor="institute" className="block font-medium text-sm mb-1">Institute</label>
                <input name="institute" onChange={handleInputChange} value={educationData.institute} placeholder="Enter institute name" className="focus:border-blue-600 w-full py-2 px-3 rounded-md outline-none border border-gray-400 text-sm" type="text" />
              </div>

              <div className="my-1 w-45">
                <label htmlFor="degree" className="block font-medium text-sm mb-1">Degree</label>
                <input name="degree" onChange={handleInputChange} value={educationData.degree} placeholder="Enter degree" className="focus:border-blue-600 w-full py-2 px-3 rounded-md outline-none border border-gray-400 text-sm" type="text" />
              </div>
            </div>

            <div className="flex justify-between">
              <div className="my-1 w-45">
                <label htmlFor="fieldofstudy" className="block font-medium text-sm mb-1">Field of Study</label>
                <input name="fieldofstudy" onChange={handleInputChange} value={educationData.fieldofstudy} placeholder="Enter field of study" className="focus:border-blue-600 w-full py-2 px-3 rounded-md outline-none border border-gray-400 text-sm" type="text" />
              </div>

              <div className="my-1 w-45">
                <label htmlFor="qualification" className="block font-medium text-sm mb-1">Qualification</label>
                <input name="qualification" onChange={handleInputChange} value={educationData.qualification} placeholder="Enter qualification" className="focus:border-blue-600 w-full py-2 px-3 rounded-md outline-none border border-gray-400 text-sm" type="text" />
              </div>
            </div>

            <div className="flex justify-between">
              <div className="my-1 w-45">
                <label htmlFor="startdate" className="block font-medium text-sm mb-1">Start Date</label>
                <input onChange={handleInputChange} value={educationData.startdate} name="startdate" type="month" className="w-full py-2 px-3 outline-none focus:border-blue-600 border-gray-400 rounded-md border text-sm" />
              </div>

              <div className="my-1 w-45">
                <label htmlFor="enddate" className="block font-medium text-sm mb-1">End Date</label>
                <input onChange={handleInputChange} value={educationData.enddate} name="enddate" type="month" className="w-full py-2 px-3 outline-none focus:border-blue-600 border-gray-400 rounded-md border text-sm" />
              </div>
            </div>

            <div className="my-1 w-full">
              <label htmlFor="percentage" className="block font-medium text-sm mb-1">Percentage/CGPA</label>
              <input name="percentage" onChange={handleInputChange} value={educationData.percentage} placeholder="Enter percentage or CGPA" className="focus:border-blue-600 w-full py-2 px-3 rounded-md outline-none border border-gray-400 text-sm" type="text" />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={togglePopup} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.dialog>
  )
}

export default AddEducationPopup