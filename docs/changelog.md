# Changelog

All notable changes to TaskFlow Lite are documented here.

---

## [1.1.0] — 2026-03-27

### Added

- **Task Priorities** — `High`, `Medium`, `Low` priority levels selectable at task creation; rendered as colour-coded badges on each task item
- **Due Dates** — optional date field per task; due date displayed as a badge with formatted date string
- **Overdue Detection** — tasks past their due date that are not yet completed are automatically flagged with a visual warning indicator; completed tasks are never marked overdue
- **Categories / Tags** — free-text category field per task; stored and trimmed on save
- **Category Filter Bar** — dynamic filter buttons generated from existing task categories; only renders when at least one category exists
- **Combined Filtering** — status filter (All / Active / Completed) and category filter operate simultaneously on the same task list
- **`AddTaskOptions` interface** — named options object for `addTask` keeping the function signature clean and extensible
- **`Priority` union type** — enforces valid priority values at the TypeScript level
- **`CategoryFilter` component** — new presentational component following the same pattern as `FilterBar`
- **Expanded test suite** — unit and integration tests for all new features including edge cases and combined filter behaviour
- **`changelog.md`** — this file

### Changed

- `Task` interface extended with optional `priority`, `dueDate`, and `category` fields
- `useTasks` hook returns `categoryFilter`, `setCategoryFilter`, and `categories` in addition to existing return values
- `TaskInput` extended with priority selector, date picker, and category input
- `TaskItem` extended to render priority badge, due date badge, and category badge in a conditional meta row
- `App.tsx` updated to wire in `CategoryFilter` and pass new props; active task count replaces total task count in the header
- `FilterBar` and `TaskList` — no changes; existing components untouched
- `README.md` updated to reflect v1.1 features and versioning
- `specification.md` updated with v1.1 functional and acceptance criteria
- `development-approach.md` updated with type extension strategy, state management notes, and v1.1 testing additions

### Notes

- All new `Task` fields are optional — existing LocalStorage data from v1.0 loads without any migration
- No breaking changes to existing component interfaces

---

## [1.0.0] — Initial Release

### Added

- Add, delete, and toggle tasks
- Filter by All / Active / Completed
- Clear completed tasks
- Tasks sorted by newest first
- LocalStorage persistence
- Custom `useTasks` hook
- `useMemo` and `useCallback` performance optimisations
- `React.memo` on `TaskItem`
- Unit and integration tests with Vitest and React Testing Library
- CI pipeline with GitHub Actions
- Deployed to Netlify
