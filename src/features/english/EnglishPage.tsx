import { useEffect, useMemo, useState } from 'react'
import { BookMarked, Brain, Newspaper, ScrollText, Sparkles } from 'lucide-react'
import { ieltsWords, paperSets, scenarioSets, englishNewsSets, type IeltsWord, type ReadingSet } from '../../data/englishContent'
import { getDailyEnglishPlan, scheduleReview } from './scheduler'
import { getRepository, LOCAL_USER_ID, newId, todayString } from '../../lib/repositoryInstance'
import type { ReadingAttempt, VocabularyProgress } from '../../types/domain'

function VocabularyTrainer({
  words,
  progress,
  onRated,
}: {
  words: IeltsWord[]
  progress: VocabularyProgress[]
  onRated: (next: VocabularyProgress) => void
}) {
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const queue = words
  const current = queue[index]

  if (!current) {
    return <p role="status" className="form-success">今日单词任务已完成，干得漂亮！</p>
  }

  const rate = async (rating: 0 | 1 | 2) => {
    const existing = progress.find(item => item.wordId === current.id)
    const base: VocabularyProgress =
      existing ?? {
        id: `vp-${LOCAL_USER_ID}-${current.id}`,
        userId: LOCAL_USER_ID,
        wordId: current.id,
        familiarity: 0,
        intervalDays: 1,
        nextReviewAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    const next = scheduleReview(base, rating, new Date())
    await getRepository().saveVocabulary(next)
    onRated(next)
    setRevealed(false)
    setIndex(value => value + 1)
  }

  return (
    <div className="vocab-card glass" aria-live="polite">
      <p className="vocab-progress">第 {index + 1} / {queue.length} 个</p>
      <p className="vocab-word">{current.word}</p>
      <p className="vocab-pos">{current.pos}</p>
      {revealed ? (
        <div className="vocab-detail">
          <p><strong>{current.definition}</strong></p>
          <p className="vocab-collocations">{current.collocations.join(' · ')}</p>
          <p className="vocab-example">{current.example}</p>
          <div className="rating-row" role="group" aria-label="熟悉程度">
            <button type="button" className="ghost-button rating-hard" onClick={() => void rate(0)}>不认识</button>
            <button type="button" className="ghost-button" onClick={() => void rate(1)}>有点模糊</button>
            <button type="button" className="primary-button" onClick={() => void rate(2)}>熟练掌握</button>
          </div>
        </div>
      ) : (
        <button type="button" className="primary-button" onClick={() => setRevealed(true)}>
          显示释义与例句
        </button>
      )}
    </div>
  )
}

function ReadingCard({ set }: { set: ReadingSet }) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [summary, setSummary] = useState('')
  const [saved, setSaved] = useState(false)
  const startedAt = useMemo(() => Date.now(), [])

  const correctCount = set.questions.filter(question => answers[question.id] === question.answer).length

  const submitAll = async () => {
    setSubmitted(true)
    const attempt: ReadingAttempt = {
      id: newId(),
      userId: LOCAL_USER_ID,
      materialId: set.id,
      kind: set.kind,
      correct: correctCount,
      total: set.questions.length,
      durationSeconds: Math.round((Date.now() - startedAt) / 1000),
      summary,
      createdAt: new Date().toISOString(),
    }
    await getRepository().saveReadingAttempt(attempt)
    setSaved(true)
  }

  return (
    <article className="reading-card glass">
      <header>
        <h4>{set.title}</h4>
        {set.source ? <p className="reading-source">{set.source}</p> : null}
      </header>
      {set.passage.map((paragraph, i) => <p key={i} className="reading-passage">{paragraph}</p>)}

      <ol className="question-list">
        {set.questions.map(question => (
          <li key={question.id}>
            <p className="exercise-prompt">{question.prompt}</p>
            <div className="choice-grid" role="radiogroup" aria-label={question.prompt}>
              {question.options.map(option => (
                <label key={option.id} className="choice-option">
                  <input
                    type="radio"
                    name={`${set.id}-${question.id}`}
                    value={option.id}
                    checked={answers[question.id] === option.id}
                    onChange={() => setAnswers(value => ({ ...value, [question.id]: option.id }))}
                    disabled={submitted}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
            {submitted ? (
              <p className={answers[question.id] === question.answer ? 'form-success' : 'form-error'} role="status">
                {answers[question.id] === question.answer ? '正确。' : `正确答案是 ${question.answer.toUpperCase()}。`}
                {question.explanation}
              </p>
            ) : null}
          </li>
        ))}
      </ol>

      <label className="form-field">
        <span>{set.summaryPrompt}</span>
        <textarea rows={3} value={summary} onChange={event => setSummary(event.target.value)} disabled={saved} />
      </label>

      <button
        type="button"
        className="primary-button"
        onClick={() => void submitAll()}
        disabled={submitted || Object.keys(answers).length < set.questions.length}
      >
        提交阅读答案
      </button>
      {submitted ? (
        <p className="form-success" role="status">
          答对 {correctCount} / {set.questions.length} 题，总结已保存。坚持精读，分数会一点点长出来。
        </p>
      ) : null}
    </article>
  )
}

export function EnglishPage() {
  const today = todayString()
  const [vocabProgress, setVocabProgress] = useState<VocabularyProgress[]>([])
  const [attempts, setAttempts] = useState<ReadingAttempt[]>([])
  const [activeTab, setActiveTab] = useState<'scenario' | 'news' | 'paper'>('scenario')

  useEffect(() => {
    const repo = getRepository()
    void repo.listVocabulary().then(setVocabProgress)
    void repo.listReadingAttempts().then(setAttempts)
  }, [])

  const plan = useMemo(
    () => getDailyEnglishPlan(today, ieltsWords, vocabProgress, scenarioSets, englishNewsSets, paperSets),
    [today, vocabProgress],
  )

  const weekAgo = Date.now() - 7 * 86_400_000
  const weeklyAttempts = attempts.filter(attempt => Date.parse(attempt.createdAt) >= weekAgo)
  const weeklyCorrect = weeklyAttempts.reduce((sum, a) => sum + a.correct, 0)
  const weeklyTotal = weeklyAttempts.reduce((sum, a) => sum + a.total, 0)
  const reviewedWords = vocabProgress.length
  const masteredWords = vocabProgress.filter(item => item.familiarity === 2).length

  const tabs = [
    { key: 'scenario' as const, label: '情景理解', icon: Sparkles, set: plan.scenario },
    { key: 'news' as const, label: '英文新闻', icon: Newspaper, set: plan.news },
    { key: 'paper' as const, label: '论文摘要', icon: ScrollText, set: plan.paper },
  ]

  return (
    <section className="page-panel glass" aria-labelledby="english-title">
      <p className="eyebrow">IELTS 英语 · 目标 8–9 分</p>
      <h2 id="english-title">每天一点点，向高分靠近</h2>

      <dl className="metric-strip">
        <div><dt>已学单词</dt><dd>{reviewedWords}</dd></div>
        <div><dt>熟练掌握</dt><dd>{masteredWords}</dd></div>
        <div><dt>本周阅读正确率</dt><dd>{weeklyTotal > 0 ? `${Math.round((weeklyCorrect / weeklyTotal) * 100)}%` : '—'}</dd></div>
        <div><dt>本周精读</dt><dd>{weeklyAttempts.length} 篇</dd></div>
      </dl>

      <section aria-labelledby="vocab-heading">
        <h3 id="vocab-heading"><BookMarked aria-hidden="true" /> 今日单词（复习 {plan.due.length} · 新词 {plan.fresh.length}）</h3>
        <VocabularyTrainer
          key={vocabProgress.length}
          words={[...plan.due, ...plan.fresh]}
          progress={vocabProgress}
          onRated={next => setVocabProgress(value => [...value.filter(item => item.id !== next.id), next])}
        />
      </section>

      <section aria-labelledby="reading-heading">
        <h3 id="reading-heading"><Brain aria-hidden="true" /> 今日阅读训练</h3>
        <div className="tab-row" role="tablist" aria-label="阅读材料类型">
          {tabs.map(tab => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.key}
              className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <tab.icon aria-hidden="true" />
              {tab.label}
            </button>
          ))}
        </div>
        {tabs.map(tab =>
          tab.key === activeTab && tab.set ? <ReadingCard key={tab.set.id} set={tab.set} /> : null,
        )}
      </section>
    </section>
  )
}
