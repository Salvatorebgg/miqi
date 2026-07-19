import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Flame, Gamepad2, Newspaper, PenLine } from 'lucide-react'
import { getRepository, todayString } from '../../lib/repositoryInstance'
import { calculateStreak, dayCompletion, nextMathLesson } from '../planner/progress'
import { findLesson } from '../../data/mathCurriculum'
import { loadNews, type NewsFeed } from '../news/news'
import { useDailyTasks } from '../planner/useDailyTasks'

export function DashboardPage() {
  const today = todayString()
  const { tasks, increment } = useDailyTasks(today)
  const [streak, setStreak] = useState(0)
  const [lessonId, setLessonId] = useState<string | null>(null)
  const [news, setNews] = useState<NewsFeed | null>(null)

  useEffect(() => {
    const repo = getRepository()
    void (async () => {
      const [attempts, readings, sessions, progress] = await Promise.all([
        repo.listExerciseAttempts(),
        repo.listReadingAttempts(),
        repo.listGameSessions(),
        repo.listCourseProgress(),
      ])
      const activeDates = new Set<string>()
      for (const record of attempts) activeDates.add(record.createdAt.slice(0, 10))
      for (const record of readings) activeDates.add(record.createdAt.slice(0, 10))
      for (const record of sessions) activeDates.add(record.createdAt.slice(0, 10))
      if (activeDates.size > 0) {
        // Today counts as active as soon as any task has progress.
        if (tasks.some(task => task.completed > 0)) activeDates.add(today)
      }
      setStreak(calculateStreak([...activeDates], today))
      setLessonId(nextMathLesson(progress))
    })()
  }, [today, tasks])

  useEffect(() => {
    loadNews(false).then(setNews).catch(() => setNews(null))
  }, [])

  const lesson = lessonId ? findLesson(lessonId) : undefined
  const completion = dayCompletion(tasks)
  const englishTask = tasks.find(task => task.category === 'english')
  const readingTask = tasks.find(task => task.category === 'reading')
  const gameTask = tasks.find(task => task.category === 'game')

  const hour = new Date().getHours()
  const greeting = hour < 6 ? '夜深了' : hour < 12 ? '早上好' : hour < 18 ? '下午好' : '晚上好'

  return (
    <section className="page-panel glass" aria-labelledby="dashboard-title">
      <p className="eyebrow">{greeting}，今天是 {today}</p>
      <h2 id="dashboard-title">学习驾驶舱</h2>

      <div className="cockpit-summary">
        <div className="progress-ring large" role="img" aria-label={`今日完成度 ${completion}%`} style={{ '--percent': `${completion * 3.6}deg` } as React.CSSProperties}>
          <span>{completion}%</span>
        </div>
        <div className="streak-badge" role="status">
          <Flame aria-hidden="true" />
          <strong>{streak}</strong> 天连续学习
        </div>
      </div>

      <div className="cockpit-grid">
        {lesson ? (
          <Link to={`/math/lesson/${lesson.id}`} className="cockpit-card focus glass">
            <BookOpen aria-hidden="true" />
            <div>
              <span className="cockpit-label">今日主攻 · 数学</span>
              <strong>{lesson.title}</strong>
              <em>约 {lesson.duration} 分钟</em>
            </div>
            <ArrowRight aria-hidden="true" />
          </Link>
        ) : null}

        <Link to="/english" className="cockpit-card glass">
          <PenLine aria-hidden="true" />
          <div>
            <span className="cockpit-label">英语 · IELTS 8–9</span>
            <strong>
              {englishTask ? `词汇 ${englishTask.completed}/${englishTask.target}` : '今日词汇与精读'}
            </strong>
            <em>单词 · 情景 · 新闻 · 论文</em>
          </div>
          <ArrowRight aria-hidden="true" />
        </Link>

        <button
          type="button"
          className="cockpit-card glass as-button"
          onClick={() => readingTask && void increment(readingTask.id)}
          disabled={!readingTask || readingTask.completed >= readingTask.target}
        >
          <Newspaper aria-hidden="true" />
          <div>
            <span className="cockpit-label">精读打卡</span>
            <strong>{readingTask && readingTask.completed >= readingTask.target ? '已完成 ✓' : '完成后点这里打卡'}</strong>
            <em>在英语页完成一篇阅读后更新</em>
          </div>
        </button>

        <Link to="/games" className="cockpit-card glass">
          <Gamepad2 aria-hidden="true" />
          <div>
            <span className="cockpit-label">脑力小憩</span>
            <strong>{gameTask && gameTask.completed >= gameTask.target ? '已完成 ✓' : '来一局数独或迷宫'}</strong>
            <em>短时挑战，保持专注</em>
          </div>
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>

      {news && news.items.length > 0 ? (
        <section className="news-preview" aria-labelledby="news-preview-heading">
          <h3 id="news-preview-heading">今日资讯速览</h3>
          <ul>
            {news.items.slice(0, 3).map(item => (
              <li key={item.id}>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.title}
                  <span>{item.source}</span>
                </a>
              </li>
            ))}
          </ul>
          <Link to="/news" className="link-button">查看全部资讯 →</Link>
        </section>
      ) : null}

      <p className="cockpit-tip">
        <Link to="/planner">前往规划中心</Link> 查看任务清单、热力图与薄弱点分析。当前为本地模式，进度保存在此设备。
      </p>
    </section>
  )
}
