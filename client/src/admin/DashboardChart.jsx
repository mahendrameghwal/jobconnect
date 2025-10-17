import React, { useMemo, Suspense, lazy } from 'react'
import Loader from '../components/Loader';
import { motion } from 'framer-motion';
import { FcHighPriority } from 'react-icons/fc';
import { useAdminReportQuery } from '../../app/api/authApi';

const JobCategoryChart = lazy(() => import('./JobCategoryChart'));
const DashboardSkillChart = lazy(() => import('./DashboardSkillChart'));
const MonthOverMonthPie = lazy(() => import('./MonthOverMonthPie'));
const InterviewStatusPie = lazy(() => import('./InterviewStatusPie'));
const JobsByTypeChart = lazy(() => import('./JobsByTypeChart'));
const JobsByLevelChart = lazy(() => import('./JobsByLevelChart'));

const DashboardChart = () => {
  const { data: report, isLoading: loading, isError, error } = useAdminReportQuery();

  const categoryData = useMemo(() => {
    return report?.breakdowns?.jobsByCategory || [];
  }, [report]);

  const skillsData = useMemo(() => {
    return report?.breakdowns?.topSkills || [];
  }, [report]);

  const interviewStatus = useMemo(() => {
    return report?.interviews?.allTimeByStatus || [];
  }, [report]);

  const interviewStatusThisMonth = useMemo(() => {
    return report?.interviews?.thisMonthByStatus || [];
  }, [report]);

  const interviewsMoM = useMemo(() => {
    return report?.interviews?.monthOverMonth || { thisMonth: 0, prevMonth: 0 };
  }, [report]);

  const kpis = useMemo(() => {
    const totals = report?.totals || {};
    return [
      { label: 'Users', value: totals.users || 0 },
      { label: 'Companies', value: totals.orgs || 0 },
      { label: 'Candidates', value: totals.candidates || 0 },
      { label: 'Jobs', value: totals.jobs || 0 },
      { label: 'Applications', value: totals.applications || 0 },
    ];
  }, [report]);

  const jobsByType = useMemo(() => report?.breakdowns?.jobsByType || [], [report]);
  const jobsByLevel = useMemo(() => report?.breakdowns?.jobsByLevel || [], [report]);

  if (loading) return <Loader/>;

  if (isError) {
    return (
      <div className="flex w-full border-l-6 border-warning bg-warning bg-opacity-[15%] px-7 py-8 bg-[#e98532] shadow-md   md:p-9">
        <div className="mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-warning bg-opacity-30">
          <FcHighPriority size={20}/>
        </div>
        <div className="w-full">
          <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">Error</h5>
          <p className="leading-relaxed text-[#D0915C]">{error?.data?.message || 'Failed to load admin report'}</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex w-full border-l-6 border-warning bg-warning bg-opacity-[15%] px-7 py-8 bg-[#e98532] shadow-md   md:p-9">
        <div className="mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-warning bg-opacity-30">
          <FcHighPriority size={20}/>
        </div>
        <div className="w-full">
          <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">Error</h5>
          <p className="leading-relaxed text-[#D0915C]">Report not available</p>
        </div>
      </div>
    );
  }

  return (
   <motion.section
   initial={{ y: -50, opacity: 0 }}
   animate={{ y: 0, opacity: 1 }}
   exit={{ y: -50, opacity: 0 }}
   transition={{ duration: 0.2 }}
   >
   {/* KPI Cards */}
   <section className='grid grid-cols-5 gap-3 max-md:grid-cols-2 mb-4'>
     {kpis.map((kpi, idx) => (
       <div key={idx} className='rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-gray-600 dark:bg-gray-900/30'>
         <p className='text-sm text-gray-500 dark:text-gray-300'>{kpi.label}</p>
         <h3 className='text-2xl font-semibold text-black dark:text-white'>{kpi.value}</h3>
       </div>
     ))}
   </section>

  {/* Charts */}
  <section className='grid grid-cols-2 gap-4 max-md:grid-cols-1 items-stretch content-stretch'>
   <Suspense fallback={<Loader/>}>
     <JobCategoryChart categoryData={categoryData}/>
   </Suspense>
   <Suspense fallback={<Loader/>}>
     <DashboardSkillChart skillsData={skillsData}/>
   </Suspense>
   <Suspense fallback={<Loader/>}>
     <InterviewStatusPie title={'Interviews: Status (This Month)'} data={interviewStatusThisMonth} />
   </Suspense>
   <Suspense fallback={<Loader/>}>
     <MonthOverMonthPie title={'Interviews: This vs Previous Month'} data={{ labels: ['This Month', 'Previous Month'], series: [interviewsMoM.thisMonth, interviewsMoM.prevMonth] }} />
   </Suspense>
   <Suspense fallback={<Loader/>}>
     <JobsByTypeChart data={jobsByType} />
   </Suspense>
   <Suspense fallback={<Loader/>}>
     <JobsByLevelChart data={jobsByLevel} />
   </Suspense>
  
   </section>
   </motion.section>
  )
}

export default DashboardChart;