Development Approach

1. Feature Breakdown
Each feature was decomposed into:
- User interaction
- Required state changes
- UI representation
- Performance implications

The goal was to isolate logic from presentation and avoid tightly coupled components. This methodology was maintained in v1.1 — each new feature was planned across all four dimensions before any code was written.

2. Scope Definition

Before implementation, explicit boundaries were defined:
- Core task functionality only
- No backend or persistence
- No authentication

This ensures focused delivery and prevents feature creep. For v1.1, new features were evaluated against this scope before inclusion — priorities, due dates, and categories all serve single-user task management without requiring infrastructure changes.

3. Component Structuring
The architecture follows:
- Single responsibility per component
- Business logic abstracted into a custom hook (useTasks)
- Presentational components remain stateless where possible

v1.1 additions followed the same pattern:

- CategoryFilter was built as a new presentational component mirroring FilterBar — same props pattern, same React.memo wrapping
- TaskInput was extended with new controlled inputs rather than creating a separate form component, as all inputs relate to a single task creation action
- TaskItem was extended to render meta information (badges) conditionally — the meta row only mounts when at least one of priority, due date, or category is present

4. Type Extension Strategy
The Task interface was extended with optional fields:
- priority?: Priority;
- dueDate?: string;
- category?: string;

Making all new fields optional was a deliberate decision to:

- Preserve backward compatibility with existing LocalStorage data
- Avoid a migration function for existing users
- Keep the type honest — not every task requires all fields

A dedicated Priority union type ("High" | "Medium" | "Low") was added to enforce valid values at the type level rather than relying on runtime validation.

5. State Management
categoryFilter was added to useTasks alongside the existing filter state, keeping all task-related state in one place.

The filtered task list computation was extended to apply both filters in sequence using a single useMemo block — status filter first, then category filter — avoiding a second derived state variable.

The categories list is derived via useMemo directly from task data, meaning it always reflects the current state without requiring manual synchronisation.

6. Performance Evaluation
Performance considerations included:
- Memoizing derived filtered task lists (extended to include category filter)
- Stabilizing callback references with useCallback for all new handlers
- Minimizing state duplication — categories derived from tasks, not stored separately
- React.memo applied to CategoryFilter and TaskItem to prevent unnecessary re-renders
- Conditional rendering of the meta row in TaskItem avoids DOM nodes for tasks with no metadata

7. Testing Philosophy
Testing prioritizes:
- User-visible behavior
- Edge case validation
- Logic correctness
- Maintainable test structure

Snapshot testing is avoided in favor of behavior-driven validation.

v1.1 test additions cover:

- Priority stored and retrieved correctly for all three levels
- Due date stored correctly
- Category stored, trimmed, and derived correctly
- Category filter narrows results accurately
- Combined status + category filtering works in tandem
- Edge cases: empty category string results in undefined, whitespace trimmed