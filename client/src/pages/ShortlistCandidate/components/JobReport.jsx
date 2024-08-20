import React, { Fragment } from "react";
import {motion} from "framer-motion";
const JobReport = () => {
  return (
    <Fragment>
    <motion.div
    initial={{ opacity: 0, scale:1 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.6 }}
    className="p-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <div className="bg-white rounded-md border border-orange-400/50 p-6 hover:shadow-lg shadow shadow-black/5">
        <div className="flex justify-between mb-6">
          <div>
            <div className="flex items-center mb-1">
              <div className="text-2xl font-semibold">2</div>
            </div>
            <div className="text-sm font-medium text-gray-400">Total Applied Candidate</div>
          </div>
          <div className="dropdown">
            <button
              type="button"
              className="dropdown-toggle text-gray-400 hover:text-gray-600"
            >
              <i className="ri-more-fill"></i>
            </button>
            <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
              <li>
                <a
                  href="#"
                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>

        <a
          href="/gebruikers"
          className="text-[#f84525] font-medium text-sm hover:text-red-800"
        >
          View
        </a>
      </div>
      <div className="bg-white rounded-md border border-green-400 p-6 shadow-md hover:shadow-lg shadow-black/5">
        <div className="flex justify-between mb-4">
          <div>
            <div className="flex items-center mb-1">
              <div className="text-2xl font-semibold">100</div>
              <div className="p-1 rounded bg-emerald-500/10 text-emerald-500 text-[12px] font-semibold leading-none ml-2">
                +30%
              </div>
            </div>
            <div className="text-sm font-medium text-gray-400">
            shortlisted candidates
            </div>
          </div>
          <div className="dropdown">
            <button
              type="button"
              className="dropdown-toggle text-gray-400 hover:text-gray-600"
            >
              <i className="ri-more-fill"></i>
            </button>
            <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
              <li>
                <a
                  href="#"
                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
        <a
          href="/dierenartsen"
          className="text-[#f84525] font-medium text-sm hover:text-red-800"
        >
          View
        </a>
      </div>
      <div className="bg-white rounded-md border border-red-500 p-6 shadow-md hover:shadow-lg shadow-black/5">
        <div className="flex justify-between mb-6">
          <div>
            <div className="text-2xl font-semibold mb-1">100</div>
            <div className="text-sm font-medium text-gray-400">rejected candidates</div>
          </div>
          <div className="dropdown">
            <button
              type="button"
              className="dropdown-toggle text-gray-400 hover:text-gray-600"
            >
              <i className="ri-more-fill"></i>
            </button>
            <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
              <li>
                <a
                  href="#"
                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
        <a
          href=""
          className="text-[#f84525] font-medium text-sm hover:text-red-800"
        >
          View
        </a>
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div className="p-6 max-md:p-4 relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
        <div className="rounded-t mb-0 px-0 border-0">
          <div className="flex flex-wrap items-center  py-2">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">
               Total Candidate : 100
              </h3>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    job process
                  </th>
                  <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Numbers
                  </th>
                  <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">rate in (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-gray-700 dark:text-gray-100">
                  <th className="border-t-0  tracking-wider text-orange-400 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    Selected 
                  </th>
                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    70
                  </td>
                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex items-center">
                      <span className="mr-2">70%</span>
                      <div className="relative w-full">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                          <div
                          style={{ width: '70%' }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="text-gray-700 dark:text-gray-100">
                  <th className="border-t-0 px-4 tracking-wider text-green-400 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                 Interviewed
                  </th>
                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    40
                  </td>
                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex items-center">
                      <span className="mr-2">40%</span>
                      <div className="relative w-full">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                          <div
                          style={{ width: '40%' }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="text-gray-700 dark:text-gray-100">
                  <th className="border-t-0 px-4 tracking-wider text-red-400 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    Rejected
                  </th>
                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    10
                  </td>
                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex items-center">
                      <span className="mr-2">45%</span>
                      <div className="relative w-full">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-pink-200">
                          <div
                          style={{ width: '45%' }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="text-gray-700 dark:text-gray-100">
                  <th className="border-t-0 text-blue-400 tracking-wider px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                   Verified
                  </th>
                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    4
                  </td>
                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex items-center">
                      <span className="mr-2">60%</span>
                      <div className="relative w-full">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                          <div
                          style={{ width: '60%' }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr className="text-gray-700 dark:text-gray-100">
                <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  User
                </th>
                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  4
                </td>
                <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <span className="mr-2">60%</span>
                    <div className="relative w-full">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                        <div
                        style={{ width: '60%' }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-1 rounded-md">
        <div className="flex justify-between mb-4 items-start">
          <div className="font-medium">Activities</div>
          <div className="dropdown">
            <button
              type="button"
              className="dropdown-toggle text-gray-400 hover:text-gray-600"
            >
              <i className="ri-more-fill"></i>
            </button>
            <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
              <li>
                <a
                  href="#"
                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className="w-full flex flex-col overflow-y-scroll h-60  ">
         
      <tr className="py-2 px-2 mb-2 flex  hover:text-blue-600 hover:font-normal cursor-pointer justify-start gap-x-2 items-center transition-colors hover:shadow-md hover:bg-slate-100/60 w-full border border-gray-400/70 rounded-md">
      <span className="flex items-center">
        <img className="h-12 w-12 rounded-full" src="https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg" alt="" />
        <span className="text-xs ml-4">Mahendra kumar Applied for Job successfully</span>
      </span>
      <span className="text-[13px] font-medium text-gray-400">
        17.50
      </span>
    </tr>
    <tr className="py-2 px-2 mb-2 flex  hover:text-blue-600 hover:font-normal cursor-pointer justify-start gap-x-2 items-center transition-colors hover:shadow-md hover:bg-slate-100/60 w-full border border-gray-400/70 rounded-md">
    <span className="flex items-center">
      <img className="h-12 w-12 rounded-full" src="https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg" alt="" />
      <span className="text-xs ml-4">Mahendra kumar Applied for Job successfully</span>
    </span>
    <span className="text-[13px] font-medium text-gray-400">
      17.50
    </span>
  </tr>
  <tr className="py-2 px-2 mb-2 flex  hover:text-blue-600 hover:font-normal cursor-pointer justify-start gap-x-2 items-center transition-colors hover:shadow-md hover:bg-slate-100/60 w-full border border-gray-400/70 rounded-md">
  <span className="flex items-center">
    <img className="h-12 w-12 rounded-full" src="https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg" alt="" />
    <span className="text-xs ml-4">Mahendra kumar Applied for Job successfully</span>
  </span>
  <span className="text-[13px] font-medium text-gray-400">
    17.50
  </span>
</tr>

          </div>
        </div>
      </div>
    </div>{
      /** hi there */
    }
   
  </motion.div>
    </Fragment>
  );
};

export default JobReport;


// <td className="py-2 px-4 border-b border-b-gray-50">
// <div className="dropdown">
//   <button
//     type="button"
//     className="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm w-6 h-6 rounded flex items-center justify-center bg-gray-50"
//   >
//     <i className="ri-more-2-fill"></i>
//   </button>
//   <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
//     <li>
//       <a
//         href="#"
//         className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
//       >
//         Profile
//       </a>
//     </li>
//     <li>
//       <a
//         href="#"
//         className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
//       >
//         Settings
//       </a>
//     </li>
//     <li>
//       <a
//         href="#"
//         className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
//       >
//         Logout
//       </a>
//     </li>
//   </ul>
// </div>
// </td>






// <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
// <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md lg:col-span-2">
//   <div className="flex justify-between mb-4 items-start">
//     <div className="font-medium">Order Statistics</div>
//     <div className="dropdown">
//       <button
//         type="button"
//         className="dropdown-toggle text-gray-400 hover:text-gray-600"
//       >
//         <i className="ri-more-fill"></i>
//       </button>
//       <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
//         <li>
//           <a
//             href="#"
//             className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
//           >
//             Profile
//           </a>
//         </li>
//         <li>
//           <a
//             href="#"
//             className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
//           >
//             Settings
//           </a>
//         </li>
//         <li>
//           <a
//             href="#"
//             className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
//           >
//             Logout
//           </a>
//         </li>
//       </ul>
//     </div>
//   </div>
//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
//     <div className="rounded-md border border-dashed border-gray-200 p-4">
//       <div className="flex items-center mb-0.5">
//         <div className="text-xl font-semibold">10</div>
//         <span className="p-1 rounded text-[12px] font-semibold bg-blue-500/10 text-blue-500 leading-none ml-1">
//           $80
//         </span>
//       </div>
//       <span className="text-gray-400 text-sm">Active</span>
//     </div>
//     <div className="rounded-md border border-dashed border-gray-200 p-4">
//       <div className="flex items-center mb-0.5">
//         <div className="text-xl font-semibold">50</div>
//         <span className="p-1 rounded text-[12px] font-semibold bg-emerald-500/10 text-emerald-500 leading-none ml-1">
//           +$469
//         </span>
//       </div>
//       <span className="text-gray-400 text-sm">Completed</span>
//     </div>
//     <div className="rounded-md border border-dashed border-gray-200 p-4">
//       <div className="flex items-center mb-0.5">
//         <div className="text-xl font-semibold">4</div>
//         <span className="p-1 rounded text-[12px] font-semibold bg-rose-500/10 text-rose-500 leading-none ml-1">
//           -$130
//         </span>
//       </div>
//       <span className="text-gray-400 text-sm">Canceled</span>
//     </div>
//   </div>
//   <div>
//     <canvas id="order-chart"></canvas>
//   </div>
// </div>
// <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
//   <div className="flex justify-between mb-4 items-start">
//     <div className="font-medium">Earnings</div>
//     <div className="dropdown">
//       <button
//         type="button"
//         className="dropdown-toggle text-gray-400 hover:text-gray-600"
//       >
//         <i className="ri-more-fill"></i>
//       </button>
//       <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
//         <li>
//           <a
//             href="#"
//             className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
//           >
//             Profile
//           </a>
//         </li>
//         <li>
//           <a
//             href="#"
//             className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
//           >
//             Settings
//           </a>
//         </li>
//         <li>
//           <a
//             href="#"
//             className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
//           >
//             Logout
//           </a>
//         </li>
//       </ul>
//     </div>
//   </div>
//   {/*hello*/}
//   <div className="overflow-x-auto">
//     <table className="w-full min-w-[460px]">
//       <thead>
//         <tr>
//           <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
//             Service
//           </th>
//           <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
//             Earning
//           </th>
//           <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
//             Status
//           </th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td className="py-2 px-4 border-b border-b-gray-50">
//             <div className="flex items-center">
//               <img
//                 src="https://placehold.co/32x32"
//                 alt=""
//                 className="w-8 h-8 rounded object-cover block"
//               />
//               <a
//                 href="#"
//                 className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
//               >
//                 Create landing page
//               </a>
//             </div>
//           </td>
//           <td className="py-2 px-4 border-b border-b-gray-50">
//             <span className="text-[13px] font-medium text-emerald-500">
//               +$235
//             </span>
//           </td>
//           <td className="py-2 px-4 border-b border-b-gray-50">
//             <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
//               Pending
//             </span>
//           </td>
//         </tr>
//         <tr>
//           <td className="py-2 px-4 border-b border-b-gray-50">
//             <div className="flex items-center">
//               <img
//                 src="https://placehold.co/32x32"
//                 alt=""
//                 className="w-8 h-8 rounded object-cover block"
//               />
//               <a
//                 href="#"
//                 className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
//               >
//                 Create landing page
//               </a>
//             </div>
//           </td>
//           <td className="py-2 px-4 border-b border-b-gray-50">
//             <span className="text-[13px] font-medium text-rose-500">
//               -$235
//             </span>
//           </td>
//           <td className="py-2 px-4 border-b border-b-gray-50">
//             <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
//               Withdrawn
//             </span>
//           </td>
//         </tr>
//         <tr>
//           <td className="py-2 px-4 border-b border-b-gray-50">
//             <div className="flex items-center">
//               <img
//                 src="https://placehold.co/32x32"
//                 alt=""
//                 className="w-8 h-8 rounded object-cover block"
//               />
//               <a
//                 href="#"
//                 className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
//               >
//                 Create landing page
//               </a>
//             </div>
//           </td>
//           <td className="py-2 px-4 border-b border-b-gray-50">
//             <span className="text-[13px] font-medium text-emerald-500">
//               +$235
//             </span>
//           </td>
//           <td className="py-2 px-4 border-b border-b-gray-50">
//             <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
//               Pending
//             </span>
//           </td>
//         </tr>
//         <tr>
//           <td className="py-2 px-4 border-b border-b-gray-50">
//             <div className="flex items-center">
//               <img
//                 src="https://placehold.co/32x32"
//                 alt=""
//                 className="w-8 h-8 rounded object-cover block"
//               />
//               <a
//                 href="#"
//                 className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
//               >
//                 Create landing page
//               </a>
//             </div>
//           </td>
//           <td className="py-2 px-4 border-b border-b-gray-50">
//             <span className="text-[13px] font-medium text-rose-500">
//               -$235
//             </span>
//           </td>
//           <td className="py-2 px-4 border-b border-b-gray-50">
//             <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
//               Withdrawn
//             </span>
//           </td>
//         </tr>
//         <tr>
//           <td className="py-2 px-4 border-b border-b-gray-50">
//             <div className="flex items-center">
//               <img
//                 src="https://placehold.co/32x32"
//                 alt=""
//                 className="w-8 h-8 rounded object-cover block"
//               />
//               <a
//                 href="#"
//                 className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
//               >
//                 Create landing page
//               </a>
//             </div>
//           </td>
//           <td className="py-2 px-4 border-b border-b-gray-50">
//             <span className="text-[13px] font-medium text-emerald-500">
//               +$235
//             </span>
//           </td>
//           <td className="py-2 px-4 border-b border-b-gray-50">
//             <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
//               Pending
//             </span>
//           </td>
//         </tr>
//         <tr>
//           <td className="py-2 px-4 border-b border-b-gray-50">
//             <div className="flex items-center">
//               <img
//                 src="https://placehold.co/32x32"
//                 alt=""
//                 className="w-8 h-8 rounded object-cover block"
//               />
//               <a
//                 href="#"
//                 className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
//               >
//                 Create landing page
//               </a>
//             </div>
//           </td>
//           <td className="py-2 px-4 border-b border-b-gray-50">
//             <span className="text-[13px] font-medium text-rose-500">
//               -$235
//             </span>
//           </td>
//           <td className="py-2 px-4 border-b border-b-gray-50">
//             <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
//               Withdrawn
//             </span>
//           </td>
//         </tr>
//         <tr>
//           <td className="py-2 px-4 border-b border-b-gray-50">
//             <div className="flex items-center">
//               <img
//                 src="https://placehold.co/32x32"
//                 alt=""
//                 className="w-8 h-8 rounded object-cover block"
//               />
//               <a
//                 href="#"
//                 className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
//               >
//                 Create landing page
//               </a>
//             </div>
//           </td>
//           <td className="py-2 px-4 border-b border-b-gray-50">
//             <span className="text-[13px] font-medium text-emerald-500">
//               +$235
//             </span>
//           </td>
//           <td className="py-2 px-4 border-b border-b-gray-50">
//             <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
//               Pending
//             </span>
//           </td>
//         </tr>
//         <tr>
//           <td className="py-2 px-4 border-b border-b-gray-50">
//             <div className="flex items-center">
//               <img
//                 src="https://placehold.co/32x32"
//                 alt=""
//                 className="w-8 h-8 rounded object-cover block"
//               />
//               <a
//                 href="#"
//                 className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
//               >
//                 Create landing page
//               </a>
//             </div>
//           </td>
//           <td className="py-2 px-4 border-b border-b-gray-50">
//             <span className="text-[13px] font-medium text-rose-500">
//               -$235
//             </span>
//           </td>
//           <td className="py-2 px-4 border-b border-b-gray-50">
//             <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
//               Withdrawn
//             </span>
//           </td>
//         </tr>
//         <tr>
//           <td className="py-2 px-4 border-b border-b-gray-50">
//             <div className="flex items-center">
//               <img
//                 src="https://placehold.co/32x32"
//                 alt=""
//                 className="w-8 h-8 rounded object-cover block"
//               />
//               <a
//                 href="#"
//                 className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
//               >
//                 Create landing page
//               </a>
//             </div>
//           </td>
//           <td className="py-2 px-4 border-b border-b-gray-50">
//             <span className="text-[13px] font-medium text-emerald-500">
//               +$235
//             </span>
//           </td>
//           <td className="py-2 px-4 border-b border-b-gray-50">
//             <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
//               Pending
//             </span>
//           </td>
//         </tr>
//         <tr>
//           <td className="py-2 px-4 border-b border-b-gray-50">
//             <div className="flex items-center">
//               <img
//                 src="https://placehold.co/32x32"
//                 alt=""
//                 className="w-8 h-8 rounded object-cover block"
//               />
//               <a
//                 href="#"
//                 className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
//               >
//                 Create landing page
//               </a>
//             </div>
//           </td>
//           <td className="py-2 px-4 border-b border-b-gray-50">
//             <span className="text-[13px] font-medium text-rose-500">
//               -$235
//             </span>
//           </td>
//           <td className="py-2 px-4 border-b border-b-gray-50">
//             <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
//               Withdrawn
//             </span>
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   </div>
// </div>
// </div>