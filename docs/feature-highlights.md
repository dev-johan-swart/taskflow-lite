# TaskFlow Lite — Feature Highlights

> A living document tracking the deliberate, incremental growth of this project.
> Each section explains not just **what** was built, but **why** and **how** — the engineering decisions behind the features.

---

## What This Project Demonstrates

TaskFlow Lite is not a tutorial clone. It is a deliberately scoped, actively evolving frontend application built to showcase real engineering discipline: type safety, performance awareness, clean architecture, and controlled feature growth.

---

## v1.1 — Feature Expansion (March 2026)

### 1. Task Priorities — High / Medium / Low

**What it does:** Users can assign a priority level to any task. Each level renders as a distinct colour-coded badge on the task item.

**Engineering decisions:**
- `Priority` is defined as a TypeScript union type (`"High" | "Medium" | "Low"`) — invalid values are caught at compile time, not runtime
- Priority is an **optional field** on the `Task` interface — tasks without a priority are valid and render cleanly
- Badge styling uses semantic colour tokens (red / yellow / green) for accessibility clarity

**Skills demonstrated:** TypeScript union types, optional interface fields, conditional rendering, accessible visual design

---

### 2. Due Dates with Overdue Detection

**What it does:** Users can attach a due date to any task. Tasks past their due date that remain incomplete are automatically highlighted with an overdue warning. Completed tasks are never flagged as overdue.

**Engineering decisions:**
- Due date stored as an ISO string (`"YYYY-MM-DD"`) — avoids timezone serialisation issues that arise with `Date` objects in LocalStorage
- Overdue detection is a **pure function** — no extra state, computed only when the component renders
- The completed state explicitly gates overdue detection — the logic correctly models real-world behaviour (a done task cannot be overdue)

**Skills demonstrated:** Date handling, pure functions, conditional CSS classes, UX state modelling

---

### 3. Categories / Tags with Dynamic Filtering

**What it does:** Users can assign a free-text category to any task. A category filter bar appears automatically once categories exist, allowing tasks to be filtered by category. Category and status filters work together simultaneously.

**Engineering decisions:**
- The `categories` list is **derived via `useMemo`** from task data — there is no separate category state to keep in sync, eliminating an entire class of consistency bugs
- The `CategoryFilter` component conditionally returns `null` when no categories exist — no empty UI chrome
- Combined filtering is implemented as a **sequential reduction** in a single `useMemo` block: status filter first, category filter second — readable, predictable, and efficient
- Category input is **trimmed on save** — whitespace-only input results in `undefined`, preventing phantom categories

**Skills demonstrated:** Derived state via `useMemo`, conditional rendering, composable filter logic, input sanitisation

---

### 4. Backward Compatible Data Model

**What it does:** All v1.1 features load seamlessly alongside existing v1.0 data already stored in LocalStorage. No migration script, no breaking changes.

**Engineering decision:** Every new `Task` field is declared as optional in TypeScript (`priority?`, `dueDate?`, `category?`). This is a deliberate type design choice — the interface reflects reality: not every task has a priority or due date. Existing serialised data deserialises correctly because JSON omits undefined fields.

**Skills demonstrated:** Non-breaking API/interface design, TypeScript optional fields, forward/backward compatibility thinking

---

### 5. Expanded Test Coverage

Every new behaviour introduced in v1.1 is covered by tests:

- Priority stored correctly for all three levels and when absent
- Due date stored and left undefined when not provided
- Category stored, trimmed, and set to `undefined` for empty input
- `categories` derived list is unique and sorted
- Category filter narrows results correctly
- Combined status + category filter works in tandem
- Edge cases: completed tasks not flagged as overdue, empty category strings

**Skills demonstrated:** Test-driven thinking, edge case identification, behavior-driven test design, Vitest

---

## v1.0 — Foundation (Initial Release)

| Feature | Engineering Detail |
|---|---|
| Add / Delete / Toggle tasks | Immutable state updates via `setTasks` with array spread and filter |
| Status filtering | `useMemo` on filter + tasks dependency array |
| LocalStorage persistence | `useEffect` sync on task state change; SSR-safe `window` check |
| Custom `useTasks` hook | Full separation of business logic from UI |
| `React.memo` on TaskItem | Prevents re-render of unchanged list items |
| `useCallback` for handlers | Stable references passed to memoised children |
| Vitest + RTL testing | Behaviour-driven, no snapshot tests |
| GitHub Actions CI | Automated test run on every push |
| Netlify deployment | Live, publicly accessible demo |

---

## Architecture at a Glance

```
src/
├── types/
│   └── task.ts          # Task interface, Priority type, FilterType
├── hooks/
│   └── useTasks.ts      # All business logic — single source of truth
├── components/
│   ├── TaskInput.tsx     # Controlled form — text, priority, date, category
│   ├── TaskList.tsx      # Pure list renderer
│   ├── TaskItem.tsx      # Single task — checkbox, badges, delete
│   ├── FilterBar.tsx     # Status filter (All / Active / Completed)
│   └── CategoryFilter.tsx # Dynamic category filter buttons
└── App.tsx               # Composition root — wires hook to components
```

The hook owns all state and logic. Components are thin. This makes every layer independently testable and replaceable.

---

## What's Next

Planned additions that continue the same engineering discipline:

- Drag-and-drop reordering (exploring `@dnd-kit`)
- Edit task text in-place
- Sort options (by priority, by due date, by name)
- Dark mode with CSS custom properties

---

## Links

- **GitHub:** [github.com/dev-johan-swart/taskflow-lite](https://github.com/dev-johan-swart/taskflow-lite)
- **Live Demo:** [thunderous-yeot-60f90f.netlify.app](https://thunderous-yeot-60f90f.netlify.app/)
