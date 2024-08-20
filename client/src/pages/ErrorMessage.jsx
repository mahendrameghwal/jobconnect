import React from 'react'
import { Link } from 'react-router-dom'

const ErrorMessage = () => {
  return (
    <div  className=" bg-gray-100 w-full  px-16 md:px-0 h-screen flex items-center justify-center">
    <div className=" border-gray-100 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
        <p className="text-gray-500 mt-4 pb-4 border-b-2 text-center">Sorry, the page you are looking for could not be found.</p>
            <Link className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 mt-6 rounded transition duration-150" to='/'>Return Home</Link>
    </div>
</div>
  )
}

export default ErrorMessage