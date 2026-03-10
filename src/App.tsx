import React from "react";
import { useTasks } from "./hooks/useTasks";
import { TaskInput } from "./components/TaskInput";
import { TaskList } from "./components/TaskList";
import { FilterBar } from "./components/FilterBar";

export const App: React.FC = () => {
  const { setFilter, addTask, toggleTask, deleteTask, tasks, filter } = useTasks();

  return (
    <div style={{ padding: "20px", maxWidth: 500, margin: "auto" }}>
      <h1>TaskFlow Lite</h1>
      <TaskInput onAdd={addTask} />
      <FilterBar currentFilter={filter} setFilter={setFilter} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
};

export default App;