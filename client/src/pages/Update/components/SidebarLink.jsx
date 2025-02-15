import React from 'react'
import useSticky from '../../../../hooks/Usesticky'
import { useSignOutMutation } from '../../../../app/api/authApi'
import toast from 'react-hot-toast'
import { logout } from '../../../../app/slices/Authslice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const SidebarLink = ({focusSection, Permisson}) => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

    const isSticky =useSticky()

   const [SignOut,{isLoading,isError,error,isSuccess,data}]= useSignOutMutation()



   const HandleLogout = async ()=>{
      await SignOut().unwrap()
    }
    
    if(isError){
      toast(error?.data?.message)
    }
    if(isSuccess){
      toast(data?.message)
      dispatch(logout())
      navigate('/')

   }

  return (
    <aside>
  <div
    className={
      isSticky
        ? "sidebar rounded-2xl sticky top-24 p-2 w-[300px] max-xl:w-[250px] max-lg:hidden max-md:hidden dark:bg-gray-900/95 overflow-y-auto text-center shadow-md bg-white dark:bg-gray-800 dark:shadow-gray-900"
        : "rounded-2xl max-md:hidden w-[300px] max-xl:w-[250px] max-lg:hidden shadow-md bg-white dark:bg-gray-900/95 dark:shadow-gray-900 p-2 overflow-y-auto text-center"
    }
  >
    <div className="">
      <div className="p-1 mt-1 flex items-center">
        <span className="font-medium text-custom-blue text-[15px] ml-3 dark:text-custom-blue-300">
          Quick Links
        </span>
      </div>
      <div className="border border-gray-300 dark:border-gray-700"></div>
    </div>
    <button
      onClick={() => focusSection('profileintro')}
      className="p-1.5 w-full mt-3 flex items-center rounded-md px-4 duration-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <span className="text-[15px] font-normal dark:text-gray-300">
        Profile Overview
      </span>
    </button>
    <button
      onClick={() => focusSection('resume')}
      className="p-1.5 w-full mt-3 flex items-center rounded-md px-4 duration-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <span className="text-[15px] font-normal dark:text-gray-300">
        Resume
      </span>
    </button>
    <button
      onClick={() => focusSection('employment')}
      className="p-1.5 w-full mt-3 flex items-center rounded-md px-4 duration-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <span className="text-[15px] font-normal dark:text-gray-300">
        Employment
      </span>
    </button>
    <button
      onClick={() => focusSection('project')}
      className="p-1.5 mt-3 w-full flex items-center rounded-md px-4 duration-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <span className="text-[15px] font-normal dark:text-gray-300">
        Project
      </span>
    </button>
    <button
      type="button"
      onClick={() => focusSection('skill')}
      className="p-1.5 mt-3 w-full flex items-center rounded-md px-4 duration-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <span className="text-[15px] font-normal dark:text-gray-300">
        Skill
      </span>
    </button>
    <button
      onClick={() => focusSection('education')}
      className="p-1.5 w-full mt-3 flex items-center rounded-md px-4 duration-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <span className="text-[15px] font-normal dark:text-gray-300">
        Education
      </span>
    </button>
    <button
      onClick={() => focusSection('social')}
      className="p-1.5 w-full mt-3 flex items-center rounded-md px-4 duration-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <span className="text-[15px] font-normal dark:text-gray-300">
        Social
      </span>
    </button>
    <button
      onClick={() => focusSection('language')}
      className="p-1.5 mt-3 w-full flex items-center rounded-md px-4 duration-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <span className="text-[15px] font-normal dark:text-gray-300">
        Language
      </span>
    </button>
    {Permisson && (
      <button
        onClick={() => HandleLogout()}
        disabled={isLoading}
        className="p-1.5 w-full mt-3 flex items-center rounded-md px-4 duration-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <span className="text-[15px] font-normal dark:text-gray-300">
          Logout
        </span>
      </button>
    )}
  </div>
</aside>

  )
}

export default SidebarLink