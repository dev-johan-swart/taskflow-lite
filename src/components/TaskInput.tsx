import React, { useState } from "react";

interface TaskInputProps {
  onAdd: (title: string) => void;
}

export const TaskInput: React.FC<TaskInputProps> = ({ onAdd }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value.trim());
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Add new task"
        aria-label="Task title"
      />
      <button type="submit">Add</button>
    </form>
  );
};