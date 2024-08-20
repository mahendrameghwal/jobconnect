
import { Fragment, useEffect, useState } from "react";
import SearchCandidateCard from "./SearchCandidateCard";
import SearchCandidateInput from "./SearchCandidateInput";
import { useSearchCandidateQuery } from "../../../../app/api/OrgApi";
import Loader from "../../../components/Loader";
import { loadCountries } from "../../../../app/slices/AddressSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CiHome } from "react-icons/ci";
const SearchCandidate = () => {
  const [SearchParams, setSearchParams] = useState({
    searchTerm:'',
    sort: 'desc',
    country: '',
    gender:'',
    noticeperiod:"",
    country:"",
    state:"",
    empstatus:"",
  });
  const address = useSelector((state) => state.address);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCountries());
  }, [dispatch]);
  
  const HandleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    setSearchParams(searchQuery , { replace: true });
  };
  
  const [searchQuery, setSearchQuery] = useState({});
  const {data, isLoading, isError, error,}= useSearchCandidateQuery(SearchParams);
  
if(isLoading){
  return <Loader/>
}




if (isError) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center flex flex-col">
        <h1 className="bg-transparent uppercase text-gray-700">{error?.data?.message}</h1>
        <Link to="/" title="Go to home" className="bg-transparent uppercase m-2 text-gray-700 rounded">
          <div className="flex justify-center">
            <button className="flex capitalize gap-x-1 items-center px-4 py-2 bg-blue-600 transition ease-in-out delay-75 hover:bg-blue-700 text-white text-sm font-medium rounded-md">
              <CiHome/>
              home
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}

    return (
<Fragment>
<SearchCandidateInput 
SearchParams={SearchParams} 
searchQuery={searchQuery} 
setSearchQuery={setSearchQuery} 
address={address} 
HandleSubmit={HandleSubmit}/>


{Array.isArray(data) && data.length > 0 ? <SearchCandidateCard data={data} />:
<div className="company-job-div flex justify-center items-center">
            <div className="flex items-center mx-4">
            <span className="ml-2  text-gray-500 text-xl">result not found</span>
          </div>
            </div>
}




{
  error &&  error.status && error.status  ==='FETCH_ERROR' &&
      <div className="company-job-div flex justify-center items-center">
            <div className="flex items-center mx-4">
            <span className="ml-2  text-gray-500 text-xl">Failed to fetch data</span>
          </div>
            </div>
    }
  


 

</Fragment>
  )
}

export default SearchCandidate