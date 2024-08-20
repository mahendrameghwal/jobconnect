import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: '',
};

const sendCategorySlice = createSlice({
  name: 'sendCategory',
  initialState,
  reducers: {
    selectionCategory(state, action) {
    
      state.category = action.payload;
    },
    resetCategory(state) {
      state.category = null;
    },
  },
});

export const { selectionCategory, resetCategory } = sendCategorySlice.actions;
export default sendCategorySlice.reducer;
