// src/reduxStateManagementFiles/authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  username: string;
  token: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  userData: UserData | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserData>) => {
      state.isLoggedIn = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
