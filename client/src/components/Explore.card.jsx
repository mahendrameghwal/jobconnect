import { useGetJobcategoryQuery } from "../../app/api/JobApi";
import jobCategories from "../data/JobCategory";
import { selectionCategory } from "../../app/slices/Sendcategory";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdCategory } from "react-icons/md";
import JobSkeleton from "../pages/Job/JobSkeleton";


const ExploreCard = () => {
  const dispatch = useDispatch();
  const { isError, isLoading, data, error } = useGetJobcategoryQuery();
  const navigate = useNavigate();

  const SelectandNavigatePageChange = (cat) => {
    dispatch(selectionCategory(cat));
    navigate(`/post/search?category=${encodeURIComponent(cat.toLowerCase())}`);
  };

  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 my-16 max-md:my-12 auto-rows-fr grid-flow-dense">
        {Array(4).fill().map((_, index) => (
          <JobSkeleton key={index} />
        ))}
      </div>
    );
  }
  
  if (isError) {
    return (
      <div className="flex justify-center items-center">
        <pre className='text-red-500 dark:text-red-300'>{error?.data?.message}</pre>
      </div>
    );
  }

  return (
    
      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 my-16 max-md:my-12 auto-rows-fr grid-flow-dense">
        {data.map((item, i) => {
          const category = jobCategories.find(cat => cat.name.toLowerCase() === item.toLowerCase());
          const Icon = category ? category.icon : MdCategory;
          return (
            <div
              onClick={() => SelectandNavigatePageChange(item)}
              key={i}
              className="hover:cursor-pointer hover:shadow-md border striped-border dark:bg-gray-900/30  bg-gray-50 p-6 px-2"
            >
              <Icon size={25} className="text-blue-500" />
              <section className="flex flex-col">
                <p className="font-bold  text-gray-700 dark:text-gray-50 my-3 text-sm tracking-widest capitalize flex flex-wrap">{item}</p>
              </section>
            </div>
          );
        })}
      </div>
   
  );
};

export default ExploreCard;

