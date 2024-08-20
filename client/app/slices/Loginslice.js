import { createSlice } from "@reduxjs/toolkit";





const initialState = {
    User:{
        email: "",
        password: "",
    }

};
const loginslice = createSlice({
  name: "loginuser",
  initialState,
  reducers: {
    SetLoginUser(state, action) {
        state.User = { ...state.User, ...action.payload };
      }
      ,
      resetuser() {
       return initialState;
      }
  },
});

export const {
    SetLoginUser , resetuser
} = loginslice.actions;

export default loginslice.reducer;
