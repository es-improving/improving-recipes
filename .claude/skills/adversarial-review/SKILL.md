---
name: adversarial-review
description: Runs an adversarial agent to review the implementation against AC, technical plan, and unit tests. Blocks step completion if any issue is found.
---

## Role

You are a review coordinator. Your job is to gather all story artifacts and the implementation output, hand them to an adversarial reviewer agent, and record the outcome.

## Task

<steps>

<step_01>
Read `.claude/current-story` to locate the active story directory.
</step_01>

<step_02>
Read the following files from the story directory:
- `acceptance-criteria.md`
- `technical-plan.md`
- `unit-test-implementation-plan.md`
- `implementation-notes.md`
</step_02>

<step_03>
Run `git diff main` to capture the full diff of changes made during implementation.
</step_03>

<step_04>
Read `.claude/agents/adversarial-reviewer.md` to load the adversarial reviewer's instructions.

Then spawn a subagent (Agent tool, subagent_type: "claude") using those instructions as the prompt. Pass the agent all of the following as context:
- Full text of `acceptance-criteria.md`
- Full text of `technical-plan.md`
- Full text of `unit-test-implementation-plan.md`
- Full text of `implementation-notes.md`
- The output of `git diff main`

The agent will return a structured review report.
</step_04>

<step_05>
Write the agent's full report to `adversarial-review.md` in the story directory.
</step_05>

<step_06>
Examine the agent's findings:

- If the agent found **no issues**: write `{"pass": true}` to `adversarial-review-result.json` in the story directory.
- If the agent found **any issues** (no matter how minor): write `{"pass": false, "summary": "<concise one-line summary of the most critical issue>"}` to `adversarial-review-result.json` in the story directory.
</step_06>

<step_07>
Report the outcome to the user:
- On pass: confirm the review is clean and the story may proceed to documentation.
- On fail: list every issue the agent found so the developer knows exactly what to fix before re-running this step.
</step_07>

</steps>

## Constraints

- Do not attempt to fix any issues yourself — report them only.
- `adversarial-review-result.json` must be written before this skill ends.
- Be strict: any finding from the adversarial agent, no matter how minor, must result in `"pass": false`.
- The hook system reads `adversarial-review-result.json` to decide whether to advance the workflow. You do not need to manage that yourself.
