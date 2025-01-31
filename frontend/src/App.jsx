import React, { useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Layout from "./components/auth/Layout.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";

import {
  AdminDashboard,
  AdminOrders,
  AdminFeatures,
  AdminProducts,
} from "./pages/admin/index.js";

import { ShoppingLayout, ShoppingHeader } from "./components/shopping/index.js";

import {
  Account,
  Checkout,
  ProductLists,
  ShoppingHome,
} from "./pages/shopping/index.js";

import NotFound from "./pages/not-found/NotFound";
import CheckAuth from "./components/common/CheckAuth";
import UnauthPage from "./pages/unauth/Unauth";

import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/slice/authSlice.js";
import { Skeleton } from "./components/ui/skeleton.jsx";
import PayPalReturn from "./pages/shopping/PayPalReturn.jsx";
import PaymentSuccess from "./pages/shopping/PaymentSuccess.jsx";
import SearchProducts from "./pages/shopping/Search.jsx";

const App = () => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth,
  );
  // const isAuthenticated = true;
  // const user = {
  //   role: "admin"
  // };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading)
    return (
      // Loading Screen
      <Skeleton className="h-screen w-screen bg-black" />
    );

  // console.log(isLoading, user);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* component */}
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />

        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Layout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>

        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="account" element={<Account />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="products" element={<ProductLists />} />
          <Route path="paypal-return" element={<PayPalReturn />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>

        <Route path="/error" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
