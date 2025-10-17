import React, { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts';

const MonthOverMonthPie = ({ title = 'This vs Previous Month', data }) => {
  const { labels = ['This Month', 'Previous Month'], series = [0, 0] } = data || {};

  const options = useMemo(() => ({
    chart: { type: 'donut', background: 'transparent' },
    labels,
    legend: { position: 'bottom', fontSize: '14px' },
    title: { text: title, align: 'left', style: { fontSize: '18px', fontWeight: 'bold' } },
    plotOptions: { pie: { donut: { size: '63%' } } }
  }), [labels, title]);

  return (
    <div className='w-full h-full shadow-sm rounded-sm border-gray-200 p-3 border border-stroke flex items-center justify-center'>
      <ReactApexChart options={options} series={series} type="donut" height={350} width={'100%'} />
    </div>
  );
}

export default MonthOverMonthPie


