import { useEffect, useState } from 'react';
import {ThreeDots} from 'react-loader-spinner'



const Loader = () => {

  return (
 
    <div 
    initial={{ opacity: 0, scale:1 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className='min-h-screen fixed z-50 top-0 overflow-visible bg-blue-200 bg-opacity-40   w-full bottom-0 grid place-items-center'>
    <ThreeDots  height="70"  width="70"  radius="9" color="#0307fc"  ariaLabel="three-dots-loading"  wrapperClassName="" visible={true}/>
    </div> 
    
  
  )
}

export default Loader;