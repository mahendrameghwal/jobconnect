import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable} from '@tanstack/react-table'
import {LuChevronLast, LuChevronLeft, LuFlagTriangleRight } from "react-icons/lu"
import { GrCaretNext} from "react-icons/gr"
import { useMemo, useState , useEffect, useCallback, memo  } from 'react'
import { Link, useParams } from 'react-router-dom'
import {TbGridDots} from "react-icons/tb"
import { useRejectedSingleCandidateMutation, useShortlistSingleCandidateMutation } from '../../../../app/api/JobApi';
import { toast } from 'react-hot-toast';
import { RxCross2 } from "react-icons/rx";
import { IoEyeOutline } from 'react-icons/io5'
import {format} from "date-fns"
import { MdOutlineMessage } from "react-icons/md";


export default function BasicTable({applicants}) {


    const { jobid } = useParams();
  const data = useMemo(() => applicants, [applicants])
  const [columnFilters, setColumnFilters] = useState([])
  const [openAction, setopenAction] = useState(false);
  const [RejectedSingleCandidate] = useRejectedSingleCandidateMutation();
  const [ShortlistSingleCandidate] = useShortlistSingleCandidateMutation();
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
 
  const columns = [
  /*
      {
        header: 'ID',
        accessorKey: '_id',
        size: 80, 
        enableColumnFilter:true
      },
    */ 
    {
      enableColumnFilter:true,
      header: 'Status',
      size: 80, 
      accessorKey: 'appliedJobs',
      
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

                  {openAction===CandidateId && (
                       <div className="  w-full mx-1  max-md:left-30% right-5    bg-white rounded divide-y divide-gray-100 shadow-md ">
                         <span className="flex flex-col   overflow-hidden rounded-md border bg-white shadow-sm">
                           <Link  role='button'
                             to={`/user/candidate/${CandidateId}`}
                             className="px-1 flex items-center gap-x-1 justify-center py-1.5 text-sm font-medium hover:bg-slate-200 text-amber-700  capitalize  focus:relative"
                           >
                             view  <IoEyeOutline size={21} />
                           </Link>
                           <button   role='button'  onClick={() => ShortlistCandidate(CandidateId)} className="px-1 flex  items-center gap-x-1 justify-center py-1.5 text-sm font-medium hover:bg-slate-200  text-green-700  capitalize  focus:relative">
                             Hire Candidate <LuFlagTriangleRight size={21} />
                           </button>
                           <button role='button'
                             onClick={() => RejectCandidate(CandidateId)}
                             className="px-1 flex items-center gap-x-1 justify-center py-1.5 text-sm font-medium hover:bg-slate-200 text-red-700  capitalize  focus:relative"
                           >
                             reject Candidate <RxCross2  size={21} />
                           </button>
                           <Link role='button'
                            to={`/chat/${CandidateId}`}
                             className="px-1 flex items-center gap-x-1 justify-center py-1.5 text-sm font-medium bg-slate-100 hover:bg-slate-300 text-gray-500 capitalize  focus:relative"
                           >
                             message user <MdOutlineMessage  size={21} className='text-custom-blue'  />
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
    <section className="my-3 px-2 w-100  flex justify-start ">
    <label
      htmlFor="globalsearch"
      className="relative w-1/4 max-md:w-1/2 max-sm:w-full  block rounded-sm border border-gray-300 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
    >
      <input
      value={filtering}
      onChange={handleInputChange}
         name='globalsearch'
        type="search"
        className="peer  p-1 w-full border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
        placeholder="Search all columns"
      />

      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-800 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
      Search all columns
      </span>
    </label>
  </section>
      <table role='table' border={1} className=" border-collapse w-full text-sm text-left text-gray-500">
        <thead className="text-xs uppercase rounded-md bg-custom-blue  py-2">
          {table.getHeaderGroups().map(headerGroup => (
            <tr className="px-1 py-3" key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th className='py-2 px-2 border text-white border-white'
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

        <tbody className='border border-slate-400 '>
          {table.getRowModel().rows.map(row => (
            <tr  key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td  className=' pl-2 py-1 border border-slate-400' key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
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






























