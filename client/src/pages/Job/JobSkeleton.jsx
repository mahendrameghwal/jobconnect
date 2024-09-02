import React from 'react'
import Skeleton from 'react-loading-skeleton'



const JobSkeleton = () => {
  return (
    
    
    <div 
    className="grid grid-rows-[auto_1fr_auto] border dark:border-gray-600 rounded-sm  transition-shadow duration-300 overflow-hidden h-full">
        <div className="px-4 py-2">
          <div className='flex justify-between items-center mb-3'>
            <Skeleton className='skeleton-shimmer' circle={true} height={40} width={40} />
            <Skeleton className='skeleton-shimmer' height={20} width={80} />
          </div>
        </div>
        
        <div className="px-4 py-2">
          <Skeleton className='skeleton-shimmer' height={24} width={`80%`} />
          <Skeleton className='skeleton-shimmer' height={16} width={`60%`} />
        </div>
        
        <div className="px-2 py-2 mt-auto">
          <Skeleton className='skeleton-shimmer' height={36} width={`100%`} />
        </div>
      </div>
   
  )
}

export default JobSkeleton;