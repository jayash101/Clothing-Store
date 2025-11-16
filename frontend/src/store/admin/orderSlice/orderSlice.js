import { VITE_API_URL } from "@/lib/url";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  orderList: [],
  orderDetails: null,
};

export const getAdminOrders = createAsyncThunk(
  "/order/getAdminOrders",
  async () => {
    const result = await axios.get(`${VITE_API_URL}/api/admin/orders/get`);

    return result.data;
  },
);

export const getAdminOrderDetails = createAsyncThunk(
  "/order/getAdminOrderDetails",
  async (id) => {
    const result = await axios.get(
      `${VITE_API_URL}/api/admin/orders/details/${id}`,
    );

    return result.data;
  },
);

export const updateOrderStatus = createAsyncThunk(
  "/order/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const result = await axios.put(
      `${VITE_API_URL}/api/admin/orders/update/${id}`,
      { orderStatus },
    );

    return result.data;
  },
);

const AdminOrderSlice = createSlice({
  name: "adminOrder",
  initialState,
  reducers: {
    resetAdminOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAdminOrders.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getAdminOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getAdminOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetAdminOrderDetails } = AdminOrderSlice.actions;
export default AdminOrderSlice.reducer;
