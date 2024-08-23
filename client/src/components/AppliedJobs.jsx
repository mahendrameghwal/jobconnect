import React, { Fragment } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CiLocationOn } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const AppliedJobs = ({isLoading,currentuserid, Isorg ,applicationdata}) => {
 

  if (isLoading) {
    return (
      <Fragment>
        <div className='flex py-10 justify-center'> 
          <pre>loading・・・</pre>
        </div>
      </Fragment>
    );
  }

 
  if (!applicationdata ) {
    return (
      <Fragment>
        <div className='flex py-10 justify-center'> 
          <pre className='text-blue-400'>No applied jobs data available</pre>
        </div>
      </Fragment>
    );
  }

 
  if (applicationdata.length === 0) {
    return (
      <Fragment>
        <div className='flex py-10 justify-center'> 
          <pre className='text-blue-400'>You Haven't applied any Jobs 😶 </pre>
        </div>
      </Fragment>
    );
  }

  if(applicationdata.length>0){
    return(
      <Fragment>
      <div className="flex  items-center  m-2 justify-between">
     
      <p className="text-lg tracking-wide font-semibold capitalize flex-wrap flex gap-x-2">
  {Isorg ? (
    <span className="text-blue-500 font-semibold text-xl ">Posted Jobs</span>
  ) : (
    <span className="text-blue-500 font-semibold text-xl ">Applied Jobs</span>
  )}
  <span className="text-sm dark:text-white">({`${applicationdata.length}`})</span>
</p>
      </div>
    
      <Carousel additionalTransfrom={1}  arrows autoPlaySpeed={6000} className="" containerClass="container"
      draggable focusOnSelect={false} infinite={false}
   keyBoardControl minimumTouchDrag={80} pauseOnHover renderArrowsWhenDisabled={false} renderButtonGroupOutside={false} renderDotsOutside={false} responsive={{
      desktop: {
        breakpoint: {
          max: 3000,
          min: 1024
        },
        items: 3,
        partialVisibilityGutter: 40
      },
      mobile: {
        breakpoint: {
          max: 464,
          min: 0
        },
        items: 1,
        partialVisibilityGutter: 30
      },
      tablet: {
        breakpoint: {
          max: 1024,
          min: 464
        },
        items: 2,
        partialVisibilityGutter: 30
      }
    }}
    rewind={false}
    rewindWithAnimation={true}
    rtl={false}
    shouldResetAutoplay
    showDots={false}
    slidesToSlide={1}
    swipeable 
  >
  
  {applicationdata && Array.isArray(applicationdata) && applicationdata.map((job, i) => {
    if (!job || !job.jobId) return null; 
    
    const {jobId: { _id, title, shortdesc, city, state ,createdAt},status, dateApplied, } = job;
    
    return (
      <div key={i} className=" dark:bg-gray-900/95 dark:border-none m-2 relative hover:shadow-xl p-1 rounded-xl transition-shadow duration-150 shadow-sm cursor-pointer border border-gray-200 bg-opacity-60 bg-blue-100">
        <div className="flex-col  px-1 py-2 mt-1 items-center">
          <span className="text-gray-800 capitalize flex-wrap flex justify-start font-medium dark:text-white">{ !Isorg ?title:job?.title}</span>
          <span className="text-gray-500 text-xs dark:text-gray-300">
            {
              !Isorg  ?formatDistanceToNow(new Date(dateApplied), { addSuffix: true }):formatDistanceToNow(new Date(job?.createdAt), { addSuffix: true })
            }
          </span>
          <span
            className="text-gray-800 dark:text-gray-200 mt-1 capitalize flex flex-wrap break-normal justify-start text-sm items-center"
            style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {shortdesc && shortdesc.length > 80 ? (
              <div className='flex-col'>
                <span>{shortdesc.slice(0, 60)}</span>
                <Link to={`/post/search/about/${_id}`} className="dark:text-gray-400  px-2 cursor-pointer underline">
                  See more
                </Link>
              </div>
            ) : (
              shortdesc
            )}

            {job.shortdesc && job.shortdesc.length > 80 ? (
              <div className='flex-col'>
                <span>{job.shortdesc.slice(0, 60)}</span>
                <Link to={`/post/search/about/${_id}`} className="dark:text-gray-400  px-2 cursor-pointer hover:underline">
                  See more
                </Link>
              </div>
            ) : (
              job.shortdesc
            )}
          </span>
          {
         

            status && (
              <span 
                className={`absolute px-2 tracking-wide rounded-r-md text-sm top-0 right-0 ${
                  status === 'pending' ? 'dark:bg-amber-300 bg-amber-300/55 text-amber-900' :
                  status === 'rejected' ? 'dark:bg-red-300 bg-red-300/55 text-red-900' :
                  status === 'shortlisted' ? 'dark:bg-green-300 bg-green-300/55 text-green-900 m' :
                  ''
                }`}
              >
                {status}
              </span>
            )
          }
          
          <span className="text-gray-800 mt-1 dark:text-gray-100 capitalize flex justify-start text-sm items-center">
            <CiLocationOn className='max-md:h-4 ' size={20}/>
            { !Isorg ?city:job?.city} &nbsp;
            { !Isorg ?state:job?.state}
          </span>
          <div className='flex flex-row justify-between gap-x-1'>
            <Link to={Isorg ? (`/post/search/about/${job._id}`): (`/post/search/about/${_id}`)} role='link' className="text-blue-700 underline tracking-wider capitalize flex justify-start text-sm items-center">
              View Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  })}
  
   
  </Carousel>
  </Fragment>
    )
   }
   else{
    return (
     <Fragment>
     <div className='flex py-10 justify-center'> 
     <pre className='text-blue-400'>You Haven't applied any Jobs 😶 </pre>
     </div>
   </Fragment>
    )
    }
}

export default AppliedJobs;