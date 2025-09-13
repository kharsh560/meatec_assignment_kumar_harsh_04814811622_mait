// src/reduxStateManagementFiles/tasksSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "done";
};

type TasksState = {
  tasks: Task[];
};

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.map((t) =>
        t.id === action.payload.id ? action.payload : t
      );
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
