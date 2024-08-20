import { motion } from 'framer-motion'
import React, { Fragment } from 'react'
import AvailableToJoin from '../../../data/AvailableToJoin';
import Gender from '../../../data/Gender';
import Status from "../../../data/Status";
import { CandidateStatus, CurrentCandidateStatus, DeleteSocial, setCity, setState } from '../../../../app/slices/CreateCandidateSlice';
import CurrentEmploymentStatus from '../../../data/CurrentemploymentStatus';
import { useDispatch, useSelector } from 'react-redux';
import SocialLink from '../../../data/SocialLink';
import skillcategory from '../../../data/skillcategory';
import { v4 as uuidv4 } from 'uuid';
import { IoMdCloseCircleOutline } from 'react-icons/io';

const CreatePersonalInforamtion = ({
    Handlecandidate,
    handleFileInputChange,
    fileInputState,
    HandleAddSkill,
    handleCountry,
    countryLoading,
    visibleCities,
    handleLoadMore,
    remainingCities,
    selectedSocial,
    setSelectedSocial,
    link,
    setLink,
    handleAddSocial,
    seletctedSkillType,
    setseletctedSkillType,
    setSkillname,
    Skillname,
    stateLoading,
    cityLoading,showLoadMore,DeleteSkill
}) => {
  const dispatch = useDispatch()
    const Candidate = useSelector((state) => state.CreateCandidate.CandidateData);
    const address = useSelector((state) => state.address);
  return (
   <Fragment>
   <motion.div
   initial={{ y: -50, opacity: 0 }}
   animate={{ y: 0, opacity: 1 }}
   exit={{ y: -50, opacity: 0 }}
   className='  max-md:gap-y-2 gap-y-6 flex flex-wrap '>
   
   <div className="w-1/2   max-md:w-full px-3  md:mb-0">
   <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='avtar' >
     Profile image
   </label>
   
   <input onChange={handleFileInputChange} value={fileInputState}
     className=" block w-full max-md:placeholder:text-sm   bg-gray-100 text-gray-700 border border-gray-200 rounded py-2.5 px-4  leading-tight focus:outline-none focus:bg-white"
     type="file" accept="image/png,.jpg,.jpeg,.png image/jpeg" name='avtar' />
 
 </div>
 

     <div className="w-1/2 max-md:w-full px-3  md:mb-0">
       <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='fullname'>
         full Name
       </label>
       <input name='fullname' value={Candidate.fullname} onChange={Handlecandidate}
         className="  max-md:placeholder:text-sm  block w-full  bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white"
         type="text"
         placeholder="Fullname"
       />
     </div>

   <div className="flex justify-between  flex-wrap w-full my-2">
     
   <div className="w-1/4 max-md:w-full px-3 my-2 md:mb-0">
   <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
    Gender
   </label>
   <select name="gender"  onChange={Handlecandidate} value={Candidate.gender}
   className="  max-md:placeholder:text-sm  block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
   <option  className='!text-sm' value="">choose Gender</option>
 {
   Gender.map((gender,i)=>(
     <option  key={i} value={gender.gender}>{gender.gender}</option>
   ))
 }
  

   </select>

 </div>

 
 <div className="w-1/4 max-md:w-full px-3 my-2 md:mb-0">
 <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='noticeperiod'>
  Available to Join
 </label>
   <select name="noticeperiod" id="" onChange={Handlecandidate} value={Candidate.noticeperiod}
   className=" max-md:placeholder:text-sm  block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
   
   >
   <option  className='!text-sm' value="">choose Notice period</option>
 {
   
   AvailableToJoin.map((jointime)=>(
     <option  key={jointime.id} value={jointime.Availablity}>{jointime.Availablity}</option>
   ))
 }
  

   </select>
 

</div>

<div className="w-1/4 max-md:w-full px-3 my-2 md:mb-0">
<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='empstatus'>
employment status
</label>
 <select name="empstatus" value={Candidate.empstatus} onChange={(e)=>{dispatch(CandidateStatus(e.target.value))}}
 className=" max-md:placeholder:text-sm  block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
 
 >
 <option  className='!text-sm'  value=''>choose Employment status</option>
{
 
 Status.map((employment)=>(
   <option key={employment.id} value={employment.status}>{employment.status}</option>
 ))
}


 </select>


</div>


{/* current employment */}



<div className="w-1/4 max-md:w-full px-3 my-2 md:mb-0">
<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='currentempstatus'>
current  status
</label>
<select name="currentempstatus" value={Candidate.currentempstatus} onChange={(e)=>dispatch(CurrentCandidateStatus(e.target.value))}
className=" max-md:placeholder:text-sm  block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"

>
<option className='!text-sm' value=''>--Choose Employment status--</option>
{

CurrentEmploymentStatus.map((employment)=>(
 <option  key={employment.id} value={employment.status}>{employment.status}</option>
))
}


</select>


</div>
</div>

{/* address */}

<div className=" flex  justify-between flex-wrap w-full px-3 my-2">
<div className="w-1/4 max-md:w-full my-2 md:mb-0">
<label htmlFor='country' className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
Country
</label>
<select name='country' value={Candidate.country} onChange={(e) => handleCountry(e.target.value)}
className="max-md:placeholder:text-sm  block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
disabled={countryLoading}
>
<option className='!text-sm' value=''>
     {countryLoading ? 'Loading countries...' : 'Select a country'}
   </option>

{!countryLoading &&
 address.countries.map((country) => (
   <option key={`${country.name}-${uuidv4()}`} value={country.name}>
     {country.name}
   </option>
 ))}

</select>


</div>





<div className="w-1/4 max-md:w-full my-2 md:mb-0">
<label htmlFor='state' className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
State
</label>
<select name="state" id="" value={Candidate.state}  onChange={(e) =>dispatch(setState(e.target.value))}
className=" max-md:placeholder:text-sm  block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"

>
<option className='!text-sm' value=''>Select a state</option>
{!stateLoading &&
 address.states.map((state,i) => (
   <option key={i} value={state.name}>
     {state.name}
   </option>
 ))}

</select>


</div>


{
<div className="w-1/4 max-md:w-full my-2 md:mb-0">
<label htmlFor='city' className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
City
</label>
 <select name="city" value={Candidate.city} onChange={(e) => dispatch(setCity(e.target.value))}
 className=" max-md:placeholder:text-sm  block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
 disabled={cityLoading}
 >
 <option  className='!text-sm'  value="">Select a city</option>

 {!cityLoading &&
   address.cities.slice(0, visibleCities).map((city,i) => (
     <option key={i} value={city.name}>
       {city.name}
     </option>
   ))}

 </select>
 {showLoadMore && (
   <button
     onClick={handleLoadMore} type='button'
     className="mt-2 text-blue-500 hover:underline focus:outline-none"
   >
     Load More Cities ({remainingCities} remaining)
   </button>
 )}
</div>

}
</div>

<div className=' w-full max-md:gap-y-2 gap-y-6 flex flex-wrap'>
<div className="w-full px-2  "> <p className="text-base px  font-semibold bg-gradient-to-t text-transparent  from-green-500 via-blue-600 to-purple-600 bg-clip-text">Contact</p> </div>
<div className="w-1/2 max-md:w-full  px-3 my-2 md:mb-0">
<label htmlFor='email' className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
 email
</label>
<input name='email' value={Candidate.email} onChange={Handlecandidate}
 className=" max-md:placeholder:text-sm  block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
 type="email"
 placeholder="example@gmail.com"
/>


</div>



<div className="w-1/2 max-md:w-full px-3 my-2 md:mb-0">
<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='phone'>
Mobile No.
</label>
<input name='phone' value={Candidate.phone} onChange={Handlecandidate}
className=" max-md:placeholder:text-sm  block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
type="number"
placeholder="+91 1234567890"
/>

</div>


</div>
{ /*  summary */}
<div className="w-full px-3 mb-6 md:mb-0">
<div className="w-full ">
<label htmlFor='summary' className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
Quick summary
</label>
<textarea name='summary' value={Candidate.summary} onChange={Handlecandidate}
 className="resize-none max-md:placeholder:text-sm  block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
 id="grid-password"
 type="password"
 placeholder="A quick intro for yourself"
/>
</div>
</div>


<div className='w-full max-md:flex-col items-center flex '>
<div  className="w-1/3 max-md:w-full px-3 my-2 max-md:my-1 md:mb-0">
<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 max-md:mb-1" htmlFor='currentempstatus'>
social
</label>


 <input type='text' placeholder='custom social' 

className="mb-1 max-md:placeholder:text-sm  block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-1.5 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={(e)=>setSelectedSocial(e.target.value)} value={selectedSocial}/> 
<span>or</span>

<select name="name"   onChange={(e)=>setSelectedSocial(e.target.value)} value={selectedSocial}
className=" max-md:placeholder:text-sm  block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"

>
<option className='!text-sm' value=''>--select a social network--</option>
{

SocialLink && SocialLink.map(({name,id})=>(
 <option  key={id} value={name}>{name }</option>
))
}


</select>


</div>

<div className="w-1/3 max-md:w-full px-3 my-2 md:mb-0">
<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='link'>
Add Link here
</label>
<input placeholder='Add link here'
name="link"
value={link}
onChange={(e) => setLink(e.target.value)}
className=" max-md:placeholder:text-sm  block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>


</div>

<div className="w-1/3 max-md:w-full px-3 my-2  md:mb-0">


<span onClick={handleAddSocial} className="relative cursor-pointer mt-1 items-center justify-center max-md:py-1.5 inline-block p-3 px-5 py-2.5 overflow-hidden font-medium text-indigo-600 max-md:rounded-md rounded-lg shadow-xl group">
<span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-blue-500 rounded-full blur-md ease"></span>
<span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
<span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-blue-600 rounded-full blur-md"></span>
<span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-blue-600 rounded-full blur-md"></span>
</span>
<span className="relative -tracking-tighter text-white">Add social</span>
</span>

</div>
</div>



<div className="grid px-1 grid-cols-4 w-full gap-2 max-md:lg:gap-1 max-md:grid-cols-2 ">

{
Candidate.social[0].name!==''&& Candidate.social[0].link!=='' &&  Candidate.social.map(({name,link},index)=>(
<div  key={index}>
<div className='flex flex-wrap relative'>
<span>{name}</span>
<IoMdCloseCircleOutline onClick={()=>{dispatch(DeleteSocial(index))}} color='black' className='h-5 w-5 absolute !cursor-pointer top-4 -right-1' />
</div>
<div className="rounded-md p-2 break-words   bg-blue-100 my-1">{link}</div>




</div>
))
}


</div>



<div className='w-full max-md:flex-col items-center flex '>
<div  className="w-1/3 max-md:w-full px-3 my-2 max-md:my-1 md:mb-0">
<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 max-md:mb-1" htmlFor='currentempstatus'>
Skill
</label>
<select name="skilltype"   onChange={(e)=>setseletctedSkillType(e.target.value)} value={seletctedSkillType}
className=" max-md:placeholder:text-sm  block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"

>
<option className='!text-sm' value=''>--select a category--</option>
{
 
 skillcategory && skillcategory.map(({id,type})=>(
 <option  key={id} value={type}>{type}</option>
))
}


</select>


</div>

<div className="w-1/3 max-md:w-full px-3 my-2 md:mb-0">
<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='link'>
Add Skills
</label>
<input placeholder='Add skill here'
name="Skillname"
value={Skillname}
onChange={(e) => setSkillname(e.target.value)}
className=" max-md:placeholder:text-sm  block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>


</div>

<div className="w-1/3 max-md:w-full px-3 my-2  md:mb-0">

{ /* <button onClick={handleAddSocial} className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full  px-4 rounded ">
Add Social Link
</button>*/}

<span onClick={HandleAddSkill} className="relative cursor-pointer mt-1 items-center justify-center inline-block p-3 px-5 max-md:py-1.5 py-2.5 max-md:rounded-md overflow-hidden font-medium text-indigo-600 rounded-lg shadow-xl group">
<span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-blue-500 rounded-full blur-md ease"></span>
<span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
<span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-blue-600 rounded-full blur-md"></span>
<span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-blue-600 rounded-full blur-md"></span>
</span>
<span className="relative -tracking-tighter text-white">Add Skills</span>
</span>





</div>
</div>

<div className="grid px-1 grid-cols-4 w-full gap-2 max-md:lg:gap-1 max-md:grid-cols-2 ">

{
Candidate.skills[0].skilltype!==''&& Candidate.skills[0].name!=='' &&  Candidate.skills.map(({skilltype, name},index)=>(
<div key={index}>
<div className='flex relative'>
<span>{skilltype}</span>
<IoMdCloseCircleOutline onClick={()=>{dispatch(DeleteSkill(index))}} color='black' className='h-5 w-5 absolute !cursor-pointer top-4 -right-1' />
</div>
<div className="rounded-md p-2  bg-blue-100 my-1">{name}</div>
</div>
 ))
}


</div>

   </motion.div>
   
   </Fragment>
  )
}

export default CreatePersonalInforamtion