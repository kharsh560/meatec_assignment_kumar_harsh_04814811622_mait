// src/components/SignIn.tsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootAuthState } from "../reduxStateManagementFiles/store";
import { login } from "../reduxStateManagementFiles/authSlice";

export default function SignIn() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const mode = useSelector((state: RootAuthState) => state.theme.mode);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        setError("Invalid credentials");
        return;
      }

      const data = await res.json();
      dispatch(login({ token: data.token, username }));
      localStorage.setItem("auth", JSON.stringify({ token: data.token, username }));
      navigate("/");
    } catch {
      setError("Something went wrong");
    }
  };

  const bgClass = mode === "light" ? "bg-gray-50 text-gray-900" : "bg-gray-900 text-gray-100";
  const cardClass = mode === "light" ? "bg-white" : "bg-gray-800";

  return (
    <div className={`flex items-center justify-center min-h-screen ${bgClass} px-4`}>
      <div className={`w-full max-w-md ${cardClass} rounded-xl shadow-lg p-8`}>
        {/* Header */}
        <h2 className="text-2xl font-semibold text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Sign in to your account
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              className={`w-full px-4 py-2 rounded-lg border ${
                mode === "light"
                  ? "border-gray-300 bg-gray-50 text-gray-900"
                  : "border-gray-600 bg-gray-700 text-gray-100"
              } focus:ring-2 focus:ring-indigo-500 outline-none`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className={`w-full px-4 py-2 rounded-lg border ${
                mode === "light"
                  ? "border-gray-300 bg-gray-50 text-gray-900"
                  : "border-gray-600 bg-gray-700 text-gray-100"
              } focus:ring-2 focus:ring-indigo-500 outline-none`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
