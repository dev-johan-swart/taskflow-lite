import React, { useMemo } from "react";
import type { Task } from "../types/task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const PRIORITY_CONFIG = {
  High:   { icon: "🔴", className: "priority-high" },
  Medium: { icon: "🟡", className: "priority-medium" },
  Low:    { icon: "🟢", className: "priority-low" },
} as const;

function isOverdue(dueDate: string, completed: boolean): boolean {
  if (completed) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dueDate) < today;
}

function formatDueDate(dueDate: string): string {
  const date = new Date(dueDate + "T00:00:00"); // prevent timezone shift
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export const TaskItem: React.FC<TaskItemProps> = React.memo(
  ({ task, onToggle, onDelete }) => {
    const overdue = useMemo(
      () => (task.dueDate ? isOverdue(task.dueDate, task.completed) : false),
      [task.dueDate, task.completed]
    );

    const priorityConfig = task.priority
      ? PRIORITY_CONFIG[task.priority]
      : null;

    const liClassName = [
      "task-item",
      task.completed ? "task-item--completed" : "",
      overdue ? "task-item--overdue" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <li className={liClassName}>
        {/* Checkbox + text */}
        <div className="task-item__main">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            aria-label={`Mark "${task.text}" as complete`}
            className="task-item__checkbox"
          />
          <span className="task-item__text">{task.text}</span>
          <button
            onClick={() => onDelete(task.id)}
            className="btn btn-delete"
            aria-label={`Delete "${task.text}"`}
          >
            Delete
          </button>
        </div>

        {/* Meta row — only renders if any meta exists */}
        {(priorityConfig || task.dueDate || task.category) && (
          <div className="task-item__meta">
            {priorityConfig && (
              <span
                className={`badge badge-priority ${priorityConfig.className}`}
                aria-label={`Priority: ${task.priority}`}
              >
                {priorityConfig.icon} {task.priority}
              </span>
            )}

            {task.dueDate && (
              <span
                className={`badge badge-due ${overdue ? "badge-due--overdue" : ""}`}
                aria-label={overdue ? "Overdue" : "Due date"}
              >
                {overdue ? "⚠️ Overdue · " : "📅 "}
                {formatDueDate(task.dueDate)}
              </span>
            )}

            {task.category && (
              <span className="badge badge-category" aria-label={`Category: ${task.category}`}>
                🏷️ {task.category}
              </span>
            )}
          </div>
        )}
      </li>
    );
  }
);

TaskItem.displayName = "TaskItem";
