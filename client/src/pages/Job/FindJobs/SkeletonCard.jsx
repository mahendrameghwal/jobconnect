import Skeleton from 'react-loading-skeleton';

const SkeletonCard = () => {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] hover:shadow-md border dark:border-gray-600 relative rounded-md overflow-hidden">
      <div className="p-2 relative">
        <Skeleton className=" skeleton-shimmer absolute right-2 w-16 text-xs  max-md:text-sm" />
        <Skeleton className=" skeleton-shimmer text-lg  " />
        <Skeleton className=" skeleton-shimmer text-sm w-2/5  " />
      </div>

      <div className="p-2">
        <div className="flex flex-wrap mt-1 items-center justify-start gap-x-3">
          {Array(3).fill().map((_, index) => (
            <Skeleton
              key={index}
              className="skeleton-shimmer  px-6 py-1 rounded-sm"
            />
          ))}
        </div>
      </div>

      <div className="p-2 mt-auto">
        <Skeleton className=" skeleton-shimmer w-full  px-5 py-1" />
      </div>
    </div>
  );
};

export default SkeletonCard;