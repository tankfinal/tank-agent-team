# tmux 安裝、設定與使用速查

## 1. 安裝

### macOS

```bash
brew install tmux
tmux -V   # 確認版本，建議 ≥ 3.x
```

### Linux

```bash
# Ubuntu / Debian
sudo apt install tmux

# Fedora / RHEL
sudo dnf install tmux
```

## 2. 套用本 repo 的 tmux 設定（強烈推薦）

預設的 tmux 對新手不友善（`Ctrl+B` chord 沒有任何視覺提示）。本 repo 提供一份客製化設定，加入：

- ✓ **滑鼠模式**：點 pane 切換、滾輪捲動歷史、拖曳邊界調整大小
- ✓ **Prefix 視覺指示**：按下 `Ctrl+B` 後，狀態列右側會反白顯示 `PREFIX`
- ✓ **Pane 編號從 1 開始**（更直覺）
- ✓ **scrollback 50,000 行**
- ✓ **`Ctrl+B r` 重載設定**

### 套用方式

```bash
cp docs/tmux.conf ~/.tmux.conf
```

如果 tmux 已經在跑：

```
Ctrl+B  :  source-file ~/.tmux.conf  Enter
```

> 如果你已經有自己的 `~/.tmux.conf`，建議先備份再覆寫，或把本 repo 的內容合併進去。

## 3. 快捷鍵速查（套用本 repo 設定後）

### 滑鼠優先（推薦）

| 想做 | 怎麼做 |
|------|------|
| 切換 pane 焦點 | **直接點該 pane** |
| 捲動歷史 | **滑鼠滾輪** |
| 調整 pane 大小 | **拖曳 pane 邊界** |
| 看 prefix 觸發狀態 | 看狀態列右側 `PREFIX` 反白 |

### 必備鍵盤操作

| 操作 | 按鍵 |
|------|------|
| Detach（離開 tmux 但保留 session） | `Ctrl+B` 放開後按 `d` |
| 看當前所有 pane 編號（4 秒大字顯示） | `Ctrl+B` `q` |
| 把當前 pane 放大滿屏 / 還原 | `Ctrl+B` `z` |
| 進入捲動模式（vi keys 移動，`q` 退出） | `Ctrl+B` `[` |
| 重新載入 tmux 設定 | `Ctrl+B` `r` |

### Session 管理（在 tmux 外面）

| 操作 | 指令 |
|------|------|
| 列出所有 session | `tmux ls` |
| 連到指定 session | `tmux attach -t <name>` |
| 砍掉 session | `tmux kill-session -t <name>` |
| 砍掉所有 session（謹慎） | `tmux kill-server` |

## 4. 跟 Agent Teams 一起使用的注意事項

- 本 repo 的腳本（`scripts/*-rebuild.sh`）會自動建立有意義的 session 名稱：
  - `tank-dev` for develop team
  - `tank-consult` for consult team
- Claude Code 的 `teammateMode: tmux` 會在你建立 team 時自動 split pane
- **重要**：請用 `Ctrl+B d` 離開 session，不要 `exit`（exit 會殺掉裡面的所有進程，team 就沒了）
- 重開機後 tmux server 會死，team 也會沒 —— 需要 rebuild

## 5. 疑難排解

### Q：`Ctrl+B` 在 Warp / VS Code 終端被攔截怎麼辦？

A：tmux 是程式內部的 chord，跟 terminal app 的快捷鍵分開。如果發生衝突（例如 Warp 的某些 chord），可以在 tmux 設定改 prefix：

```
# 改成 Ctrl+A
set -g prefix C-a
unbind C-b
bind C-a send-prefix
```

### Q：tmux 字體顏色怪怪的？

A：可能是 `TERM` 設錯。建議：

```bash
# 加到 ~/.zshrc 或 ~/.bashrc
export TERM=xterm-256color
```

### Q：detach 後找不到 session？

A：可能是 tmux server 被殺掉（重開機 / `tmux kill-server`）。所有 session 都會跟著消失，需要重建。
