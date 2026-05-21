#!/usr/bin/env bash
set -euo pipefail

input=$(cat)
file_path=$(echo "$input" | jq -r '.tool_input.file_path // ""')

secret_patterns=(
    '(^|/)\.env(\.|$)'
    '(^|/)\.env$'
    'credentials(\.json)?$'
    '(id_rsa|id_ed25519|id_ecdsa|id_dsa)(\.pub)?$'
    '\.pem$'
    '\.key$'
    '\.p12$'
    '\.pfx$'
    'secrets?\.(json|yaml|yml|toml|env)$'
    '(^|/)\.aws/credentials$'
    '(^|/)\.ssh/'
    '(^|/)\.netrc$'
    '(^|/)\.pgpass$'
    'auth\.json$'
    'keystore\.'
    'serviceaccount.*\.json$'
)

for pattern in "${secret_patterns[@]}"; do
    if echo "$file_path" | grep -qiE "$pattern"; then
        jq -n --arg path "$file_path" '{
            "decision": "block",
            "reason": ("Blocked: \"" + $path + "\" matches a secret file pattern. Reading secret files is not allowed.")
        }'
        exit 0
    fi
done
