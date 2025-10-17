import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable} from '@tanstack/react-table'
import {LuChevronLast, LuChevronLeft, LuFlagTriangleRight } from "react-icons/lu"
import { GrCaretNext} from "react-icons/gr"
import { useMemo, useState , useEffect, useCallback, memo  } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import {TbGridDots} from "react-icons/tb"
import { useRejectedSingleCandidateMutation, useShortlistSingleCandidateMutation, useJobdetailWithCandidateQuery } from '../../../../app/api/JobApi';
import { toast } from 'react-hot-toast';
import { RxCross2 } from "react-icons/rx";
import { MdVideoCall } from 'react-icons/md';
import { useCreateInterviewMutation, useListInterviewsQuery } from '../../../../app/api/InterviewApi';
import { useCurrentUserQuery } from '../../../../app/api/authApi';
import { IoEyeOutline } from 'react-icons/io5'
import {format} from "date-fns"
import { MdOutlineMessage } from "react-icons/md";


export default function BasicTable({applicants}) {


    const { jobid } = useParams();
    const [searchParams] = useSearchParams();
  const data = useMemo(() => applicants, [applicants])
  const [columnFilters, setColumnFilters] = useState([])
  const [openAction, setopenAction] = useState(false);
  const [RejectedSingleCandidate] = useRejectedSingleCandidateMutation();
  const [ShortlistSingleCandidate] = useShortlistSingleCandidateMutation();
  const [createInterview] = useCreateInterviewMutation();
  const [scheduling, setScheduling] = useState({ open: false, candidateId: null, candidate: null });
  const { data: currentUser } = useCurrentUserQuery();
  const [attendees, setAttendees] = useState([]);

  // Handle URL filter parameter
  useEffect(() => {
    const filter = searchParams.get('filter');
    if (filter && (filter === 'shortlisted' || filter === 'rejected' || filter === 'pending')) {
      // Set the status filter in the table
      setColumnFilters([{ id: 'appliedJobs', value: filter }]);
    }
  }, [searchParams]);
  const [evaluations, setEvaluations] = useState([]);
  const [meetingPlatform, setMeetingPlatform] = useState('google_meet');
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [expandedId, setExpandedId] = useState(null);
  const handleApplicationClick = (index) => {
    setopenAction(index === openAction ? null : index);
  };


  const ShortlistCandidate = async (candidateId) => {
    const RejectedData = { applicationId: jobid, candidateId: candidateId };
    try {
      const response = await ShortlistSingleCandidate(RejectedData).unwrap();
    
      if (response?.message) {
        toast.success(response?.message);
        setopenAction(false)
      }
    } catch (error) {
      setopenAction(false)
      error &&
        error?.data &&
        error.data.message &&
     toast.error(error.data.message);
    }
  };
 

  const RejectCandidate = async (candidateId) => {
    const RejectedData = { applicationId: jobid, candidateId: candidateId };
    try {
      const response = await RejectedSingleCandidate(RejectedData).unwrap();
    
      if (response?.message) {
        toast.success(response?.message);
        setopenAction(false)
      }
    } catch (error) {
      setopenAction(false)
      error &&
        error?.data &&
        error.data.message &&
     toast.error(error.data.message);
    }
  };

  const openSchedule = (candidateObj) => {
    const candidateId = candidateObj?._id || candidateObj;
    setScheduling({ open: true, candidateId, candidate: candidateObj });
    const initial = [
      { email: currentUser?.email || '', role: 'employer' },
      { email: candidateObj?.email || '', role: 'candidate' },
    ];
    setAttendees(initial);
    setEvaluations([]);
  };
  // Job detail for robust title
  const { data: jobDetail } = useJobdetailWithCandidateQuery(jobid);
  const jobTitle = jobDetail?.job?.title || '';

  // Fetch interviews to compute previous rounds for this candidate on this job
  const { data: allInterviews = [] } = useListInterviewsQuery('all');
  const prevInterviews = useMemo(() => {
    if (!Array.isArray(allInterviews) || !scheduling.candidateId) return [];
    return allInterviews
      .filter(iv => (iv?.candidate?._id === scheduling.candidateId || iv?.candidate === scheduling.candidateId) && (iv?.job?._id === jobid || iv?.job === jobid))
      .sort((a,b) => new Date(a.scheduledStart) - new Date(b.scheduledStart));
  }, [allInterviews, scheduling.candidateId, jobid]);

  const nextRound = useMemo(() => {
    if (prevInterviews.length === 0) return 1;
    const maxRound = Math.max(...prevInterviews.map(iv => Number(iv.round || 1)));
    return maxRound + 1;
  }, [prevInterviews]);

  const autoTitle = useMemo(() => {
    const candidateName = scheduling.candidate?.fullname || scheduling.candidate?.name || '';
    const parts = [
      'Interview:',
      jobTitle || 'Job',
      candidateName ? `- ${candidateName}` : '',
      `- Round ${nextRound}`,
    ];
    return parts.filter(Boolean).join(' ');
  }, [jobTitle, scheduling.candidate, nextRound]);


  const submitInterview = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const payload = {
        title: autoTitle,
        roundTitle: formData.get('roundTitle') || '',
        job: jobid,
        round: nextRound,
        candidate: scheduling.candidateId,
        scheduledStart: formData.get('start'),
        scheduledEnd: formData.get('end'),
        timezone,
        attendees: attendees.filter(a => a.email),
        // Only send skills during scheduling; server validates this as well
        evaluations: evaluations.map(ev => ({ skill: ev.skill || '' })).filter(ev => ev.skill),
        // Do not send notes/feedback at scheduling time
        meetingPlatform,
      };
      const { message } = await createInterview(payload).unwrap();
      toast.success(message || 'Interview scheduled');
      setScheduling({ open: false, candidateId: null });
      setopenAction(false);
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to schedule interview');
    }
  };
 
  const columns = [
  
      {
        header: 'ID',
        accessorKey: '_id',
        size: 80, 
        enableColumnFilter:true
      },
    
    {
      enableColumnFilter:true,
      header: 'Status',
      size: 80, 
      accessorKey: 'appliedJobs',
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue) return true;
        const appliedJobs = row.original?.appliedJobs || [];
        const jobApplication = appliedJobs.find((job) => job.jobId.toString() === jobid);
        return jobApplication?.status === filterValue;
      },
      
      cell: ({row }) => {
     
        const appliedJobs = row.original?.appliedJobs || [];
  
        return appliedJobs.filter((job) => job.jobId.toString() === jobid)
          .map(({ status }, i) => {
          
            let statusColorClass = '';
            if (status === 'pending') {
              statusColorClass = ' max-md:px-1  text-yellow-500'; // pending
            } else if (status === 'shortlisted') {
              statusColorClass = ' max-md:px-1  text-green-700'; // shortlisted
            } else if (status === 'rejected') {
              statusColorClass = ' max-md:px-1  text-red-700'; // rejected
            }

            return (
              <p
                key={i}
                className={`font-medium whitespace-nowrap tracking-wide max-md:text-xs text-sm ${statusColorClass}`}
              >
                {status}

              </p>
            );
          });
      }
    },
    {
      header: 'Mobile',
      accessorKey: 'phone',
      size: 80, 
      enableColumnFilter:true
    },
    {
      header: 'Name',
      accessorKey: 'fullname',
      size: 90, 
      enableColumnFilter:true
    },
   
    {
      header: 'Email',
      accessorKey: 'email',
      size: 90, 
      enableColumnFilter:true
    },
    {
      header: 'Gender',
      accessorKey: 'gender',
      size:30, 
      enableColumnFilter:true,
      meta: {
        filterVariant: 'select',
      },
    },
    {
      header: 'Applied on',
      accessorKey: 'applydate',
      size: 80,
      enableColumnFilter:false,
      cell: ({row }) => {
     
        const appliedJobs = row.original?.appliedJobs || [];
  
        return appliedJobs.filter((job) => job.jobId.toString() === jobid)
          .map(({ dateApplied }, i) => {
          
          
            return (
              <p
                key={i}
                className={`font-medium whitespace-nowrap tracking-wide max-md:text-xs text-sm`}
              >
             {format(new Date(dateApplied), 'dd MMMM yyyy')}
              </p>
            );
          });
      }
    },
    {
       accessorKey: 'id',
       enableColumnFilter:false,
       header: 'Actions',
      cell: ({ row }) => {
      const CandidateId = row.original._id;   
   
            return (
              <div className='flex justify-start items-center'>
                          
              <button  onClick={() => handleApplicationClick(CandidateId)} className='flex cursor-pointer justify-center transform'>
              <TbGridDots color='#026edb' size={25} /></button>

      {openAction === CandidateId && (
                <div className="w-full mx-1 max-md:left-30% right-5 rounded divide-y divide-gray-100 shadow-md dark:divide-gray-700 dark:bg-gray-900 dark:shadow-lg">
                  <span className="flex flex-col overflow-hidden rounded-md border bg-white shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:shadow-md">
                    <Link
                      role="button"
                      to={`/user/candidate/${CandidateId}`}
                      className="px-1 flex items-center gap-x-1 justify-center py-1.5 text-sm max-md:text-xs font-medium text-amber-700 capitalize hover:bg-slate-200 dark:text-amber-300 dark:hover:bg-gray-600 focus:relative"
                    >
                      View <IoEyeOutline className="w-4 h-4" />
                    </Link>
                    <button
                      role="button"
                      onClick={() => ShortlistCandidate(CandidateId)}
                      className="px-1 flex items-center gap-x-1 justify-center py-1.5 text-sm max-md:text-xs font-medium text-green-700 capitalize hover:bg-slate-200 dark:text-green-300 dark:hover:bg-gray-600 focus:relative"
                    >
                      Hire Candidate <LuFlagTriangleRight className="w-4 h-4" />
                    </button>
                    <button
                      role="button"
              onClick={() => openSchedule(row.original)}
                      className="px-1 flex items-center gap-x-1 justify-center py-1.5 text-sm max-md:text-xs font-medium text-blue-700 capitalize hover:bg-slate-200 dark:text-blue-300 dark:hover:bg-gray-600 focus:relative"
                    >
                      Interview Candidate <MdVideoCall className="w-4 h-4" />
                    </button>
                    <button
                      role="button"
                      onClick={() => RejectCandidate(CandidateId)}
                      className="px-1 flex items-center gap-x-1 justify-center py-1.5 text-sm max-md:text-xs font-medium text-red-700 capitalize hover:bg-slate-200 dark:text-red-300 dark:hover:bg-gray-600 focus:relative"
                    >
                      Reject Candidate <RxCross2 className="w-4 h-4" />
                    </button>
                    <Link
                      role="button"
                      to={`/chat/${CandidateId}`}
                      className="px-1 flex items-center gap-x-1 justify-center py-1.5 text-sm font-medium bg-slate-100 text-gray-500 capitalize hover:bg-slate-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 focus:relative"
                    >
                      Message User <MdOutlineMessage className="w-4 h-4 text-custom-blue" />
                    </Link>
                  </span>
                </div>
              )}
              
                     </div>
           
              );
          }
      
    },
  ]


  

  const [sorting, setSorting] = useState([])
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      columnFilters,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onColumnFiltersChange: setColumnFilters,
  })




  const handleInputChange = (event) => {
    setFiltering(event.target.value);
  };



  return (
    <div className='overflow-y-scroll overflow-x-scroll w-full '>
    <section className="my-3 px-2 w-100  flex justify-between items-center">
      <div className="flex w-full items-center gap-4">
        <label
          htmlFor="globalsearch"
          className="relative w-1/4 max-md:w-1/2 max-sm:w-full  block rounded-sm border border-gray-300 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
          value={filtering}
          onChange={handleInputChange}
             name='globalsearch'
            type="search"
            className="peer  p-1 w-full border-none dark:text-gray-100  bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
            placeholder="Search all columns"
          />

          <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2  dark:bg-[#202938] dark:text-white bg-white p-0.5 text-xs text-gray-800 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
          Search all columns
          </span>
        </label>
        
        {/* Filter Status Indicator */}
        {searchParams.get('filter') && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">Filtered by:</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              searchParams.get('filter') === 'shortlisted' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : searchParams.get('filter') === 'rejected'
                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            }`}>
              {searchParams.get('filter')}
            </span>
            <button
              onClick={() => {
                setColumnFilters([]);
                // Clear URL parameter
                const newSearchParams = new URLSearchParams(searchParams);
                newSearchParams.delete('filter');
                window.history.replaceState({}, '', `${window.location.pathname}?${newSearchParams.toString()}`);
              }}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </section>
      <table role='table' border={1} className=" border-collapse  w-full text-sm text-left text-gray-500">
        <thead className="text-xs uppercase rounded-md bg-custom-blue dark:bg-gray-900/30  py-2">
          {table.getHeaderGroups().map(headerGroup => (
            <tr className="px-1 py-3" key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th className='py-2 px-2 border dark:border-gray-600 text-white border-white'
                  key={header.id}
                 
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <div className="flex items-center justify-start">
                      <div className="relative">
                      
                      
                      {header.column.id !== 'appliedJobs' && header.column.id !== 'id' && header.column.id !== 'applydate' &&<Filter column={header.column} />}
                        
                      </div>
                    </div>
                    
                      </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className='border dark:bg-gray-900/30 border-slate-400 '>
          {table.getRowModel().rows.map(row => (
            <tr  key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td  className=' pl-2 py-1 border dark:border-gray-600 dark:text-gray-200 border-slate-400' key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {scheduling.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <form onSubmit={submitInterview} className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-md bg-white p-4 shadow dark:bg-gray-800">
            <h3 className="mb-3 text-base font-semibold dark:text-white">Schedule Interview</h3>
            {prevInterviews.length > 0 && (
              <div className="mb-3 rounded border p-2 text-sm dark:border-gray-700 dark:text-gray-100">
                <p className="mb-2 font-semibold">Previous interviews</p>
                <ul className="space-y-2">
                  {prevInterviews.map((iv)=> {
                    const isOpen = expandedId === iv._id;
                    return (
                      <li key={iv._id} className="rounded border dark:border-gray-700">
                        <button
                          type="button"
                          onClick={()=> setExpandedId(isOpen ? null : iv._id)}
                          className="flex w-full items-center justify-between bg-gray-50 px-2 py-1 text-left dark:bg-gray-900/40"
                        >
                          <span>Round {iv.round || '-'} • {iv.title} • {format(new Date(iv.scheduledStart), 'dd MMM yyyy HH:mm')} - {iv.status}</span>
                          <span className="text-xs text-blue-600">{isOpen ? 'Hide' : 'Show'}</span>
                        </button>
                        {isOpen && (
                          <div className="px-3 py-2">
                            {Array.isArray(iv.evaluations) && iv.evaluations.length > 0 ? (
                              <div className="overflow-x-auto">
                                <table className="w-full text-xs">
                                  <thead className="text-left">
                                    <tr className="text-gray-600 dark:text-gray-300">
                                      <th className="py-1 pr-2">Skill</th>
                                      <th className="py-1 pr-2">Score</th>
                                      <th className="py-1">Feedback</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {iv.evaluations.map((ev, idx)=> (
                                      <tr key={idx} className="border-t dark:border-gray-700">
                                        <td className="py-1 pr-2">{ev?.skill || '-'}</td>
                                        <td className="py-1 pr-2">{typeof ev?.score === 'number' ? ev.score : '-'}</td>
                                        <td className="py-1"><div className="w-3/4 break-words">{ev?.feedback || '-'}</div></td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <p className="text-xs opacity-80">No evaluations recorded.</p>
                            )}
                            {iv.feedback && (
                              <div className="mt-2 text-xs">
                                <p className="font-semibold">Overall feedback</p>
                                <div className="w-3/4 whitespace-pre-wrap break-words">{iv.feedback}</div>
                              </div>
                            )}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {scheduling.candidate && (
              <div className="mb-3 rounded border p-2 text-sm dark:border-gray-700 dark:text-gray-100">
                <p><strong>Candidate:</strong> {scheduling.candidate.fullname || scheduling.candidate.name} {scheduling.candidate.email ? `(${scheduling.candidate.email})` : ''}</p>
                {scheduling.candidate.phone && <p><strong>Phone:</strong> {scheduling.candidate.phone}</p>}
              </div>
            )}
            <label className="block text-sm dark:text-gray-200">Title</label>
            <input name="title" value={autoTitle} readOnly className="mb-2 w-full rounded border p-1 dark:bg-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900/50" required />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm dark:text-gray-200">Start</label>
                <input name="start" type="datetime-local" className="w-full rounded border p-1 dark:bg-gray-900 dark:text-gray-100" required />
              </div>
              <div>
                <label className="block text-sm dark:text-gray-200">End</label>
                <input name="end" type="datetime-local" className="w-full rounded border p-1 dark:bg-gray-900 dark:text-gray-100" required />
              </div>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm dark:text-gray-200">Round</label>
                <input name="round" type="number" min="1" value={nextRound} readOnly className="w-full rounded border p-1 dark:bg-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900/50" />
              </div>
              <div>
                <label className="block text-sm dark:text-gray-200">Round title</label>
                <input name="roundTitle" placeholder="Technical Round" className="w-full rounded border p-1 dark:bg-gray-900 dark:text-gray-100" />
              </div>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm dark:text-gray-200">Timezone</label>
                <input value={timezone} onChange={(e)=>setTimezone(e.target.value)} className="w-full rounded border p-1 dark:bg-gray-900 dark:text-gray-100" />
              </div>
              <div>
                <label className="block text-sm dark:text-gray-200">Meeting platform</label>
                <select value={meetingPlatform} onChange={(e)=>setMeetingPlatform(e.target.value)} className="w-full rounded border p-1 dark:bg-gray-900 dark:text-gray-100">
                  <option value="google_meet">Google Meet</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="mt-3">
              <p className="mb-1 text-sm font-semibold dark:text-white">Attendees</p>
              {attendees.map((a, idx) => (
                <div key={idx} className="mb-2 grid grid-cols-3 gap-2">
                  <input value={a.email} onChange={(e)=>{const c=[...attendees]; c[idx]={...c[idx], email:e.target.value}; setAttendees(c);}} placeholder="email@example.com" className="rounded border p-1 dark:bg-gray-900 dark:text-gray-100" />
                  <select value={a.role} onChange={(e)=>{const c=[...attendees]; c[idx]={...c[idx], role:e.target.value}; setAttendees(c);}} className="rounded border p-1 dark:bg-gray-900 dark:text-gray-100">
                    <option value="employer">Employer</option>
                    <option value="candidate">Candidate</option>
                    <option value="interviewer">Interviewer</option>
                    <option value="other">Other</option>
                  </select>
                  <button type="button" onClick={()=> setAttendees(attendees.filter((_,i)=>i!==idx))} className="rounded bg-red-600 text-white text-sm px-2">Remove</button>
                </div>
              ))}
              <button type="button" onClick={()=> setAttendees([...attendees,{email:'',role:'interviewer'}])} className="rounded bg-gray-200 px-2 py-1 text-xs dark:bg-gray-700 dark:text-gray-100">Add attendee</button>
            </div>

            <div className="mt-3">
              <p className="mb-1 text-sm font-semibold dark:text-white">Skills to evaluate</p>
              {evaluations.map((ev, idx) => (
                <div key={idx} className="mb-2 grid grid-cols-1 gap-2">
                  <input value={ev.skill||''} onChange={(e)=>{const c=[...evaluations]; c[idx]={ skill:e.target.value }; setEvaluations(c);}} placeholder="Skill" className="rounded border p-1 dark:bg-gray-900 dark:text-gray-100" />
                  <button type="button" onClick={()=> setEvaluations(evaluations.filter((_,i)=>i!==idx))} className="justify-self-start rounded bg-red-600 text-white text-xs px-2 py-0.5">Remove</button>
                </div>
              ))}
              <button type="button" onClick={()=> setEvaluations([...evaluations, { skill:'' }])} className="rounded bg-gray-200 px-2 py-1 text-xs dark:bg-gray-700 dark:text-gray-100">Add skill</button>
            </div>

            {/* Notes and feedback will be provided after interview completion from the Interview tab */}

            <div className="mt-3 flex justify-end gap-2">
              <button type="button" onClick={() => setScheduling({ open: false, candidateId: null })} className="rounded bg-gray-200 px-3 py-1 text-sm dark:bg-gray-700 dark:text-gray-200">Cancel</button>
              <button type="submit" className="rounded bg-blue-600 px-3 py-1 text-sm text-white">Create</button>
            </div>
          </form>
        </div>
      )}
      
      <div className='flex gap-x-3 max-md:gap-x-1 justify-end mt-3 flex-wrap'>
        <button className=" text-white cursor-pointer flex items-center  bg-custom-blue active:border rounded-sm duration-100  py-1 px-3" onClick={() => table.setPageIndex(0)}>
        <span className='text-sm capitalize'>1</span>
        </button>
       
        <button    disabled={!table.getCanPreviousPage()}
        onClick={() => table.previousPage()} title="previous page" className=" text-white cursor-pointer flex items-center  bg-custom-blue active:border rounded-sm duration-100  py-1 px-3">
        <LuChevronLeft color='white' />
        <span className='text-sm capitalize'>previous </span>
        </button> 
      

        <button   disabled={!table.getCanNextPage()}
        onClick={() => table.nextPage()} title="Next page" className=" text-white cursor-pointer flex items-center  bg-custom-blue active:border rounded-sm duration-100  py-1 px-3">
        <span className='text-sm capitalize'>Next </span><LuChevronLast color='white' />
        </button> 
<button  onClick={() => table.setPageIndex(table.getPageCount() - 1)} title="last page" className=" text-white cursor-pointer flex items-center  bg-custom-blue active:border rounded-sm duration-100  py-1 px-3">
<span className='text-sm capitalize'>last </span>  <GrCaretNext  color='white' /> 
</button>

      </div>
    </div>
  )
}



const DebouncedInput = memo(({ value: initialValue, onChange, debounce = 500, ...props }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input {...props} value={value} onChange={e => setValue(e.target.value)} />
  );
});




function Filter({ column }) {

  const columnFilterValue = column.getFilterValue();
  const filterVariant = column.columnDef.meta?.filterVariant;


  const handleFilterChange = useCallback(
    (value) => {
      column.setFilterValue(value);
    },
    [column]
  );

  return (

   filterVariant==='select' ? (
    <>
    <select  className='py-1 text-black outline-none'
      onChange={e => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}>
      <option  value="">All</option>
      <option  value="male">male</option>
      <option  value="female">female</option>
      <option  value="transgender">transgender</option>
      </select>
  
      </>
   ) :

    <DebouncedInput 
      className="w-36 border shadow rounded-sm py-1 outline-none text-black"
      onChange={handleFilterChange}
      placeholder={`search by ${column.id ==='fullname'? "name": column.id }`}
      type="text"
      value={(columnFilterValue ??'')}
    />
  );
}






























