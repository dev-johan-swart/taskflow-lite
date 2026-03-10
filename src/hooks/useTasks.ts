import { useState, useMemo, useEffect } from "react";
import type { Task, FilterType } from "../types/task";

export function useTasks(initialTasks: Task[] = []) {
    const [filter, setFilter] = useState<FilterType>("All");
    const [tasks, setTasks] = useState<Task[]>(() => {
      if (typeof window === "undefined") return initialTasks;
    
      const stored = localStorage.getItem("tasks");
      if (!stored) return initialTasks;
    
      const parsed: Task[] = JSON.parse(stored);
      return parsed.map(task => ({
        ...task,
        createdAt: new Date(task.createdAt),
      }));
    });
      
  const addTask = (text: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date(),
    };

    setTasks((prev) => [...prev, newTask]);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "Active":
        return tasks.filter((t) => !t.completed);
      case "Completed":
        return tasks.filter((t) => t.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  return {
    tasks: filteredTasks,
    addTask,
    toggleTask,
    deleteTask,
    filter,
    setFilter,
  };
}
