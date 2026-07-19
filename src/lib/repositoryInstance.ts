import { createLocalRepository } from './localRepository'
import type { LearningRepository } from './repository'

export const LOCAL_USER_ID = 'local-user'

let instance: LearningRepository | null = null

/** Shared local-first repository for the running app. */
export function getRepository(): LearningRepository {
  if (!instance) instance = createLocalRepository(localStorage)
  return instance
}

export const newId = (): string =>
  globalThis.crypto?.randomUUID?.() ?? `id-${Date.now()}-${Math.random().toString(36).slice(2)}`

export const todayString = (date = new Date()): string => date.toISOString().slice(0, 10)
