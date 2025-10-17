import React, { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts';
const JobCategoryChart = ({jobs, categoryData: preAggCategory}) => {



 const categoryData = useMemo(() => {
    if (preAggCategory && Array.isArray(preAggCategory) && preAggCategory.length > 0) {
      return preAggCategory.map(item => ({ category: item.category || item._id || 'unknown', count: item.count || 0 }));
    }
    const categories = {};
    jobs?.forEach(job => {
      if (job.category) {
        categories[job.category] = (categories[job.category] || 0) + 1;
      }
    });
    return Object.entries(categories).map(([category, count]) => ({ category, count }));
  }, [jobs, preAggCategory]);

  const chartOptions = {
    chart: {
      type: 'donut',
      background: 'transparent',
    },
    labels: categoryData.map(item => item.category),
    legend: {
        position: 'bottom',
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



   <div className='w-full h-full shadow-sm rounded-sm border-gray-200 p-3 border border-stroke flex items-center justify-center'>
   <ReactApexChart
   
   options={chartOptions}
   series={series}
   type="donut"
   height={350}
   width={'100%'}
   />
   </div>
  )
}

export default JobCategoryChart