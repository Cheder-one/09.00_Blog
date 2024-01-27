import { createSlice } from '@reduxjs/toolkit';

import authService from '../services/auth.service';

import { handleError } from './helpers';

const initialState = {
  user: null,
  errors: {},
  isLoaded: false,
  isAuthenticated: null,
};

const AUTH = 'auth';

const authSlice = createSlice({
  name: AUTH,
  initialState,
  reducers: {
    success: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isLoaded = true;
      state.errors = {};
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.errors = {};
    },

    requested: (state) => {
      state.isLoaded = true;
    },
    failed: (state) => {
      state.isLoaded = false;
    },
    setError: (state, action) => {
      const { key, error } = JSON.parse(action.payload);
      state.errors[key] = error;
    },
  },
});

const { success, logout, requested, failed, setError } = authSlice.actions;

const callHandleError = (errObj, dispatch) => {
  dispatch(handleError(errObj, failed, setError));
};

export const authActions = {
  checkAuth: () => async (dispatch) => {
    dispatch(requested());
    try {
      const data = await authService.checkAuth();
      if (data?.user) dispatch(success(data));
      if (!data?.user) dispatch(failed());
    } catch (error) {
      dispatch(logout());
      throw error;
    }
  },

  registerUser: (user) => async (dispatch) => {
    dispatch(requested());
    try {
      const data = await authService.register({ user });
      dispatch(success(data));
    } catch (error) {
      callHandleError({ register: error }, dispatch);
      throw error;
    }
  },

  loginUser: (user) => async (dispatch) => {
    dispatch(requested());
    try {
      const data = await authService.login({ user });
      localStorage.setItem('token', data.user.token);
      dispatch(success(data));
    } catch (error) {
      callHandleError({ login: error }, dispatch);
      throw error;
    }
  },

  editUser: (user) => async (dispatch) => {
    dispatch(requested());
    try {
      const data = await authService.update({ user });
      dispatch(success(data));
    } catch (error) {
      callHandleError({ profileEdit: error }, dispatch);
      throw error;
    }
  },

  logoutUser: () => async (dispatch) => {
    localStorage.removeItem('token');
    dispatch(logout());
  },
};

export const authSelectors = {
  getUser: (state) => state[AUTH].user,
  isLoaded: (state) => state[AUTH].isLoaded,
  isAuthenticated: (state) => state[AUTH].isAuthenticated,
  getError: (state) => state[AUTH].errors,
};

export default authSlice.reducer;
