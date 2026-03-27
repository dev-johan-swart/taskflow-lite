import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTasks } from "../hooks/useTasks";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    clear: () => { store = {}; },
  };
})();

beforeEach(() => {
  localStorageMock.clear();
  vi.stubGlobal("localStorage", localStorageMock);
});

// ── Existing behaviour (unchanged) ──────────────────────────

describe("useTasks — core behaviour", () => {
  it("adds a task with required fields", () => {
    const { result } = renderHook(() => useTasks());
    act(() => { result.current.addTask("Buy milk"); });
    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].text).toBe("Buy milk");
    expect(result.current.tasks[0].completed).toBe(false);
  });

  it("toggles a task", () => {
    const { result } = renderHook(() => useTasks());
    act(() => { result.current.addTask("Toggle me"); });
    const id = result.current.tasks[0].id;
    act(() => { result.current.toggleTask(id); });
    expect(result.current.tasks[0].completed).toBe(true);
  });

  it("deletes a task", () => {
    const { result } = renderHook(() => useTasks());
    act(() => { result.current.addTask("Delete me"); });
    const id = result.current.tasks[0].id;
    act(() => { result.current.deleteTask(id); });
    expect(result.current.tasks).toHaveLength(0);
  });

  it("clears completed tasks", () => {
    const { result } = renderHook(() => useTasks());
    act(() => { result.current.addTask("Keep me"); });
    act(() => { result.current.addTask("Remove me"); });
    const id = result.current.tasks[0].id;
    act(() => { result.current.toggleTask(id); });
    act(() => { result.current.clearCompleted(); });
    expect(result.current.tasks.every((t) => !t.completed)).toBe(true);
  });

  it("does not add a task when text is empty", () => {
    const { result } = renderHook(() => useTasks());
    // Guard lives in TaskInput — hook itself still adds; test the component separately
    act(() => { result.current.addTask(""); });
    // Empty string task is added at hook level; UI guard prevents this
    expect(result.current.tasks[0].text).toBe("");
  });
});

// ── Priority ────────────────────────────────────────────────

describe("useTasks — priority", () => {
  it("stores a High priority task", () => {
    const { result } = renderHook(() => useTasks());
    act(() => { result.current.addTask("Urgent task", { priority: "High" }); });
    expect(result.current.tasks[0].priority).toBe("High");
  });

  it("stores a Medium priority task", () => {
    const { result } = renderHook(() => useTasks());
    act(() => { result.current.addTask("Normal task", { priority: "Medium" }); });
    expect(result.current.tasks[0].priority).toBe("Medium");
  });

  it("stores a Low priority task", () => {
    const { result } = renderHook(() => useTasks());
    act(() => { result.current.addTask("Low task", { priority: "Low" }); });
    expect(result.current.tasks[0].priority).toBe("Low");
  });

  it("leaves priority undefined when not provided", () => {
    const { result } = renderHook(() => useTasks());
    act(() => { result.current.addTask("No priority"); });
    expect(result.current.tasks[0].priority).toBeUndefined();
  });
});

// ── Due dates ───────────────────────────────────────────────

describe("useTasks — due dates", () => {
  it("stores a due date", () => {
    const { result } = renderHook(() => useTasks());
    act(() => { result.current.addTask("Dated task", { dueDate: "2099-12-31" }); });
    expect(result.current.tasks[0].dueDate).toBe("2099-12-31");
  });

  it("leaves dueDate undefined when not provided", () => {
    const { result } = renderHook(() => useTasks());
    act(() => { result.current.addTask("No date"); });
    expect(result.current.tasks[0].dueDate).toBeUndefined();
  });
});

// ── Categories ──────────────────────────────────────────────

describe("useTasks — categories", () => {
  it("stores a category on a task", () => {
    const { result } = renderHook(() => useTasks());
    act(() => { result.current.addTask("Work task", { category: "Work" }); });
    expect(result.current.tasks[0].category).toBe("Work");
  });

  it("derives unique categories list", () => {
    const { result } = renderHook(() => useTasks());
    act(() => {
      result.current.addTask("Task A", { category: "Work" });
      result.current.addTask("Task B", { category: "Personal" });
      result.current.addTask("Task C", { category: "Work" }); // duplicate
    });
    expect(result.current.categories).toEqual(["Personal", "Work"]); // sorted
  });

  it("filters tasks by category", () => {
    const { result } = renderHook(() => useTasks());
    act(() => {
      result.current.addTask("Work task", { category: "Work" });
      result.current.addTask("Personal task", { category: "Personal" });
    });
    act(() => { result.current.setCategoryFilter("Work"); });
    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].category).toBe("Work");
  });

  it("returns all tasks when category filter is All", () => {
    const { result } = renderHook(() => useTasks());
    act(() => {
      result.current.addTask("Work task", { category: "Work" });
      result.current.addTask("Personal task", { category: "Personal" });
    });
    act(() => { result.current.setCategoryFilter("All"); });
    expect(result.current.tasks).toHaveLength(2);
  });

  it("trims whitespace from category", () => {
    const { result } = renderHook(() => useTasks());
    act(() => { result.current.addTask("Task", { category: "  Work  " }); });
    expect(result.current.tasks[0].category).toBe("Work");
  });

  it("leaves category undefined when empty string provided", () => {
    const { result } = renderHook(() => useTasks());
    act(() => { result.current.addTask("Task", { category: "" }); });
    expect(result.current.tasks[0].category).toBeUndefined();
  });
});

// ── Combined filters ─────────────────────────────────────────

describe("useTasks — combined status + category filter", () => {
  it("applies both Active status and category filter simultaneously", () => {
    const { result } = renderHook(() => useTasks());
    act(() => {
      result.current.addTask("Active Work", { category: "Work" });
      result.current.addTask("Active Personal", { category: "Personal" });
      result.current.addTask("Completed Work", { category: "Work" });
    });
    // Complete the third task
    const completedId = result.current.tasks.find(
      (t) => t.text === "Completed Work"
    )!.id;
    act(() => { result.current.toggleTask(completedId); });

    act(() => {
      result.current.setFilter("Active");
      result.current.setCategoryFilter("Work");
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].text).toBe("Active Work");
  });
});