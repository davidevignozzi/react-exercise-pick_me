import { createSlice, configureStore } from '@reduxjs/toolkit';

const exampleSlice = createSlice({
  name: 'example',
  initialState: {
    value: 0,
  },
  reducers: {
    incremented: (state) => {
      state.value += 1;
    },
    decremented: (state) => {
      state.value -= 1;
    },
  },
});

const store = configureStore({
  reducer: {
    example: exampleSlice.reducer,
  },
});

export const { incremented, decremented } = exampleSlice.actions;
export default store;
