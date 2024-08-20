import React, { useState } from 'react'
import { FiEdit  } from "react-icons/fi"
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import { TiMessageTyping } from "react-icons/ti";
import { motion } from 'framer-motion';
const PhoneCall = () => {
    const [selectedItem, setSelectedItem] = useState('');

  const handleChange = (event) => {
    setSelectedItem(event.target.value);
  };

  return (

    <motion.div
    initial={{ opacity: 0, scale:1 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.6 }}
    className="grid grid-cols-1 grid-flow-dense sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
      {/* Your grid items */}
    
      <div className="border relative border-gray-300 shadow-sm hover:shadow-md  rounded-lg bg-gray-100">
     
     
 
  <figure className=' flex items-center p-2 gap-x-2'>
  <img className='w-16 h-16 object-cover rounded-full' src="https://tailwindcss.com/_next/static/media/sarah-dayan.de9b3815.jpg" alt="avatar" />
    <figcaption className='flex flex-col gap-x-1'>
    <span className='capitalize font-medium text-sm tracking-wider max-md:font-normal'>Communication skill: 3/5</span>
    <span className='capitalize font-medium text-sm tracking-wider max-md:font-normal'>Knowlwdge skill: 3/5</span>
    <span className='capitalize font-medium text-sm tracking-wider max-md:font-normal'> skill match: 3/5</span>
   <section className=' overflow-hidden flex gap-2 mt-1 justify-between'>
   <button className="flex gap-x-1 items-center bg-green-500 text-white  font-medium capitalize text-xs px-5 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none   ease-linear transition-all duration-150" type="button" >next <IoIosArrowRoundForward/></button>
   <button className="flex gap-x-1 items-center bg-red-500 text-white  font-medium capitalize text-xs px-5 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none   ease-linear transition-all duration-150" type="button" >reject <IoIosArrowRoundBack/></button>
   <button className="flex gap-x-1 items-center bg-custom-blue text-white  font-medium capitalize text-xs px-5 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none   ease-linear transition-all duration-150" type="button" >message <TiMessageTyping /></button>
  
   </section>
     </figcaption>
     </figure>
  <span className='absolute right-0 top-1 z-50 cursor-pointer'>
  <FiEdit />
  </span>
     </div>
  
   

          


     
    </motion.div>
  )
}

export default PhoneCall