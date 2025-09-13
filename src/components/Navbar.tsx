// src/components/Navbar.tsx
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reduxStateManagementFiles/authSlice";
import { toggleTheme } from "../reduxStateManagementFiles/themeSlice";
import type { RootAuthState, AppDispatch } from "../reduxStateManagementFiles/store";

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn } = useSelector((state: RootAuthState) => state.auth);
  const mode = useSelector((state: RootAuthState) => state.theme.mode);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("auth");
  };

  return (
    <nav
      className={`w-full px-6 py-4 flex justify-between items-center border-b ${
        mode === "light"
          ? "bg-white border-gray-200 text-gray-800"
          : "bg-gray-800 border-gray-700 text-gray-100"
      }`}
    >
      {/* Logo */}
      <div className="text-xl font-bold tracking-tight">
        TaskManager
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Theme Switcher */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className={`px-3 py-1.5 rounded-md border text-sm font-medium transition ${
            mode === "light"
              ? "bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200"
              : "bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
          }`}
        >
          {mode === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>

        {/* Conditional Logout */}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-md bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
}
