import React, { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts';

const InterviewStatusPie = ({ title = 'Interviews Status', data }) => {
  const series = useMemo(() => (data || []).map(d => d.count), [data]);
  const labels = useMemo(() => (data || []).map(d => d.status || 'unknown'), [data]);

  const options = useMemo(() => ({
    chart: { type: 'pie', background: 'transparent' },
    labels,
    legend: { position: 'bottom', fontSize: '14px' },
    title: { text: title, align: 'left', style: { fontSize: '18px', fontWeight: 'bold' } },
    plotOptions: { pie: { donut: { size: '63%' } } }
  }), [labels, title]);

  return (
    <div className='w-full h-full shadow-sm rounded-sm border-gray-200 p-3 border border-stroke flex items-center justify-center'>
      <ReactApexChart options={options} series={series} type="pie" height={350} width={'100%'} />
    </div>
  );
}

export default InterviewStatusPie


