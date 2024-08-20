import { motion } from "framer-motion"
import skillcategory from "../../../data/skillcategory"
import Joblevel from "../../../data/Joblevel"
import Jobtype from "../../../data/Jobtypes"
import jobCategories from "../../../data/JobCategory"
import { FaWindowClose } from "react-icons/fa"
import { useEffect, useMemo, useState, useCallback } from "react"
import { useUpdateJobInformationMutation } from "../../../../app/api/JobApi"
import toast from "react-hot-toast";
import { BiX } from "react-icons/bi";
import {Country,State,City} from "country-state-city";
import { loadCities, loadCountries, loadStates } from '../../../../app/slices/AddressSlice';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { v4 as uuidv4 } from 'uuid';
const UpdateJobPopUp = ({togglePopup, job}) => {
    const navigate = useNavigate()
    const [currentSkill, setCurrentSkill] = useState("");
    const [currentResponsibility, setCurrentResponsibility] = useState("");
    const [UpdateJobInformation, { error, data, isError, isLoading, isSuccess }] = useUpdateJobInformationMutation();
    
    const [JobData, setJobData] = useState({
        _id: job._id || null,
        title: job.title || "",
        jobId: job.jobId || "",
        city: job.city || "",
        state: job.state || "",
        country: job.country || "",
        salary: job.salary || "",
        jobtype: job.jobtype || "",
        joblevel: job.joblevel || "",
        NumberOfPost: job.NumberOfPost || 1,
        category: job.category || "",
        skills: job.skills || [],
        shortdesc: job.shortdesc || "",
        responsibilities: job.responsibilities || []
    });


    const dispatch = useDispatch();
  
    const { countries, states, cities } = useSelector((state) => state.address);

  
    // Memoize the loadCountries dispatch
    const memoizedLoadCountries = useCallback(() => {
      dispatch(loadCountries());
    }, [dispatch]);
  
    // Memoize the loadStates and loadCities dispatches
    const memoizedLoadStatesAndCities = useCallback((countryIsoCode) => {
      dispatch(loadStates(countryIsoCode));
      dispatch(loadCities(countryIsoCode));
    }, [dispatch]);
  
    // Use useMemo to memoize the country finding logic
    const selectedCountry = useMemo(() => {
      return countries.find(c => c.name === JobData.country);
    }, [countries, JobData.country]);
  
    useEffect(() => {
      memoizedLoadCountries();
    }, [memoizedLoadCountries]);
  
    useEffect(() => {
      if (selectedCountry?.isoCode) {
        memoizedLoadStatesAndCities(selectedCountry.isoCode);
      }
    }, [selectedCountry, memoizedLoadStatesAndCities]);
  
    // Memoize the country, state, and city options
    const countryOptions = useMemo(() => {
      return countries.map(country => (
        <option key={`${JobData.country}-${uuidv4()}`} value={country.name}>{country.name}</option>
      ));
    }, [countries]);
  
    const stateOptions = useMemo(() => {
      return states.map(state => (
        <option key={`${JobData.state}-${uuidv4()}`} value={state.name}>{state.name}</option>
      ));
    }, [states]);
  
    const cityOptions = useMemo(() => {
      return cities.map(city => (
        <option key={`${JobData.city}-${uuidv4()}`} value={city.name}>{city.name}</option>
      ));
    }, [cities]);
  


    const handleAddSkill = () => {
        if (currentSkill) {
            setJobData(prevData => ({
                ...prevData,
                skills: [...prevData.skills, currentSkill]
            }));
            setCurrentSkill("");
        }
    };

    const handleAddResponsibility = () => {
        if (currentResponsibility) {
            setJobData(prevData => ({
                ...prevData,
                responsibilities: [...prevData.responsibilities, currentResponsibility]
            }));
            setCurrentResponsibility("");
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setJobData(prevData => ({
            ...prevData,
            [name]: value
        }));     
    };
    // const { jobId, jobData } = req.body;

    const HandleSubmitUpdateJob = async (e) => {
        e.preventDefault()
        await UpdateJobInformation({jobId: JobData._id, jobData: JobData}).unwrap()
        togglePopup()
   
         
    }

    if(isSuccess){
        toast.success(data.message);
        navigate(`/post/search/about/${data?.job?._id}`)
    }
    if(isError){
        toast.error(error?.data?.message)
    }

    const HandleDeleteSkill = (index) => {
        setJobData(prevData => ({
            ...prevData,
            skills: prevData.skills.filter((_, i) => i !== index)
        }));
    };

    const HandleDeleteResponsibility = (index) => {
        setJobData(prevData => ({
            ...prevData,
            responsibilities: prevData.responsibilities.filter((_, i) => i !== index)
        }));
    };

    return (
        <motion.dialog
        open
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className=" top-0 left-0 w-full  backdrop-blur-sm bg-opacity-60 flex justify-center items-center z-50"
        >
        <div role="alert" className="max-md:w-11/12 overflow-auto container mx-auto w-full md:w-2/3 max-w-screen-lg">
            <form onSubmit={HandleSubmitUpdateJob} className="relative py-2 px-4 md:py-2 md:px-6 bg-white shadow-md rounded border border-gray-400">
                <div className="flex justify-between mb-1">
                    <p className="text-sm font-bold tracking-wider">Update Job</p>
                    <button onClick={togglePopup} type="button" className="absolute top-1 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                        <FaWindowClose className='w-6 h-5 text-red-500' />
                    </button>
                </div>

                <div className="flex justify-between">
                    <div className="my-1 w-full">
                        <label htmlFor="title" className="block font-medium text-sm mb-1">Job Title</label> 
                        <input value={JobData.title} onChange={handleChange} name="title" placeholder="Enter job title" className="w-full py-2 px-3 rounded-md outline-none border border-gray-400 text-sm" type="text" />
                    </div>

                   
                </div>

                <div className="flex justify-between">
                <div className="flex justify-between">
                <div className="my-1 w-30">
                  <label htmlFor="country" className="block font-medium text-sm mb-1">Country</label>
                  <select
                    value={JobData.country}
                    onChange={handleChange}
                  
                    name="country"
                    className="w-full py-2 px-3 rounded-md border border-gray-400 text-sm"
                  >
                    <option value="">Select Country</option>
                    {countryOptions}
                  </select>
                </div>
    
                <div className="my-1 w-30">
                  <label htmlFor="state" className="block font-medium text-sm mb-1">State</label>
                  <select
                    value={JobData.state}
                    onChange={handleChange}
                    

                    name="state"
                    className="w-full py-2 px-3 rounded-md border border-gray-400 text-sm"
                  >
                    <option value="">Select State</option>
                    {stateOptions}
                  </select>
                </div>
    
                <div className="my-1 w-30">
                  <label htmlFor="city" className="block font-medium text-sm mb-1">City</label>
                  <select
                    value={JobData.city}
                    onChange={handleChange}
                    

                    name="city"
                    className="w-full py-2 px-3 rounded-md border border-gray-400 text-sm"
                  >
                    <option value="">Select City</option>
                    {cityOptions}
                  </select>
                </div>
              </div>
    
                </div>

                <div className="flex justify-between">
                    <div className="my-1 w-45">
                        <label htmlFor="salary" className="block font-medium text-sm mb-1">Salary</label>
                        <input value={JobData.salary} onChange={handleChange} name="salary" placeholder="Enter salary" className="w-full py-2 px-3 rounded-md border border-gray-400 text-sm" type="number" />
                    </div>

                    <div className="my-1 w-45">
                        <label htmlFor="NumberOfPost" className="block font-medium text-sm mb-1">Number of Posts</label>
                        <input value={JobData.NumberOfPost} onChange={handleChange} name="NumberOfPost" placeholder="Enter number of posts" className="w-full py-2 px-3 rounded-md border border-gray-400 text-sm" type="number" />
                    </div>
                </div>

                <div className="my-1 flex justify-between">
                    <div className="w-30">
                        <label className="font-medium text-sm mb-1 block" htmlFor="category">Category</label>
                        <select value={JobData.category} onChange={handleChange} className="w-full border py-2 px-3 focus:border-blue-600 rounded-md outline-none text-sm" name="category">
                            <option value="">Select category</option>
                            {jobCategories.map(({name,id}) => (
                                <option key={id} value={name}>{name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-30">
                        <label className="font-medium text-sm mb-1 block" htmlFor="jobtype">Job Type</label>
                        <select value={JobData.jobtype} onChange={handleChange} className="w-full border py-2 px-3 focus:border-blue-600 rounded-md outline-none text-sm" name="jobtype">
                            <option value="">Select type</option>
                            {Jobtype.map(({time,id}) => (
                                <option key={id} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-30">
                        <label className="font-medium text-sm mb-1 block" htmlFor="joblevel">Job Level</label>
                        <select value={JobData.joblevel} onChange={handleChange} className="w-full border py-2 px-3 focus:border-blue-600 rounded-md outline-none text-sm" name="joblevel">
                            <option value="">Select level</option>
                            {Joblevel.map(({level,id}) => (
                                <option key={id} value={level}>{level}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="my-1">
                    <label className="font-medium text-sm mb-1 block" htmlFor="shortdesc">Short Description</label>
                    <textarea value={JobData.shortdesc} onChange={handleChange} name="shortdesc" placeholder="Enter short description" className="w-full py-2 px-3 rounded-md border border-gray-400 text-sm" rows="3"></textarea>
                </div>

                <div className="my-1">
                    <label className="font-medium text-sm mb-1 block" htmlFor="skills">Skills</label>
                    <div className="flex">
                        <input value={currentSkill} onChange={(e) => setCurrentSkill(e.target.value)} placeholder="Add skills" className="w-full py-2 px-3 rounded-md border border-gray-400 text-sm" type="text" />
                        <button onClick={handleAddSkill} type="button" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">Add</button>
                    </div>
                    <div className="flex flex-wrap mt-2">
                        {JobData.skills.map((skill, index) => (
                            <div key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                {skill}
                                <button type="button" onClick={() => HandleDeleteSkill(index)} className="ml-2 text-red-500">&times;</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="my-1">
                    <label className="font-medium text-sm mb-1 block" htmlFor="responsibilities">Responsibilities</label>
                    <div className="flex">
                        <input value={currentResponsibility} onChange={(e) => setCurrentResponsibility(e.target.value)} placeholder="Add responsibility" className="w-full py-2 px-3 rounded-md border border-gray-400 text-sm" type="text" />
                        <button onClick={handleAddResponsibility} type="button" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">Add</button>
                    </div>
                    <ul className="list-disc pl-5 mt-2">
                        {JobData.responsibilities.map((resp, index) => (
                            <li key={index} className="text-sm">
                                {resp}
                                <button type="button" onClick={() => HandleDeleteResponsibility(index)} className="ml-2 text-red-500">&times;</button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button disabled={isLoading} onClick={togglePopup} type="button" className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
                        Cancel
                    </button>
                    <button disabled={isLoading} type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md">
                        Update Job
                    </button>
                </div>
            </form>
        </div>
        </motion.dialog>
    )
}

export default UpdateJobPopUp