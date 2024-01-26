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
    loaded: (state, action) => {
      state.chunk.entities = action.payload;
      state.chunk.isLoading = false;
    },
    loadedOne: (state, action) => {
      state.one.entities = action.payload;
      state.one.isLoading = false;
    },
    deletedOne: (state) => {
      state.one.entities = {};
      state.one.isLoading = true;
    },

    requested: (state) => {
      state.chunk.isLoading = true;
    },
    requestedOne: (state) => {
      state.one.isLoading = true;
    },
    failed: (state) => {
      // state.chunk.isLoading = false;
      // state.one.isLoading = false;
    },
  },
});

const { loaded, loadedOne, deletedOne, requested, requestedOne, failed } =
  articlesSlice.actions;

const callHandleError = (error, dispatch) => {
  dispatch(handleError(error, failed, ARTICLES));
};

export const articleActions = {
  setArticlesChunk:
    // prettier-ignore
    (params = { limit: 5, offset: 0 }) => async (dispatch) => {
      dispatch(requested());
      try {
        const data = await articleService.loadChunk(params);
        dispatch(loaded(data));
      } catch (error) {
        callHandleError(error, dispatch);
      }
    },

  setArticleOne: (slug) => async (dispatch) => {
    dispatch(requestedOne());
    try {
      const data = await articleService.loadOne(slug);
      dispatch(loadedOne(data));
    } catch (error) {
      callHandleError(error, dispatch);
    }
  },

  createArticle: (article) => async (dispatch) => {
    dispatch(requestedOne());
    try {
      const data = await articleService.create({ article });
      dispatch(loadedOne(data));
    } catch (error) {
      callHandleError(error, dispatch);
    }
  },

  editArticle: (slug, article) => async (dispatch) => {
    dispatch(requestedOne());
    try {
      const data = await articleService.edit(slug, { article });
      dispatch(loadedOne(data));
    } catch (error) {
      callHandleError(error, dispatch);
    }
  },

  deleteArticle: (slug) => async (dispatch) => {
    const { setArticlesChunk } = articleActions;
    dispatch(deletedOne());
    try {
      await articleService.delete(slug);
      setArticlesChunk();
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
