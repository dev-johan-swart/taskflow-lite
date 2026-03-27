TaskFlow Lite

[![CI](https://github.com/dev-johan-swart/taskflow-lite/actions/workflows/ci.yml/badge.svg)](https://github.com/dev-johan-swart/taskflow-lite/actions/workflows/ci.yml)

A structured task management application built with React, TypeScript, and Vite.

📌 Objective

This project demonstrates structured feature planning, scope control, performance awareness, and clean component architecture in a frontend application.

It is intentionally scoped as a single-user application to focus on engineering discipline rather than feature complexity.

🛠 Tech Stack

- React
- TypeScript
- Vite
- Vitest
- React Testing Library

🏗 Architecture Overview

The application follows a responsibility-driven component structure:
- UI components are separated from business logic
- State management is abstracted into a custom hook (useTasks)
- Filtering logic is memoized to prevent unnecessary re-renders
- Components are optimized using React.memo
- Derived state is minimized to avoid duplication

📋 Feature Specification

v1.0 — Core Features
- Add a task
- Delete a task
- Toggle task completion
- Filter tasks (All / Active / Completed)
- Clear completed tasks
- Tasks sorted by newest
- LocalStorage persistence
- Custom React hook architecture
- Unit tested with Vitest
- CI tested with GitHub Actions

v1.1 — Feature Expansion ✨

- Task Priorities — assign High, Medium, or Low priority with colour-coded badges
- Due Dates — set a due date per task with automatic overdue detection and visual highlighting
- Categories / Tags — organise tasks into custom categories with dynamic filter buttons
- Combined Filtering — status filter and category filter work together simultaneously
- Expanded Test Coverage — new unit and integration tests covering all v1.1 features
- Backward Compatible — all new fields are optional; existing localStorage data loads without migration

Out of Scope
- Authentication
- Backend persistence
- Database
- Multi-user support

Explicit scope boundaries prevent feature creep and keep the implementation focused.

⚡ Performance Strategy

- useMemo for filtered task computation
- useCallback for stable handler references
- React.memo for list item optimization
- Derived categories list computed from task data — no extra state
- Stable keys for mapped lists
- Avoidance of unnecessary re-renders

🧪 Testing Strategy

The project includes both unit and integration testing:
- Unit tests for business logic
- Integration tests for user interactions
- Edge case validation (empty input, invalid state transitions)

Testing focuses on user behavior rather than implementation details to ensure maintainable tests.

📈 Scalability Considerations

If extended, the architecture would evolve to include:
- Context or state management library
- Persistent storage layer
- Backend API integration
- Pagination or virtualization for large datasets
- Drag-and-drop task reordering

🧠 Engineering Principles Applied

- Single Responsibility Principle
- Separation of Concerns
- Predictable State Management
- Explicit Scope Definition
- Backward Compatible Type Extension
- Clean and Maintainable Code

## Documentation

- [Specification](./docs/specification.md)
- [Development Approach](./docs/development-approach.md)

🔗 Live Demo
https://thunderous-yeot-60f90f.netlify.app/