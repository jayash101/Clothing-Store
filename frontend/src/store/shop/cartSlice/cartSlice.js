import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { VITE_API_URL } from "@/lib/url";

const initialState = {
  isLoading: false,
  cartItems: [],
};

export const addCartItems = createAsyncThunk(
  "cart/addCartItems",
  async ({ userId, productId, quantity }) => {
    const result = await axios.post(`${VITE_API_URL}/api/shop/cart/add`, {
      userId,
      productId,
      quantity,
    });

    // console.log(result);
    return result.data;
  },
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    const result = await axios.get(
      `${VITE_API_URL}/api/shop/cart/get/${userId}`,
    );

    return result.data;
  },
);

export const updateCartItems = createAsyncThunk(
  "cart/updateCartItems",
  async ({ userId, productId, quantity }) => {
    const result = await axios.put(
      `${VITE_API_URL}/api/shop/cart/update-cart`,
      {
        userId,
        productId,
        quantity,
      },
    );

    return result.data;
  },
);

export const deleteCartItems = createAsyncThunk(
  "cart/deleteCartItems",
  async ({ userId, productId }) => {
    const result = await axios.delete(
      `${VITE_API_URL}/api/shop/cart/${userId}/${productId}`,
    );

    return result.data;
  },
);

const ShoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default ShoppingCartSlice.reducer;
