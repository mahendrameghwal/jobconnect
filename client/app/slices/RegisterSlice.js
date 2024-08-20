import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  User: {
    fullname: "",
    username: "",
    email: "",
    password:'',
    Isorg:false
  },
};

const Registerslice = createSlice({
  name: "registeruser",
  initialState,
  reducers: {
    SetregisterUser(state, action) {
      state.User = { ...state.User, ...action.payload };
    },
    resetUser() {
      return initialState;
    },
  },
});

export const { SetregisterUser , resetUser } = Registerslice.actions;

export default Registerslice.reducer;
