import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { FaChevronRight } from "react-icons/fa";
import { format } from 'date-fns';

const Allchats = ({AllchattingUserError, AllchattingUserInformation ,  recipient}) => {
const Navigate = useNavigate()

console.log(AllchattingUserInformation);




  return (
 
    <div  className={`bg-white dark:bg-gray-900/30 dark:border-gray-600 chat-scrollbar border overflow-y-auto h-screen w-1/3 max-md:w-full transition duration-500 ease-in-out transform  `}>
 {/*
//     <span className='font-medium flex  justify-start px-4 text-custom-blue'>active user</span>
//         <div className=" px-2  overflow-x-auto flex flex-row "
//         >
//           <section className="flex flex-col cursor-pointer  border rounded-lg bg-gray-200 hover:bg-gray-300 mx-2 m-1  py-1 items-center">
//             <div className="relative mx-5">
//               <FaUserCircle className="w-10 h-10 rounded-full" />
//               <span className="absolute bottom-0 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
//             </div>
//             <span className="text-xs ">John Doe</span>
//           </section>
          
//  </div>*/}
 
     {
      AllchattingUserError || !AllchattingUserInformation || AllchattingUserInformation < 1 && (
        <div className='flex justify-center items-center min-h-60%'>
      <p className='text-sm tracking-wide text-gray-400'> User not available for Chat</p>
      </div>
      )
     }

     {
     Array.isArray(AllchattingUserInformation) && AllchattingUserInformation.map(({avtar,name,id})=>(
        <div key={id} onClick={()=> Navigate(`/chat/${id}`)} className={`${recipient==id && 'bg-blue-300/40 '} dark:border-gray-600 relative hover:bg-[#b9d1e954]/20 border border-gray-200   cursor-pointer  px-2  border-collapse  flex items-center`}>
        
        <div className="absolute top-0.5 right-0.5">
          <div className="bg-gray-300 px-2 max-md:hidden  text-gray-600 border border-gray-400 rounded-sm text-xs flex items-center">
            Joined 1 days ago
          </div>
        </div>
        <div className="absolute bottom-1 right-0.5">
          <div className="bg-green-300 justify-center w-6 h-4 text-green-700 border border-gray-400 rounded-full text-xs flex items-center">
            02
          </div>
        </div>
        {
          avtar ?  <img src={`${avtar}`} className="w-10 h-20 max-md:w-8 max-md:h-12 object-contain  rounded-full mr-4" />:
          <FaUserCircle className="w-10 h-20 max-md:w-8 max-md:h-12 dark:text-gray-200 rounded-full mr-4" />

        }
        <div className="flex-1">
          <h2 className="text-sm dark:text-gray-300 font-normal">{name}</h2>
        </div>
      </div>
      ))
     }
      

    
 
     
    </div>
  );
};

export default Allchats;
