import React from "react";
import { useTasks } from "./hooks/useTasks";
import { TaskInput } from "./components/TaskInput";
import { TaskList } from "./components/TaskList";
import { FilterBar } from "./components/FilterBar";

export const App: React.FC = () => {
  const { setFilter, addTask, toggleTask, deleteTask, clearCompleted, tasks, filter } = useTasks();

  return (
    <div style={{ padding: "20px", maxWidth: 500, margin: "auto" }}>
      <h1>TaskFlow Lite</h1>
      <p>{tasks.length} tasks</p>
      <TaskInput onAdd={addTask} />
      <FilterBar currentFilter={filter} setFilter={setFilter} />
      <button onClick={clearCompleted}>Clear Completed</button>
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
};

export default App;