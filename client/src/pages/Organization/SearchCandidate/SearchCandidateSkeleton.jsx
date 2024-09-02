import React from 'react'
import Skeleton from 'react-loading-skeleton';

const SearchCandidateSkeleton = () => {
  return (
    <div className="border p-3 dark:border-gray-600 rounded">
      <div className="flex justify-between items-center">
        <Skeleton circle={true} className="h-8 w-8 skeleton-shimmer " />
        <Skeleton className="border dark:border-none px-4 py-1 rounded-md w-20 skeleton-shimmer " />
      </div>
      <section className="flex flex-col mt-3">
        <Skeleton count={2} className="w-4/5 py-1 my-1 skeleton-shimmer " />
        <Skeleton className="my-1 h-10 skeleton-shimmer " />
      </section>
    </div>
  )
}

export default SearchCandidateSkeleton


