import { describe, expect, it, vi } from 'vitest'
import { filterNews, formatRelativeTime, isNewsFeed, loadNews, type NewsFeed, type NewsItem } from './news'

const item = (overrides: Partial<NewsItem>): NewsItem => ({
  id: 'https://example.com/a',
  title: 'Sample headline',
  summary: 'A short summary',
  url: 'https://example.com/a',
  canonicalUrl: 'https://example.com/a',
  source: 'Example',
  category: 'ai',
  publishedAt: '2026-07-18T08:00:00.000Z',
  ...overrides,
})

const feed: NewsFeed = {
  generatedAt: '2026-07-18T12:00:00.000Z',
  stale: false,
  items: [item({}), item({ id: 'https://example.com/b', url: 'https://example.com/b', category: 'sports', title: 'Match report' })],
  sourceHealth: [{ name: 'Example', ok: true, itemCount: 2, error: null }],
}

describe('loadNews', () => {
  it('appends a cache-busting query when forced', async () => {
    const fetchImpl = vi.fn(async () => ({ ok: true, json: async () => feed })) as unknown as typeof fetch
    await loadNews(true, fetchImpl)
    expect(String((fetchImpl as ReturnType<typeof vi.fn>).mock.calls[0][0])).toMatch(/news\.json\?v=\d+/)
  })

  it('uses the plain path for normal loads', async () => {
    const fetchImpl = vi.fn(async () => ({ ok: true, json: async () => feed })) as unknown as typeof fetch
    const result = await loadNews(false, fetchImpl)
    expect(result.items).toHaveLength(2)
    expect(String((fetchImpl as ReturnType<typeof vi.fn>).mock.calls[0][0])).not.toMatch(/\?v=/)
  })

  it('throws a friendly error on HTTP failure', async () => {
    const fetchImpl = vi.fn(async () => ({ ok: false, status: 404 })) as unknown as typeof fetch
    await expect(loadNews(false, fetchImpl)).rejects.toThrow('资讯加载失败（404）')
  })

  it('rejects malformed feeds', async () => {
    const fetchImpl = vi.fn(async () => ({ ok: true, json: async () => ({ hello: 'world' }) })) as unknown as typeof fetch
    await expect(loadNews(false, fetchImpl)).rejects.toThrow('资讯数据格式异常')
  })
})

describe('isNewsFeed', () => {
  it('accepts a valid feed and rejects insecure URLs', () => {
    expect(isNewsFeed(feed)).toBe(true)
    expect(isNewsFeed({ ...feed, items: [item({ url: 'http://insecure.com/a' })] })).toBe(false)
  })
})

describe('filterNews', () => {
  it('filters by category', () => {
    expect(filterNews(feed.items, 'sports', '')).toHaveLength(1)
    expect(filterNews(feed.items, 'all', '')).toHaveLength(2)
  })

  it('matches case-insensitive queries against title, summary, and source', () => {
    expect(filterNews(feed.items, 'all', 'MATCH')).toHaveLength(1)
    expect(filterNews(feed.items, 'all', 'example')).toHaveLength(2)
    expect(filterNews(feed.items, 'ai', 'match')).toHaveLength(0)
  })
})

describe('formatRelativeTime', () => {
  const now = Date.parse('2026-07-18T12:00:00.000Z')
  it('formats minutes, hours, and days in Chinese', () => {
    expect(formatRelativeTime('2026-07-18T11:45:00.000Z', now)).toBe('15 分钟前')
    expect(formatRelativeTime('2026-07-18T09:00:00.000Z', now)).toBe('3 小时前')
    expect(formatRelativeTime('2026-07-16T12:00:00.000Z', now)).toBe('2 天前')
  })
})
