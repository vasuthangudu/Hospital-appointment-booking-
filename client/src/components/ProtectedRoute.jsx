import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation();
  const token = localStorage.getItem("authToken");

  let authUser = null;
  try {
    authUser = JSON.parse(localStorage.getItem("authUser") || "null");
  } catch (error) {
    authUser = null;
  }

  if (!token || !authUser || authUser.role !== "patient") {
    return <Navigate to="/create-account" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
