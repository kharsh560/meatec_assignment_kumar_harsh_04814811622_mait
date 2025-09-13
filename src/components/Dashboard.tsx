// src/components/Dashboard.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootAuthState } from "../reduxStateManagementFiles/store";
import { deleteTask, setTasks, type Task } from "../reduxStateManagementFiles/taskSlice";
import TaskForm from "./TaskForm";

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

  const bgClass = mode === "light" ? "bg-gray-50 text-gray-900" : "bg-gray-900 text-gray-100";
  const cardClass = mode === "light" ? "bg-white" : "bg-gray-800";

  return (
    <div className={`min-h-screen ${bgClass} p-6`}>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex gap-3">
          <button
            onClick={handleNew}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            + New Task
          </button>
        </div>
      </header>

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet. Create one!</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <div key={task.id} className={`p-4 rounded-lg shadow ${cardClass}`}>
              <h2 className="font-semibold">{task.title}</h2>
              <p className="text-sm text-gray-400">{task.description}</p>
              <span
                className={`inline-block mt-2 text-xs px-2 py-1 rounded ${
                  task.status === "done"
                    ? "bg-green-100 text-green-700"
                    : task.status === "in-progress"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {task.status}
              </span>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="px-3 py-1 bg-indigo-500 text-white rounded text-sm hover:bg-indigo-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <TaskForm
          existingTask={editTask || undefined}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
