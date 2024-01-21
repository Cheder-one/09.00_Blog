import { createSlice } from '@reduxjs/toolkit';

import authService from '../services/auth.service';

import { handleError } from './helpers';

const initialState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

const AUTH = 'auth';

const authSlice = createSlice({
  name: AUTH,
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      state.user = action.payload.user;
      state.isLoading = false;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.isLoading = false;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },

    requested: (state) => {
      state.isLoading = true;
    },
    requestFailed: (state) => {
      state.isLoading = false;
    },
  },
});

const { registerSuccess, loginSuccess, logout, requested, requestFailed } =
  authSlice.actions;

const callHandleError = (error, dispatch) => {
  dispatch(handleError(error, requestFailed, AUTH));
};

export const authActions = {
  registerUser: (user) => async (dispatch) => {
    dispatch(requested());
    try {
      const data = await authService.register({ user });
      dispatch(registerSuccess(data));
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
      dispatch(loginSuccess(data));
    } catch (error) {
      callHandleError(error, dispatch);
      throw error;
    }
  },

  checkAuth: () => async (dispatch) => {
    dispatch(requested());
    try {
      const data = await authService.checkAuth();
      dispatch(loginSuccess(data));
    } catch (error) {
      dispatch(logout());
    }
  },

  logoutUser: () => async (dispatch) => {
    localStorage.removeItem('token');
    dispatch(logout());
  },
};

export const authSelectors = {
  user: (state) => state[AUTH].user,
  isLoading: (state) => state[AUTH].isLoading,
  isAuthenticated: (state) => state[AUTH].isAuthenticated,
};

export default authSlice.reducer;
