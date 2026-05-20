#!/usr/bin/env bash
# Blocks workflow skills from running out of order.
# Reads the current story pointer from /tmp/claude-current-story,
# loads state.json, and exits 2 if the prior step isn't complete.

INPUT=$(cat)
SKILL=$(echo "$INPUT" | jq -r '.tool_input.skill // empty')
[ -z "$SKILL" ] && exit 0

POINTER="${CLAUDE_PROJECT_DIR}/.claude/current-story"
[ -f "$POINTER" ] || exit 0

STORY_DIR=$(cat "$POINTER")
STATE="$STORY_DIR/state.json"
[ -f "$STATE" ] || exit 0

# Derive order from state.json — do-feature.md is the single source of truth
IDX=$(jq -r --arg skill "$SKILL" '.steps | to_entries[] | select(.value.step == $skill) | .key' "$STATE")

# Not a tracked skill — allow it
[ -z "$IDX" ] && exit 0

# First step is always allowed
[ "$IDX" -eq 0 ] && exit 0

COMPLETE=$(jq -r --argjson idx "$IDX" '.steps[$idx - 1].complete' "$STATE")

if [ "$COMPLETE" != "true" ]; then
  PREV=$(jq -r --argjson idx "$IDX" '.steps[$idx - 1].step' "$STATE")
  echo "Cannot run '$SKILL': '$PREV' is not marked complete yet. Check $STATE."
  exit 2
fi
