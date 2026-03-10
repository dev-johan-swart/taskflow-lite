import React from "react";
import type { Task } from "../types/task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => (
  <li>
    <input
      type="checkbox"
      checked={task.completed}
      onChange={() => onToggle(task.id)}
      aria-label={`Mark ${task.text} as complete`}
    />
    <span style={{ textDecoration: task.completed ? "line-through" : undefined }}>
      {task.text}
    </span>
    <button onClick={() => onDelete(task.id)}>Delete</button>
  </li>
);