import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
  pageSize: 5,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    updated: (state, action) => {
      state.currentPage = action.payload.page;
      state.pageSize = action.payload.size;
    },
  },
});

const { updated } = paginationSlice.actions;

export const paginationActions = {
  updated: (page, size, cb) => async (dispatch) => {
    await dispatch(updated({ page, size }));

    if (typeof cb === 'function') cb();
  },
};

export const getPagination = () => (state) => state.pagination;

export default paginationSlice.reducer;
