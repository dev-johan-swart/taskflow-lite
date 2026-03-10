Development Approach

1. Feature Breakdown
Each feature was decomposed into:
- User interaction
- Required state changes
- UI representation
- Performance implications

The goal was to isolate logic from presentation and avoid tightly coupled components.

2. Scope Definition

Before implementation, explicit boundaries were defined:
- Core task functionality only
- No backend or persistence
- No authentication

This ensures focused delivery and prevents feature creep.

3. Component Structuring
The architecture follows:
- Single responsibility per component
- Business logic abstracted into a custom hook (useTasks)
- Presentational components remain stateless where possible

4. Performance Evaluation
Performance considerations included:
- Memoizing derived filtered task lists
- Stabilizing callback references
- Minimizing state duplication
- Avoiding unnecessary re-renders

5. Testing Philosophy
Testing prioritizes:
- User-visible behavior
- Edge case validation
- Logic correctness
- Maintainable test structure

Snapshot testing is avoided in favor of behavior-driven validation.