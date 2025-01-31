import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  // example of location: /auth/login
  const location = useLocation();
  const navigate = useNavigate();

  const authNavigation = () => {
    if (location.pathname === "/") {
      if (!isAuthenticated) {
        navigate("/auth/login");
      } else {
        if (user?.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/shop/home");
        }
      }
    }

    //  if user is not authenticated but tries to access other pages
    if (
      !isAuthenticated &&
      !(
        location.pathname.includes("/login") ||
        location.pathname.includes("/register")
      )
    ) {
      navigate("/auth/login");
    }

    //  if user is authenticated but tries to access other pages
    if (
      isAuthenticated &&
      (location.pathname.includes("/login") ||
        location.pathname.includes("/register") ||
        location.pathname.includes("/auth"))
    ) {
      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/shop/home");
      }
    }

    // if user is not admin but still tries to access admin page
    if (
      isAuthenticated &&
      user?.role !== "admin" &&
      location.pathname.includes("admin")
    ) {
      navigate("/error");
    }

    // if user is admin but still tries to access user page
    if (
      isAuthenticated &&
      user?.role === "admin" &&
      location.pathname.includes("shop")
    ) {
      navigate("/admin/dashboard");
    }
  };

  useEffect(() => {
    authNavigation();
  }, [isAuthenticated, user]);

  return <div>{children}</div>;
};

export default CheckAuth;
