import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  featuredImageList: [],
};

export const getFeaturedImage = createAsyncThunk(
  "/common/getFeaturedImage",
  async () => {
    const result = await axios.get(
      "http://localhost:4000/api/common/feature/get",
    );

    return result.data;
  },
);

export const addFeaturedImage = createAsyncThunk(
  "/common/addFeaturedImage",
  async (image) => {
    const result = await axios.post(
      "http://localhost:4000/api/common/feature/add",
      { image },
    );

    return result.data;
  },
);


const commonSlice = createSlice({
  name: "commonFeature",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getFeaturedImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeaturedImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featuredImageList = action.payload.data;
      })
      .addCase(getFeaturedImage.rejected, (state, action) => {
        state.isLoading = false;
        state.featuredImageList = [];
      }),
});

export default commonSlice.reducer;
