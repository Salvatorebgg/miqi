import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Circle } from 'lucide-react'
import { lessonsForTrack, mathTracks } from '../../data/mathCurriculum'
import { getRepository } from '../../lib/repositoryInstance'
import { lessonCompletion } from './math'
import type { CourseProgress } from '../../types/domain'

export function MathPage() {
  const [progress, setProgress] = useState<CourseProgress[]>([])

  useEffect(() => {
    void getRepository().listCourseProgress().then(setProgress)
  }, [])

  const progressFor = (lessonId: string) => progress.find(item => item.lessonId === lessonId)

  // First unfinished lesson across the ordered journey.
  const allLessons = mathTracks.flatMap(track => lessonsForTrack(track.id))
  const nextLesson =
    allLessons.find(lesson => lessonCompletion(progressFor(lesson.id) ?? { read: false, exerciseScore: 0, quizScore: 0 }) < 100) ??
    allLessons[0]

  return (
    <section className="page-panel glass" aria-labelledby="math-title">
      <p className="eyebrow">数学</p>
      <h2 id="math-title">从高中基础到高数线代</h2>

      {nextLesson ? (
        <Link to={`/math/lesson/${nextLesson.id}`} className="continue-card glass">
          <span>继续</span>
          <strong>{nextLesson.title}</strong>
          <ArrowRight aria-hidden="true" />
        </Link>
      ) : null}

      {mathTracks.map(track => {
        const lessons = lessonsForTrack(track.id)
        const completions = lessons.map(lesson =>
          lessonCompletion(
            progressFor(lesson.id) ?? { read: false, exerciseScore: 0, quizScore: 0 },
          ),
        )
        const trackPercent = Math.round(completions.reduce((sum, value) => sum + value, 0) / lessons.length)
        return (
          <article key={track.id} className="track-card glass" aria-labelledby={`track-${track.id}`}>
            <header className="track-header">
              <div>
                <h3 id={`track-${track.id}`}>{track.title}</h3>
                <p>{track.description}</p>
              </div>
              <div
                className="progress-ring"
                role="img"
                aria-label={`本阶段完成度 ${trackPercent}%`}
                style={{ '--percent': `${trackPercent * 3.6}deg` } as React.CSSProperties}
              >
                <span>{trackPercent}%</span>
              </div>
            </header>
            <ol className="lesson-list">
              {lessons.map(lesson => {
                const completion = lessonCompletion(
                  progressFor(lesson.id) ?? { read: false, exerciseScore: 0, quizScore: 0 },
                )
                return (
                  <li key={lesson.id}>
                    <Link to={`/math/lesson/${lesson.id}`} className="lesson-row">
                      {completion >= 100 ? (
                        <CheckCircle2 className="lesson-status done" aria-label="已完成" />
                      ) : (
                        <Circle className="lesson-status" aria-hidden="true" />
                      )}
                      <span className="lesson-title">{lesson.title}</span>
                      <span className="lesson-meta">{lesson.duration} 分钟 · {completion}%</span>
                    </Link>
                  </li>
                )
              })}
            </ol>
          </article>
        )
      })}
    </section>
  )
}
