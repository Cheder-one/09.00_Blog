import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entities: {},
};

const ERRORS = 'errors';

const errorsSlice = createSlice({
  name: ERRORS,
  initialState,
  reducers: {
    set(state, action) {
      const { key, value } = action.payload;
      state.entities[key] = value;
    },
    clear(state) {
      state.entities = {};
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

export const errorsActions = {
  setError,
  clearErrors,
};

export const errorsSelectors = {
  getError: (state) => state[ERRORS].entities,
};

export default errorsSlice.reducer;
