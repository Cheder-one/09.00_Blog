import { createSlice } from '@reduxjs/toolkit';

import { articleService } from '../services/index';
import { getPaginateParams } from '../../../utils';

import { handleError } from './helpers';
import { paginationActions } from './pagination';

const { setInitPagination } = paginationActions;

const initialState = {
  chunk: {
    entities: {},
    isLoading: true,
  },
  one: {
    entities: {},
    isLoading: true,
  },
  errors: {},
};

const ARTICLES = 'articles';

const articlesSlice = createSlice({
  name: ARTICLES,
  initialState,
  reducers: {
    loaded: (state, action) => {
      state.chunk.entities = action.payload;
      state.chunk.isLoading = false;
      state.errors = {};
    },
    loadedOne: (state, action) => {
      state.one.entities = action.payload;
      state.one.isLoading = false;
      state.errors = {};
    },
    deletedOne: (state) => {
      state.one.entities = {};
      state.one.isLoading = true;
      state.errors = {};
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
    setError: (state, action) => {
      const { key, error } = JSON.parse(action.payload);
      state.errors[key] = error;
    },
  },
});

const {
  loaded,
  loadedOne,
  deletedOne,
  requested,
  requestedOne,
  failed,
  setError,
} = articlesSlice.actions;

const callHandleError = (errObj, dispatch) => {
  dispatch(handleError(errObj, failed, setError));
};

export const articleActions = {
  setArticlesChunk: () => async (dispatch, getStore) => {
    const { pagination } = getStore();
    dispatch(requested());
    try {
      const params = getPaginateParams(pagination);
      const data = await articleService.loadChunk(params);
      dispatch(loaded(data));
    } catch (error) {
      callHandleError({ chunk: error }, dispatch);
      throw error;
    }
  },

  setArticleOne: (slug) => async (dispatch) => {
    dispatch(requestedOne());
    try {
      const data = await articleService.loadOne(slug);
      dispatch(loadedOne(data));
    } catch (error) {
      callHandleError({ one: error }, dispatch);
      throw error;
    }
  },

  createArticle: (article) => async (dispatch) => {
    dispatch(requestedOne());
    try {
      const data = await articleService.create({ article });
      dispatch(loadedOne(data));
      dispatch(setInitPagination());
    } catch (error) {
      callHandleError({ create: error }, dispatch);
      throw error;
    }
  },

  editArticle: (slug, article) => async (dispatch) => {
    dispatch(requestedOne());
    try {
      const data = await articleService.edit(slug, { article });
      dispatch(loadedOne(data));
    } catch (error) {
      callHandleError({ edit: error }, dispatch);
      throw error;
    }
  },

  deleteArticle: (slug) => async (dispatch) => {
    dispatch(deletedOne());
    try {
      await articleService.delete(slug);
    } catch (error) {
      callHandleError({ delete: error }, dispatch);
      throw error;
    }
  },

  likeArticle: (slug, isLiked) => async (dispatch) => {
    const { setArticlesChunk } = articleActions;
    dispatch(requestedOne());
    let data = null;
    try {
      if (isLiked) {
        data = await articleService.unlike(slug);
      } else {
        data = await articleService.like(slug);
      }
      dispatch(loadedOne(data));
      dispatch(setArticlesChunk());
    } catch (error) {
      callHandleError({ like: error }, dispatch);
      throw error;
    }
  },
};

export const articleSelectors = {
  getChunk: (state) => state[ARTICLES].chunk.entities,
  getOne: (state) => state[ARTICLES].one.entities.article,
  getError: (state) => state[ARTICLES].errors,
  isLoading: (state) => state[ARTICLES].chunk.isLoading,
  isLoadingOne: (state) => state[ARTICLES].one.isLoading,
};

export default articlesSlice.reducer;
