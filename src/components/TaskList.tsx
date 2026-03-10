import React from "react";
import type { Task } from "../types/task";

import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete }) => {
  if (!tasks.length) return <p>No tasks found.</p>;
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
};