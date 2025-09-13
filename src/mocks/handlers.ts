// src/mocks/handlers.ts
import { http, HttpResponse } from "msw";

// --- Types ---
type TaskStatus = "pending" | "in-progress" | "completed";

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface CreateTaskRequest {
  title: string;
  description: string;
  status: TaskStatus;
}

interface UpdateTaskRequest extends Partial<CreateTaskRequest> {}

// --- Mock Data ---
let tasks: Task[] = [
  { id: "1", title: "Learn React", description: "Practice hooks and context", status: "pending" },
  { id: "2", title: "Build Task App", description: "Use MSW and Redux Toolkit", status: "in-progress" },
];

const fakeUser: LoginRequest = { username: "test", password: "test123" };
const fakeJWT = "fake-jwt-token";

// --- Handlers ---
export const handlers = [
  // Login
  http.post("/login", async ({ request }) => {
    const { username, password } = (await request.json()) as LoginRequest;
    if (username === fakeUser.username && password === fakeUser.password) {
      return HttpResponse.json({ token: fakeJWT }, { status: 200 });
    }
    return HttpResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }),

  // Get tasks
  http.get("/tasks", () => {
    return HttpResponse.json(tasks, { status: 200 });
  }),

  // Add new task
  http.post("/tasks", async ({ request }) => {
    const body = (await request.json()) as CreateTaskRequest;
    const newTask: Task = { id: Date.now().toString(), ...body };
    tasks.push(newTask);
    return HttpResponse.json(newTask, { status: 201 });
  }),

  // Update task
  http.put("/tasks/:id", async ({ params, request }) => {
    const { id } = params as { id: string };
    const body = (await request.json()) as UpdateTaskRequest;
    tasks = tasks.map((t) => (t.id === id ? { ...t, ...body } : t));
    const updatedTask = tasks.find((t) => t.id === id);
    return HttpResponse.json(updatedTask, { status: 200 });
  }),

  // Delete task
  http.delete("/tasks/:id", ({ params }) => {
    const { id } = params as { id: string };
    tasks = tasks.filter((t) => t.id !== id);
    return HttpResponse.json({ message: "Task deleted" }, { status: 200 });
  }),
];
