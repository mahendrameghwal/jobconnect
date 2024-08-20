import { motion } from "framer-motion"
import { BiX } from "react-icons/bi"
import { FaWindowClose } from "react-icons/fa"
import { toast } from "react-hot-toast"
import { Fragment, useState } from "react"
import SocialLink from "../../../../data/SocialLink"
import { useUpdateCandidateProfileMutation } from "../../../../../app/api/CandidateApi"


const UpdateSocialPopup = ({social , togglePopup}) => {

  const [currentsocial, setCurrentSocial] = useState({ name: '', link: '' });

    
  const [UpdateCandidateProfile, {error,data, isError, isSuccess,isLoading}]=useUpdateCandidateProfileMutation()


  const HandleDeleteSkill = async(Id)=>{
    await    UpdateCandidateProfile({section:"social",action:"remove",itemId:Id});
   social && Array.isArray(social) && social.length == 1 && toast.error('at least one social is required ');
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentSocial(prevsocial => ({ ...prevsocial, [name]: value }));
  };

  const handleAddSocial = async () => {
    if (currentsocial.link && currentsocial.name) {
     await UpdateCandidateProfile({
      action: 'add',
      itemData: currentsocial,
    });
      setCurrentSocial({ name: '', link: '' });
    }
  };



  return (
    <motion.dialog
    open
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -50, opacity: 0 }}
    className="fixed min-h-screen  top-0 left-0 w-full h-full bg-black/80 backdrop-blur-sm bg-opacity-60 flex justify-center items-center z-50"
    >
    <div  role="alert" className="container  mx-auto w-11/12 md:w-2/3 max-w-2xl">
        <div className="relative py-2 px-3 bg-white shadow-md rounded border border-gray-400">
    
     <div className="flex justify-between mb-3 max-md:mb-1">
     <p className="text-sm font-bold tracking-wider">update social link...</p>
     <button onClick={togglePopup} type="button" className="absolute top-1 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
     <FaWindowClose className='w-6 h-5 text-red-500' />
   </button>
     </div>
    
      <div  className="flex flex-wrap justify-start gap-x-2 items-center  text-sm py-1 my-1 text-gray-700 rounded-lg tracking-wider   ">

      {
        social && Array.isArray(social) && social.length < 1 &&  <span className="   font-normal text-base max-md:text-sm  text-red-500">Provide add some Skills</span>
      }
     
    
    <div className="flex flex-col">
    <div className="flex flex-wrap">
    {social && Array.isArray(social) && social.map(({ name, link, _id }) => (
       
   <div key={_id} className="relative my-1 flex bg-gray-300 flex-col  px-1 py-0.5 w-full ">
       <div className="flex justify-between items-center">
           <span className="cursor-pointer  font-medium text-xs">{name}</span>
           <BiX onClick={() => HandleDeleteSkill(_id)} title={`delete ${name} link`} className="bg-gray-100 top-0 border cursor-pointer w-5 h-5 rounded-full text-red-600" />
       </div>
       <span className="cursor-pointer  font-medium text-xs">{link}</span>
   </div>
       
    ))}

  

    
</div>

    </div>
    
      </div>
     <div className="flex max-md:flex-col mb-2 justify-between gap-x-2">
     {
      SocialLink && <select name="name" 
      onChange={handleInputChange}  value={currentsocial.name} 
      className="w-45 pl-1 max-md:my-1 focus:border focus:border-blue-600 outline-none rounded-md py-2 border border-gray-200"
      
      >
      {SocialLink.map(({ name,id },i) => (
        <option key={id} value={name}>{name}</option>
      ))}
    </select>
     }
     <input  onChange={handleInputChange}   value={currentsocial.link}
     name="link"
     placeholder="add your skills" className=" skills  w-4/5 max-md:w-full p-2 focus:border-blue-600 rounded-md outline-none  border border-gray-200" type="text" />
     </div>
     <button onClick={handleAddSocial} className="inline-flex max-md:my2 items-center px-6 py-2 max-md:w-fit max-md:mt-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md">Add Skills</button>
      <div className=" p-2 mt-4  flex justify-end gap-x-2 ">
      <button onClick={togglePopup} className="inline-flex items-center px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
      cancel
      </button>
      <button onClick={togglePopup}  className="inline-flex items-center px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md">
        Save
      </button>
    </div>
    
      </div>

        
        </div>
        
    </motion.dialog>
  )
}

export default UpdateSocialPopup