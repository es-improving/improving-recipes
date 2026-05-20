# Story System

## Overview

The story system enforces a sequential workflow for feature development. Each story moves through a fixed set of steps — in order, no skipping — using a combination of a sentinel file, a state file, and Claude Code hooks.

## Workflow Steps

```
create-story → create-ac → create-technical-plan → create-unit-tests → implement-story → adversarial-review
```

Each step is a Claude Code skill. A step cannot run until the previous one is marked complete.

## Directory Structure

```
.claude/
  current-story          # sentinel: path to the active story directory
  agents/
    adversarial-reviewer.md
  commands/
    do-feature.md        # slash command to initialize a new story
    commit-message.md
    patch-story.md
  hooks/
    enforce-skill-order.sh
    mark-step-complete.sh
    audit-log.sh
    audit-md-reads.sh
  scripts/
    new-story.sh         # creates story folder and initial state.json
  skills/
    create-story
    create-ac
    create-technical-plan
    create-unit-tests
    implement-story
    adversarial-review
  settings.json
  flow.drawio

docs/stories/
  04-recipe-ingredients/
    story.md
    acceptance-criteria.md
    technical-plan.md
    unit-test-implementation-plan.md
    implementation-notes.md
    adversarial-review.md          # written by adversarial-review step
    adversarial-review-result.json # pass/fail sentinel read by mark-step-complete.sh
    state.json                     # tracks step completion for this story
```

## How the Guardrails Work

### The Sentinel File

`.claude/current-story` is a plain text file containing the absolute path to the active story directory, e.g.:

```
/path/to/project/docs/stories/04-recipe-ingredients
```

Every hook reads this file to locate the correct `state.json`. Changing stories means updating this pointer.

### state.json

Each story directory contains a `state.json` tracking which steps have completed:

```json
{
  "steps": [
    { "step": "create-story",         "complete": true },
    { "step": "create-ac",            "complete": true },
    { "step": "create-technical-plan","complete": true }
  ]
}
```

`state.json` cannot be written directly — `settings.json` has deny rules blocking all direct tool access to it:

```json
"deny": [
  "Write(**/state.json)",
  "Edit(**/state.json)",
  "Bash(*state.json*)"
]
```

The only way `state.json` changes is through the PostToolUse hook.

### Hooks

Two hooks enforce the ordering loop. Both are triggered on every `Skill` tool call.

**`enforce-skill-order.sh`** (PreToolUse)

Runs *before* a skill executes. It:
1. Reads the skill name from the tool input.
2. Loads `state.json` via the sentinel pointer.
3. Finds the index of the requested skill in the steps array.
4. Checks whether the previous step has `"complete": true`.
5. If not, exits with code 2 — blocking the skill and surfacing an error.

**`mark-step-complete.sh`** (PostToolUse)

Runs *after* a skill finishes successfully. It:
1. Reads the skill name from the tool input (`tool_input.skill`).
2. Finds that step in `state.json`.
3. Sets `"complete": true` for that step.

This is the only write path into `state.json`.

## Starting a New Story

A new story is initialized with the `/do-feature` slash command. It:
1. Runs `.claude/scripts/new-story.sh <slug>`, which creates the story directory under `docs/stories/` and writes an initial `state.json` with all steps marked incomplete.
2. Writes the absolute path of the new story directory to `.claude/current-story` (via the Write tool).

You can also run `new-story.sh` directly, but you must update `.claude/current-story` yourself afterward — the script only creates the folder and `state.json`.

## Adding a New Step

To add a step to the workflow:

1. Add it to the `steps` array in the `new-story.sh` file in the correct position (with `"complete": false`).
2. Add the corresponding skill under `.claude/skills/`.
3. Add the skill name to the `allow` list in `settings.json` if it needs explicit permission.
