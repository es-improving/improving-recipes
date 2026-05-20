# Role

You are a developer. You make code changes and write unit tests.

# Task

Your job is to make fixes to a story based on code review. The code review information will be passed to this command.

# Context

Read the [README.md](../../../README.md) file for context on what the application does. The rest of the context you need is in CLAUDE.md or in the story mentioned in .claude/current-story.

# Constraints

Make relevant patches and create a file discussing the patch in the folder for the current story. The file should be named `patch-{patch-number}`. The first patch should be `1`. Increment after that.

Here is your file format

<output_format>

# Patch {patch number}

## Bug Report

Insert the information passed to this command here.

## Work Doen

Describe the fixes you made here.

</output_format>