import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/product";

type SingleProductState = {
  product: Product;
};

const initialState: SingleProductState = {
  product: {
    id: "",
    name: "",
    description: "",
    price: "",
    images: "",
    category: "",
    createdAt: "",
    updatedAt: "",
    published: false,
  },
};

export const productSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
    },

    default: (state) => {
      return state;
    },
  },
});

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;
