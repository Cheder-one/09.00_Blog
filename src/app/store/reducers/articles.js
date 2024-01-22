import { createSlice } from '@reduxjs/toolkit';

import { articleService } from '../services/index';

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
    success: (state, action) => {
      state.chunk.entities = action.payload;
      state.chunk.isLoading = false;
    },
    successOne: (state, action) => {
      state.one.entities = action.payload;
      state.one.isLoading = false;
    },

    requested: (state) => {
      state.chunk.isLoading = true;
      state.one.isLoading = true;
    },
    failed: (state) => {
      // state.chunk.isLoading = false;
      // state.one.isLoading = false;
    },
  },
});

const { success, successOne, requested, failed } = articlesSlice.actions;

const callHandleError = (error, dispatch) => {
  dispatch(handleError(error, failed, ARTICLES));
};

export const articleActions = {
  setArticlesChunk: (params) => async (dispatch) => {
    dispatch(requested());
    try {
      const data = await articleService.loadChunk(params);
      dispatch(success(data));
    } catch (error) {
      callHandleError(error, dispatch);
    }
  },

  setArticleOne: (slug) => async (dispatch) => {
    dispatch(requested());
    try {
      const data = await articleService.loadOne(slug);
      dispatch(successOne(data));
    } catch (error) {
      callHandleError(error, dispatch);
    }
  },

  createArticle: () => async (dispatch) => {
    dispatch(requested());
    try {
      const data = await articleService.create();
      dispatch(successOne(data));
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
