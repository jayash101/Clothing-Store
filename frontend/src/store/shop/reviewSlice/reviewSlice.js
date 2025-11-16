import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { VITE_API_URL } from "@/lib/url";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addProductReview = createAsyncThunk(
  "cart/addProductReview",
  async (formData) => {
    const result = await axios.post(
      `${VITE_API_URL}/api/shop/review/add`,
      formData,
    );

    // console.log(result);
    return result.data;
  },
);

export const getProductReviews = createAsyncThunk(
  "cart/getProductReviews",
  async (productId) => {
    console.log(VITE_API_URL, "vite");

    const result = await axios.get(
      `${VITE_API_URL}/api/shop/review/${productId}`,
    );

    return result.data;
  },
);

const ShoppingReviewSlice = createSlice({
  name: "shoppingReview",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProductReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProductReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(addProductReview.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      })
      .addCase(getProductReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getProductReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default ShoppingReviewSlice.reducer;
