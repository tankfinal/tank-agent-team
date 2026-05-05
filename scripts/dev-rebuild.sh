#!/usr/bin/env bash
# 重建 develop team 的 tmux session（kill 舊 + create 新）
# 用法：./scripts/dev-rebuild.sh
# 之後執行 ./scripts/dev-attach.sh 進入 lead session，並在 prompt 內輸入 /dev-start

set -euo pipefail

SESSION="tank-dev"
REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
EXPECTED_AGENTS=(pm be fe)
EXPECTED_COMMANDS=(dev-start)

# Sanity check：列出 / 驗證 .claude/agents 與 .claude/commands 下的 md
echo "→ 檢查 agent / command md（cwd: ${REPO_DIR}）"

echo "  agents（.claude/agents/*.md）："
shopt -s nullglob
agent_files=("${REPO_DIR}"/.claude/agents/*.md)
shopt -u nullglob
if [[ ${#agent_files[@]} -eq 0 ]]; then
  echo "    ⚠️  目錄為空，claude 啟動後不會載入任何 subagent"
else
  for f in "${agent_files[@]}"; do
    echo "    - $(basename "$f" .md)"
  done
fi

echo "  commands（.claude/commands/*.md）："
shopt -s nullglob
command_files=("${REPO_DIR}"/.claude/commands/*.md)
shopt -u nullglob
for f in "${command_files[@]}"; do
  echo "    - /$(basename "$f" .md)"
done

missing=0
for name in "${EXPECTED_AGENTS[@]}"; do
  if [[ ! -f "${REPO_DIR}/.claude/agents/${name}.md" ]]; then
    echo "  ⚠️  缺少預期的 agent：${name}.md"
    missing=1
  fi
done
for name in "${EXPECTED_COMMANDS[@]}"; do
  if [[ ! -f "${REPO_DIR}/.claude/commands/${name}.md" ]]; then
    echo "  ⚠️  缺少預期的 command：/${name}"
    missing=1
  fi
done
if [[ $missing -eq 0 ]]; then
  echo "  ✓ 預期的 agent / command 都在位"
fi

# 砍掉舊 session（若存在）
if tmux has-session -t "${SESSION}" 2>/dev/null; then
  echo "→ 砍掉舊的 tmux session: ${SESSION}"
  tmux kill-session -t "${SESSION}"
fi

# 建立新 session，工作目錄定位到 repo root，並啟動 claude
echo "→ 建立新 tmux session: ${SESSION}（工作目錄：${REPO_DIR}）"
tmux new-session -d -s "${SESSION}" -c "${REPO_DIR}" "claude"

cat <<EOF

✓ tmux session '${SESSION}' 已建立

下一步：
  1. ./scripts/dev-attach.sh    # 連進 lead session
  2. 在 Claude prompt 內輸入：  /dev-start

退出 tmux 但保留 session：Ctrl+B 然後 d（detach）
重新連線：./scripts/dev-attach.sh

EOF
