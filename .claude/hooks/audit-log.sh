#!/bin/bash
# .claude/hooks/audit-log.sh
# Appends structured entry to audit log after every Bash and Edit|Write call
# Input arrives on stdin as JSON from Claude Code

INPUT=$(cat)

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // "unknown"')
TOOL=$(echo "$INPUT" | jq -r '.tool_name // "unknown"')
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // ""')
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // ""')
EXIT_CODE=$(echo "$INPUT" | jq -r '.tool_response.exit_code // ""')
SKILL=$(echo "$INPUT" | jq -r '.tool_input.skill // ""')

# Append structured JSONL entry - append-only, never truncate
jq -nc \
  --arg ts "$TIMESTAMP" \
  --arg sid "$SESSION_ID" \
  --arg tool "$TOOL" \
  --arg cmd "$COMMAND" \
  --arg file "$FILE" \
  --arg exit "$EXIT_CODE" \
  --arg skill "$SKILL" \
  '{"timestamp":$ts,"session_id":$sid,"tool":$tool,"command":$cmd,"file":$file,"exit_code":$exit,"skill":$skill}' \
  >> "${CLAUDE_PROJECT_DIR}/.audit-logs/$(date -u +"%Y-%m-%d")-audit-log.jsonl"
