import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './AppShell'
import { AuthPage } from '../features/auth/AuthPage'
import { AccountPage } from '../features/account/AccountPage'
import { MathPage } from '../features/math/MathPage'
import { LessonPage } from '../features/math/LessonPage'
import { EnglishPage } from '../features/english/EnglishPage'
import { NewsPage } from '../features/news/NewsPage'
import { GamesPage } from '../features/games/GamesPage'
import { DashboardPage } from '../features/dashboard/DashboardPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<DashboardPage />} />
        <Route path="math" element={<MathPage />} />
        <Route path="math/lesson/:lessonId" element={<LessonPage />} />
        <Route path="english" element={<EnglishPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="games" element={<GamesPage />} />
        <Route path="planner" element={<Navigate to="/" replace />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="auth" element={<AuthPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
