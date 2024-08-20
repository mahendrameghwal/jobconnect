import React from 'react'
import { FaCheck } from "react-icons/fa6";
const SentSuccess = () => {
  return (
  
    <div class="min-h-screen mx-auto p-12 bg-white rounded-md shadow-md">
        <div class="flex items-center justify-center mb-4">
            <div class="bg-gray-100 rounded-full w-20 h-20 flex justify-center items-center">
            <FaCheck class="checkmark text-green-600 text-5xl"/>
            </div>
        </div>
        <div className='text-center'>
        <h1 class="text-3xl font-bold text-green-600 mb-2">Email send Successfully</h1>
        <p class="text-lg text-gray-600">We sent your email Please check email </p>
        </div>
    </div>

  )
}

export default SentSuccess