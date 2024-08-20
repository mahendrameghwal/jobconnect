import { Link, useSearchParams } from "react-router-dom";
import { useSearchJobsQuery } from "../../../../app/api/JobApi";
import FindJobCard from "../../../components/FIndJob.card";
import jobtypes from "../../../data/Jobtypes";
import { useEffect, useState } from "react";
import jobCategories from "../../../data/JobCategory";
import { loadCountries } from '../../../../app/slices/AddressSlice';
import { useDispatch, useSelector } from "react-redux";
import sort from "../../../data/Sort";
import Salarydata from "../../../data/Salarydata";
import { debounce } from "lodash";



const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const FindJobs = () => {
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.address);
  const cat = useSelector((state) => state.sendCategory);
  const [searchParams, setSearchParams] = useSearchParams();
  const [userSelect, setUserSelect] = useState({});
  const debouncedUserSelect = useDebounce(userSelect, 2000);

 
  
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setUserSelect(prev => ({ ...prev, category }));
     
    }
  }, [searchParams]);


  const { data, isLoading, error, isError, isSuccess } = useSearchJobsQuery(debouncedUserSelect);

  const updateSearchParams = (key, value) => {
    setSearchParams(prev => {
      if (value) {
        prev.set(key, value);
      } else {
        prev.delete(key);
      }
      return prev;
    });
  };

  const handleInputChange = (propertyName, value) => {
    updateSearchParams(propertyName, value);
    const newUserSelect = { ...userSelect, [propertyName]: value };
    setUserSelect(newUserSelect);
  
  };

  return (
    <section>
      <div className="flex bg-gradient-to-r from-gray-900 to-blue-900  items-center bg-bottom  p-8 md:p-12">
        <section className="bg-smoke-dark max-md:p-2 rounded-md w-full">
          <h1 className="capitalize text-2xl md:text-3xl tracking-wider text-center font-medium mb-3 text-white">Find your dream Jobs</h1>
          <div className="flex flex-wrap items-end -mx-3 max-md:-mx-5">
            <div className="w-full mb-1 justify-between max-md:flex-col flex px-3 max-md:px-0">
              <InputField 
                label="Job title" 
                name="title" 
                value={searchParams.get('title') || ''} 
                onChange={handleInputChange} 
              />
              <SelectField 
                label="Category" 
                name="category" 
                value={searchParams.get('category') || ''} 
                onChange={handleInputChange}
                options={jobCategories}
                optionKey="name"
              />
              <SelectField 
                label="Job Types" 
                name="jobtype" 
                value={searchParams.get('jobtype') || ''} 
                onChange={handleInputChange}
                options={jobtypes}
                optionKey="time"
              />
            </div>
            <div className="w-full justify-between max-md:flex-col flex-row flex px-3 max-md:px-0">
              <SelectField 
                label="Country" 
                name="country" 
                value={searchParams.get('country') || ''} 
                onChange={handleInputChange}
                options={countries}
                optionKey="name"
              />
              <SelectField 
                label="Sort by" 
                name="sort" 
                value={searchParams.get('sort') || ''} 
                onChange={handleInputChange}
                options={sort}
                optionKey="sortby"
              />
              <SelectField 
                label="Salary" 
                name="salary" 
                value={searchParams.get('salary') || ''} 
                onChange={handleInputChange}
                options={Salarydata}
                optionKey="range"
              />
            </div>
          </div>
        </section>
      </div>

      {isLoading && <LoadingSpinner />}
      {isError && error.data && error.data.message && <ErrorMessage error={error} />}
      {error && error.status === 'FETCH_ERROR' && <FetchErrorMessage />}
      {isSuccess && <FindJobCard data={data} error={error} isError={isError} isSuccess={isSuccess} />}

      <section className="flex justify-center my-2">
        <button className="rounded-md inline-flex items-center justify-center py-1 transition-colors tracking-wider px-7 text-center font-normal text-blue-800 border border-blue-500 bg-transparent hover:bg-blue-500 hover:text-white disabled:bg-gray-500/80 disabled:border-gray-500/80 disabled:text-black/50">
          View more
        </button>
      </section>
    </section>
  );
};

const InputField = ({ label, name, value, onChange }) => (
  <section className="w-33 mb-1 max-md:w-full">
    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor={name}>{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      name={name}
      className="block w-full max-md:py-1.5 bg-grey-lighter text-grey-darker border border-grey-lighter rounded-sm py-2.5 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
      type="search"
      placeholder={label}
    />
  </section>
);

const SelectField = ({ label, name, value, onChange, options, optionKey }) => (
  <section className="w-33 mb-1 max-md:w-full">
    <div className="w-full md:mb-0">
      <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor={name}>{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          name={name}
          className="block max-md:py-1.5 w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-2.5 px-1 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-grey"
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options && options.map((option, index) => (
            <option key={option.id || index} value={option[optionKey].toLowerCase()}>
              {option[optionKey]}
            </option>
          ))}
        </select>
      </div>
    </div>
  </section>
);

const LoadingSpinner = () => (
  <div className="min-h-screen flex justify-center items-center max-h-full">
    <div className="flex flex-row gap-2 items-center justify-center">
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
    </div>
  </div>
);

const ErrorMessage = ({ error }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center flex flex-col">
      <h1 className="bg-transparent uppercase text-gray-700">{error.data.message}</h1>
      <Link to='/' title="Go to home" className="bg-transparent uppercase m-2 text-gray-700 rounded">
        <div className="flex justify-center">
          <button className="flex capitalize gap-x-1 items-center px-4 py-2 bg-blue-600 transition ease-in-out delay-75 hover:bg-blue-700 text-white text-sm font-medium rounded-md">
            <svg width="12px" height="12px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
              {/* SVG path data */}
            </svg>
            Take me Home
          </button>
        </div>
      </Link>
    </div>
  </div>
);

const FetchErrorMessage = () => (
  <div className=" company-job-div flex justify-center items-center">
    <div className="flex items-center mx-4">
      <span className="ml-2 text-gray-500 text-xl">Failed to fetch data</span>
    </div>
  </div>
);

export default FindJobs;