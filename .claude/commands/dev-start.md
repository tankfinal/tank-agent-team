---
description: 啟動 develop team（pm + be + fe）：使用者跟 PM 討論需求，PM 派工給 be / fe
---

建立 develop team。**使用者的主要對口是 `pm`**，pm 釐清需求後派工給 be / fe。

## 三位角色

- `pm`（產品經理 / Tech Lead）—— **使用者主要對話對象**
- `be`（後端工程師）—— 收 pm 派工
- `fe`（前端工程師）—— 收 pm 派工

## 啟動步驟（必須照這順序，否則不會 split pane）

### 1. 建 team

呼叫 `TeamCreate`：
- `team_name`: `dev`
- `description`: `develop team — pm + be + fe，user 跟 pm 討論需求`
- `agent_type`: `dev-lead`

### 2. 同一 turn 內三個 `Agent` 呼叫平行 spawn

每位都要帶這四個參數，**缺 `team_name` 就不會 split pane**：
- `subagent_type`: `pm` / `be` / `fe`
- `name`: `pm` / `be` / `fe`（SendMessage 用）
- `team_name`: `dev`
- `prompt`: 簡短自我介紹 + 角色職責 + 「等待派工 / 需求」

### 3. 路由規則：使用者訊息預設給 pm

team 建好後，**之後使用者每句話，預設 SendMessage 給 pm**（除非 user 明確點名 `@be` / `@fe` 想直接問工程師）。

回 user 一句話：「team 已就緒，pm / be / fe 三位 pane 已開。請告訴 pm 你想做什麼？」

## 協作流程

1. **使用者描述需求** → Lead SendMessage 給 pm
2. **pm 跟使用者來回討論釐清** → Lead 在 user ↔ pm 兩邊路由
3. **需求拍板** → pm 用 TaskCreate 建 task list、SendMessage 派工給 be / fe
4. **be / fe 開工** → 完成後 SendMessage 給 pm 回報
5. **pm 驗收** → 不對退回，對的話跟 user 回報完成

## user 點名規則（@mention）

| 指令 | 路由對象 | 用途 |
|---|---|---|
| 一般訊息 | `pm` | 預設討論需求 |
| `@pm ...` | `pm` | 顯式 |
| `@be ...` / `@fe ...` | 對應工程師 | 想跳過 pm 直接問技術問題 |
| `@be @fe ...` | be + fe（同 turn 兩個 SendMessage） | 同時問雙方 |
| 「收尾」/「彙總」 | `pm` 給 summary | 階段性總結 |

⚠️ Claude Code 原生 `@` 是引用檔案，這裡的 `@<agent-name>` 是 Lead 自訂 convention。

## Lead 的工作

- 路由 user ↔ teammate 的訊息（user 訊息預設給 pm；點名時走點名）
- 不替 user 拆 task（pm 才做這件事）
- 不替 pm 做產品決定
- 不打擾 idle 的 teammate（idle = 等指令的正常狀態）
- 階段性整理時提醒 user：要不要請 pm 收尾彙總？

## 反模式

- ❌ Agent 呼叫不帶 `team_name`（沒 pane）
- ❌ 沒先 TeamCreate 就 spawn
- ❌ 同 session 重新 TeamCreate（重用既有 team）
- ❌ user 描述需求時 Lead 直接派工給 be / fe（要先給 pm 釐清）
- ❌ pm 自己寫 code（pm 沒有 Write / Edit，要派工）
- ❌ 對 idle teammate 反覆 ping
