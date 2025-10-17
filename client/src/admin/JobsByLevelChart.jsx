import React, { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts';

const JobsByLevelChart = ({ data }) => {
  // Normalize similar levels (e.g., 'mid-level' vs 'Mid-level')
  const aggregated = useMemo(() => {
    const map = {};
    (data || []).forEach(d => {
      const key = (d.level || 'unknown').toLowerCase();
      map[key] = (map[key] || 0) + (d.count || 0);
    });
    return Object.entries(map).map(([level, count]) => ({ level, count }));
  }, [data]);

  const labels = useMemo(() => aggregated.map(d => d.level), [aggregated]);
  const series = useMemo(() => aggregated.map(d => d.count), [aggregated]);

  const options = useMemo(() => ({
    chart: { type: 'donut', background: 'transparent' },
    labels,
    legend: { position: 'bottom', fontSize: '14px' },
    title: { text: 'Jobs by Level', align: 'left', style: { fontSize: '18px', fontWeight: 'bold' } },
    plotOptions: { pie: { donut: { size: '63%' } } }
  }), [labels]);

  return (
    <div className='w-full h-full shadow-sm rounded-sm border-gray-200 p-3 border border-stroke flex items-center justify-center'>
      <ReactApexChart options={options} series={series} type="donut" height={350} width={'100%'} />
    </div>
  );
}

export default JobsByLevelChart


