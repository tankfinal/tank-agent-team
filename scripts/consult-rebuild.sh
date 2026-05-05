#!/usr/bin/env bash
# 重建 consult team 的 tmux session（kill 舊 + create 新）
# 用法：./scripts/consult-rebuild.sh
# 之後執行 ./scripts/consult-attach.sh 進入 lead session，並在 prompt 內輸入 /consult-start <題目>

set -euo pipefail

SESSION="tank-consult"
REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"

if tmux has-session -t "$SESSION" 2>/dev/null; then
  echo "→ 砍掉舊的 tmux session: $SESSION"
  tmux kill-session -t "$SESSION"
fi

echo "→ 建立新 tmux session: $SESSION（工作目錄：$REPO_DIR）"
tmux new-session -d -s "$SESSION" -c "$REPO_DIR" "claude"

cat <<EOF

✓ tmux session '$SESSION' 已建立

下一步：
  1. ./scripts/consult-attach.sh                       # 連進 lead session
  2. 在 Claude prompt 內輸入：  /consult-start [你的題目]

退出 tmux 但保留 session：Ctrl+B 然後 d（detach）
重新連線：./scripts/consult-attach.sh

EOF
