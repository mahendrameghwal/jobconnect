


import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {CiLocationOn} from "react-icons/ci" ;
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecommendedJobs = () => {
    const  [first, ] = useState([1,2,3,4,5,6,7,8,9])
   const navigate = useNavigate()
  return (
    <Fragment>
    <div >
<div className="flex   my-4  justify-between">
<p className="text-lg tracking-wide font-semibold capitalize "><span className="text-blue-500 font-semibold text-xl">Recommended</span> <span className='dark:text-white'>jobs</span></p>
<p className="text-blue-500 font-medium underline cursor-pointer">View all </p>
</div>

</div>
   
    <Carousel additionalTransfrom={0} arrows autoPlaySpeed={3000} centerMode={false} className="" containerClass="container"
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

{
    first && 
    first.map((x,i)=>(
        <div key={i} onClick={()=>{navigate(`post/search/job-description/${x}`)}} className=" dark:bg-gray-900/95 dark:border-none  m-2 hover:shadow-xl p-2 rounded-xl transition-shadow duration-150 shadow-sm cursor-pointer border border-gray-200  bg-blue-50 ">
<div>
<div className="flex px-1 items-center justify-between">
<img className="h-10 rounded-md " src="https://img.naukimg.com/logo_images/groups/v1/4628151.gif" alt="" />
<span className="text-gray-500 dark:text-gray-400">2 days ago</span>
</div>
<div className="flex-col px-1 mt-4 items-center justify-between">
<span className="text-gray-800 capitalize  font-semibold  dark:text-white  ">senior Software Engineer</span> <br />
<span className="text-gray-700  dark:text-gray-100  capitalize  text-base font-medium ">Company-name</span><br />
<span className="text-gray-500  dark:text-gray-100  capitalize text-sm  flex items-center gap-x-1"><CiLocationOn size={20}/> Jaipur (Rajasthan)</span>

</div>
</div>

</div>
    ))
}

 
</Carousel>
</Fragment>
  )
}

export default RecommendedJobs