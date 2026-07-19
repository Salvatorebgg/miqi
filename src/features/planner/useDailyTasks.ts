import { useCallback, useEffect, useState } from 'react'
import { getRepository, LOCAL_USER_ID, todayString } from '../../lib/repositoryInstance'
import { buildDailyPlan } from './progress'
import type { DailyTask } from '../../types/domain'

/** Loads today's tasks, generating any missing ones exactly once. */
export function useDailyTasks(date: string = todayString()) {
  const [tasks, setTasks] = useState<DailyTask[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const repo = getRepository()
    void (async () => {
      const [existing, courseProgress, vocabulary] = await Promise.all([
        repo.listTasks(date),
        repo.listCourseProgress(),
        repo.listVocabulary(),
      ])
      const fresh = buildDailyPlan({
        userId: LOCAL_USER_ID,
        date,
        existingTasks: existing,
        courseProgress,
        vocabulary,
      })
      for (const task of fresh) await repo.saveTask(task)
      const all = await repo.listTasks(date)
      if (!cancelled) {
        setTasks(all)
        setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [date])

  const increment = useCallback(
    async (taskId: string, amount = 1) => {
      const repo = getRepository()
      const task = tasks.find(item => item.id === taskId)
      if (!task) return
      const next: DailyTask = {
        ...task,
        completed: Math.min(task.completed + amount, task.target),
        updatedAt: new Date().toISOString(),
      }
      await repo.saveTask(next)
      setTasks(await repo.listTasks(date))
    },
    [tasks, date],
  )

  return { tasks, loading, increment }
}
