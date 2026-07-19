export type NewsCategory = 'ai' | 'finance' | 'sports' | 'academic' | 'general'

export interface NewsItem {
  id: string
  title: string
  summary: string
  url: string
  canonicalUrl: string
  source: string
  category: NewsCategory
  publishedAt: string
}

export interface SourceHealth {
  name: string
  ok: boolean
  itemCount: number
  error: string | null
}

export interface NewsFeed {
  generatedAt: string
  stale: boolean
  items: NewsItem[]
  sourceHealth: SourceHealth[]
}

export const categoryLabels: Record<NewsCategory | 'all', string> = {
  all: '全部',
  ai: 'AI 科技',
  finance: '金融财经',
  sports: '体育',
  academic: '学术前沿',
  general: '综合资讯',
}

export function isNewsFeed(value: unknown): value is NewsFeed {
  const feed = value as NewsFeed
  return (
    typeof feed === 'object' &&
    feed !== null &&
    typeof feed.generatedAt === 'string' &&
    Array.isArray(feed.items) &&
    feed.items.every(
      item =>
        typeof item.title === 'string' &&
        typeof item.url === 'string' &&
        item.url.startsWith('https://') &&
        typeof item.category === 'string',
    )
  )
}

/** Load the static feed; force=true busts the cache for a manual refresh. */
export async function loadNews(force = false, fetchImpl: typeof fetch = fetch): Promise<NewsFeed> {
  const suffix = force ? `?v=${Date.now()}` : ''
  const response = await fetchImpl(`${import.meta.env.BASE_URL}data/news.json${suffix}`, {
    cache: force ? 'no-store' : 'default',
  })
  if (!response.ok) throw new Error(`资讯加载失败（${response.status}）`)
  const data: unknown = await response.json()
  if (!isNewsFeed(data)) throw new Error('资讯数据格式异常')
  return data
}

export function filterNews(items: NewsItem[], category: NewsCategory | 'all', query: string): NewsItem[] {
  const normalizedQuery = query.trim().toLowerCase()
  return items.filter(item => {
    if (category !== 'all' && item.category !== category) return false
    if (!normalizedQuery) return true
    return (
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.summary.toLowerCase().includes(normalizedQuery) ||
      item.source.toLowerCase().includes(normalizedQuery)
    )
  })
}

export function formatRelativeTime(iso: string, now = Date.now()): string {
  const diffMinutes = Math.max(0, Math.round((now - Date.parse(iso)) / 60_000))
  if (diffMinutes < 1) return '刚刚'
  if (diffMinutes < 60) return `${diffMinutes} 分钟前`
  const hours = Math.floor(diffMinutes / 60)
  if (hours < 24) return `${hours} 小时前`
  return `${Math.floor(hours / 24)} 天前`
}
