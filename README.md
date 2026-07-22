# Miqi Learning

个人学习平台：高中数学 → 高数 → 线性代数，IELTS 英语训练，8 款脑力游戏，定时资讯刷新，任务规划与进度追踪。

**在线地址：** https://salvatorebgg.github.io/miqi/

**GitHub Actions：** https://github.com/Salvatorebgg/miqi/actions

## 功能一览

| 模块 | 说明 |
| --- | --- |
| 首页 | 今日任务、连续天数、完成度圆环、分类进度、课程路径、热力图、薄弱点、资讯速览 |
| 数学 | 五个进阶阶段（高中衔接→预备微积分→一元微积分→多元微积分→线性代数），全部课程直接开放，每课含原理讲解（KaTeX）、交互式函数图像、详细讲义、公式卡片、常见误区、习题与解析、测验、视频资料 |
| 英语 | 间隔重复背单词、情景理解、英文新闻、论文摘要精读 |
| 资讯 | AI / 金融 / 体育 / 学术 / 综合，GitHub Actions 定时自动抓取 |
| 游戏 | 8 款脑力游戏：数独（专家模式）、迷宫、24点、记忆翻牌、滑块拼图、汉诺塔、心算竞赛、西蒙记忆 |
| 界面 | 薄荷绿毛玻璃质感、动态水流背景、亮/暗主题切换、番茄钟专注计时、合成按键音 |

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
