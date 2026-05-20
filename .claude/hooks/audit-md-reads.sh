#!/bin/bash
# Appends an audit entry when the Read tool reads a markdown (.md) file

INPUT=$(cat)

FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // ""')
RELATIVE_FILE="${FILE#"${CLAUDE_PROJECT_DIR}/"}"

[[ "$FILE" == *.md ]] || exit 0

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // "unknown"')

jq -nc \
  --arg ts "$TIMESTAMP" \
  --arg sid "$SESSION_ID" \
  --arg tool "Read" \
  --arg file "$RELATIVE_FILE" \
  '{"timestamp":$ts,"session_id":$sid,"tool":$tool,"file":$file}' \
  >> "${CLAUDE_PROJECT_DIR}/.audit-logs/$(date -u +"%Y-%m-%d")-audit-log.jsonl"
