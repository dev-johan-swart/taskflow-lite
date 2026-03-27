import { useState, useMemo, useEffect, useCallback } from "react";
import type { Task, FilterType, Priority } from "../types/task";

export interface AddTaskOptions {
  priority?: Priority;
  dueDate?: string;
  category?: string;
}

export function useTasks(initialTasks: Task[] = []) {
  const [filter, setFilter] = useState<FilterType>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window === "undefined") return initialTasks;

    const stored = localStorage.getItem("tasks");
    if (!stored) return initialTasks;

    const parsed: Task[] = JSON.parse(stored);
    return parsed.map((task) => ({
      ...task,
      createdAt: new Date(task.createdAt),
    }));
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // Derive all unique categories from current tasks
  const categories = useMemo<string[]>(() => {
    const cats = tasks
      .map((t) => t.category?.trim())
      .filter((c): c is string => Boolean(c));
    return Array.from(new Set(cats)).sort();
  }, [tasks]);

  const addTask = useCallback(
    (text: string, options: AddTaskOptions = {}) => {
      const newTask: Task = {
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: new Date(),
        priority: options.priority,
        dueDate: options.dueDate,
        category: options.category?.trim() || undefined,
      };
      setTasks((prev) => [...prev, newTask]);
    },
    []
  );

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  }, []);

  const filteredTasks = useMemo(() => {
    let result: Task[];

    switch (filter) {
      case "Active":
        result = tasks.filter((t) => !t.completed);
        break;
      case "Completed":
        result = tasks.filter((t) => t.completed);
        break;
      default:
        result = [...tasks].sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
    }

    // Apply category filter on top of status filter
    if (categoryFilter !== "All") {
      result = result.filter((t) => t.category === categoryFilter);
    }

    return result;
  }, [tasks, filter, categoryFilter]);

  return {
    tasks: filteredTasks,
    addTask,
    toggleTask,
    deleteTask,
    clearCompleted,
    filter,
    setFilter,
    categoryFilter,
    setCategoryFilter,
    categories,
  };
}