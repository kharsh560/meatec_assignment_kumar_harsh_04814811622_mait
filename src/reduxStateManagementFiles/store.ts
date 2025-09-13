// src/reduxStateManagementFiles/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import themeReducer from "./themeSlice"
import tasksReducer from "./taskSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    tasks: tasksReducer,
  },
});

export type RootAuthState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
