import React, { Fragment, memo } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { IoSendOutline } from 'react-icons/io5';
import TimeAgo from './Useformattime';
import { IoTrashOutline } from "react-icons/io5";
const SingleChat = ({
  isChecked,
  newMessage,
  handleCheckboxChange,
  setNewMessage,
  currentUserId,
  userInfo,
  sendMessage,
  messages,
  OnlineUser,
  messagesEndRef
}) => {


  return (
    <section className="flex snap-none relative flex-col items-center justify-end w-full min-h-screen  text-gray-800">
   {
    !userInfo && <span className='absolute top-1/2 text-gray-400 -translate-x-1/2 left-1/2 '>No user Found</span>
   }

     {
      userInfo && (
        <div className=" w-full   bg-gray-100 cursor-pointer  p-2 shadow-md  border-gray-200 border flex items-center">
        {
            <div className="relative border border-slate-500/50 p-2 rounded-full">
            {userInfo?.avtar ? (
              <img
                src={userInfo?.avtar}
                className="w-8  h-8 max-md:w-6 max-md:h-6"
              />
            ) : (
              <FaRegUser className="w-8  h-8 max-md:w-6 max-md:h-6  " />
            )}


            {
          OnlineUser?.map(UserId => UserId === userInfo?._id && <span key={UserId} className="absolute bottom-1 right-0 w-2 h-2 bg-green-500 text-sm text-green-500 rounded-full"></span> )

            }
    

              
           
          </div>
        }
        <div className="flex-1 mx-2">
          <h2 className="text-sm font-normal">
          
            {userInfo?._id ===currentUserId  ? 'You' :userInfo?.orgname || userInfo?.fullname}
          </h2>
        </div>

        <label>
          <div className="w-8 h-10 cursor-pointer  -ml-2 flex flex-col items-center justify-center">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="hidden peer"
            />
            <div
              className="w-[50%] h-[3px] bg-black rounded-sm transition-all 
              duration-300 origin-left translate-y-[0.45rem] peer-checked:rotate-[-45deg]"
            ></div>
            <div
              className="w-[50%] h-[2px] bg-black rounded-md transition-all 
              duration-300 origin-center peer-checked:hidden"
            ></div>
            <div
              className="w-[50%] h-[3px] bg-black rounded-md transition-all 
              duration-300 origin-left -translate-y-[0.45rem] peer-checked:rotate-[45deg]"
            ></div>
          </div>
        </label>
      </div>
      )
     }

      {
        userInfo && (
          <div className="flex flex-col  flex-grow w-full chat-bg   shadow-xl  overflow-hidden">
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
        
        {
          messages?.length <1 && <span className='flex justify-center text-gray-400 min-h-80 items-center'>No message between both of you</span>
        }
          {messages &&
            messages?.length > 0 &&
            messages.map(({ message, createdAt, sender, _id }) => (
             <div key={_id}>
             <div   >
             <div>
               <div  className={`flex  my-2 space-x-3 w-2/5 max-md:w-10/12 ${currentUserId=== sender && `ml-auto justify-end`}`}>
                 <div  className={ `  ${currentUserId=== sender ?`msg-own bg-slate-300/90  rounded-l-xl rounded-br-xl`:`msg-other bg-[#007dfc] rounded-r-xl rounded-bl-xl ` } border w-full relative p-4 max-md:p-3   `}>
                   <p className={ ` ${currentUserId=== sender ?` text-gray-800/90 `:` text-white ` } text-sm max-md:text-xs`}>{message}</p>
                   <small className={`${currentUserId=== sender ?`bg-slate-300/90 text-gray-800/90 `:`bg-[#007dfc] text-gray-100/70 ` } absolute bottom-0.5 right-3 text-xs  leading-none`}>
                     {createdAt && <TimeAgo timestamp={createdAt} />}
                   </small>
                   <IoTrashOutline size={20} className='absolute hidden left-5 cursor-pointer hover:text-red-600 -bottom-2'/>
                 </div>
               </div>
               </div>
             </div>
             <div ref={messagesEndRef} />
             
             </div>
            ))}
            
        </div>
        <div className="w-full mx-auto">
       
          <form
            onSubmit={sendMessage}
            className="flex items-center justify-between px-4 py-2 bg-white "
          >
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 resize-none focus:outline-none bg-transparent text-gray-800 placeholder-gray-600 text-sm leading-relaxed"
              rows="2"
              placeholder="Type your message..."
            ></textarea>
            <button className="ml-3 flex bg-custom-blue/90 items-center gap-x-2 border px-2 text-white  transition-colors duration-300 focus:outline-none">
              send <IoSendOutline className="w-5 h-8" />
            </button>
          </form>
        </div>
      </div>
        )
      }
    </section>
  );
};

export default memo(SingleChat);
