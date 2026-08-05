import { supabase, isCloudEnabled } from './supabase'
import { getRepository } from './repositoryInstance'
import { syncPendingEvents } from './syncRepository'

/**
 * Pushes any locally queued sync events to Supabase. Best-effort: when cloud
 * sync is disabled, unauthenticated, or the remote write fails, the local
 * outbox stays intact and the next attempt picks up where it left off.
 */
export async function attemptCloudSync(): Promise<void> {
  if (!isCloudEnabled || !supabase) return
  try {
    await syncPendingEvents(getRepository(), supabase)
  } catch {
    // Cloud sync is best-effort; never let a failure break the app.
  }
}
