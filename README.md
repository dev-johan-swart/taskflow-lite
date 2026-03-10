TaskFlow Lite

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

Core Features
- Add a task
- Delete a task
- Toggle task completion
- Filter tasks (All / Active / Completed)

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

🧠 Engineering Principles Applied

- Single Responsibility Principle
- Separation of Concerns
- Predictable State Management
- Explicit Scope Definition
- Clean and Maintainable Code

## Documentation

- [Specification](./docs/specification.md)
- [Development Approach](./docs/development-approach.md)