import { motion } from 'framer-motion'
import React from 'react'
import { FiEdit } from 'react-icons/fi'

const VerifcationProcess = () => {
  return (
    <motion.div 
    initial={{ opacity: 0, scale:1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
    className="grid grid-cols-1 grid-flow-dense sm:grid-cols-2  lg:grid-cols-3 gap-3 mt-3">
    <div className="border relative border-gray-300 shadow-sm hover:shadow-md  rounded-lg bg-gray-100">
    <figure className=' flex  items-center p-2 gap-x-3'>
    <img className='w-16 h-16 object-cover rounded-full' src="https://tailwindcss.com/_next/static/media/sarah-dayan.de9b3815.jpg" alt="avatar" />
      <figcaption className='flex w-3/4  max-md:w-1/2 flex-col gap-x-1'>
      <span className='capitalize font-medium text-sm tracking-wider max-md:font-normal'>John Doe</span>
      <span className='capitalize font-medium text-gray-500 text-sm tracking-wider max-md:font-normal'>Software engineer</span>
    
      <section className=' flex flex-col gap-x-1  '>
      
     <button className=" mb-1.5 bg-green-500 text-white  font-medium capitalize text-xs px-5 py-1.5 rounded-sm  shadow hover:shadow-md outline-none focus:outline-none   ease-linear transition-all duration-150" type="button" >Request for Verifcation</button>
     <button className=" mb-1.5 bg-red-500 text-white  font-medium capitalize text-xs px-5 py-1.5 rounded-sm  shadow hover:shadow-md outline-none focus:outline-none   ease-linear transition-all duration-150" type="button" >reject</button>
     <button className="mb-1.5 bg-custom-blue text-white  font-medium capitalize text-xs px-5 py-1.5 rounded-sm  shadow hover:shadow-md outline-none focus:outline-none   ease-linear transition-all duration-150" type="button" >Message</button>
     </section>
     
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
         <section className=' flex flex-col gap-x-1  '>
        <button className=" mb-1.5 border border-gray-400 bg-gray-200 text-gray-800  font-medium capitalize text-xs px-5 py-1.5 rounded-sm shadow hover:shadow-md outline-none focus:outline-none   ease-linear transition-all duration-150"  >alredy Verified</button>
        <button className="mb-1.5  bg-red-500 text-white  font-medium capitalize text-xs px-5 py-1.5 rounded-sm shadow hover:shadow-md outline-none focus:outline-none   ease-linear transition-all duration-150" type="button" >reject</button>
        <button className="mb-1.5 bg-custom-blue text-white  font-medium capitalize text-xs px-5 py-1.5 rounded-sm shadow hover:shadow-md outline-none focus:outline-none   ease-linear transition-all duration-150" type="button" >Message</button>
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

export default VerifcationProcess