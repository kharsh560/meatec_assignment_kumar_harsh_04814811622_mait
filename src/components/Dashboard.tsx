// src/components/Dashboard.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootAuthState } from "../reduxStateManagementFiles/store";
import { deleteTask, setTasks, type Task } from "../reduxStateManagementFiles/taskSlice";
import TaskForm from "./TaskForm";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

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

      {/* Tasks */}
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-6 w-2/3 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </Card>
          ))}
        </div>
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
                <p className="text-sm text-muted-foreground">{task.description}</p>
                <Badge
                   variant={
                    task.status === "done"
                        ? "default"      // use default for success
                        : task.status === "in-progress"
                        ? "destructive"  // reuse destructive or outline for warning
                        : "secondary"
                    }
                  className="mt-3"
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

      {/* Modal for TaskForm (old inline approach) */}
      {showForm && (
        <TaskForm existingTask={editTask || undefined} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}
