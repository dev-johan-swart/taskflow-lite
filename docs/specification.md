TaskFlow Lite – Functional Specification

1. Overview
TaskFlow Lite is a single-user task management application designed to demonstrate structured frontend architecture and disciplined scope definition.

2. Functional Requirements
- Users must be able to:
- Create a new task
- Mark a task as completed
- Delete an existing task
- Filter tasks by:
  - All
  - Active
  - Completed

3. Non-Functional Requirements
- Responsive design
- Accessible form inputs (aria labels)
- Type safety via TypeScript
- Optimized rendering performance
- Clear component separation

4. Constraints
- No backend
- No persistent storage
- No authentication
- No multi-user capability

5. Acceptance Criteria
- Tasks update immediately upon interaction
- Filtering updates dynamically without page reload
- No unnecessary re-renders occur during filtering
- All core features are covered by tests