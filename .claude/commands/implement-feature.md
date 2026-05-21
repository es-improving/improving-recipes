Continue the technical implementation workflow for the current story.

Read `.claude/current-story` to find the active story directory, then read its `state.json` to see which steps are complete. Start from the first incomplete step among:

- create-technical-plan
- create-unit-tests
- implement-story
- adversarial-review

Call each skill in order. Skip any already marked complete in `state.json`. The enforce-skill-order hook will block any skill whose predecessor is not yet complete.

**Never write to `state.json` yourself.** The `mark-step-complete.sh` PostToolUse hook updates it automatically after each skill finishes. Manual edits will corrupt the workflow state.
