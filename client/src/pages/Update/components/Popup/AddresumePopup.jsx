import { motion } from 'framer-motion'
import React, { Fragment, useState } from 'react'
import { RiProfileLine } from "react-icons/ri"
import { useUpdateResumeMutation } from "../../../../../app/api/CandidateApi"
import toast from 'react-hot-toast'

const AddResumePopup = ({ resume, togglePopup }) => {
  
  
  const [file, setFile] = useState(resume.url ? resume.url : '')
  const [UpdateResume, { data,isError, isSuccess, error }] = useUpdateResumeMutation()
  const handleFileChange = (e) => {
      setFile(e.target.files[0])
  }

  const handleUpdateResume = async (e) => {
    e.preventDefault()
    if (!file) {
        toast.error('Please select a file')
        return
    }
    
    const formData = new FormData()
    formData.append('resume', file)
   
    try {
      const res = await UpdateResume(formData)
      if (res.data && res.data.message) {
        toast.success(res.data.message)
      }
    } catch (err) {
      toast.error(err.message || "An error occurred while uploading the resume")
    }
  }

if (isError) {
    toast.error(error?.data?.message || "An error occurred")
}

if (isSuccess) {
    toast.success("Resume updated successfully")
    
  }






  return (
    <Fragment>
    <motion.dialog
        open
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="fixed min-h-screen top-0 left-0 w-full h-full bg-black/80 backdrop-blur-sm bg-opacity-60 flex justify-center items-center z-50"
    >
        <form onSubmit={handleUpdateResume} role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
            <div className="relative py-2 px-3 bg-white shadow-md rounded border border-gray-400">
                <div className="w-full mb-3 bg-grey-lighter">
                    <p className="text-lg font-medium max-md:text-base">Resume</p>
                    <label htmlFor='resume' className="flex flex-col items-center py-6 hover:bg-gray-50 bg-white text-blue rounded-lg tracking-wide capitalize border border-blue cursor-pointer">
                        <RiProfileLine className='w-9 h-8' />
                        <span className="mt-2 text-sm leading-normal">{file.name ? `${file.name}`:'Select a file for resume'}</span>
                        <input id="resume" onChange={handleFileChange} accept=".pdf" type='file' className='hidden' />
                    </label>
                    
                </div>
                <div className="p-2 flex justify-end gap-x-2">
                    <button type='button' onClick={togglePopup} className="inline-flex items-center px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
                        Cancel
                    </button>
                    <button type="submit" className="inline-flex items-center px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md">
                        Upload resume
                    </button>
                </div>
            </div>
        </form>
    </motion.dialog>
</Fragment>
  )
}

export default AddResumePopup