// src/components/TaskForm.tsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../reduxStateManagementFiles/store";
import { addTask, updateTask, type Task } from "../reduxStateManagementFiles/taskSlice";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type Props = {
  existingTask?: Task;
  onClose: () => void;
};

export default function TaskForm({ existingTask, onClose }: Props) {
  const dispatch = useDispatch<AppDispatch>();

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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{existingTask ? "Edit Task" : "New Task"}</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Select value={status} onValueChange={(val) => setStatus(val as Task["status"])}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {existingTask ? "Update" : "Create"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
