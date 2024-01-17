import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entities: {},
};

const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    set(state, action) {
      const { key, value } = action.payload;
      state.entities[key] = value;
    },
    clear(state) {
      state.articles = {};
    },
  },
});

const { set, clear } = errorsSlice.actions;

export const setError = (key, value) => (dispatch) => {
  dispatch(set({ key, value }));
};
export const clearErrors = () => (dispatch) => {
  dispatch(clear());
};

export const getErrors = () => (state) => state.errors.entities;

export default errorsSlice.reducer;
