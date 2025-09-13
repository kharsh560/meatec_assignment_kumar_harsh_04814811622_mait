// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import type { RootAuthState } from "./reduxStateManagementFiles/store";
import { useEffect } from "react";

export default function App() {
    const mode = useSelector((state: RootAuthState) => state.theme.mode);

    useEffect(() => {
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(mode);
    }, [mode]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
