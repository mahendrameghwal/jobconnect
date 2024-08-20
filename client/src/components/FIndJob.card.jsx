import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FIndJobCard = ({ data, error, isError, isSuccess }) => {
  const navigate = useNavigate();

  if (data && data.length > 0) {
    return (
      isSuccess && (
        <div className="container-lg mx-auto max-md:w-11/12">
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 my-8 max-md:my-12 auto-rows-fr grid-flow-dense"
          >
            {data.map(({ title, location, skills, jobId, orgname, _id }) => (
              <div
                key={_id}
                className="grid  grid-rows-[auto_1fr_auto] hover:shadow-md border-2 striped-border bg-gray-50 relative rounded-md overflow-hidden"
              >
                <div className="p-2">
                  {jobId && (
                    <p className="font-mono text-gray-400 text-right text-xs capitalize max-md:text-sm">
                      {jobId}
                    </p>
                  )}
                  {title && (
                    <p className="font-medium text-lg capitalize max-md:text-sm">
                      {title}
                    </p>
                  )}
                  {orgname && (
                    <p className="font-normal text-sm capitalize max-md:text-sm">
                      {orgname.orgname}
                    </p>
                  )}
                  {location && (
                    <span className="font-medium max-md:font-normal text-sm capitalize text-gray-500">
                      {location}
                    </span>
                  )}
                </div>

                <div className="p-2">
                  <div className="flex flex-wrap mt-1 items-center justify-start gap-x-3">
                    {skills.length > 0 &&
                      skills.map((skill, index) => (
                        <span
                          key={index}
                          className="border-gray-400 capitalize border mt-1 text-xs font-medium px-3 py-1 rounded-sm"
                        >
                          {skill}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="p-2 mt-auto">
                  <button
                    onClick={() => {
                      navigate(`about/${_id}`);
                    }}
                    className="w-full tracking-wide rounded-sm bg-custom-blue transition-colors delay-75 hover:text-gray-50 !text-sm font-base text-white px-5 py-1"
                  >
                    View Job
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      )
    );
  } else {
    return (
      <div className=" company-job-div flex justify-center items-center">
        <div className="flex items-center mx-4">
          <span className="ml-2 text-gray-500 text-xl">
            Sorry, no Jobs found Please try again.
          </span>
        </div>
      </div>
    );
  }
};

export default FIndJobCard;