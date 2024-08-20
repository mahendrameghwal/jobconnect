import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {CiLocationOn} from "react-icons/ci" ;
import { Fragment, useState } from 'react';
import { useGetOrgQuery } from '../../app/api/OrgApi';
import { Link } from 'react-router-dom';
import { GoOrganization } from "react-icons/go";

const Top = () => {

const {data, isLoading}= useGetOrgQuery()

if(isLoading){
  return (
     <Fragment>
     <div className='flex py-10 justify-center'>  <pre>loading・・・</pre></div></Fragment>)
}

if(!data){
  return (
     <Fragment>
     <div className='flex py-10 justify-center'> 
       <pre className='text-red-500'>Unable to load Jobs Please try again later ⚠️</pre>
     </div>
 </Fragment>
)


  }
  return (
    <Fragment>
    <div className="flex px-2  my-4 justify-between">
    <p className="text-lg tracking-wide font-semibold capitalize "><span className="text-blue-500 font-semibold text-xl">Top </span>companies</p>
    <p className="text-blue-500 font-medium underline cursor-pointer">View all </p>
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
    data && data.length >0 &&
    data.map(({avtar,orgname,city,state,country,_id},i)=>(
        <div key={i} className=" m-2  transform hover:-translate-y-1 transition-all hover:shadow-xl p-2 rounded-xl duration-200 shadow-sm  border border-gray-200  bg-blue-50 ">
<div>
<div className="flex px-1 items-center justify-start">
{
  avtar && <img className="h-8 max-md:h-12 rounded-md " src={avtar} alt="" />
}
{
  !avtar && <GoOrganization className="h-8 max-md:h-12 rounded-md "  size={20}/>
}

</div>
<div className="flex-col px-1 mt-1 items-center ">
<span className="text-gray-800 capitalize flex justify-start  max-md:font-medium font-semibold ">{orgname}</span> 
<span className="text-gray-800 mt-1 capitalize flex-wrap flex justify-start text-sm  items-center ">{city} ({state})</span>
<span className="text-gray-800 mt-1 capitalize flex-wrap flex justify-start text-sm  items-center ">{country}</span>
<Link to={`/browsecompanies/profile/${_id}`} className="text-blue-700  underline mt-3 capitalize tracking-wider flex justify-start text-sm  items-center ">View profile</Link>




</div>
</div>

</div>
    ))
}

 
</Carousel>
</Fragment>
  )
}

export default Top