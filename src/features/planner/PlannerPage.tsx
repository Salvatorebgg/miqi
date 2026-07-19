import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Circle, TrendingUp } from 'lucide-react'
import { getRepository, todayString } from '../../lib/repositoryInstance'
import { aggregateWeakAreas, categoryCompletion, type WeakArea } from './progress'
import { mathTracks, lessonsForTrack } from '../../data/mathCurriculum'
import { lessonCompletion } from '../math/math'
import { useDailyTasks } from './useDailyTasks'
import type { CourseProgress, ExerciseAttempt, GameSession, ReadingAttempt } from '../../types/domain'

const WEEK_LABELS = ['一', '二', '三', '四', '五', '六', '日']

export function PlannerPage() {
  const today = todayString()
  const { tasks, increment } = useDailyTasks(today)
  const [progress, setProgress] = useState<CourseProgress[]>([])
  const [attempts, setAttempts] = useState<ExerciseAttempt[]>([])
  const [readings, setReadings] = useState<ReadingAttempt[]>([])
  const [sessions, setSessions] = useState<GameSession[]>([])

  useEffect(() => {
    const repo = getRepository()
    void repo.listCourseProgress().then(setProgress)
    void repo.listExerciseAttempts().then(setAttempts)
    void repo.listReadingAttempts().then(setReadings)
    void repo.listGameSessions().then(setSessions)
  }, [])

  const weakAreas: WeakArea[] = useMemo(() => aggregateWeakAreas(attempts), [attempts])
  const categories = categoryCompletion(tasks)

  // 12-week activity heatmap (ends today).
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
    // Align the end to Sunday.
    const endDay = (end.getUTCDay() + 6) % 7
    end.setUTCDate(end.getUTCDate() + (6 - endDay))
    const start = new Date(end)
    start.setUTCDate(start.getUTCDate() - 7 * 12 + 1)
    for (let week = 0; week < 12; week++) {
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

  return (
    <section className="page-panel glass" aria-labelledby="planner-title">
      <p className="eyebrow">规划中心</p>
      <h2 id="planner-title">把目标放进日程</h2>

      <section aria-labelledby="today-tasks-heading">
        <h3 id="today-tasks-heading">今日任务</h3>
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
                    progress.find(item => item.lessonId === lesson.id) ?? { read: false, exerciseScore: 0, quizScore: 0 },
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

      <section aria-labelledby="heatmap-heading">
        <h3 id="heatmap-heading">近 12 周学习热力</h3>
        <div className="heatmap" role="img" aria-label="近 12 周学习活动热力图">
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
