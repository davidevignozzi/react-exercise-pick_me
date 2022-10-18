import { createSlice } from '@reduxjs/toolkit';
import instance from '../../api';
import {
  getItemFromLocalStorage,
  setLocalStorageItem,
} from '../../utils/helpers';

const isQuerySaved = (action) => {
  return action.type.endsWith('/saveQuery');
};

const path = getItemFromLocalStorage('query')?.path || '';
const itemPerPage =
  getItemFromLocalStorage('query')?.itemPerPage || null;
const type = getItemFromLocalStorage('query')?.type || '';
const query = getItemFromLocalStorage('query')?.query || '';

const initialState = {
  query: {
    path: path,
    itemPerPage: itemPerPage,
    type: type,
    query: query,
  },
  loading: true,
  error: {
    status: false,
    message: '',
  },
  photos: [],
  rate_limit: {
    remaining: null,
    total: 50,
  },
  pagination: {
    hasNextPage: null,
    hasPrevPage: null,
    totalPages: null,
    currentPage: 1,
  },
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.photos = [];
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    saveData: (state, action) => {
      state.photos = action.payload;
    },
    saveQuery: (state, action) => {
      state.query = { ...action.payload };
    },
    catchError: (state, action) => {
      state.error.status = true;
      state.error.message = action.payload;
      state.photos = [];
    },
    cleanError: (state) => {
      state.error.status = false;
      state.error.message = '';
    },
    checkRateLimiter: (state, action) => {
      state.rate_limit = {
        ...action.payload,
      };
    },
    updatePage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    checkPagination: (state, action) => {
      state.pagination.hasNextPage = action.payload.hasNextPage;
      state.pagination.hasPrevPage = action.payload.hasPrevPage;
      state.pagination.totalPages = action.payload.totalPages;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isQuerySaved, (state) => {
      setLocalStorageItem('query', state.query);
    });
  },
});

const {
  startLoading,
  saveData,
  saveQuery,
  stopLoading,
  catchError,
  cleanError,
  checkRateLimiter,
  updatePage,
  checkPagination,
} = apiSlice.actions;

const { reducer } = apiSlice;

export const fetchData = (path) => async (dispatch, getState) => {
  dispatch(startLoading());
  dispatch(cleanError());

  // Api Call
  try {
    const response = await instance.get(path);
    console.log(response);

    // No item for searched
    if (response?.data?.total === 0) {
      dispatch(catchError(['Nessuna foto per il termine cercato']));
      return;
    }

    // Pagination
    if (response?.data?.total_pages) {
      const { currentPage } = getState().photos.pagination;

      const paginationInfo = {
        hasPrevPage: currentPage > 1,
        hasNextPage: currentPage + 1 <= response?.data?.total_pages,
        totalPages: response?.data?.total_pages,
      };

      dispatch(checkPagination(paginationInfo));
    }

    // Save Data
    dispatch(saveData(response.data));

    // Check request limit
    dispatch(
      checkRateLimiter({
        total: response.headers['x-ratelimit-limit'],
        remaining: response.headers['x-ratelimit-remaining'],
      })
    );
  } catch (error) {
    dispatch(catchError(error.errors));
  }
  dispatch(stopLoading());
};

export { cleanError, catchError, saveQuery, updatePage };

export default reducer;
