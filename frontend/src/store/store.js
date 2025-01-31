import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slice/authSlice.js";

import adminProductSlice from "./admin/productSlice/productSlice.js";
import adminOrderSlice from "./admin/orderSlice/orderSlice.js";

import shoppingProductSlice from "./shop/productSlice/productSlice.js";
import shoppingCartSlice from "./shop/cartSlice/cartSlice.js";
import shoppingAddressSlice from "./shop/addressSlice/addressSlice.js";
import shoppingOrderSlice from "./shop/orderSlice/orderSlice.js";
import shoppingSearchSlice from "./shop/searchSlice/searchSlice.js";
import shoppingReviewSlice from "./shop/reviewSlice/reviewSlice.js";

import commonSlice from "./common/commonSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,

    adminProduct: adminProductSlice,
    adminOrder: adminOrderSlice,

    shoppingProduct: shoppingProductSlice,
    shoppingCart: shoppingCartSlice,
    shoppingAddress: shoppingAddressSlice,
    shoppingOrder: shoppingOrderSlice,
    shoppingSearch: shoppingSearchSlice,
    shoppingReview: shoppingReviewSlice,

    commonFeature: commonSlice,
  },
});

export default store;
