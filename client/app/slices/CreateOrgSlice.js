import { createSlice } from "@reduxjs/toolkit";


const initialState = {
   formData:{
    avtar:'',
    orgname: '',
    category: '',
    linkedin: '',
    website: '',
    mobile: '',
    country: '',
    state: '',
    city: '',
    about: ''
   }
};

const CreateOrg = createSlice({
  name: "createorg",
  initialState,
  reducers: { 
       SetOrgdata(state, action) {
        state.formData = { ...state.formData, ...action.payload };
      },
      setCountry(state, action) {
        state.formData.country = action.payload;
      },
      setState(state, action) {
        state.formData.state = action.payload;
      },
      setCity(state, action) {
        state.formData.city = action.payload;
      },
      resetForm() { return initialState}
   
   
  },
});

export const { SetOrgdata,setCountry,setState,setCity, resetForm } = CreateOrg.actions;

export default CreateOrg.reducer;

