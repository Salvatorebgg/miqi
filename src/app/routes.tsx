import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './AppShell'
import { AuthPage } from '../features/auth/AuthPage'
import { AccountPage } from '../features/account/AccountPage'
import { MathPage } from '../features/math/MathPage'
import { LessonPage } from '../features/math/LessonPage'
import { EnglishPage } from '../features/english/EnglishPage'
import { NewsPage } from '../features/news/NewsPage'
import { GamesPage } from '../features/games/GamesPage'

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
        <Route path="math" element={<MathPage />} />
        <Route path="math/lesson/:lessonId" element={<LessonPage />} />
        <Route path="english" element={<EnglishPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="games" element={<GamesPage />} />
        <Route path="planner" element={<Page eyebrow="规划中心" title="把目标放进日程" description="整理任务、节奏与阶段性目标。" />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="auth" element={<AuthPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
