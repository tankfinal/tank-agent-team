# tank-agent-team — Claude Code 規範

這個 repo 是 agent team 模板。你（Claude Code）在此啟動時請知道：

## 主要用途

- 提供兩組 agent team：`develop`（be + fe）和 `consult`（be-manager + blockchain-expert + ai-researcher）
- 使用者透過 `scripts/*-rebuild.sh` 重建 team、`scripts/*-attach.sh` 連入觀察
- Slash commands 在 `.claude/commands/` 提供一鍵啟動

## 角色協調原則

### develop team（mode B：使用者當 PM）
- 使用者扮演 PM / Tech Lead
- be 和 fe 是平行 teammate，無上下層關係
- Lead（你）不要替使用者拆 task；等使用者派
- be 和 fe 可以彼此用 SendMessage 對齊介面、API 規格

### consult team（討論優先）
- 三位 teammate **互相對話**為主，不是平行做事
- Be-manager 是 BE 角度（架構、可擴展性、人力資源）
- Blockchain-expert 是鏈上 / Web3 角度
- Ai-researcher 是 AI / ML / 最新研究角度
- 鼓勵彼此提問、辯論、補充盲點
- 結束時請每位各給一段最終結論

## 風格

- 回答用繁體中文（除非使用者切換語言）
- 直接給結論再給理由，不要 hedge
- 涉及程式碼時給最小可行範例

## 不要做的事

- 不要 `git push` 除非使用者明確要求
- 不要修改 `~/.claude/` 下的個人設定
- 不要在不問的情況下安裝新套件 / 工具
