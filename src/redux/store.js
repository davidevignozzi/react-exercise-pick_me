import { configureStore } from '@reduxjs/toolkit';
import apiReducer from './reducers/api-reducer';

const store = configureStore({
  reducer: {
    photos: apiReducer,
  },
});

export default store;
