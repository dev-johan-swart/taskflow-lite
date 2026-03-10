import { beforeEach } from "vitest";
import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTasks } from "../hooks/useTasks";

beforeEach(() => {
  localStorage.clear();
});

describe("useTasks hook", () => {
  it("adds a task", () => {
    const { result } = renderHook(() => useTasks());
    act(() => result.current.addTask("Test task"));
    expect(result.current.tasks.length).toBe(1);
    expect(result.current.tasks[0].text).toBe("Test task"); // fixed key
  });

  it("toggles a task", () => {
    const { result } = renderHook(() => useTasks([{ id: "1", text: "T", completed: false, createdAt: new Date() }]));
    act(() => result.current.toggleTask("1"));
    expect(result.current.tasks[0].completed).toBe(true);
  });

  it("deletes a task", () => {
    const { result } = renderHook(() => useTasks([{ id: "1", text: "T", completed: false, createdAt: new Date() }]));
    act(() => result.current.deleteTask("1"));
    expect(result.current.tasks.length).toBe(0);
  });

  it("filters completed tasks", () => {
    const { result } = renderHook(() =>
      useTasks([
        { id: "1", text: "A", completed: true, createdAt: new Date() },
        { id: "2", text: "B", completed: false, createdAt: new Date() },
      ])
    );
  
    act(() => result.current.setFilter("Completed"));
  
    expect(result.current.tasks.length).toBe(1);
    expect(result.current.tasks[0].completed).toBe(true);
  });
});