# Story: React Frontend Conversion

## Problem / Context
The current frontend is built with vanilla JavaScript, which is unfamiliar to many developers. Since this codebase will be used in a training context, the frontend should use React — a widely adopted framework — so that developers who review the code can more easily understand and navigate it.

## User Story
As a developer reviewing this codebase during training, I want the frontend to be built with React so that I can more easily understand the UI code using a framework I already know.

## Scope
- Convert the existing vanilla JS frontend to React with TypeScript
- Preserve all existing functionality — no new features
- Replace the current client-side build step (`tsc`) with Vite, compatible with the existing GitHub Actions deployment pipeline

**Out of scope:**
- Any new UI features or improvements beyond the current functionality
- Changes to the backend (Express API remains unchanged)

## Open Questions
None.
