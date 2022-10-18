import { createSlice, createAction, isAnyOf } from '@reduxjs/toolkit';
import {
  getItemFromLocalStorage,
  setLocalStorageItem,
} from '../../utils/helpers';

const removeFromCart = createAction('remove-from-cart');

const isAddToCartAction = (action) => {
  return action.type.endsWith('/addToCart');
};

const isRemoveFromCartAction = (action) => {
  return action.type.endsWith('remove-from-cart');
};

const isCartCleaned = (action) => {
  return action.type.endsWith('/cleanCart');
};

const isCartAction = (action) => {
  return isAnyOf(
    isAddToCartAction,
    isRemoveFromCartAction,
    isCartCleaned
  )(action);
};

const localStorageCart = getItemFromLocalStorage('cart');
const totalFromLocalStorage = getItemFromLocalStorage('total');

const initialState = {
  cart: localStorageCart ? localStorageCart : [],
  total: totalFromLocalStorage || 0,
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
      .addMatcher(isCartAction, (state) => {
        setLocalStorageItem('cart', state.cart);
        setLocalStorageItem('total', state.total);
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
