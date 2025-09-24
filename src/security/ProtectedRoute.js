// src/components/ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom"; // ✅ import Navigate + Outlet
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If used as a wrapper with <Route element={<ProtectedRoute />}>
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
