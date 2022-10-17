import { createSlice } from '@reduxjs/toolkit';
import instance from '../../api';

const initialState = {
  query: {
    path: '',
    itemPerPage: null,
    type: '',
    query: '',
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
} = apiSlice.actions;

const { reducer } = apiSlice;

export const fetchData = (path) => async (dispatch) => {
  dispatch(startLoading());
  dispatch(cleanError());

  // Api Call
  try {
    const response = await instance.get(path);
    console.log(response);

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

export { cleanError, catchError, saveQuery };

export default reducer;
