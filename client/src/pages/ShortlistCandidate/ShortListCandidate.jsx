import React, { Suspense, lazy, useCallback, useMemo, useState } from 'react';
import { VscPreview } from 'react-icons/vsc';
import { PiFlagPennant } from 'react-icons/pi';
import { LiaPollHSolid } from 'react-icons/lia';

import Loader from '../../components/Loader';

const ApplicationReview = lazy(() => import('./components/ApplicationReview'));
// const PhoneCall = lazy(() => import('./components/PhoneCall'));
// const Interview = lazy(() => import('./components/Interview'));
// const VerifcationProcess = lazy(() =>
//   import('./components/VerifcationProcess'),
// );

const HiredSucesscandidate = lazy(() =>
  import('./components/HiredSucesscandidate'),
);
const JobReport = lazy(() => import('./components/JobReport'));
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useJobdetailWithCandidateQuery } from '../../../app/api/JobApi';
import { formatDistanceToNowStrict } from 'date-fns';
import filterCandidate from '../../utils/FilterByStatus';

const ShortListCandidate = () => {
  const { jobid } = useParams();
  const [step, setStep] = useState(1);
  

  const { data, error, isLoading } = useJobdetailWithCandidateQuery(jobid);
  const { jobId, applicants, title, category, createdAt, updatedAt, orgname, skills, jobtype, joblevel,} = data?.job || {};



  const shortlistedCandidates = useMemo(() => {
    if (!applicants || applicants.length === 0) return [];

    return applicants.filter(applicant =>
      applicant.appliedJobs.some(appliedJob =>
        appliedJob.jobId === jobid && appliedJob.status === "shortlisted"
      )
    );
  }, [applicants, jobid]);










  const SetCurrentStep = useMemo(
    () => (crrstep) => {
      setStep(crrstep);
    },
    [],
  );
  const SetStepbg = useCallback(
    () => (targetStep, currentStep) => {
      return `${
        parseInt(currentStep) === targetStep && 'bg-blue-300/90  text-black'
      }`;
    },
    [],
  );

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="p-2  "
      >
        <div className="flex min-h-screen max-h-full items-center justify-center ">
          {error && error?.data && error.data?.message && (
            <pre className="ml-2  text-gray-500 text-xl">
              {error.data.message}
            </pre>
          )}
        </div>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="p-2  "
      >
        <div className="flex min-h-screen max-h-full items-center justify-center ">
          <pre className="ml-2  text-gray-500 text-xl">Loading data...</pre>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="p-2 min-h-screen max-h-full "
    >
      {title && <p className="text-lg font-medium mb-3 ">{title}</p>}
      <section className="grid gap-y-1  grid-cols-6 max-md:grid-cols-3 max-sm:grid-cols-1 overflow-hidden    grid-rows-1 max-md:grid-rows-2 max-sm:grid-rows-3 ">
        <p className="text-sm   text-gray-600 font-medium">Job ID : {jobId}</p>
        <p className="text-sm  text-gray-600 font-medium">
          Category : {category}
        </p>
        {Array.isArray(applicants) && (
          <p className="text-sm  text-gray-600 font-medium">
            Total Candidate : {applicants.length}
          </p>
        )}
        {Array.isArray(skills) && (
          <p className="text-sm  text-gray-600 font-medium">
            {' '}
            Skills :{' '}
            <span className="text-gray-900   ">
              {skills.map((skill) => skill).join(',')}
            </span>
          </p>
        )}
        {createdAt && (
          <p className="text-sm  text-gray-600 font-medium">
            created : {formatDistanceToNowStrict(new Date(createdAt))} ago
          </p>
        )}
        {updatedAt && (
          <p className="text-sm  text-gray-600 font-medium">
            Updated : {formatDistanceToNowStrict(new Date(updatedAt))} ago
          </p>
        )}
        <p className="text-sm  text-gray-600 font-medium">
          Job type: {jobtype}
        </p>
        <p className="text-sm  text-gray-600 font-medium">level : {joblevel}</p>
      </section>

      <div>
        <div
          role="alert"
          className=" hidden rounded-md w-1/2 max-sm:w-95 border-gray-500  max-md:w-4/5 top-10% z-60 left-2/4 -translate-x-1/2 fixed  border shadow-md bg-gray-200  bg-opacity-95  transition-opacity pb-3 px-2 pt-1"
        >
          <div className="flex justify-between">
            <p className="underline font-medium">
              Here You can Rate Your Candidate{' '}
            </p>
            <button className=" transition text-gray-800 hover:text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex items-start gap-4">
            <div className="border max-md:flex-col flex gap-x-1  w-full">
              <section className="w-1/3 max-md:w-full">
                <label
                  htmlFor="communication"
                  className="text-sm font-semibold text-gray-600"
                >
                  communication
                </label>
                <select
                  className="w-full border appearance-none cursor-pointer p-2 rounded-md outline-none "
                  name=""
                  id=""
                >
                  <option disabled value="">
                    Communication rating
                  </option>
                  <option value="">item 1</option>
                  <option value="">item 2</option>
                  <option value="">item 3</option>
                </select>
              </section>
              <section className="w-1/3 max-md:w-full">
                <label
                  htmlFor="communication"
                  className="text-sm font-semibold text-gray-600"
                >
                  Knowledge:
                </label>
                <select
                  className="border  appearance-none cursor-pointer w-full p-2 rounded-md outline-none "
                  name=""
                  id=""
                >
                  <option disabled value="">
                    Interview rating
                  </option>
                  <option value="">item 1</option>
                  <option value="">item 2</option>
                  <option value="">item 3</option>
                </select>
              </section>

              <section className="w-1/3 max-md:w-full">
                <label
                  htmlFor="communication"
                  className="text-sm font-semibold text-gray-600"
                >
                  Skill match:
                </label>
                <select
                  className="w-full border p-2 appearance-none cursor-pointer rounded-md outline-none "
                  name=""
                  id=""
                >
                  <option disabled value="">
                    Skill match rating
                  </option>
                  <option value="">item 1</option>
                  <option value="">item 2</option>
                  <option value="">item 3</option>
                </select>
              </section>
            </div>
          </div>
          <div className="mx-auto px-1.5 mt-2 flex justify-end">
            <button
              type="button"
              className="py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center tracking-wide text-sm font-medium shadow-md "
            >
              Rate Candidate
            </button>
          </div>
        </div>
        {parseInt(step) === 1 && (
          <section className="my-3 w-100   flex justify-end ">
            <label
              htmlFor="Search Candidate"
              className="relative w-1/3 max-md:w-1/2 max-sm:w-full  block rounded-md border border-gray-300 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
              <input
                type="search"
                className="peer  p-2 w-full border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                placeholder="Search Candidate"
              />

              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-800 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                Search Candidate Here
              </span>
            </label>
          </section>
        )}
        <ul className="grid gap-1 grid-cols-3 mt-2  max-md:grid-cols-3 max-sm:grid-cols-1 divide-x divide-gray-100 overflow-hidden rounded-lg  text-sm text-gray-600 grid-rows-1 max-md:grid-rows-2 max-sm:grid-rows-3">
          <li
            onClick={() => {
              SetCurrentStep(1);
            }}
            className={`flex cursor-pointer border text-center hover:text-white hover:bg-[#258cf3] bg-gray-100 rounded-md  items-center justify-center max-sm:p-3 max-sm:my-0.5 gap-2 p-4 ${SetStepbg(
              1,
              step,
            )} `}
          >
            <VscPreview size={21} />
            <p className="leading-none ">
              <strong className="block font-medium">Application Review</strong>
            </p>
          </li>

          <li
            onClick={() => {
              SetCurrentStep(2);
            }}
            className={`flex cursor-pointer border text-center hover:text-white hover:bg-[#258cf3]  bg-gray-100 rounded-md  items-center justify-center max-sm:p-3 max-sm:my-0.5 gap-2 p-4 ${SetStepbg(
              2,
              step,
            )} `}
          >
            <PiFlagPennant size={21} />
            <p className="leading-none">
              <strong className="block font-medium"> Hired candidate</strong>
            </p>
          </li>
          <li
            onClick={() => {
              SetCurrentStep(3);
            }}
            className={`flex cursor-pointer border text-center  hover:text-white hover:bg-[#258cf3] bg-gray-100 rounded-md  items-center justify-center max-sm:p-3 max-sm:my-0.5 gap-2 p-4 ${SetStepbg(
              3,
              step,
            )} `}
          >
            <LiaPollHSolid size={21} />
            <p className="leading-none">
              <strong className="block font-medium">Job Report </strong>
            </p>
          </li>
        </ul>
      </div>
      {/*IsVisible && (
        <div className="z-10  transform translate-y-0 filter-component absolute top-10% left-5%  max-md:top-15% w-48 p-3  bg-white rounded-lg shadow ">
          <h6 className="mb-2 text-sm font-medium text-blue-600 ">
            Choose Status
          </h6>
          <ul
            className="space-y-2 text-sm"
            aria-labelledby="filterDropdownButton"
          >
            <li className="flex items-center">
              <input onChange={(e)=>{setcurentStatus(e.target.value)}}
                type="checkbox"
                value="pending"
                name='pending'
                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 "
              />
              <label 
                htmlFor="pending"
                className="ml-2 text-sm font-medium text-yellow-500 capitalize "
              >
                pending
              </label>
            </li>
            <li className="flex items-center">
              <input onChange={(e)=>{setcurentStatus(e.target.value)}}
                type="checkbox"
                value="shortlisted"
                name='shortlisted'
                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 "
              />
              <label
                htmlFor="shortlisted"
                className="ml-2 text-sm font-medium text-green-500 "
              >
                Shortlisted
              </label>
            </li>
            <li className="flex items-center ">
              <input onChange={(e)=>{setcurentStatus(e.target.value)}}
                type="checkbox"
                name='rejected'
                value="rejected"
                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 "
              />
              <label
                htmlFor="rejected"
                className="ml-2 text-sm max-md:text-xs font-medium text-red-500 "
              >
                Rejected
              </label>
            </li>
          </ul>
          <button
            onClick={SearchCandidateByStatus}
            className="  bg-blue-500 w-full text-gray-100 hover:text-gray-200 font-bold capitalize tracking-wider text-sm px-4 py-1.5 mt-1 rounded shadow hover:shadow-md outline-none focus:outline-none  ease-linear transition-all duration-150"
            type="button"
          >
            Search
          </button>
        </div>
      )*/}
      <Suspense fallback={<Loader />}>
        {parseInt(step) === 1 && <ApplicationReview applicants={applicants} />}
        {/*parseInt(step) === 2 && <PhoneCall />*/}
        {/*parseInt(step) === 3 && <Interview />*/}
        {/*parseInt(step) === 4 && <VerifcationProcess />*/}
        {parseInt(step) === 2 && (
          <HiredSucesscandidate orgid={orgname} applicants={shortlistedCandidates} />
        )}
        {parseInt(step) === 3 && <JobReport />}
      </Suspense>
    </motion.div>
  );
};

export default ShortListCandidate;
