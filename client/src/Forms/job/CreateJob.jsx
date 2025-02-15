import { v4 as uuidv4 } from 'uuid';
import React,{ Fragment, useCallback, useEffect, useMemo, useState } from "react"
import { TfiShiftRightAlt } from "react-icons/tfi";
import Jobtype from "../../data/Jobtypes";
import Joblevel from "../../data/Joblevel";
import jobCategories from "../../data/JobCategory";
import { IoCloseCircle } from "react-icons/io5";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import {setCity,setCountry,setState, setField,setNewSkills,addSkill,removeskills,removeroles, setNewResponsibility, addResponsibility, resetState} from '../../../app/slices/CreateJobSlice';
import {useCreateJobMutation} from "../../../app/api/JobApi";
import {loadCities,loadCountries,loadStates} from '../../../app/slices/AddressSlice';
import { useNavigate } from 'react-router-dom';
import salaryData from '../../data/Salarydata';
import { FaDeleteLeft } from "react-icons/fa6";

const Createjob =React.memo(() => { 
  const NumberOfpost = [1,2,3,4,5,6,7,8,9,10];
  

  const Job = useSelector(state => state.CreateJob);
  const dispatch = useDispatch();
 const navigate = useNavigate()
  
   // NumberOfPost

  useEffect(() => {
    dispatch(loadCountries());
  }, [dispatch]);

  const [createJob, { isError, error }] = useCreateJobMutation();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch(setField({ field: name, value }));
  }, [dispatch]);

 
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { ...Job };
    delete formData.newSkills;
    delete formData.newResponsibility;
    const { data, error } = await createJob(formData);

    if (data) {
      toast.success('Successfully created Job');
      dispatch(resetState());
      navigate(`/post/search/about/${data}`)
      
    } else if (error) {
      error.data.error && toast.error(error.data.error) ||
      error.data.message && toast.error(error.data.message) ||
      toast.error('Something went wrong');
    }
  };


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
    return countries.find(c => c.name === Job.country);
  }, [countries, Job.country]);

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
      <option key={`${Job.country}-${uuidv4()}`} value={country.name}>{country.name}</option>
    ));
  }, [countries]);

  const stateOptions = useMemo(() => {
    return states.map(state => (
      <option key={`${Job.state}-${uuidv4()}`} value={state.name}>{state.name}</option>
    ));
  }, [states]);

  const cityOptions = useMemo(() => {
    return cities.map(city => (
      <option key={`${Job.city}-${uuidv4()}`} value={city.name}>{city.name}</option>
    ));
  }, [cities]);










  return (
  
    <div className="min-h-screen max-h-full mt-1">
    
    <Fragment>
    <form >
    <div className="min-h-screen   w-11/12 mx-auto shadow-xl max-h-full border dark:border-gray-600 ">
    <p className="text-3xl max-md:text-2xl  font-semibold bg-gradient-to-t text-center text-transparent from-green-700 via-blue-700 to-purple-700 bg-clip-text dark:text-gray-100">
    Post Job
</p>


    
    <div className="px-2 ">
    <div className="  mx-2 my-2">

    <div className=" flex w-full max-md:my-1.5 max-md:flex-col my-3 justify-between gap-x-4">
    <section className="w-90   max-md:w-full max-md:my-1">
    <label aria-required htmlFor="title" className="text-gray-600 max-md:font-medium max-md:text-sm font-semibold uppercase  dark:text-gray-50 my-0.5">job title <span className="!text-red-500">*</span></label>
    <input  required  onChange={handleChange} value={Job.title}  placeholder="Job title " className="focus:ring-1 ring-blue-500 rounded-md outline-none border placeholder:text-gray-400 border-gray-300 bg-slate-100 max-md:px-2 max-md:py-1.5 px-4 py-2.5 w-full dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800" type="text" name="title"  />
    <br />
    {isError && error.data?.details?.title && (
      <p className="text-red-500 px-1 py-0 text-sm mt-1">{error.data?.details?.title}</p>
    )}
      
    </section>
    <section className="w-90 max-md:w-full max-md:my-1">
    <label aria-required htmlFor='jobtype' className=" dark:text-gray-50 text-gray-600 max-md:font-medium max-md:text-sm font-semibold uppercase my-0.5">job Type</label>
    <select required   onChange={handleChange} value={Job.jobtype}    className="focus:ring-1 ring-blue-500 rounded-md outline-none border placeholder:text-gray-400 border-gray-300 bg-slate-100 max-md:px-2 max-md:py-1.5 px-4 py-3 w-full dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800" name="jobtype" id="">
    <option value=''>--select Job Type--</option>
     {
      Jobtype.map((types, i)=>(
       <option  key={i} value={types.time}>{types.time}</option>
      ))
     }
     </select>
     <br />
     {isError  && error.data?.details?.jobtype && (
      <p className="text-red-500 px-1 py-0 text-sm mt-1">{error.data.details.jobtype}</p>
      )}
    </section>

    <section className="w-90 max-md:w-full max-md:my-1">
    <label aria-required  htmlFor='category' className=" dark:text-gray-50 text-gray-600 max-md:font-medium max-md:text-sm font-semibold uppercase my-0.5">job Category</label>
     <select required  onChange={handleChange} value={Job.category}     className="focus:ring-1 ring-blue-500 rounded-md outline-none border placeholder:text-gray-400 border-gray-300 bg-slate-100 max-md:px-2 max-md:py-1.5 px-4 py-3 w-full dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800" name="category" id="">
     <option   value=''>--select category--</option>
     {
       jobCategories.map((item, i)=>(
       <option  key={i} value={item.name}>{item.name}</option>
       ))
      }
     
      </select>
     <br />
     {isError  && error.data?.details?.category && (
       <p className="text-red-500 px-1 py-0 text-sm mt-1">{error.data.details.category}</p>
     )}
    </section>
    
    </div>


    <div className='flex w-full max-md:my-1.5 max-md:flex-col my-3 justify-between gap-x-4'>
       


    <div className="w-1/3 max-md:w-full my-2 md:mb-0">
    <label htmlFor='country' className=" dark:text-gray-50 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
      Country
    </label>
    
    <select
    name='country'
    value={Job.country}
    onChange={(e) =>dispatch(setCountry(e.target.value))}
    className="max-md:placeholder:text-sm focus:ring-1 ring-blue-500 block w-full bg-slate-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800"
    
    >
    <option   value=''>select a country</option>
     {countryOptions}
    </select>
  </div>
    
    
 
    
    
    <div className="w-1/3 max-md:w-full my-2 md:mb-0">
    <label htmlFor='state' className=" dark:text-gray-50 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
    State
    </label>
      <select name='state'  value={Job.state} onChange={(e) =>dispatch(setState(e.target.value))}
      className="max-md:placeholder:text-sm focus:ring-1 ring-blue-500  block w-full bg-slate-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800"
      
      >
      <option  className='!text-sm' value=''>Select a State</option>
    
      {stateOptions}
    
      </select>    
    </div>
    
    
    
    <div className="w-1/3 max-md:w-full my-2 md:mb-0">
    <label htmlFor='city' className=" dark:text-gray-50 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
      City
    </label>
    <select
      name="city"
      value={Job.city}
      onChange={(e) => dispatch(setCity(e.target.value))}
      className="max-md:placeholder:text-sm focus:ring-1 ring-blue-500 block w-full bg-slate-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800"
    
      >
      <option   value=''>select a city</option>
     {cityOptions}
    </select>

   
  </div>
      
    
    </div> 



    <div className="flex w-full max-md:my-1.5 max-md:flex-col my-3 justify-between gap-x-4">
    <section className="w-90 max-md:w-full max-md:my-1">
    <label aria-required htmlFor='joblevel' className=" dark:text-gray-50 text-gray-600 max-md:font-medium max-md:text-sm font-semibold uppercase my-0.5">job level</label>
    <select  required  onChange={handleChange} value={Job.joblevel} className=" focus:ring-1 ring-blue-500 rounded-md outline-none border placeholder:text-gray-400 border-gray-300 bg-slate-100 max-md:px-2 max-md:py-1.5 px-4 py-3 w-full dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800" name="joblevel" id="">
    <option   value=''>--select Job level--</option>
     {
      Joblevel.map((types, i)=>(
       <option  key={i} value={types.level}>{types.level}</option>
      ))
    }
     
    </select>
    <br />
     {isError  && error.data?.details?.joblevel && (
       <p className="text-red-500 px-1 py-0 text-sm mt-1">{error.data.details.joblevel}</p>
       )}

       </section>
       

       <section className="w-90 max-md:w-full max-md:my-1">
       <label aria-required htmlFor='NumberOfPost' className=" dark:text-gray-50 text-gray-600 max-md:font-medium max-md:text-sm font-semibold uppercase my-0.5">Number of post</label>
       <select  required  onChange={handleChange} value={Job.NumberOfPost} className=" focus:ring-1 ring-blue-500 rounded-md outline-none border placeholder:text-gray-400 border-gray-300 bg-slate-100 max-md:px-2 max-md:py-1.5 px-4 py-3 w-full dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800" name="NumberOfPost" id="">
       <option  value=''>--number of post--</option>
       <option className='text-xs' disabled value=''>default number of post will be 1 (if not selected)</option>
        {
         NumberOfpost.map((postnumber, i)=>(
          <option  key={i} value={postnumber}>{postnumber}</option>
         ))
       }
        
       </select>
       <br />
        {isError  && error.data?.details?.joblevel && (
          <p className="text-red-500 px-1 py-0 text-sm mt-1">{error.data.details.joblevel}</p>
          )}
   
          </section>

    <section className="w-90 max-md:w-full max-md:my-1">
  <label aria-required htmlFor="salary" className=" dark:text-gray-50 text-gray-600 max-md:font-medium max-md:text-sm font-semibold uppercase my-0.5">salary<span className="!text-sm!lowercase">(per year)</span><span className="!text-red-500">*</span></label>
  <select required name='salary' onChange={handleChange} value={Job.salary} className="focus:ring-1 ring-blue-500 rounded-md outline-none border placeholder:text-gray-400 border-gray-300 bg-slate-100 max-md:px-2 max-md:py-1.5 px-4 py-2.5 w-full dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800">
    {salaryData.map((option, index) => (
      <option key={index} value={option.range}>{option.range}</option>
    ))}
  </select>
  <br />
  {isError && error.data?.details?.salary && (
    <p className="text-red-500 px-1 py-0 text-sm mt-1">{error.data?.details?.salary}</p>
  )}
</section>
   
          
    </div>

    <div className="flex w-full max-md:my-1.5 max-md:flex-col  justify-between gap-x-4">
    <section className="w-95 max-md:w-full max-md:my-1">
    <label aria-required htmlFor="skills" className=" dark:text-gray-50 text-gray-600 max-md:font-medium max-md:text-sm font-semibold uppercase my-0.5">Required Skills<span className="!text-red-500">*</span></label>
    <div className="flex gap-x-6 justify-around">
    <input required  onChange={(e)=>{dispatch(setNewSkills(e.target.value))}} value={Job.newSkills}    placeholder="Skills" className="focus:ring-1 ring-blue-500 rounded-md outline-none border placeholder:text-gray-400 border-gray-300 bg-slate-100 max-md:px-2 max-md:py-1.5 px-4 py-2 w-full dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800" type="text" name="skills"  />
   <button  onClick={()=>{dispatch(addSkill(Job.skills))}} type="button"  className="px-10 hover:text-white transition-colors duration-200 tracking-wider bg-slate-300 rounded-md hover:bg-slate-400 font-medium max-md:text-base text-base">Add</button>
   </div> 
   </section>
   

    </div>
    
    {isError  && error.data?.details?.skills && (
      <p className="text-red-500 px-1 py-0 text-sm mt-1">{error.data?.details?.skills}</p>
      )}
    <div className="flex flex-wrap my-1">

    {
     Job.skills.map((item,i)=>(
       <div className="relative mx-3 my-1" key={i}>
    <IoCloseCircle onClick={()=>{dispatch(removeskills(i))}}  className="h-4  absolute  -top-2 -right-1 cursor-pointer  w-4"/>
    <span className="bg-gray-200 rounded-md uppercase  text-black px-4 py-1 " >{item}</span>
    </div>
    ))
   }
   
   </div>

   <div className="flex w-full max-md:my-1.5 max-md:flex-col  justify-between gap-x-4">
    <section className="w-full max-md:w-full max-md:my-1">
    <label aria-required htmlFor="shortdesc" className=" dark:text-gray-50 text-gray-600 max-md:font-medium max-md:text-sm font-semibold uppercase my-0.5">about the job<span  className="!text-red-500">*</span></label>
    <textarea  required  onChange={handleChange} value={Job.shortdesc}  rows={5} cols={4}  placeholder="a short intro about Job" className="focus:ring-1 skills ring-blue-500 rounded-md outline-none border placeholder:text-gray-400 border-gray-300 bg-slate-100 max-md:px-2 max-md:py-1.5 px-4 py-2.5 w-full dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800" type="text" name="shortdesc"  />
    </section>
    
    
    </div>
  
    {isError  && error.data?.details?.shortdesc && (
      <p className="text-red-500 px-1 py-0 text-sm mt-1">{error.data?.details?.shortdesc}</p>
      )}

      
      <div className="flex w-full max-md:my-1.5 max-md:flex-col my-3 justify-between gap-x-4">
    <section className="w-full max-md:w-full max-md:my-1">
    <label aria-required htmlFor="responsibility" className=" dark:text-gray-50 text-gray-600 max-md:font-medium max-md:text-sm font-semibold uppercase my-0.5 ">Roles and Responsiblity <span className="!text-red-500">*</span></label>
   <div className="flex-col justify-around">
   <textarea required onChange={(e)=>{dispatch(setNewResponsibility(e.target.value))}} value={Job.newResponsibility}  placeholder="Roles and Responsiblity " className="focus:ring-1 ring-blue-500 rounded-md outline-none border placeholder:text-gray-400 border-gray-300 bg-slate-100 max-md:px-2 max-md:py-1.5 px-4 py-2.5 w-full dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:bg-gray-800"  name="responsibilities"  />
   <button  onClick={()=>{dispatch(addResponsibility(Job.responsibilities))}} type="button"  className="px-4 py-1 hover:text-white transition-colors duration-200 tracking-wider bg-slate-300 rounded-md hover:bg-slate-400 font-medium text-lg">Add more description</button>
   </div>
   </section>
   </div>
   {isError && error.data?.details?.responsibilities ? (
      <p className="text-red-500 px-1 py-0 text-sm mt-1">{error.data?.details?.responsibilities}</p>
      ):null}
  <ol>
  {
    Job.responsibilities.map((item,i)=>(
   <div className="relative mx-3 my-1" key={i}>
   <FaDeleteLeft  onClick={()=>{dispatch(removeroles(i))}}  className="h-4 dark:text-gray-300 dark:bg-black absolute  -top-2 -right-1 cursor-pointer  w-4"/>
   <li className="mb-2 bg-gray-200 rounded-md capitalize text-sm  text-black px-4 py-1 " >{item}</li>
   </div>
   ))
  }
  </ol>
    </div>
  
    { /*  summary */}

    
      <div className=" w-full mx-3 my-7 ">
      <button type="submit" onClick={handleSubmit} className="group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-2 text-white focus:outline-none focus:ring-2 active:bg-indigo-500">
<span className="absolute -start-full  transition-all group-hover:start-4"><TfiShiftRightAlt className="h-6 text-white" alt="submit" /></span>
<span className="text-sm font-medium transition-all group-hover:ms-4">Post Job</span></button>
</div>
</div>

</div>
</form>
    </Fragment>
 
    </div>
    )
}) 

export default Createjob





