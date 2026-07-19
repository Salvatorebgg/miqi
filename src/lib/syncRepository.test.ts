import { describe, expect, it, vi } from 'vitest'
import { syncPendingEvents } from './syncRepository'
import type { SyncEvent } from '../types/domain'

const makeEvent = (id: string, entityId = id): SyncEvent => ({
  id,
  entity: 'daily_tasks',
  entityId,
  operation: 'upsert',
  payload: { id: entityId, title: '复习极限' },
  version: 1,
  updatedAt: '2026-07-18T00:00:00.000Z',
})

const makeLocal = (events: SyncEvent[]) => ({
  pendingEvents: vi.fn(() => events),
  acknowledgeEvents: vi.fn(),
})

describe('syncPendingEvents', () => {
  it('acknowledges every event after a fully successful push', async () => {
    const events = [makeEvent('a'), makeEvent('b')]
    const local = makeLocal(events)
    const upsert = vi.fn().mockResolvedValue({ error: null })
    const client = { from: vi.fn(() => ({ upsert })) } as never

    const result = await syncPendingEvents(local, client)

    expect(result).toEqual({ status: 'synced', synced: 2, remaining: 0 })
    expect(local.acknowledgeEvents).toHaveBeenCalledWith(['a', 'b'])
  })

  it('keeps local events when a cloud upsert fails', async () => {
    const local = makeLocal([makeEvent('a')])
    const upsert = vi.fn().mockResolvedValue({ error: new Error('offline') })
    const client = { from: vi.fn(() => ({ upsert })) } as never

    const result = await syncPendingEvents(local, client)

    expect(result).toEqual({ status: 'failed', synced: 0, remaining: 1 })
    expect(local.acknowledgeEvents).not.toHaveBeenCalled()
  })

  it('stops at the first failure and only acknowledges completed events', async () => {
    const events = [makeEvent('a'), makeEvent('b'), makeEvent('c')]
    const local = makeLocal(events)
    const upsert = vi
      .fn()
      .mockResolvedValueOnce({ error: null })
      .mockResolvedValueOnce({ error: new Error('conflict') })
    const client = { from: vi.fn(() => ({ upsert })) } as never

    const result = await syncPendingEvents(local, client)

    expect(result).toEqual({ status: 'failed', synced: 1, remaining: 2 })
    expect(local.acknowledgeEvents).toHaveBeenCalledWith(['a'])
  })

  it('issues a delete query for delete operations', async () => {
    const event: SyncEvent = { ...makeEvent('a'), operation: 'delete' }
    const local = makeLocal([event])
    const eq = vi.fn().mockResolvedValue({ error: null })
    const deleteFn = vi.fn(() => ({ eq }))
    const client = { from: vi.fn(() => ({ delete: deleteFn })) } as never

    const result = await syncPendingEvents(local, client)

    expect(result.status).toBe('synced')
    expect(deleteFn).toHaveBeenCalled()
    expect(eq).toHaveBeenCalledWith('id', 'a')
  })
})
