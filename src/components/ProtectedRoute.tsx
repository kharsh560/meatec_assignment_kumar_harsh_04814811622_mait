// src/components/ProtectedRoute.tsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootAuthState } from "../reduxStateManagementFiles/store";
import type { JSX } from "react";

export default function ProtectedRoute({ children } : { children: JSX.Element }) {
  const isLoggedIn = useSelector((state: RootAuthState) => state.auth.isLoggedIn);

  return isLoggedIn ? children : <Navigate to="/signin" />;
}
