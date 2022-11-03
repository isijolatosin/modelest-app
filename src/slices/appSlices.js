import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["cartItems", "itemCount", "total", "orderStatus", "orderPayload"],
};

const initialState = {
  cartItems: [],
  itemCount: 0,
  total: 0,
  orderStatus: "",
  orderPayload: "",
};

export const appSlices = createSlice({
  name: "app",
  initialState,
  reducers: {
    // set order status
    setOrderStatus: (state, action) => {
      state.orderStatus = action.payload;
    },
    // set order payload
    setOrderPayload: (state, action) => {
      state.orderPayload = action.payload;
    },
    // clear order payload
    clearOrderPayload: (state) => {
      state.orderPayload = {};
    },
    // Add item
    addToCartItem: (state, action) => {
      // check if item is in the cart
      if (!state.cartItems.find((item) => item.id === action.payload.id)) {
        state.cartItems.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }

      state.itemCount = state.cartItems.reduce(
        (total, prod) => total + prod.quantity,
        0
      );
      state.total = state.cartItems.reduce(
        (total, prod) => total + prod.price * prod.quantity,
        0
      );
    },

    // Increase Item
    increaseCartItem: (state, action) => {
      if (
        state.cartItems.find(
          (item) =>
            // item.hairLength === action.payload.hairLength &&
            item.id === action.payload.id
        )
      ) {
        const increaseIndex = state.cartItems.findIndex(
          (item) => item.id === action.payload.id
          // && item.hairLength === action.payload.hairLength
        );

        state.cartItems[increaseIndex].quantity++;

        state.itemCount = state.cartItems.reduce(
          (total, prod) => total + prod.quantity,
          0
        );
        state.total = state.cartItems.reduce(
          (total, prod) => total + prod.price * prod.quantity,
          0
        );
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });

        state.itemCount = state.cartItems.reduce(
          (total, prod) => total + prod.quantity,
          0
        );
        state.total = state.cartItems.reduce(
          (total, prod) => total + prod.price * prod.quantity,
          0
        );
      }
    },

    // Decrease Item
    decreaseCartItem: (state, action) => {
      const decreaseIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
        // && item.hairLength === action.payload.hairLength
      );
      const product = state.cartItems[decreaseIndex];
      if (product.quantity >= 1) {
        product.quantity--;
      }
      state.itemCount = state.cartItems.reduce(
        (total, prod) => total + prod.quantity,
        0
      );
      state.total = state.cartItems.reduce(
        (total, prod) => total + prod.price * prod.quantity,
        0
      );
    },

    // Remove Item
    removeCartItem: (state, action) => {
      const removeIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
        // && item.hairLength === action.payload.hairLength
      );

      const a = state.cartItems.slice(0, removeIndex);
      const b = state.cartItems.slice(removeIndex + 1, state.cartItems.length);

      const newCartItems = [...a, ...b];

      state.cartItems = [...newCartItems];

      state.itemCount = state.cartItems.reduce(
        (total, prod) => total + prod.quantity,
        0
      );
      state.total = state.cartItems.reduce(
        (total, prod) => total + prod.price * prod.quantity,
        0
      );
    },

    // Clear CartItems
    clearCartItem: (state) => {
      state.cartItems = [];
      state.itemCount = 0;
      state.total = 0;
    },
  },
});

export const {
  logInUser,
  logOutUser,
  addToCartItem,
  increaseCartItem,
  decreaseCartItem,
  removeCartItem,
  clearCartItem,
  setOrderStatus,
  setOrderPayload,
  clearOrderPayload,
} = appSlices.actions;

// Selectors
export const selectCartItems = (state) => state.app.cartItems;
export const selectItemCount = (state) => state.app.itemCount;
export const selectTotal = (state) => state.app.total;
export const selectOrderStatus = (state) => state.app.orderStatus;
export const selectOrderPayload = (state) => state.app.orderPayload;
export const selectUser = (state) => state.app.user;

const rootReducer = appSlices.reducer;

export default persistReducer(persistConfig, rootReducer);
