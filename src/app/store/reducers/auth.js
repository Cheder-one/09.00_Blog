import { createSlice } from '@reduxjs/toolkit';

import authService from '../services/auth.service';

import { handleError } from './helpers';

const initialState = {
  user: null,
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
      state.isLoaded = true;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },

    requested: (state) => {
      state.isLoaded = true;
    },
    failed: (state) => {
      state.isLoaded = false;
      state.isAuthenticated = false;
    },
  },
});

const { success, logout, requested, failed } = authSlice.actions;

const callHandleError = (error, dispatch) => {
  dispatch(handleError(error, failed, AUTH));
};

export const authActions = {
  registerUser: (user) => async (dispatch) => {
    dispatch(requested());
    try {
      const data = await authService.register({ user });
      dispatch(success(data));
    } catch (error) {
      callHandleError(error, dispatch);
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
      callHandleError(error, dispatch);
      throw error;
    }
  },

  checkAuth: () => async (dispatch) => {
    dispatch(requested());
    try {
      const data = await authService.checkAuth();
      if (data?.user) dispatch(success(data));
      if (!data?.user) dispatch(failed());
    } catch (error) {
      dispatch(logout());
    }
  },

  logoutUser: () => async (dispatch) => {
    localStorage.removeItem('token');
    dispatch(logout());
  },

  updateUser: (user) => async (dispatch) => {
    dispatch(requested());
    try {
      const data = await authService.update({ user });
      dispatch(success(data));
    } catch (error) {
      callHandleError(error, dispatch);
      throw error;
    }
  },
};

export const authSelectors = {
  getUser: (state) => state[AUTH].user,
  isLoaded: (state) => state[AUTH].isLoaded,
  isAuthenticated: (state) => state[AUTH].isAuthenticated,
};

export default authSlice.reducer;
