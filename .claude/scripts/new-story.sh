#!/usr/bin/env bash
set -euo pipefail

SLUG="${1:?Usage: new-story.sh <folder-name-without-number>}"
STORIES_DIR="docs/stories"

LAST=$(ls "$STORIES_DIR" | grep -E '^[0-9]+' | sort | tail -1 | grep -oE '^[0-9]+' || echo "00")
NEXT=$(printf "%02d" $((10#$LAST + 1)))
FOLDER="${STORIES_DIR}/${NEXT}-${SLUG}"

mkdir -p "$FOLDER"

cat > "$FOLDER/state.json" << 'EOF'
{
    "steps": [
        { "step": "create-story", "complete": false },
        { "step": "create-ac", "complete": false },
        { "step": "create-technical-plan", "complete": false },
        { "step": "create-unit-tests", "complete": false },
        { "step": "implement-story", "complete": false },
        { "step": "adversarial-review", "complete": false }
    ]
}
EOF

echo "$FOLDER"
