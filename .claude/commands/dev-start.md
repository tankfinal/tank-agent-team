---
description: 啟動 develop team（be + fe），使用者扮演 PM
---

建立 agent team，使用以下 subagent 作為 teammate：

- `be`（subagent，後端工程師）
- `fe`（subagent，前端工程師）

模式：tmux split pane（已由 settings 設定）。

協作規則：
- 我（user）扮演 PM / Tech Lead，會直接派 task
- be 與 fe 平行工作，可彼此用 SendMessage 對齊 API contract
- 完成 task 主動更新 task list 狀態
- 不要替我拆 task，先建立空 task list 等我下指令

請建立 team 並回報已就緒。
