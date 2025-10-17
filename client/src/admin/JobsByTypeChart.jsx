import React, { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts';

const JobsByTypeChart = ({ data }) => {
  const labels = useMemo(() => (data || []).map(d => d.type || 'unknown'), [data]);
  const series = useMemo(() => (data || []).map(d => d.count || 0), [data]);

  const options = useMemo(() => ({
    chart: { type: 'donut', background: 'transparent' },
    labels,
    legend: { position: 'bottom', fontSize: '14px' },
    title: { text: 'Jobs by Type', align: 'left', style: { fontSize: '18px', fontWeight: 'bold' } },
    plotOptions: { pie: { donut: { size: '63%' } } }
  }), [labels]);

  return (
    <div className='w-full h-full shadow-sm rounded-sm border-gray-200 p-3 border border-stroke flex items-center justify-center'>
      <ReactApexChart options={options} series={series} type="donut" height={350} width={'100%'} />
    </div>
  );
}

export default JobsByTypeChart


