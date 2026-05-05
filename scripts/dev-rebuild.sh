#!/usr/bin/env bash
# 重建 develop team 的 tmux session（kill 舊 + create 新）
# 用法：./scripts/dev-rebuild.sh
# 之後執行 ./scripts/dev-attach.sh 進入 lead session，並在 prompt 內輸入 /dev-start

set -euo pipefail

SESSION="tank-dev"
REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"

# 砍掉舊 session（若存在）
if tmux has-session -t "$SESSION" 2>/dev/null; then
  echo "→ 砍掉舊的 tmux session: $SESSION"
  tmux kill-session -t "$SESSION"
fi

# 建立新 session，工作目錄定位到 repo root，並啟動 claude
echo "→ 建立新 tmux session: $SESSION（工作目錄：$REPO_DIR）"
tmux new-session -d -s "$SESSION" -c "$REPO_DIR" "claude"

cat <<EOF

✓ tmux session '$SESSION' 已建立

下一步：
  1. ./scripts/dev-attach.sh    # 連進 lead session
  2. 在 Claude prompt 內輸入：  /dev-start

退出 tmux 但保留 session：Ctrl+B 然後 d（detach）
重新連線：./scripts/dev-attach.sh

EOF
