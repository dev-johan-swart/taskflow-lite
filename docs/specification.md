TaskFlow Lite – Functional Specification

1. Overview
TaskFlow Lite is a single-user task management application designed to demonstrate structured frontend architecture and disciplined scope definition. The project is versioned to show deliberate, incremental growth while maintaining architectural integrity across releases.

2. Functional Requirements
* v1.0 — Core
Users must be able to:
- Create a new task
- Mark a task as completed
- Delete an existing task
- Filter tasks by: All | Active | Completed
- Clear all completed tasks in one action
- Have tasks persist across browser sessions via LocalStorage    

* v1.1 — Feature Expansion
Users must be able to:
- Assign a priority level (High / Medium / Low) to any task at creation time
- Set an optional due date for any task
- See a clear visual indicator when a task is overdue (past due date and not completed)
- Assign a category / tag to any task (free-text input)
- Filter tasks by category using dynamically generated filter buttons
- Combine status filtering (All / Active / Completed) with category filtering simultaneously
- Use the application with existing data from v1.0 without any data migration  

3. Non-Functional Requirements
- Responsive design
- Accessible form inputs (aria labels)
- Type safety via TypeScript
- Optimized rendering performance
- Clear component separation
- Backward compatible data model — new fields are optional on the Task interface

4. Constraints
- No backend
- No authentication
- No multi-user capability
- LocalStorage as sole persistence layer
- All new Task fields must be optional to preserve forward and backward compatibility

5. Acceptance Criteria
* v1.0
- Tasks update immediately upon interaction
- Filtering updates dynamically without page reload
- No unnecessary re-renders occur during filtering
- All core features are covered by tests

* v1.1

- Priority badge renders correctly for all three levels with distinct visual styling
- Overdue tasks display a visual warning indicator when due date has passed and task is not completed
- Completed tasks never show as overdue regardless of due date
- Category filter buttons appear dynamically only when categories exist
- Category filter correctly narrows results within the active status filter
- Whitespace in category input is trimmed before storing
- Tasks created without new fields load and function correctly alongside tasks with new fields
- All new behaviour is covered by unit and integration tests