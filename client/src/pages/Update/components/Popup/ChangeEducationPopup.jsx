import { motion } from "framer-motion"
import { FaWindowClose } from "react-icons/fa"
import { useState } from "react"
import { useUpdateCandidateProfileMutation } from "../../../../../app/api/CandidateApi"
import toast from "react-hot-toast"

const ChangeEducationPopup = ({togglePopup, education}) => {
    
    const [UpdateCandidateProfile, {error,data,isError, isLoading, isSuccess}]=useUpdateCandidateProfileMutation()

    const [EducationData , setEducationData ] = useState({
        _id:education._id || null,
        institute: education.institute || "",
        degree: education.degree || "",
        qualification: education.qualification || "",
        startdate:education.startdate || "",
        enddate: education.enddate || "",
        fieldofstudy: education.fieldofstudy || "",
        percentage:education.percentage || ''
    });


   
    // pass data in object from input value   
    const handleChange = (event) => {
        const { name, value } = event.target;
        setEducationData (prevData => ({
            ...prevData,
            [name]: value
        }));     
    };

 // submit to update data of project 

const  HandleSubmitEducation = async (e)=>{
    e.preventDefault()
   await UpdateCandidateProfile({section:"education",action:"update",itemId:EducationData._id, itemData:EducationData })
 togglePopup()

}

if(isSuccess){
    toast.success(data?.message);
}
if(isError){
    toast.error(error?.data?.message || 'something went wrong..') ;
}


 

    return (
        <motion.dialog
        open
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="fixed min-h-screen top-0 left-0 w-full h-full bg-black/80 backdrop-blur-sm bg-opacity-60 flex justify-center items-center z-50"
        >
        <div role="alert" className="max-md:w-11/12 overflow-auto container mx-auto w-full md:w-2/3 max-w-screen-lg">
            <form onSubmit={HandleSubmitEducation} className="relative py-2 px-4 md:py-2 md:px-6 bg-white shadow-md rounded border border-gray-400">
                <div className="flex justify-between mb-1">
                    <p className="text-sm font-bold tracking-wider">Update Education</p>
                    <button onClick={togglePopup} type="button" className="absolute top-1 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                        <FaWindowClose className='w-6 h-5 text-red-500' />
                    </button>
                </div>

                <div className="flex justify-between">
                    <div className="my-1 w-45">
                        <label htmlFor="institute" className="block font-medium text-sm mb-1">Institute</label> 
                        <input  value={EducationData.institute} onChange={handleChange} name="institute" placeholder="Enter institute name" className="w-full py-2 px-3 rounded-md outline-none border border-gray-400 text-sm" type="text" />
                    </div>

                    <div className="my-1 w-45">
                        <label htmlFor="degree" className="block font-medium text-sm mb-1">Degree</label> 
                        <input    value={EducationData.degree} onChange={handleChange} name="degree" placeholder="Enter your degree" className="w-full py-2 px-3 rounded-md outline-none border border-gray-400 text-sm" type="text" />
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="my-1 w-45">
                        <label htmlFor="fieldofstudy" className="block font-medium text-sm mb-1">Field of Study</label>
                        <input   value={EducationData.fieldofstudy} onChange={handleChange} name="fieldofstudy" placeholder="Enter field of study" className="w-full py-2 px-3 rounded-md outline-none border border-gray-400 text-sm" type="text" />
                    </div>

                    <div className="my-1 w-45">
                        <label htmlFor="qualification" className="block font-medium text-sm mb-1">Qualification</label>
                        <input  value={EducationData.qualification} onChange={handleChange} name="qualification" placeholder="Enter qualification" className="w-full py-2 px-3 rounded-md outline-none border border-gray-400 text-sm" type="text" />
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="my-1 w-45">
                        <label htmlFor="startdate" className="block font-medium text-sm mb-1">Start Date</label>
                        <input   value={EducationData.startdate.slice(0, 7)}
                        onChange={handleChange} name="startdate" type="month" className="w-full py-2 px-3 rounded-md border border-gray-400 text-sm" />
                    </div>

                    <div className="my-1 w-45">
                        <label htmlFor="enddate" className="block font-medium text-sm mb-1">End Date</label>
                        <input    value={EducationData.enddate.slice(0, 7)}
                        onChange={handleChange} name="enddate" type="month" className="w-full py-2 px-3 rounded-md border border-gray-400 text-sm" />
                    </div>
                </div>

                <div className="my-1 w-full">
                    <label htmlFor="percentage" className="block font-medium text-sm mb-1">Percentage/CGPA</label>
                    <input value={EducationData.percentage} onChange={handleChange} name="percentage" placeholder="Enter percentage or CGPA" className="w-full py-2 px-3 rounded-md outline-none border border-gray-400 text-sm" type="text" />
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button disabled={isLoading} onClick={togglePopup} type="button" className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
                        Cancel
                    </button>
                    <button onClick={HandleSubmitEducation}  disabled={isLoading} type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md">
                        Save
                    </button>
                </div>
            </form>
        </div>
        </motion.dialog>
    )
}

export default ChangeEducationPopup