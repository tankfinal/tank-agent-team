#!/usr/bin/env bash
# 重建 develop team 的 tmux session（kill 舊 + create 新）
# 用法：./scripts/dev-rebuild.sh
# 自動帶 prompts/dev-lead.md 啟動 Lead，attach 後三個 pane 已就緒

set -euo pipefail

SESSION="tank-dev"
REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PROMPT_FILE="${REPO_DIR}/prompts/dev-lead.md"
EXPECTED_AGENTS=(pm be fe)

echo "→ 檢查 agent md 與 lead prompt（cwd: ${REPO_DIR}）"

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

missing=0
for name in "${EXPECTED_AGENTS[@]}"; do
  if [[ ! -f "${REPO_DIR}/.claude/agents/${name}.md" ]]; then
    echo "  ⚠️  缺少預期的 agent：${name}.md"
    missing=1
  fi
done
if [[ ! -f "${PROMPT_FILE}" ]]; then
  echo "  ⚠️  缺少 lead prompt：${PROMPT_FILE}"
  missing=1
fi
if [[ $missing -eq 0 ]]; then
  echo "  ✓ 預期的 agent / prompt 都在位"
fi

if tmux has-session -t "${SESSION}" 2>/dev/null; then
  echo "→ 砍掉舊的 tmux session: ${SESSION}"
  tmux kill-session -t "${SESSION}"
fi

echo "→ 建立新 tmux session: ${SESSION}（工作目錄：${REPO_DIR}）"
echo "  自動把 ${PROMPT_FILE##*/} 當 initial prompt 餵給 claude"

# 讀檔內容並 shell-quote，作為 claude 的第一個 user message
PROMPT_CONTENT="$(cat "${PROMPT_FILE}")"
QUOTED_PROMPT="$(printf '%q' "${PROMPT_CONTENT}")"
tmux new-session -d -s "${SESSION}" -c "${REPO_DIR}" "claude ${QUOTED_PROMPT}"

cat <<EOF

✓ tmux session '${SESSION}' 已建立並自動啟動 Lead

下一步：
  1. ./scripts/dev-attach.sh    # 連進 lead session（三個 pane 已開）
  2. 描述需求給 pm（或 @be / @fe 直接問工程師）

退出 tmux 但保留 session：Ctrl+B 然後 d（detach）
重新連線：./scripts/dev-attach.sh

EOF
