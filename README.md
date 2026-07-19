# Miqi Learning · 米奇学习舱

一个精致的个人学习门户：从高中数学基础一路进阶到高等数学与线性代数，配合 IELTS 8–9 每日英语训练、定时刷新的多分类资讯、数独与迷宫脑力游戏，以及清晰的任务规划与进度展示。

**在线地址：** https://salvatorebgg.github.io/miqi/

## 功能一览

| 模块 | 说明 |
| --- | --- |
| 学习驾驶舱 | 今日主攻、连续学习天数、完成度圆环、资讯速览 |
| 数学课堂 | 五个进阶阶段（高中衔接 → 预备微积分 → 一元微积分 → 多元微积分 → 线性代数），每课含直觉讲解、核心原理（KaTeX 公式）、例题、习题与解析、随堂测验、视频资料链接 |
| IELTS 英语 | 间隔重复背单词（60+ 学术词汇）、情景理解、英文新闻、论文摘要精读，目标 8–9 分 |
| 每日资讯 | AI / 金融 / 体育 / 学术 / 综合五个分类，GitHub Actions 每天四次（北京时间 00:15 / 06:15 / 12:15 / 18:15）自动抓取并提交 |
| 脑力游戏 | 数独（三档难度、提示、撤销）与迷宫（完美迷宫生成、键盘/按钮操作） |
| 规划中心 | 今日任务、分类完成度、课程路径、12 周学习热力图、薄弱点分析 |
| 界面 | 毛玻璃质感、动态水流背景、悦耳的合成按键音（可静音）、iOS 风格层次 |

## 本地开发

```bash
npm install
npm run dev          # 本地开发服务器
npm run test:run     # 单元测试（Vitest）
node --test scripts/fetch-news.test.mjs  # 资讯抓取脚本测试
npm run typecheck    # TypeScript 检查
npm run build        # 生产构建（输出 dist/）
npm run test:e2e     # Playwright 端到端测试
npm run news:refresh # 手动刷新资讯源
```

## 本地模式与云端同步

不配置任何环境变量时，应用以**本地体验模式**运行：所有学习记录保存在浏览器 `localStorage`（`miqi:` 命名空间），功能完整可用。

配置 Supabase 后可登录（邮箱/密码或 GitHub OAuth）并在多设备间同步：

1. 在 [Supabase](https://supabase.com) 创建项目，执行 `supabase/migrations/001_initial_schema.sql`（包含全部表、索引与行级安全策略）。
2. 复制 `.env.example` 为 `.env`，填入 `VITE_SUPABASE_URL` 与 `VITE_SUPABASE_PUBLISHABLE_KEY`（只使用 publishable/anon key，**绝不**在客户端使用 service-role key）。
3. Supabase 控制台 → Authentication → URL Configuration：Site URL 填 `https://salvatorebgg.github.io/miqi/`，Redirect URLs 加上 `https://salvatorebgg.github.io/miqi/**`。
4. GitHub OAuth：在 Supabase 的 GitHub provider 中填入 GitHub OAuth App 的 Client ID/Secret，回调地址使用 Supabase 提供的 `https://<project>.supabase.co/auth/v1/callback`。
5. 在 GitHub 仓库 Settings → Secrets and variables → Actions → **Variables** 中配置同名两个变量，Pages 部署时会自动注入。

同步采用本地优先策略：操作先写入本地并进入同步队列，云端写入失败不会丢失任何本地记录。

## 部署

- **CI**（`.github/workflows/ci.yml`）：推送/PR 时执行类型检查、全部测试与构建。
- **Pages**（`.github/workflows/pages.yml`）：推送到 `main` 后自动部署到 GitHub Pages。首次使用需在仓库 Settings → Pages 将 Source 设为 **GitHub Actions**。
- **资讯刷新**（`.github/workflows/refresh-news.yml`）：定时抓取 RSS 源，规范化、去重后提交 `public/data/news.json`；全部源失败时保留上次成功的内容并标记 `stale`。

## 技术栈

React 18 · TypeScript · Vite · React Router（hash 路由） · Supabase · KaTeX · Lucide · vite-plugin-pwa · Vitest · Playwright · fast-xml-parser · GitHub Actions
