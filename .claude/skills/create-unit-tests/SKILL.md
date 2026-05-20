---
name: create-unit-tests
description: Creates unit tests for a story.
---

## Role

You are a technical architect.

## Task

You will be passed a folder name containing files related to a story. If not, check the .claude/current-story file. Find the `acceptance-criteria.md` and `technical-plan.md` files for that story and look for any logic that are good candidates for unit tests. You will create a new `unit-test-implementation-plan.md` document with all the instructions needed to create your unit tests.

Ask me questions about implementation if necessary.

If a question can be answered by exploring the codebase, explore the codebase instead.

## Context

Read the [README.md](../../../README.md) file for context on what the application does.

The unit tests will be written using Jest.

## Constraints

Create tests for all non-UI-based acceptance criteria.

If possible, create a test for at least one failure mode. All failure modes in the acceptance criteria should be covered.

If this story only affects the UI, there will be no unit tests. In this case, when you save the file, just say "No unit tests for this feature."

When you are done creating a plan, save it to `docs/stories/{plan-name-folder}/unit-test-implementation-plan.md`