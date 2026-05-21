#!/usr/bin/env bash
# After a workflow skill finishes, marks its step complete in state.json.

INPUT=$(cat)
SKILL=$(echo "$INPUT" | jq -r '.tool_input.skill // empty')
[ -z "$SKILL" ] && exit 0

POINTER="${CLAUDE_PROJECT_DIR}/.claude/current-story"
[ -f "$POINTER" ] || exit 0

STORY_DIR=$(cat "$POINTER")
STATE="$STORY_DIR/state.json"
[ -f "$STATE" ] || exit 0

# Only act on skills tracked in state.json — implement-feature.md is the single source of truth
IN_STEPS=$(jq -r --arg skill "$SKILL" '.steps[] | select(.step == $skill) | .step' "$STATE")
[ -z "$IN_STEPS" ] && exit 0

# For adversarial-review: check result file before marking complete
if [ "$SKILL" = "adversarial-review" ]; then
  RESULT_FILE="$STORY_DIR/adversarial-review-result.json"
  if [ ! -f "$RESULT_FILE" ]; then
    echo "adversarial-review: result file not written — step cannot be marked complete. Re-run the step."
    exit 2
  fi
  PASS=$(jq -r '.pass' "$RESULT_FILE")
  if [ "$PASS" != "true" ]; then
    SUMMARY=$(jq -r '.summary // "Issues found — see adversarial-review.md for details."' "$RESULT_FILE")
    echo "adversarial-review blocked: $SUMMARY"
    exit 2
  fi
fi

UPDATED=$(jq --arg step "$SKILL" '
  .steps = [.steps[] | if .step == $step then .complete = true else . end]
' "$STATE")

echo "$UPDATED" > "$STATE"

ALL_DONE=$(echo "$UPDATED" | jq -r '[.steps[].complete] | all')
if [ "$ALL_DONE" = "true" ]; then
  rm "$POINTER"
fi
