import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { VITE_API_URL } from "@/lib/url";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addNewAddress = createAsyncThunk(
  "/address/addNewAddress",
  async (formData) => {
    const result = await axios.post(
      `${VITE_API_URL}/api/shop/address/add`,
      formData,
    );

    return result.data;
  },
);

export const fetchAllAddress = createAsyncThunk(
  "/address/fetchAllAddress",
  async (userId) => {
    const result = await axios.get(
      `${VITE_API_URL}/api/shop/address/get/${userId}`,
    );

    return result.data;
  },
);

export const updateAddress = createAsyncThunk(
  "/address/updateAddress",
  async ({ userId, addressId, formData }) => {
    const result = await axios.put(
      `${VITE_API_URL}/api/shop/address/update/${userId}/${addressId}`,
      formData,
    );

    return result.data;
  },
);

export const deleteAddress = createAsyncThunk(
  "/address/deleteAddress",
  async ({ userId, addressId }) => {
    const result = await axios.delete(
      `${VITE_API_URL}/api/shop/address/delete/${userId}/${addressId}`,
    );

    return result.data;
  },
);

const ShoppingAddressSlice = createSlice({
  name: "shoppingAddress",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      })
      .addCase(fetchAllAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default ShoppingAddressSlice.reducer;
