import { createSlice } from '@reduxjs/toolkit';

import { articleService as articlesApi } from '../services/index';

import { handleError } from './helpers';

const initialState = {
  chunk: {
    entities: {},
    isLoading: true,
  },
  one: {
    entities: {},
    isLoading: true,
  },
};

const ARTICLES = 'articles';

const articlesSlice = createSlice({
  name: ARTICLES,
  initialState,
  reducers: {
    received: (state, action) => {
      state.chunk.entities = action.payload;
      state.chunk.isLoading = false;
    },
    receivedOne: (state, action) => {
      state.one.entities = action.payload;
      state.one.isLoading = false;
    },

    requested: (state) => {
      state.chunk.isLoading = true;
      state.one.isLoading = true;
    },
    requestFailed: (state) => {
      state.chunk.isLoading = false;
      state.one.isLoading = false;
    },
  },
});

const { received, receivedOne, requested, requestFailed } =
  articlesSlice.actions;

const callHandleError = (error, dispatch) => {
  dispatch(handleError(error, requestFailed, ARTICLES));
};

export const articleActions = {
  setArticlesChunk: (params) => async (dispatch) => {
    dispatch(requested());
    try {
      const data = await articlesApi.loadChunk(params);
      dispatch(received(data));
    } catch (error) {
      callHandleError(error, dispatch);
    }
  },
  setArticleOne: (slug) => async (dispatch) => {
    dispatch(requested());
    try {
      const data = await articlesApi.loadOne(slug);
      dispatch(receivedOne(data));
    } catch (error) {
      callHandleError(error, dispatch);
    }
  },
};

export const articleSelectors = {
  getChunk: (state) => state[ARTICLES].chunk.entities,
  getOne: (state) => state[ARTICLES].one.entities.article,
  isLoading: (state) => state[ARTICLES].chunk.isLoading,
  isLoadingOne: (state) => state[ARTICLES].one.isLoading,
};

export default articlesSlice.reducer;
