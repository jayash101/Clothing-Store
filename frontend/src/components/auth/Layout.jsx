import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden w-1/2 items-center justify-center bg-purple-950 px-12 [box-shadow:0_0_2vw_#3B0764] lg:flex">
        <div className="max-w-xl space-y-6 text-center text-black">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Welcome to E-commerce Shopping 🛒
          </h1>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
