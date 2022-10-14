import { createSlice, configureStore } from '@reduxjs/toolkit';

const exampleSlice = createSlice({
  name: 'example',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementBy: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementBy } =
  exampleSlice.actions;

const store = configureStore({
  reducer: {
    example: exampleSlice.reducer,
  },
});

export default store;
