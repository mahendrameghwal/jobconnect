import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  User: {
   password:"",
   confirmpassword:""
  },
};

const resetpassword = createSlice({
  name: "resetpassword",
  initialState,
  reducers: {
    Setresetpassowrd(state, action) {
      state.User = { ...state.User, ...action.payload };
    },
    resetpass() {
      return initialState;
    },
  },
});

export const { Setresetpassowrd , resetpass } = resetpassword.actions;

export default resetpassword.reducer;
