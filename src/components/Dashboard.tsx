// src/components/Dashboard.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootAuthState } from "../reduxStateManagementFiles/store";
import { deleteTask, setTasks, type Task } from "../reduxStateManagementFiles/taskSlice";
import TaskForm from "./TaskForm";
import Loading from "./Loader"; // Import the Loading component

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks } = useSelector((state: RootAuthState) => state.tasks);
  const mode = useSelector((state: RootAuthState) => state.theme.mode);

  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const res = await fetch("/tasks");
      const data: Task[] = await res.json();

      // Adding a fake delay to show loading component
      await new Promise(resolve => setTimeout(resolve, 1000));

      dispatch(setTasks(data));
      setLoading(false);
    };
    fetchTasks();
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    await fetch(`/tasks/${id}`, { method: "DELETE" });
    dispatch(deleteTask(id));
  };

  const handleEdit = (task: Task) => {
    setEditTask(task);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditTask(null);
    setShowForm(true);
  };

  return (
    <div
      className={`min-h-screen ${
        mode === "light" ? "bg-gray-50 text-gray-900" : "bg-gray-950 text-gray-100"
      } p-6`}
    >
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Button onClick={handleNew}>+ New Task</Button>
      </header>

      {/* Loading State */}
      {loading ? (
        <Loading size="lg" text="Loading your tasks..." />
      ) : tasks.length === 0 ? (
        <p className="text-muted-foreground">No tasks yet. Create one!</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <Card key={task.id} className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-lg">{task.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                <Badge
                  className={`${
                        task.status === "done"
                        ? mode === "light"
                            ? "bg-green-500/20 border-2 border-green-600 text-green-800 hover:bg-green-500/30"
                            : "bg-green-500/50 border-2 border-green-700 text-white hover:bg-green-500/60"
                        : task.status === "pending"
                        ? mode === "light"
                            ? "bg-orange-500/20 border-2 border-orange-600 text-orange-800 hover:bg-orange-500/30"
                            : "bg-orange-500/50 border-2 border-orange-700 text-white hover:bg-orange-500/60"
                        : mode === "light"
                        ? "bg-purple-500/20 border-2 border-purple-600 text-purple-800 hover:bg-purple-500/30"
                        : "bg-purple-500/50 border-2 border-purple-700 text-white hover:bg-purple-500/60"
                    } rounded-md px-3 py-1 font-medium`}

                >
                  {task.status}
                </Badge>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(task)}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(task.id)}>
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Modal for TaskForm */}
      {showForm && (
        <TaskForm existingTask={editTask || undefined} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}