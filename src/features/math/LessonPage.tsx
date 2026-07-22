import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BookOpenCheck, ChevronLeft, ExternalLink, Eye } from 'lucide-react'
import { findLesson, trackForLesson, type MathExercise } from '../../data/mathCurriculum'
import { MathGraph } from '../../components/ui/MathGraph'
import { getRepository, LOCAL_USER_ID, newId } from '../../lib/repositoryInstance'
import { gradeExercise, lessonCompletion, scoreAnswers } from './math'
import { Tex } from '../../components/ui/Tex'
import type { CourseProgress } from '../../types/domain'

function ExerciseCard({
  exercise,
  lessonId,
  onGraded,
}: {
  exercise: MathExercise
  lessonId: string
  onGraded: (exerciseId: string, correct: boolean) => void
}) {
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState<boolean | null>(null)
  const [showSolution, setShowSolution] = useState(false)
  const startedAt = useMemo(() => Date.now(), [])

  const submit = async () => {
    if (result !== null) return
    const correct = gradeExercise(exercise, answer)
    setResult(correct)
    onGraded(exercise.id, correct)
    const repo = getRepository()
    await repo.saveExerciseAttempt({
      id: newId(),
      userId: LOCAL_USER_ID,
      lessonId,
      exerciseId: exercise.id,
      topic: exercise.topic,
      correct,
      durationSeconds: Math.round((Date.now() - startedAt) / 1000),
      createdAt: new Date().toISOString(),
    })
  }

  return (
    <article className={`exercise-card glass ${result === null ? '' : result ? 'correct' : 'incorrect'}`}>
      <header>
        <span className={`difficulty-tag ${exercise.difficulty}`}>
          {exercise.difficulty === 'basic' ? '基础' : '进阶'}
        </span>
        <p className="exercise-prompt">{exercise.prompt}</p>
        {exercise.formula ? <Tex formula={exercise.formula} block /> : null}
      </header>

      {exercise.type === 'choice' && exercise.options ? (
        <div className="choice-grid" role="radiogroup" aria-label="选项">
          {exercise.options.map(option => (
            <label key={option.id} className="choice-option">
              <input
                type="radio"
                name={exercise.id}
                value={option.id}
                checked={answer === option.id}
                onChange={() => setAnswer(option.id)}
                disabled={result !== null}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      ) : (
        <label className="form-field">
          <span>答案</span>
          <input
            value={answer}
            onChange={event => setAnswer(event.target.value)}
            disabled={result !== null}
            inputMode={exercise.type === 'number' ? 'decimal' : 'text'}
            placeholder="输入你的答案"
          />
        </label>
      )}

      <div className="exercise-actions">
        <button type="button" className="primary-button" onClick={submit} disabled={result !== null || answer === ''}>
          提交
        </button>
        <button type="button" className="ghost-button" onClick={() => setShowSolution(value => !value)}>
          <Eye aria-hidden="true" />
          {showSolution ? '收起' : '解析'}
        </button>
      </div>

      <div aria-live="polite">
        {result !== null ? (
          <p className={result ? 'form-success' : 'form-error'} role="status">
            {result ? '回答正确！' : '答案还不对，看看解析再想想。'}
          </p>
        ) : null}
      </div>

      {showSolution ? (
        <ol className="solution-steps">
          {exercise.solution.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      ) : null}
    </article>
  )
}

export function LessonPage() {
  const { lessonId = '' } = useParams()
  const lesson = findLesson(lessonId)
  const [record, setRecord] = useState<CourseProgress | null>(null)
  const [exerciseResults, setExerciseResults] = useState<Record<string, boolean>>({})
  const [quizResults, setQuizResults] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (!lesson) return
    void getRepository()
      .listCourseProgress()
      .then(all => setRecord(all.find(item => item.lessonId === lesson.id) ?? null))
  }, [lesson])

  const persist = (patch: Partial<CourseProgress>) => {
    if (!lesson) return
    const next: CourseProgress = {
      id: record?.id ?? `cp-${LOCAL_USER_ID}-${lesson.id}`,
      userId: LOCAL_USER_ID,
      courseId: lesson.trackId,
      lessonId: lesson.id,
      read: record?.read ?? false,
      exerciseScore: record?.exerciseScore ?? 0,
      quizScore: record?.quizScore ?? 0,
      ...patch,
      updatedAt: new Date().toISOString(),
    }
    setRecord(next)
    void getRepository().saveCourseProgress(next)
  }

  if (!lesson) {
    return (
      <section className="page-panel glass">
        <h2>没有找到这节课</h2>
        <p><Link to="/math">返回数学课堂</Link></p>
      </section>
    )
  }

  const track = trackForLesson(lesson)
  const completion = lessonCompletion(record ?? { read: false, exerciseScore: 0, quizScore: 0 })

  const handleExerciseGraded = (exerciseId: string, correct: boolean) => {
    const next = { ...exerciseResults, [exerciseId]: correct }
    setExerciseResults(next)
    if (Object.keys(next).length === lesson.exercises.length) {
      persist({ exerciseScore: scoreAnswers(lesson.exercises.map(ex => next[ex.id] ?? false)) })
    }
  }

  const handleQuizGraded = (exerciseId: string, correct: boolean) => {
    const next = { ...quizResults, [exerciseId]: correct }
    setQuizResults(next)
    if (Object.keys(next).length === lesson.quiz.length) {
      persist({ quizScore: scoreAnswers(lesson.quiz.map(ex => next[ex.id] ?? false)) })
    }
  }

  return (
    <section className="page-panel glass lesson-page" aria-labelledby="lesson-title">
      <Link to="/math" className="back-link"><ChevronLeft aria-hidden="true" />返回数学课堂</Link>
      <p className="eyebrow">{track?.title}</p>
      <h2 id="lesson-title">{lesson.title}</h2>
      <p className="lesson-submeta">{lesson.duration} 分钟 · 进度 {completion}%</p>

      <section aria-labelledby="objectives-heading">
        <h3 id="objectives-heading">目标</h3>
        <ul>{lesson.objectives.map((objective, i) => <li key={i}>{objective}</li>)}</ul>
      </section>

      <section aria-labelledby="intuition-heading">
        <h3 id="intuition-heading">直觉</h3>
        {lesson.intuition.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
      </section>

      <section aria-labelledby="principles-heading">
        <h3 id="principles-heading">原理</h3>
        {lesson.principles.map((principle, i) => (
          <article key={i} className="principle-card glass">
            <h4>{principle.title}</h4>
            <p>{principle.body}</p>
            {principle.formula ? <Tex formula={principle.formula} block /> : null}
          </article>
        ))}
      </section>

      {lesson.interactiveGraph ? (
        <section aria-labelledby="graph-heading">
          <h3 id="graph-heading">图像探索</h3>
          <MathGraph {...lesson.interactiveGraph} />
        </section>
      ) : null}

      <section aria-labelledby="examples-heading">
        <h3 id="examples-heading">例题</h3>
        {lesson.examples.map((example, i) => (
          <article key={i} className="principle-card glass">
            <h4>{example.prompt}</h4>
            <ol className="solution-steps">{example.steps.map((step, j) => <li key={j}>{step}</li>)}</ol>
            <p className="form-success">结论：{example.answer}</p>
          </article>
        ))}
      </section>

      {lesson.detailedNotes && lesson.detailedNotes.length > 0 ? (
        <section aria-labelledby="notes-heading">
          <h3 id="notes-heading">详细讲义</h3>
          {lesson.detailedNotes.map((note, i) => (
            <article key={i} className="principle-card glass">
              <p>{note}</p>
            </article>
          ))}
        </section>
      ) : null}

      {lesson.keyFormulas && lesson.keyFormulas.length > 0 ? (
        <section aria-labelledby="formulas-heading">
          <h3 id="formulas-heading">公式卡片</h3>
          <div className="formula-grid">
            {lesson.keyFormulas.map((item, i) => (
              <article key={i} className="principle-card glass formula-card">
                <h4>{item.name}</h4>
                <Tex formula={item.formula} block />
                <p className="formula-usage">{item.usage}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {lesson.commonMistakes && lesson.commonMistakes.length > 0 ? (
        <section aria-labelledby="mistakes-heading">
          <h3 id="mistakes-heading">常见误区</h3>
          {lesson.commonMistakes.map((item, i) => (
            <article key={i} className="principle-card glass mistake-card">
              <p className="mistake-text"><strong>错误：</strong>{item.mistake}</p>
              <p className="correction-text"><strong>纠正：</strong>{item.correction}</p>
            </article>
          ))}
        </section>
      ) : null}

      <div className="read-toggle">
        <button
          type="button"
          className={record?.read ? 'ghost-button' : 'primary-button'}
          onClick={() => persist({ read: true })}
          disabled={record?.read}
        >
          <BookOpenCheck aria-hidden="true" />
          {record?.read ? '已标记读完' : '我已完成阅读'}
        </button>
      </div>

      <section aria-labelledby="exercises-heading">
        <h3 id="exercises-heading">练习</h3>
        {lesson.exercises.map(exercise => (
          <ExerciseCard key={exercise.id} exercise={exercise} lessonId={lesson.id} onGraded={handleExerciseGraded} />
        ))}
      </section>

      <section aria-labelledby="quiz-heading">
        <h3 id="quiz-heading">测验</h3>
        {lesson.quiz.map(exercise => (
          <ExerciseCard key={exercise.id} exercise={exercise} lessonId={lesson.id} onGraded={handleQuizGraded} />
        ))}
      </section>

      <section aria-labelledby="resources-heading">
        <h3 id="resources-heading">资料</h3>
        <ul className="resource-list">
          {lesson.resources.map(resource => (
            <li key={resource.url}>
              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink aria-hidden="true" />
                <span>{resource.title}</span>
                <em>{resource.provider} · {resource.kind === 'video' ? '视频' : '图文'}</em>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}
