import React, { memo, useEffect, useState, useCallback,useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';
import { FaWindowClose } from "react-icons/fa";
import { BiIdCard } from "react-icons/bi";
import { CiMail } from "react-icons/ci";
import { loadCities, loadCountries, loadStates } from '../../../../app/slices/AddressSlice';
import { toast } from 'react-hot-toast';
import { useUpdateOrgInformationMutation } from '../../../../app/api/OrgApi';

const UpdateOrg = ({ category, city, state, country, website, about, mobile, orgname, linkedin, togglePopup }) => {
  const dispatch = useDispatch();
  const { countries, states, cities } = useSelector((state) => state.address);
  
  const [formData, setFormData] = useState({
    city: city || '',
    state: state || '',
    country: country || '',
    website: website || '',
    about: about || '',
    mobile: mobile || '',
    orgname: orgname || '',
    linkedin: linkedin || '',
    category: category || '',
  });




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

  const [UpdateOrgInformation, {isError, error}] = useUpdateOrgInformationMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const initialData = {
      website,
      mobile,
      about,
      orgname,
      linkedin,
      country,
      state,
      city,
      category,
    };
    const changedData = {};

    for (const key in formData) {
      if (formData[key] !== initialData[key]) {
        changedData[key] = formData[key];
      }
    }

    if (Object.keys(changedData).length === 0) {
      toast.error('No changes to update');
      return;
    }
    const { data, error } = await UpdateOrgInformation(changedData);
  

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

  // Sample categories, replace with your actual categories
  const categories = ['Technology', 'Finance', 'Healthcare', 'Education', 'Other'];




  return (
    <motion.dialog
      open
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      className="fixed min-h-screen top-0 left-0 w-full h-full bg-black/80 backdrop-blur-sm bg-opacity-60 flex justify-center items-center z-50"

    >
      <div 
      className="max-md:w-11/12 bg-white overflow-auto container mx-auto w-full md:w-2/3 max-w-screen-lg"
      >
        <div className="flex justify-between items-center p-3 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Update Organization Information</h2>
          <button onClick={togglePopup} className="text-gray-400 hover:text-gray-500">
            <FaWindowClose className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-3">
          <div className="space-y-2">
            {/* Company name */}
            <div>
              <label htmlFor="orgname" className="block text-sm font-medium text-gray-700">Company name</label>
              <div className="mt-1 relative rounded-md shadow-sm">
          
                <input
                  type="text"
                  name="orgname"
                  id="orgname"
                  value={formData.orgname}
                  onChange={handleInputChange}
                 
                  className="text-gray-600 focus:outline-none focus:border focus:border-blue-600 font-normal w-full h-10 flex items-center px-2 text-sm border-gray-300 rounded border"
                 
                  placeholder="Company Name"
                />
              </div>
            </div>

            {/* LinkedIn */}
          <div className='flex max-md:flex-col justify-between'>
          <div className='w-2/5 max-md:w-full'>
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn</label>
          <div className="mt-1 relative rounded-md shadow-sm">
           
            <input
              type="text"
              name="linkedin"
              id="linkedin"
              value={formData.linkedin}
              onChange={handleInputChange}
              className="text-gray-600 focus:outline-none focus:border focus:border-blue-600 font-normal w-full h-10 flex items-center px-2 text-sm border-gray-300 rounded border"

              placeholder="LinkedIn Profile"
            />
          </div>
        </div>
        {/* Website */}
        <div className='w-2/5 max-md:w-full'>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website</label>
        <input
          type="url"
          name="website"
          id="website"
          value={formData.website}
          onChange={handleInputChange}
          className="text-gray-600 focus:outline-none focus:border focus:border-blue-600 font-normal w-full h-10 flex items-center px-2 text-sm border-gray-300 rounded border"
          
          placeholder="https://example.com"
        />
      </div>
          
          </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                id="category"
                value={formData.category}
                onChange={handleInputChange}
                className="text-gray-600 focus:outline-none focus:border focus:border-blue-600 font-normal w-full h-10 flex items-center px-2 text-sm border-gray-300 rounded border"
             
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Country, State, City */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                <select
                  name="country"
                  id="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-2 px-3  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 border focus:border-indigo-500 sm:text-sm"
                >
                  {countryOptions}
                </select>
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                <select
                  name="state"
                  id="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-2 px-3  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 border focus:border-indigo-500 sm:text-sm"
                >
                {stateOptions}
                </select>
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <select
                  name="city"
                  id="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-2 px-3  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 border focus:border-indigo-500 sm:text-sm"
                >
                {cityOptions}

                </select>
              </div>
            </div>

          

            {/* About */}
            <div>
              <label htmlFor="about" className="block text-sm font-medium text-gray-700">About</label>
              <textarea
                name="about"
                id="about"
                rows="3"
                value={formData.about}
                onChange={handleInputChange}
          className="text-gray-600 focus:outline-none focus:border focus:border-blue-600 font-normal w-full p-1 flex items-center text-sm border-gray-300 rounded border"
             
                placeholder="Tell us about your organization"
              ></textarea>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={togglePopup}
              className="bg-white py-2 px-4  border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4  border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 border"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </motion.dialog>
  );
};

export default memo(UpdateOrg);