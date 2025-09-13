// src/components/ThemeSwitcher.tsx
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../reduxStateManagementFiles/themeSlice";
import type { RootAuthState, AppDispatch } from "../reduxStateManagementFiles/store";

export default function ThemeSwitcher() {
  const dispatch = useDispatch<AppDispatch>();
  const mode = useSelector((state: RootAuthState) => state.theme.mode);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
    >
      {mode === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}
