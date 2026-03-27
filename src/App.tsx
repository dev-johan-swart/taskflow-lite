import React from "react";
import { useTasks } from "./hooks/useTasks";
import { TaskInput } from "./components/TaskInput";
import { TaskList } from "./components/TaskList";
import { FilterBar } from "./components/FilterBar";
import { CategoryFilter } from "./components/Categoryfilter";

export const App: React.FC = () => {
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    clearCompleted,
    filter,
    setFilter,
    categoryFilter,
    setCategoryFilter,
    categories,
  } = useTasks();

  const activeCount = tasks.filter((t) => !t.completed).length;

  return (
    <div style={{ padding: "20px", maxWidth: 500, margin: "auto" }}>
      <h1>TaskFlow Lite</h1>
      <p>{activeCount} task{activeCount !== 1 ? "s" : ""} remaining</p>

      <TaskInput onAdd={addTask} />

      <FilterBar currentFilter={filter} setFilter={setFilter} />

      <CategoryFilter
        categories={categories}
        currentCategory={categoryFilter}
        setCategory={setCategoryFilter}
      />

      <button onClick={clearCompleted} className="btn btn-clear">
        Clear Completed
      </button>

      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
};

export default App;
