
import Available from "../../../data/AvailableToJoin"
import CurrentEmploymentStatus from "../../../data/CurrentemploymentStatus";
import Gender from "../../../data/Gender";


const SearchCandidateInput = ({HandleSubmit, searchQuery, setSearchQuery ,address}) => {
  const { countries } = address;
 


  return (
    <section>
    <div className="flex bg-gradient-to-r from-gray-900 to-blue-900 items-center bg-cover bg-bottom p-8 md:p-12">
      <div className="bg-smoke-dark max-md:p-2 px-6 rounded-md w-full shadow-lg">
        <h1 className="capitalize text-2xl md:text-3xl tracking-wider text-center font-medium text-white mb-6">Find Talent Here</h1>
        <form onSubmit={HandleSubmit} className="flex flex-wrap items-end -mx-3">
          <div className="w-full md:w-1/2 px-1 mb-2 md:mb-0">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="searchTerm">Keyword</label>
            <input
              onChange={(e) => setSearchQuery({ ...searchQuery, searchTerm: e.target.value })}
              name="searchTerm"
              className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-sm py-2 max-md:py-1.5 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
              id="searchTerm"
              type="search"
              placeholder="Search by Keyword"
            />
          </div>
          <div className="w-full md:w-1/4 px-1 mb-2 md:mb-0">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="gender">Gender</label>
            <select
              onChange={(e) => setSearchQuery({ ...searchQuery, gender: e.target.value })}
              name="gender"
              className="block w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-2 max-md:py-1.5 px-3 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-grey"
              id="gender"
            >
              <option value=''>Select by Gender</option>
              {Gender && Gender.map(({ gender }, i) => (
                <option value={gender} key={i}>{gender}</option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/4 px-1 mb-2 md:mb-0">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="country">Country</label>
            <select
              onChange={(e) => setSearchQuery({ ...searchQuery, country: e.target.value })}
              name="country"
              className="block w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-2 max-md:py-1.5 px-3 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-grey"
              id="country"
            >
              <option value=''>Select a Location</option>
              {countries && countries.map(({ name }, i) => (
                <option value={name} key={i}>{name}</option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/4 px-1 mb-2 md:mb-0">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="noticeperiod">Notice Period</label>
            <select
              onChange={(e) => setSearchQuery({ ...searchQuery, noticeperiod: e.target.value })}
              name="noticeperiod"
              className="block w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-2 max-md:py-1.5 px-3 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-grey"
              id="noticeperiod"
            >
              <option value=''>Available to Join</option>
              {Available && Available.map(({ Availablity, id }) => (
                <option value={Availablity} key={id}>{Availablity}</option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/4 px-1 mb-2 md:mb-0">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="currentempstatus">Current Status</label>
            <select
              onChange={(e) => setSearchQuery({ ...searchQuery, currentempstatus: e.target.value })}
              name="currentempstatus"
              className="block w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-2 max-md:py-1.5 px-3 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-grey"
              id="currentempstatus"
            >
              <option value=''>Select Current Status</option>
              {CurrentEmploymentStatus && CurrentEmploymentStatus.map(({ status, id }) => (
                <option value={status} key={id}>{status}</option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-1/4 px-1 mb-2 md:mb-0">
          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="limit">
            Candidates Per Page
          </label>
          <select
            onChange={(e) => setSearchQuery({ ...searchQuery, limit: Number(e.target.value)})}
            name="limit"
            className="block w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-2 max-md:py-1.5 px-3 rounded-sm leading-tight focus:outline-none focus:bg-white focus:border-grey"
            id="limit"
          >
            <option value={8}>Default (8)</option>
            {[10, 20, 30, 40, 50, 60, 70, 80, 100, 200, 300].map((limit) => (
              <option key={limit} value={limit}>{limit}</option>
            ))}
          </select>
        </div>


          <div className="w-full md:w-1/4 px-1 mb-2 md:mb-0">
            <button
              type="submit"
              className="relative w-full p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-sm"
            >
              <span className="w-full h-full bg-gradient-to-br from-[#0571ff] via-[#5487ff] to-[#00aaff] group-hover:from-[#3375e7] group-hover:via-[#3186f5] group-hover:to-[#3545d8] absolute"></span>
              <span className="relative w-full px-6 py-2 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                <span className="relative capitalize tracking-widest font-medium text-sm text-white">Search</span>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
  
  )
}

export default SearchCandidateInput