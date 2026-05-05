#!/usr/bin/env bash
# 連到 consult team 的 tmux session
# 用法：./scripts/consult-attach.sh

set -euo pipefail

SESSION="tank-consult"

if ! tmux has-session -t "$SESSION" 2>/dev/null; then
  echo "✗ tmux session '$SESSION' 不存在"
  echo "  先跑：./scripts/consult-rebuild.sh"
  exit 1
fi

exec tmux attach -t "$SESSION"
