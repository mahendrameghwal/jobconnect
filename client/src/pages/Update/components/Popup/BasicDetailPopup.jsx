import React, { memo, useEffect,useCallback,useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';
import { FaWindowClose } from "react-icons/fa";
import { BiIdCard } from "react-icons/bi";
import { CiMail } from "react-icons/ci";
import { loadCities, loadCountries, loadStates } from '../../../../../app/slices/AddressSlice';
import AvailableToJoin from '../../../../data/AvailableToJoin';
import CurrentEmploymentStatus from '../../../../data/CurrentemploymentStatus';
import EmploymentStatus from '../../../../data/Status';
import Gender from '../../../../data/Gender';
import salaryData from '../../../../data/Salarydata';
import { useEditCandidateInformationMutation } from '../../../../../app/api/CandidateApi';
import { toast } from 'react-hot-toast';



const BasicDetailPopup = ({ togglePopup, phone, salary, noticeperiod, currentempstatus, empstatus, gender, fullname, email, country, state, city }) => {

  
  const [formData, setFormData] = useState({
    fullname: fullname || '',
    email: email || '',
    phone: phone || '',
    country: country || '',
    state: state || '',
    city: city || '',
    noticeperiod: noticeperiod || '',
    currentempstatus: currentempstatus || '',
    empstatus: empstatus || '',
    gender: gender || '',
    salary: salary || ''
  });
  const dispatch = useDispatch();
  
  const { countries, states, cities } = useSelector((state) => state.address);


  // Memoize the loadCountries dispatch
  const memoizedLoadCountries = useCallback(() => {
    dispatch(loadCountries());
  }, [dispatch]);

  // Memoize the loadStates and loadCities dispatches
  const memoizedLoadStatesAndCities = useCallback((countryIsoCode) => {
    dispatch(loadStates(countryIsoCode));
    dispatch(loadCities(countryIsoCode));
  }, [dispatch]);

  // Use useMemo to memoize the country finding logic
  const selectedCountry = useMemo(() => {
    return countries.find(c => c.name === formData.country);
  }, [countries, formData.country]);

  useEffect(() => {
    memoizedLoadCountries();
  }, [memoizedLoadCountries]);

  useEffect(() => {
    if (selectedCountry?.isoCode) {
      memoizedLoadStatesAndCities(selectedCountry.isoCode);
    }
  }, [selectedCountry, memoizedLoadStatesAndCities]);

  // Memoize the country, state, and city options
  const countryOptions = useMemo(() => {
    return countries.map(country => (
      <option key={`${formData.country}-${uuidv4()}`} value={country.name}>{country.name}</option>
    ));
  }, [countries]);

  const stateOptions = useMemo(() => {
    return states.map(state => (
      <option key={`${formData.state}-${uuidv4()}`} value={state.name}>{state.name}</option>
    ));
  }, [states]);

  const cityOptions = useMemo(() => {
    return cities.map(city => (
      <option key={`${formData.city}-${uuidv4()}`} value={city.name}>{city.name}</option>
    ));
  }, [cities]);
 


  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  const [EditCandidateInformation, {isError, error}]=useEditCandidateInformationMutation()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const initialData = {
      phone,
      salary,
      noticeperiod,
      currentempstatus,
      empstatus,
      gender,
      fullname,
      email,
      country,
      state,
      city,
    };
    const changedData = {};

    // Check  field for changes
    for (const key in formData) {
      if (formData[key] !== initialData[key]) {
        changedData[key] = formData[key];
      }
    }

    if (Object.keys(changedData).length === 0) {
      toast.error('No changes to update');
      return;
    }
    const { data, error } = await EditCandidateInformation(changedData);

    if (data?.message) {
      togglePopup();
      toast.success(data.message);
    }
    if (error) {
      if (error.data) {
        if (error.data?.message) {
          toast.error(error.data?.message);
        }
      } else if (error?.message) {
        toast.error(error?.message);
      }
    }
  };

  return (
    <motion.dialog
      open
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      className="fixed min-h-screen top-0 left-0 w-full h-full bg-black/80 backdrop-blur-sm bg-opacity-60 flex justify-center items-center z-50"
    >
      <div role="alert" className="max-md:w-11/12 overflow-auto container mx-auto w-full md:w-2/3 max-w-screen-lg">
        <div className="relative py-2 px-3 bg-white shadow-md rounded border border-gray-400">
          <button onClick={togglePopup} type="button" className="absolute top-1 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
            <FaWindowClose className='w-6 h-5 text-red-500' />
          </button>

          <div className="w-full flex justify-start text-gray-600">
            <p className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Basic Details</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className='w-full mb-2'>
              <label htmlFor="fullname" className="text-gray-800 text-sm font-bold leading-tight tracking-wide">Full Name</label>
              <div className="relative">
                <div className="absolute text-gray-600 flex items-center px-1 border-r h-full">
                  <BiIdCard className="w-7 h-6" />
                </div>
                <input
                  name='fullname'
                  value={formData.fullname}
                  onChange={handleInputChange}
                  className="text-gray-600 focus:outline-none focus:border focus:border-blue-600 font-normal w-full h-10 flex items-center pl-10 text-sm border-gray-300 rounded border"
                  placeholder="Full Name"
                />
              </div>
              {isError && error.data?.details?.fullname && (
                <span className="text-red-500 px-1 py-0 text-xs mt-1">{error.data?.details?.fullname}</span>
              )}
            </div>

            {/* Email */}
            <div className='w-full mb-4'>
              <label htmlFor="email" className="text-gray-800 text-sm font-bold leading-tight tracking-wide">Email</label>
              <div className="relative">
                <div className="absolute text-gray-600 flex items-center px-1 border-r h-full">
                  <CiMail className="h-6 w-7"/>
                </div>
                <input
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  className="text-gray-600 focus:outline-none focus:border focus:border-blue-600 font-normal w-full h-10 flex items-center pl-10 text-sm border-gray-300 rounded border"
                  placeholder="Email"
                />
              </div>
              {isError && error.data?.details?.email && (
                <span className="text-red-500 px-1 py-0 text-xs mt-1">{error.data?.details?.email}</span>
              )}

            </div>

            {/* Country, State, City */}
            <div className='flex justify-between mb-1'>
              <div className='w-30'>
                <label htmlFor="country" className="text-gray-800 text-sm font-bold leading-tight tracking-wide">Country</label>
                <select
                  name='country'
                  value={formData.country}
                  onChange={handleInputChange}
                  className="text-gray-600 focus:outline-none focus:border focus:border-blue-600 font-normal w-full h-10 flex items-center text-sm border-gray-300 rounded border"
                >
              {countryOptions}
                </select>
              </div>

              <div className='w-30'>
                <label htmlFor="state" className="text-gray-800 text-sm font-bold leading-tight tracking-wide">State</label>
                <select
                  name='state'
                  value={formData.state}
                  onChange={handleInputChange}
                  className="text-gray-600 focus:outline-none focus:border focus:border-blue-600 font-normal w-full h-10 flex items-center text-sm border-gray-300 rounded border"
                >
                {stateOptions}
                </select>
              </div>

              <div className='w-30'>
                <label htmlFor="city" className="text-gray-800 text-sm font-bold leading-tight tracking-wide">City</label>
                <select
                  name='city'
                  value={formData.city}
                  onChange={handleInputChange}
                  className="text-gray-600 focus:outline-none focus:border focus:border-blue-600 font-normal w-full h-10 flex items-center text-sm border-gray-300 rounded border"
                >
                 {cityOptions}
                </select>
              </div>
            </div>

            {/* Phone, Notice Period, Current Employment Status */}
            <div className='flex justify-between mb-1'>
              <div className='w-30'>
                <label htmlFor="phone" className="text-gray-800 text-sm font-bold leading-tight tracking-wide">Phone</label>
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="text-gray-600 focus:outline-none focus:border focus:border-blue-600 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-300 rounded border"
                  placeholder="1234567890"
                />
                {isError && error.data?.details?.phone && (
                  <span className="text-red-500 px-1 py-0 text-xs mt-1">{error.data?.details?.phone}</span>
                )}
  
                </div>

              <div className='w-30'>
                <label htmlFor="noticeperiod" className="text-gray-800 text-sm font-bold leading-tight tracking-wide">Available to Join</label>
                <select
                  name="noticeperiod"
                  value={formData.noticeperiod}
                  onChange={handleInputChange}
                  className="w-full pl-1 focus:border focus:border-blue-600 outline-none rounded-md py-2 border border-gray-200"
                >
                  {AvailableToJoin.map((period, i) => (
                    <option key={i} value={period.Availablity}>{period.Availablity}</option>
                  ))}
                </select>
              </div>

              <div className='w-30'>
                <label htmlFor="currentempstatus" className="text-gray-800 text-sm font-bold leading-tight tracking-wide">Current Status</label>
                <select
                  name="currentempstatus"
                  value={formData.currentempstatus}
                  onChange={handleInputChange}
                  className="w-full pl-1 focus:border focus:border-blue-600 outline-none rounded-md py-2 border border-gray-200"
                >
                  {CurrentEmploymentStatus.map(({status}, i) => (
                    <option key={i} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Employment Status, Gender, Salary */}
            <div className='flex justify-between mb-1'>
              <div className='w-30'>
                <label htmlFor="empstatus" className="text-gray-800 text-sm font-bold leading-tight tracking-wide">Employment Status</label>
                <select
                  name="empstatus"
                  value={formData.empstatus}
                  onChange={handleInputChange}
                  className="w-full pl-1 focus:border focus:border-blue-600 outline-none rounded-md py-2 border border-gray-200"
                >
                  {EmploymentStatus.map(({status}, i) => (
                    <option key={i} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div className='w-30'>
                <label htmlFor="gender" className="text-gray-800 text-sm font-bold leading-tight tracking-wide">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full pl-1 focus:border focus:border-blue-600 outline-none rounded-md py-2 border border-gray-200"
                >
                  {Gender.map(({gender}, i) => (
                    <option key={i} value={gender}>{gender}</option>
                  ))}
                </select>
              </div>

              <div className='w-30'>
                <label htmlFor="salary" className="text-gray-800 text-sm font-bold leading-tight tracking-wide">Salary</label>
                <select
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="w-full pl-1 focus:border focus:border-blue-600 outline-none rounded-md py-2 border border-gray-200"
                >
                  {salaryData.map(({range}, i) => (
                    <option key={i} value={range}>{range}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-white p-2 flex justify-end gap-x-2">
              <button 
                type="button"
                onClick={togglePopup}
                className="inline-flex items-center px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md"
              >
                Cancel
              </button>
              <button  onSubmit={handleSubmit}
                type="submit"
                className="inline-flex cursor-pointer items-center px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.dialog>
  );
};

export default memo(BasicDetailPopup);