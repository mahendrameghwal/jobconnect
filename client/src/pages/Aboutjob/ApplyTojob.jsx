import { Fragment, useEffect, useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import { BsSendCheck } from "react-icons/bs";
import { useApplyforJobMutation } from "../../../app/api/CandidateApi";
import { useCurrentUserQuery } from "../../../app/api/authApi";

const ApplyToJob = ({ applyid, applicants }) => {
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);
  const [ApplyforJob, { data, error, isLoading }] = useApplyforJobMutation();
  const { data: CurrentUser } = useCurrentUserQuery();
  
  const checkIfAlreadyApplied = useCallback(() => {
    if (CurrentUser && CurrentUser.candidate?._id) {
    
      const isAlreadyAppliedJob = applicants.some(applicant => applicant === CurrentUser.candidate._id);
      setIsAlreadyApplied(isAlreadyAppliedJob);
    }
  }, [applicants, CurrentUser]);

  useEffect(() => {
    checkIfAlreadyApplied();
  }, [checkIfAlreadyApplied]);

  const handleApply = () => {
    ApplyforJob(applyid);
  };

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (data) {
      toast.success(data?.message);
      setIsAlreadyApplied(true);
    }
  }, [data, error]);

  return (
    <Fragment>
      {isAlreadyApplied ? (
        <button disabled className="apply-btn ">
          <div className="apply-btn-content px-4 py-1.5 rounded-md !bg-green-500/90 hover:!bg-green-500 ">
            <span className="px-3 !text-white capitalize">Applied</span>
          </div>
        </button>
      ) : (
        <button 
        onClick={handleApply} 
        className={`
          flex items-center gap-2 px-4 py-2 
          bg-white hover:bg-blue-500
          border border-gray-300 rounded-md transition-colors duration-300
          group
          ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        disabled={isLoading}
      >
        <BsSendCheck className="text-blue-500 group-hover:text-white transition-colors duration-300" />
        <span className="font-medium text-sm tracking-wide text-blue-500 group-hover:text-white transition-colors duration-300">
          Apply Now
        </span>
      </button>
      )}
    </Fragment>
  );
};

export default ApplyToJob;
