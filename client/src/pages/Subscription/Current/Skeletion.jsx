import React, {Fragment} from 'react'
import Skeleton from 'react-loading-skeleton'

const Skeletion = () => {
  return (
    <Fragment>
    
    <div className="bg-blue-50 dark:bg-gray-900 dark:border dark:border-gray-600 rounded-md shadow p-6 transition-colors duration-200">
      <div className="mb-4">
        <h2 className="text-xl font-semibold"><Skeleton className='skeleton-shimmer' width={150} /></h2>
        <p className="text-sm text-gray-600 dark:text-gray-400"><Skeleton className='skeleton-shimmer' width={200} /></p>
      </div>
  
      <div className="flex justify-between items-center">
        <div>
          {/* Subscription Name and Date Skeleton */}
          <Skeleton className='skeleton-shimmer' width={200} height={30} />
          <Skeleton className='skeleton-shimmer' width={250} height={20} style={{ marginTop: 10 }} />
        </div>
  
        <div className="text-right">
          {/* Price and Status Skeleton */}
          <Skeleton className='skeleton-shimmer' width={100} height={30} />
          <Skeleton className='skeleton-shimmer' width={100} height={20} style={{ marginTop: 10 }} />
        </div>
      </div>
    </div>
    </Fragment>
  
  )
}

export default Skeletion