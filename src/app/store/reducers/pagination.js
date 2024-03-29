import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
  pageSize: 5,
};

const PAGINATION = 'pagination';

const paginationSlice = createSlice({
  name: PAGINATION,
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
  setInitPagination: () => async (dispatch) => {
    await dispatch(updated({ page: 1, size: 5 }));
  },
  updatePagination: (page, size) => async (dispatch) => {
    await dispatch(updated({ page, size }));
  },
};

export const paginationSelectors = {
  getPagination: (state) => state[PAGINATION],
  getCurrentPage: (state) => state[PAGINATION].currentPage,
  getPageSize: (state) => state[PAGINATION].pageSize,
};

export default paginationSlice.reducer;
