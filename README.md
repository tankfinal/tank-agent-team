# tank-agent-team

Tank 個人的 Claude Code Agent Teams 模板。提供兩個預先設計好的 team，可一鍵啟動 / 重建 / 連接，並用 tmux split pane 即時觀察所有 teammate 的工作與互相對話。

## 兩個 Team

### develop team（開發任務）
- **Teammates**：`be`、`fe`
- **使用者角色**：你直接扮演 PM / Tech Lead，把需求拆 task → 派給 be、fe 平行開發
- **適用情境**：明確的開發任務、雙端同步迭代

### consult team（跨領域討論）
- **Teammates**：`be-manager`、`blockchain-expert`、`ai-researcher`
- **使用者角色**：給題目、聽討論，必要時介入
- **適用情境**：技術選型、跨領域 brainstorm、撞論點、找盲點

> 同時間只能跑其中一個 team（Claude Code 限制：1 個 lead session = 1 個 team），透過獨立 tmux session 做切換。

---

## 快速開始

### 前置需求

| 項目 | 版本 / 說明 |
|------|------|
| Claude Code | ≥ 2.1.32（Agent Teams 需要） |
| tmux | 任意版（推薦 ≥ 3.x） |
| 環境變數 `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` | 在 `~/.claude/settings.json` 開啟（repo 內 `.claude/settings.json` 也會疊加） |
| `~/.tmux.conf` | 建議套用本 repo 的 `docs/tmux.conf`（滑鼠模式 + prefix 視覺指示） |

詳細的 tmux 安裝、設定與快捷鍵說明：見 [`docs/tmux-guide.md`](docs/tmux-guide.md)。

### 啟動 develop team

```bash
./scripts/dev-rebuild.sh   # 重建（kill 舊的 + 起新的）
./scripts/dev-attach.sh    # 連到 tmux session 看 lead
```

進到 lead session 後，在 prompt 內打：

```
/dev-start
```

Claude Code 會用 `.claude/agents/be.md` 與 `fe.md` 建立 team，tmux 會自動 split 出 pane。

### 啟動 consult team

```bash
./scripts/consult-rebuild.sh
./scripts/consult-attach.sh
```

進去後：

```
/consult-start [你的討論題目]
```

---

## 腳本一覽

| 腳本 | 用途 |
|------|------|
| `scripts/dev-rebuild.sh` | 砍掉舊的 `tank-dev` tmux session，建立新的，啟動 `claude` |
| `scripts/dev-attach.sh` | 連到 `tank-dev` tmux session |
| `scripts/consult-rebuild.sh` | 砍掉舊的 `tank-consult`，重建 |
| `scripts/consult-attach.sh` | 連到 `tank-consult` |

腳本邏輯固定為「先 kill 再 create」，確保每次都是乾淨狀態。

---

## 目錄結構

```
tank-agent-team/
├── README.md                    ← 本文件
├── CLAUDE.md                    ← repo 規範（Claude Code 啟動時自動載入）
├── .claude/
│   ├── agents/                  ← 五位角色定義
│   │   ├── be.md
│   │   ├── fe.md
│   │   ├── be-manager.md
│   │   ├── blockchain-expert.md
│   │   └── ai-researcher.md
│   ├── commands/                ← slash commands
│   │   ├── dev-start.md
│   │   └── consult-start.md
│   └── settings.json            ← repo 層級設定（tmux 模式、實驗 flag）
├── scripts/                     ← 一鍵啟動 / 重建 / 連接
└── docs/
    ├── tmux-guide.md            ← tmux 安裝、教學、客製化
    └── tmux.conf                ← 推薦的 ~/.tmux.conf
```

---

## 更新 / 迭代角色

想改某位 teammate 的人格 / 專業 / 工具許可權：

1. 編輯 `.claude/agents/<name>.md`
2. 跑 `./scripts/<team>-rebuild.sh`
3. 重新 attach 進去 → `/dev-start` 或 `/consult-start`

> 已經在跑的 team **不會** picking up 修改 —— 必須 rebuild 才會吃到新版。

---

## Caveats（已知限制）

- **Lead 不可轉移**：建立 team 的那個 Claude Code 進程才是 lead。重開機後 tmux server 死掉，team 就要重建。
- **Subagent frontmatter `skills` / `mcpServers` 不繼承為 teammate**：但**全域 `~/.claude/settings.json` 配的 MCP 仍可用**。be-manager 用 atlassian MCP 沒問題（前提：你的 user-level 有設）。
- **同一 lead session 一次只能管一個 team**：要切換時務必 `clean up the team` 後才能建另一個（或直接 kill tmux session 讓腳本重建）。
- **`/resume` 無法還原 in-process teammate**：本 repo 統一用 tmux split pane，detach 後可 reattach，但別 `exit`。

---

## License

Personal use. No license attached.
