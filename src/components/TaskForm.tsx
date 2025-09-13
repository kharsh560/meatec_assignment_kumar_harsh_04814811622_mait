// src/components/TaskForm.tsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootAuthState } from "../reduxStateManagementFiles/store";
import { addTask, updateTask, type Task } from "../reduxStateManagementFiles/taskSlice";

type Props = {
  existingTask?: Task;
  onClose: () => void;
};

export default function TaskForm({ existingTask, onClose }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const mode = useSelector((state: RootAuthState) => state.theme.mode);

  const [title, setTitle] = useState(existingTask?.title || "");
  const [description, setDescription] = useState(existingTask?.description || "");
  const [status, setStatus] = useState<Task["status"]>(existingTask?.status || "pending");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (existingTask) {
      const res = await fetch(`/tasks/${existingTask.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, status }),
      });
      const updated = await res.json();
      dispatch(updateTask(updated));
    } else {
      const res = await fetch("/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, status }),
      });
      const newTask = await res.json();
      dispatch(addTask(newTask));
    }
    onClose();
  };

  const cardClass = mode === "light" ? "bg-white" : "bg-gray-800";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-md ${cardClass} p-6 rounded-lg shadow-lg`}
      >
        <h2 className="text-xl font-semibold mb-4">
          {existingTask ? "Edit Task" : "New Task"}
        </h2>
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="w-full p-2 border rounded mb-3"
          value={status}
          onChange={(e) => setStatus(e.target.value as Task["status"])}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-3 py-1 bg-gray-300 rounded">
            Cancel
          </button>
          <button type="submit" className="px-3 py-1 bg-indigo-600 text-white rounded">
            {existingTask ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
