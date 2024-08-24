import DeleteAcountInfo from "../../../data/deleteInfo"
import  Icons from "../../../assets/icons/Icons"


const DeleteAcount = () => {
    const {deleteac}=Icons;
  return (
    <div className="h-80vh max-md:h-100vh">
    
    <article className="rounded-md my-2 mx-auto container-lg   shadow-md border dark:border-gray-600 border-slate-300 ">
    <div className="bg-blue-500 dark:bg-blue-600 mb-2  py-1 text-white">
  <p className="text-center text-sm font-medium">
    Delete Your Acount
  </p>
</div>
    <figure className=" select-none rounded-sm flex justify-center">
    <img className="w-32 h-32 max-lg:w-24 max-lg:h-24 " src={deleteac} alt="" />
    </figure>
    <div className="flex items-start sm:gap-8">
  


  
      <div className="p-6 max-md:p-4">
        <h3 className="mt-4 text-sm font-medium sm:text-xl">
          <p className="text-blue-500">Are you sure you want to proceed with deleting your account ?
          </p>
        </h3>
  
     <ul className="list-disc">
     {
        DeleteAcountInfo && DeleteAcountInfo.map(({id,text})=>
            <li key={id} className="my-2 mx-10 max-md:mx-2 text-red-500 dark:text-red-600 text-sm max-md:text-xs">{text}</li>
        )
     }
  
     </ul>
     
     <div className="shadow-md w-2/4 p-3 max-md:container dark:bg-gray-800 bg-slate-50 border border-slate-300 rounded-sm ">
     <p className="text-sm max-md:text-xs text-blue-900 dark:text-gray-300  capitalize ">are you sure you want to delete Your Acount Permanently ?</p>
       
        <div className="flex max-md:space-x-4  items-center space-x-6 my-2 ">
        <button role="button" type="button" className="py-2 dark:border-none px-4 text-sm font-medium text-gray-500 bg-white rounded-md border border-gray-200 hover:bg-gray-100  focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10">
            No, cancel
        </button>
        <button role="button" type="button" className="py-2 dark:border-none px-4 text-sm font-medium text-white bg-red-600 rounded-md border border-gray-200 hover:bg-red-500  focus:outline-none focus:ring-primary-300 focus:z-10">
           Yes, Sure
    </button>
    </div>
        </div>
      </div>
    </div>
  </article>
  </div>
  )
}

export default DeleteAcount