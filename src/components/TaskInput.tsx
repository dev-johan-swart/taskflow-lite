import React, { useState, useCallback } from "react";
import type { Priority } from "../types/task";
import type { AddTaskOptions } from "../hooks/useTasks";

interface TaskInputProps {
  onAdd: (text: string, options: AddTaskOptions) => void;
}

export const TaskInput: React.FC<TaskInputProps> = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority | "">("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = text.trim();
      if (!trimmed) return;

      onAdd(trimmed, {
        priority: priority || undefined,
        dueDate: dueDate || undefined,
        category: category || undefined,
      });

      setText("");
      setPriority("");
      setDueDate("");
      setCategory("");
    },
    [text, priority, dueDate, category, onAdd]
  );

  return (
    <form onSubmit={handleSubmit} className="task-input-form">
      {/* Main text row */}
      <div className="task-input-row">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task…"
          className="task-text-input"
          aria-label="New task text"
        />
        <button type="submit" className="btn btn-add" disabled={!text.trim()}>
          Add
        </button>
      </div>

      {/* Options row */}
      <div className="task-options-row">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority | "")}
          className="task-select priority-select"
          aria-label="Task priority"
        >
          <option value="">Priority</option>
          <option value="High">🔴 High</option>
          <option value="Medium">🟡 Medium</option>
          <option value="Low">🟢 Low</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="task-date-input"
          aria-label="Due date"
        />

        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category (optional)"
          className="task-category-input"
          aria-label="Task category"
        />
      </div>
    </form>
  );
};
