import { createSlice } from '@reduxjs/toolkit';

import { articleService as articlesApi } from '../services/index';

import { setError } from './errors';

const REDUCER = 'articles';

const initialState = {
  entities: [],
  isLoading: true,
};

const articlesSlice = createSlice({
  name: REDUCER,
  initialState,
  reducers: {
    received: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },

    requested: (state) => {
      state.isLoading = true;
    },
    requestFailed: (state) => {
      state.isLoading = false;
    },
  },
});

const { received, requested, requestFailed } = articlesSlice.actions;

export const articleActions = {
  chunkLoaded: (params) => async (dispatch) => {
    dispatch(requested());
    try {
      const data = await articlesApi.getChunk(params);
      dispatch(received(data));
    } catch (error) {
      console.error(error);
      dispatch(requestFailed());
      dispatch(setError(REDUCER, error.message));
    }
  },
};

export const getArticles = () => (state) => state.articles.entities;
// prettier-ignore
export const getArticlesIsLoading = () => (state) => state.articles.isLoading;

export default articlesSlice.reducer;
