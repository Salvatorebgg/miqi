import type { SupabaseClient } from '@supabase/supabase-js'
import type { LearningRepository } from './repository'

export interface SyncResult {
  status: 'synced' | 'failed'
  synced: number
  remaining: number
}

/**
 * Pushes pending local events to Supabase in order. Local events are only
 * acknowledged after a successful remote write, so a failure never loses
 * local work.
 */
export async function syncPendingEvents(
  local: Pick<LearningRepository, 'pendingEvents' | 'acknowledgeEvents'>,
  client: SupabaseClient,
): Promise<SyncResult> {
  const events = local.pendingEvents()
  const completed: string[] = []

  for (const event of events) {
    const query =
      event.operation === 'delete'
        ? client.from(event.entity).delete().eq('id', event.entityId)
        : client.from(event.entity).upsert(event.payload as Record<string, unknown>)
    const { error } = await query
    if (error) {
      if (completed.length > 0) local.acknowledgeEvents(completed)
      return { status: 'failed', synced: completed.length, remaining: events.length - completed.length }
    }
    completed.push(event.id)
  }

  local.acknowledgeEvents(completed)
  return { status: 'synced', synced: completed.length, remaining: 0 }
}
