// src/components/Navbar.tsx
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reduxStateManagementFiles/authSlice";
import { toggleTheme } from "../reduxStateManagementFiles/themeSlice";
import type { RootAuthState, AppDispatch } from "../reduxStateManagementFiles/store";

import { Button } from "@/components/ui/button";
import { Moon, Sun, LogOut, CheckSquare } from "lucide-react";

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
      className={`sticky top-0 z-50 w-full border-b backdrop-blur-md 
        ${mode === "light" ? "bg-white/80 border-gray-200" : "bg-gray-900/80 border-gray-800"}
      `}
    >
      <div className="mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <CheckSquare className="h-6 w-6 text-indigo-600" />
          <span className="text-lg font-bold tracking-tight">TaskManager</span>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Theme Switcher */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => dispatch(toggleTheme())}
            className="rounded-full"
          >
            {mode === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Conditional Logout */}
          {isLoggedIn && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full px-4"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
