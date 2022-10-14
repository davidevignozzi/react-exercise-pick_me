import { createSlice } from '@reduxjs/toolkit';
import instance from '../../api';

const initialState = {
  loading: true,
  error: {
    status: false,
    message: '',
  },
  photos: [],
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
    catchError: (state, action) => {
      state.error.status = true;
      state.error.message = action.payload;
      state.photos = [];
    },
    cleanError: (state) => {
      state.error.status = false;
      state.error.message = '';
    },
  },
});

const {
  startLoading,
  saveData,
  stopLoading,
  catchError,
  cleanError,
} = apiSlice.actions;

const { reducer } = apiSlice;

export const fetchData = (path) => async (dispatch) => {
  dispatch(startLoading());
  dispatch(cleanError());

  // Api Call
  try {
    const response = await instance.get(path);
    dispatch(saveData(response.data));
  } catch (error) {
    dispatch(catchError(error.errors));
  }
  dispatch(stopLoading());
};

export default reducer;
