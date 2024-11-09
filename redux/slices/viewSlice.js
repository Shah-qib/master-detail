// src/redux/slices/viewSlice.js
import { createSlice } from '@reduxjs/toolkit';

const viewSlice = createSlice({
  name: 'view',
  initialState: {
    isGridView: false,
    searchTerm: '',
  },
  reducers: {
    toggleView(state) {
      state.isGridView = !state.isGridView;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
});

export const { toggleView, setSearchTerm } = viewSlice.actions;

export default viewSlice.reducer;
