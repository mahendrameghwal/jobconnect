import React, { useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';

// Define a color palette
const colorPalette = [
  '#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0',
  '#3F51B5', '#03A9F4', '#4CAF50', '#F9CE1D', '#FF9800',
  '#33B2DF', '#546E7A', '#D4526E', '#13D8AA', '#A5978B'
];

const DashboardSkillChart = ({ jobs }) => {
  const skillsData = useMemo(() => {
    const skillCounts = {};
    jobs?.forEach(job => {
      job?.skills?.forEach(skill => {
        skillCounts[skill] = (skillCounts[skill] || 0) + 1;
      });
    });
    return Object.entries(skillCounts)
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); 
  }, [jobs]);

  // Create a map of skills to colors
  const skillColors = useMemo(() => {
    const colorMap = {};
    skillsData.forEach((item, index) => {
      colorMap[item.skill] = colorPalette[index % colorPalette.length];
    });
    return colorMap;
  }, [skillsData]);

  const chartOptions = {
    chart: {
      type: 'pie',
    },
    labels: skillsData.map(item => item.skill),
    background: skillsData.map(item => skillColors[item.skill]),
    legend: {
      position: 'bottom',
      fontSize: '14px',
    },
    title: {
      text: 'Top 10 Job Skills',
      align: 'center',
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '63%'
        }
      }
    },
    tooltip: {
      y: {
        formatter: (value) => `${value} job${value !== 1 ? 's' : ''}`
      }
    },
   
  };

  const series = skillsData.map(item => item.count);

  return (
    <div className=' w-45  max-md:w-full shadow-sm rounded-sm border-gray-200  p-1 border border-stroke bg-white'>

      <ReactApexChart
        options={chartOptions}
        series={series}
        type="pie"
        height={400}
      />
    </div>
  );
};

export default DashboardSkillChart;