import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  searchResults: [],
};

export const getSearchResults = createAsyncThunk(
  "/search/getSearchResults",
  async (keyword) => {
    const result = await axios.get(
      `http://localhost:4000/api/shop/search/${keyword}`,
    );

    return result?.data;
  },
);

const ShoppingSearchSlice = createSlice({
  name: "shoppingSearch",
  initialState,
  reducers: {
    resetSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.data;
      })
      .addCase(getSearchResults.rejected, (state) => {
        state.isLoading = false;
        state.searchResults = [];
      });
  },
});

export const { resetSearchResults } = ShoppingSearchSlice.actions;

export default ShoppingSearchSlice.reducer;
