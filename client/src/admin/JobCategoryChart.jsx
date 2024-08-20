import React, { useMemo } from 'react'

import ReactApexChart from 'react-apexcharts';
const JobCategoryChart = ({jobs}) => {



 const categoryData = useMemo(() => {
    const categories = {};
    jobs?.forEach(job => {
      if (job.category) {
        categories[job.category] = (categories[job.category] || 0) + 1;
      }
    });
    return Object.entries(categories).map(([category, count]) => ({ category, count }));
  }, [jobs]);

  const chartOptions = {
    chart: {
      type: 'donut',
    },
    labels: categoryData.map(item => item.category),
    legend: {
        position: 'left',
        fontSize: '14px',
      },
    
   title: {
      text: 'Job category',
      align: 'left',
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '63%',
        }
      }
    }
    
  };

  const series = categoryData.map(item => item.count);


  return (



   <div className=' w-45  max-md:w-full  shadow-sm  rounded-sm border-gray-200  p-1 border border-stroke bg-white'>
   <ReactApexChart
   
   options={chartOptions}
   series={series}
   type="donut"
   height={350}/>
   </div>
  )
}

export default JobCategoryChart