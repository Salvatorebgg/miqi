import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './AppShell'

type PageProps = {
  eyebrow: string
  title: string
  description: string
}

function Page({ eyebrow, title, description }: PageProps) {
  return (
    <section className="page-panel glass" aria-labelledby="page-title">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id="page-title">{title}</h2>
      <p>{description}</p>
    </section>
  )
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Page eyebrow="今日学习" title="从此刻开始，积累每一步" description="选择一项学习任务，保持专注，也记得留一点空间给好奇心。" />} />
        <Route path="math" element={<Page eyebrow="数学课堂" title="让思路清晰可见" description="课程、练习与错题整理将在这里汇合。" />} />
        <Route path="english" element={<Page eyebrow="IELTS 英语" title="每天多表达一点" description="围绕听、说、读、写建立稳定的练习节奏。" />} />
        <Route path="news" element={<Page eyebrow="每日资讯" title="看见更大的世界" description="用适合学习的方式阅读与理解当天资讯。" />} />
        <Route path="games" element={<Page eyebrow="脑力游戏" title="给大脑一次轻快挑战" description="短时练习，让注意力与思考保持活跃。" />} />
        <Route path="planner" element={<Page eyebrow="规划中心" title="把目标放进日程" description="整理任务、节奏与阶段性目标。" />} />
        <Route path="account" element={<Page eyebrow="个人中心" title="你的学习档案" description="管理个人资料与学习偏好。" />} />
        <Route path="auth" element={<Page eyebrow="欢迎回来" title="登录 Miqi Learning" description="登录后同步你的学习进度。" />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
