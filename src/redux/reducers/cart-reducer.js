import { createSlice, createAction } from '@reduxjs/toolkit';

const removeFromCart = createAction('remove-from-cart');

const isAddToCartAction = (action) => {
  return action.type.endsWith('/addToCart');
};

const isRemoveFromCartAction = (action) => {
  return action.type.endsWith('remove-from-cart');
};

const initialState = {
  cart: [],
  total: 0,
  payed: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    cleanCart: (state) => {
      state.cart = [];
      state.total = 0;
    },
    payOrder: (state) => {
      state.payed = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeFromCart, (state, action) => {
        state.cart = state.cart.filter(
          (el) => el.id !== action.payload.id
        );
      })
      .addMatcher(isAddToCartAction, (state, action) => {
        state.total += action.payload.likes;
      })
      .addMatcher(isRemoveFromCartAction, (state, action) => {
        state.total -= action.payload.likes;
      })
      .addDefaultCase((state) => {
        return state;
      });
  },
});

const addSingleItemToCart = (item) => (dispatch, getState) => {
  const { cart } = getState().cart;

  // NFT so can't add more than one of the same item
  if (cart.find((x) => x.id === item.id)) {
    return;
  }

  dispatch(addToCart(item));
};

export const { addToCart, cleanCart, payOrder } = cartSlice.actions;

export { addSingleItemToCart, removeFromCart };
const { reducer } = cartSlice;

export default reducer;
