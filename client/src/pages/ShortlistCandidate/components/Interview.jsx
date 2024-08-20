import React from 'react'
import { FiEdit } from 'react-icons/fi'
import {motion} from "framer-motion"
const Interview = () => {
  return (
    <motion.div 
    initial={{ opacity: 0, scale:1 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.6 }}
    className="grid grid-cols-1 grid-flow-dense sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
    <div className="border relative border-gray-300 shadow-sm hover:shadow-md  rounded-lg bg-gray-100">
    <figure className=' flex  items-center p-2 gap-x-3'>
    <img className='w-16 h-16 object-cover rounded-full' src="https://tailwindcss.com/_next/static/media/sarah-dayan.de9b3815.jpg" alt="avatar" />
      <figcaption className='flex w-3/4  max-md:w-1/2 flex-col gap-x-1'>
      <span className='capitalize font-medium text-sm tracking-wider max-md:font-normal'>John Doe</span>
      <span className='capitalize font-medium text-gray-500 text-sm tracking-wider max-md:font-normal'>Software engineer</span>
      <section className=' flex gap-x-1  '>
      
     <button className=" mb-1 w-1/2 bg-green-500 text-white  font-medium capitalize text-xs px-5 py-1.5 rounded shadow hover:shadow-md outline-none focus:outline-none   ease-linear transition-all duration-150" type="button" >Next stage</button>
     <button className=" mb-1 w-1/2 bg-red-500 text-white  font-medium capitalize text-xs px-5 py-1.5 rounded shadow hover:shadow-md outline-none focus:outline-none   ease-linear transition-all duration-150" type="button" >reject</button>
     </section>
      <button className="bg-custom-blue text-white  font-medium capitalize text-xs px-5 py-1.5 rounded shadow hover:shadow-md outline-none focus:outline-none   ease-linear transition-all duration-150" type="button" >Message</button>
     
       </figcaption>
       </figure>
    <span className='absolute right-0 top-1 z-50 cursor-pointer'>
    <FiEdit />
    </span>
       </div>
       
       <div className="border relative border-gray-300 shadow-sm hover:shadow-md  rounded-lg bg-gray-100">
       <figure className=' flex  items-center p-2 gap-x-3'>
       <img className='w-16 h-16 object-cover rounded-full' src="https://tailwindcss.com/_next/static/media/sarah-dayan.de9b3815.jpg" alt="avatar" />
         <figcaption className='flex w-3/4  max-md:w-1/2 flex-col gap-x-1'>
         <span className='capitalize font-medium text-sm tracking-wider max-md:font-normal'>John Doe</span>
         <span className='capitalize font-medium text-gray-500 text-sm tracking-wider max-md:font-normal'>Software engineer</span>
         <section className=' flex gap-x-1  '>
        <button className=" mb-1 w-1/2 bg-green-500 text-white  font-medium capitalize text-xs px-5 py-1.5 rounded shadow hover:shadow-md outline-none focus:outline-none   ease-linear transition-all duration-150" type="button" >Next stage</button>
        <button className=" mb-1 w-1/2 bg-red-500 text-white  font-medium capitalize text-xs px-5 py-1.5 rounded shadow hover:shadow-md outline-none focus:outline-none   ease-linear transition-all duration-150" type="button" >reject</button>
        </section>
         <button className="bg-custom-blue text-white  font-medium capitalize text-xs px-5 py-1.5 rounded shadow hover:shadow-md outline-none focus:outline-none   ease-linear transition-all duration-150" type="button" >Message</button>
          </figcaption>
          </figure>
       <span className='absolute right-0 top-1 z-50 cursor-pointer'>
       <FiEdit />
       </span>
          </div>
        
     
    </motion.div>
  )
}

export default Interview