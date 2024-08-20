
import { createSlice } from '@reduxjs/toolkit';
import {Country,State,City} from 'country-state-city'; 

const initialState = {
  countries: [],
  states: [],
  cities: [],
};

const Address = createSlice({
  name: 'address',
  initialState,
  reducers: {
    loadCountries: (state) => {
      state.countries = Country.getAllCountries();
    },
    loadStates: (state, action) => {
      const ISocode  = action.payload;
      state.states = State.getStatesOfCountry(`${ISocode}`);
    },
    loadCities: (state, action) => {
      const ISocode  = action.payload;
      state.cities = City.getCitiesOfCountry(`${ISocode}`)
    }
  },
});

export const { loadCountries, loadStates, loadCities } = Address.actions;
export default Address.reducer;
