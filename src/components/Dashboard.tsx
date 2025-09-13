// src/components/Dashboard.tsx
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../reduxStateManagementFiles/authSlice";
import type { AppDispatch, RootAuthState } from "../reduxStateManagementFiles/store";


export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: RootAuthState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("auth");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">
        Welcome, {userData?.username || "User"} 🎉
      </h1>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
}
