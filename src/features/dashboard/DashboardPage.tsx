import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, CheckCircle2, Circle, Flame, Gamepad2, PenLine, TrendingUp } from 'lucide-react'
import { getRepository, todayString } from '../../lib/repositoryInstance'
import { aggregateWeakAreas, calculateStreak, categoryCompletion, dayCompletion, nextMathLesson, type WeakArea } from '../planner/progress'
import { mathTracks, lessonsForTrack, findLesson } from '../../data/mathCurriculum'
import { lessonCompletion } from '../math/math'
import { loadNews, type NewsFeed } from '../news/news'
import { useDailyTasks } from '../planner/useDailyTasks'
import type { CourseProgress, ExerciseAttempt, GameSession, ReadingAttempt } from '../../types/domain'

const WEEK_LABELS = ['一', '二', '三', '四', '五', '六', '日']

export function DashboardPage() {
  const today = todayString()
  const { tasks, increment } = useDailyTasks(today)
  const [streak, setStreak] = useState(0)
  const [lessonId, setLessonId] = useState<string | null>(null)
  const [news, setNews] = useState<NewsFeed | null>(null)
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([])
  const [attempts, setAttempts] = useState<ExerciseAttempt[]>([])
  const [readings, setReadings] = useState<ReadingAttempt[]>([])
  const [sessions, setSessions] = useState<GameSession[]>([])

  useEffect(() => {
    const repo = getRepository()
    void (async () => {
      const [fetchedAttempts, fetchedReadings, fetchedSessions, fetchedProgress] = await Promise.all([
        repo.listExerciseAttempts(),
        repo.listReadingAttempts(),
        repo.listGameSessions(),
        repo.listCourseProgress(),
      ])
      setAttempts(fetchedAttempts)
      setReadings(fetchedReadings)
      setSessions(fetchedSessions)
      setCourseProgress(fetchedProgress)

      const activeDates = new Set<string>()
      for (const record of fetchedAttempts) activeDates.add(record.createdAt.slice(0, 10))
      for (const record of fetchedReadings) activeDates.add(record.createdAt.slice(0, 10))
      for (const record of fetchedSessions) activeDates.add(record.createdAt.slice(0, 10))
      if (activeDates.size > 0) {
        if (tasks.some(task => task.completed > 0)) activeDates.add(today)
      }
      setStreak(calculateStreak([...activeDates], today))
      setLessonId(nextMathLesson(fetchedProgress))
    })()
  }, [today, tasks])

  useEffect(() => {
    loadNews(false).then(setNews).catch(() => setNews(null))
  }, [])

  const lesson = lessonId ? findLesson(lessonId) : undefined
  const completion = dayCompletion(tasks)
  const englishTask = tasks.find(task => task.category === 'english')
  const gameTask = tasks.find(task => task.category === 'game')
  const categories = categoryCompletion(tasks)

  const weakAreas: WeakArea[] = useMemo(() => aggregateWeakAreas(attempts), [attempts])

  // 4-week activity heatmap
  const activityByDate = useMemo(() => {
    const map = new Map<string, number>()
    const bump = (iso: string) => {
      const day = iso.slice(0, 10)
      map.set(day, (map.get(day) ?? 0) + 1)
    }
    for (const record of attempts) bump(record.createdAt)
    for (const record of readings) bump(record.createdAt)
    for (const record of sessions) bump(record.createdAt)
    return map
  }, [attempts, readings, sessions])

  const weeks = useMemo(() => {
    const result: { date: string; count: number }[][] = []
    const end = new Date(`${today}T00:00:00Z`)
    const endDay = (end.getUTCDay() + 6) % 7
    end.setUTCDate(end.getUTCDate() + (6 - endDay))
    const start = new Date(end)
    start.setUTCDate(start.getUTCDate() - 7 * 4 + 1)
    for (let week = 0; week < 4; week++) {
      const days: { date: string; count: number }[] = []
      for (let day = 0; day < 7; day++) {
        const cursor = new Date(start)
        cursor.setUTCDate(cursor.getUTCDate() + week * 7 + day)
        const key = cursor.toISOString().slice(0, 10)
        days.push({ date: key, count: activityByDate.get(key) ?? 0 })
      }
      result.push(days)
    }
    return result
  }, [today, activityByDate])

  const recentAttempts = attempts.slice(-20)
  const recentAccuracy =
    recentAttempts.length > 0
      ? Math.round((recentAttempts.filter(attempt => attempt.correct).length / recentAttempts.length) * 100)
      : null

  const hour = new Date().getHours()
  const greeting = hour < 6 ? '夜深了' : hour < 12 ? '早上好' : hour < 18 ? '下午好' : '晚上好'

  return (
    <section className="page-panel glass" aria-labelledby="dashboard-title">
      {/* 1. Greeting + today's date */}
      <p className="eyebrow">{greeting} · {today}</p>
      <h2 id="dashboard-title">今日概览</h2>

      {/* 2. Task list with progress ring */}
      <section aria-labelledby="tasks-heading">
        <div className="cockpit-summary">
          <div className="progress-ring large" role="img" aria-label={`今日完成度 ${completion}%`} style={{ '--percent': `${completion * 3.6}deg` } as React.CSSProperties}>
            <span>{completion}%</span>
          </div>
          <div className="streak-badge" role="status">
            <Flame aria-hidden="true" />
            <strong>{streak}</strong> 天
          </div>
        </div>
        <h3 id="tasks-heading">今日任务</h3>
        <ul className="task-list">
          {tasks.map(task => {
            const done = task.completed >= task.target
            return (
              <li key={task.id} className={`task-row glass ${done ? 'done' : ''}`}>
                <button
                  type="button"
                  className="task-check"
                  aria-label={done ? `${task.title}（已完成）` : `完成一步：${task.title}`}
                  onClick={() => void increment(task.id)}
                  disabled={done}
                >
                  {done ? <CheckCircle2 aria-hidden="true" /> : <Circle aria-hidden="true" />}
                </button>
                <span className="task-title">{task.title}</span>
                <span className="task-count">{task.completed}/{task.target}</span>
              </li>
            )
          })}
          {tasks.length === 0 ? <li>正在准备今日计划…</li> : null}
        </ul>
      </section>

      {/* 3. Cockpit cards — slim version, 3 cards */}
      <div className="cockpit-grid">
        {lesson ? (
          <Link to={`/math/lesson/${lesson.id}`} className="cockpit-card focus glass">
            <BookOpen aria-hidden="true" />
            <div>
              <span className="cockpit-label">数学</span>
              <strong>{lesson.title}</strong>
            </div>
            <ArrowRight aria-hidden="true" />
          </Link>
        ) : null}

        <Link to="/english" className="cockpit-card glass">
          <PenLine aria-hidden="true" />
          <div>
            <span className="cockpit-label">英语</span>
            <strong>
              {englishTask ? `词汇 ${englishTask.completed}/${englishTask.target}` : '词汇与精读'}
            </strong>
          </div>
          <ArrowRight aria-hidden="true" />
        </Link>

        <Link to="/games" className="cockpit-card glass">
          <Gamepad2 aria-hidden="true" />
          <div>
            <span className="cockpit-label">游戏</span>
            <strong>{gameTask && gameTask.completed >= gameTask.target ? '已完成' : '数独 / 迷宫'}</strong>
          </div>
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>

      {/* 4. Category progress bars */}
      <section aria-labelledby="category-heading">
        <h3 id="category-heading">分类完成度</h3>
        <div className="category-grid">
          {Object.entries({ math: '数学', english: '英语', reading: '阅读', game: '游戏' }).map(([key, label]) => {
            const entry = categories[key] ?? { done: 0, target: 0 }
            const percent = entry.target > 0 ? Math.round((entry.done / entry.target) * 100) : 0
            return (
              <div key={key} className="category-card glass">
                <span>{label}</span>
                <div className="bar" role="img" aria-label={`${label}完成 ${percent}%`}>
                  <i style={{ width: `${percent}%` }} />
                </div>
                <strong>{percent}%</strong>
              </div>
            )
          })}
        </div>
      </section>

      {/* 5. Course path progress (5 tracks) */}
      <section aria-labelledby="course-path-heading">
        <h3 id="course-path-heading">课程路径</h3>
        <ol className="path-list">
          {mathTracks.map(track => {
            const lessons = lessonsForTrack(track.id)
            const percent = Math.round(
              lessons.reduce(
                (sum, lesson) =>
                  sum +
                  lessonCompletion(
                    courseProgress.find(item => item.lessonId === lesson.id) ?? { read: false, exerciseScore: 0, quizScore: 0 },
                  ),
                0,
              ) / lessons.length,
            )
            return (
              <li key={track.id} className="path-row glass">
                <span>{track.title}</span>
                <div className="bar"><i style={{ width: `${percent}%` }} /></div>
                <strong>{percent}%</strong>
              </li>
            )
          })}
        </ol>
        <Link to="/math" className="link-button">进入数学课堂 →</Link>
      </section>

      {/* 6. Heatmap: last 4 weeks */}
      <section aria-labelledby="heatmap-heading">
        <h3 id="heatmap-heading">近 4 周学习热力</h3>
        <div className="heatmap" role="img" aria-label="近 4 周学习活动热力图">
          <div className="heatmap-labels">
            {WEEK_LABELS.map(label => <span key={label}>{label}</span>)}
          </div>
          {weeks.map((week, index) => (
            <div key={index} className="heatmap-week">
              {week.map(day => (
                <i
                  key={day.date}
                  title={`${day.date}：${day.count} 项活动`}
                  className={day.date > today ? 'future' : `level-${Math.min(day.count, 4)}`}
                />
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* 7. News preview */}
      {news && news.items.length > 0 ? (
        <section className="news-preview" aria-labelledby="news-preview-heading">
          <h3 id="news-preview-heading">资讯速览</h3>
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
          <Link to="/news" className="link-button">查看全部 →</Link>
        </section>
      ) : null}

      {/* 8. Weak areas */}
      <section aria-labelledby="weak-heading">
        <h3 id="weak-heading"><TrendingUp aria-hidden="true" /> 薄弱点与近期表现</h3>
        <p>
          {recentAccuracy !== null
            ? `最近 ${recentAttempts.length} 次练习正确率：${recentAccuracy}%`
            : '还没有练习记录，去数学课堂做几道题吧。'}
        </p>
        {weakAreas.length > 0 ? (
          <ul className="weak-list">
            {weakAreas.slice(0, 5).map(area => (
              <li key={area.topic} className="glass">
                <strong>{area.topic}</strong>
                <span>{area.errors}/{area.attempts} 次出错</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>暂未发现明显薄弱点，继续保持！</p>
        )}
      </section>
    </section>
  )
}
