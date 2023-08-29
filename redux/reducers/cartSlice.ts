import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/product";

type CartState = {
  items: Product[];
};

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    default: (state) => {
      return state;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
