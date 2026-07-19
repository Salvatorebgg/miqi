import { useCallback, useEffect, useMemo, useState } from 'react'
import { Bookmark, BookmarkCheck, ExternalLink, RefreshCw, Search } from 'lucide-react'
import {
  categoryLabels,
  filterNews,
  formatRelativeTime,
  loadNews,
  type NewsCategory,
  type NewsFeed,
} from './news'
import { getRepository, LOCAL_USER_ID } from '../../lib/repositoryInstance'

type CategoryFilter = NewsCategory | 'all'

export function NewsPage() {
  const [feed, setFeed] = useState<NewsFeed | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [category, setCategory] = useState<CategoryFilter>('all')
  const [query, setQuery] = useState('')
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())
  const [readIds, setReadIds] = useState<Set<string>>(new Set())

  const load = useCallback(async (force: boolean) => {
    setRefreshing(true)
    setError(null)
    try {
      setFeed(await loadNews(force))
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : '资讯加载失败')
    } finally {
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    void load(false)
    void getRepository()
      .listSavedArticles()
      .then(records => {
        setSavedIds(new Set(records.filter(record => record.saved).map(record => record.articleId)))
        setReadIds(new Set(records.filter(record => record.read).map(record => record.articleId)))
      })
  }, [load])

  const visible = useMemo(
    () => (feed ? filterNews(feed.items, category, query) : []),
    [feed, category, query],
  )

  const markArticle = async (articleId: string, patch: { read?: boolean; saved?: boolean }) => {
    const nextRead = patch.read ?? readIds.has(articleId)
    const nextSaved = patch.saved ?? savedIds.has(articleId)
    if (patch.read !== undefined) {
      setReadIds(ids => new Set(ids).add(articleId))
    }
    if (patch.saved !== undefined) {
      setSavedIds(ids => {
        const next = new Set(ids)
        if (patch.saved) next.add(articleId)
        else next.delete(articleId)
        return next
      })
    }
    await getRepository().saveArticle({
      id: `sa-${LOCAL_USER_ID}-${articleId}`,
      userId: LOCAL_USER_ID,
      articleId,
      read: nextRead,
      saved: nextSaved,
      updatedAt: new Date().toISOString(),
    })
  }

  return (
    <section className="page-panel glass" aria-labelledby="news-title">
      <div className="news-header">
        <div>
          <p className="eyebrow">每日资讯</p>
          <h2 id="news-title">看见更大的世界</h2>
          {feed ? (
            <p className="news-updated" role="status">
              更新于 {new Date(feed.generatedAt).toLocaleString('zh-CN')}
              {feed.stale ? '（源暂时不可用，显示最近一次成功内容）' : ''}
            </p>
          ) : null}
        </div>
        <button type="button" className="ghost-button" onClick={() => void load(true)} disabled={refreshing}>
          <RefreshCw aria-hidden="true" className={refreshing ? 'spinning' : ''} />
          {refreshing ? '刷新中…' : '刷新资讯'}
        </button>
      </div>

      <div className="news-toolbar">
        <div className="tab-row" role="tablist" aria-label="资讯分类">
          {(Object.keys(categoryLabels) as CategoryFilter[]).map(key => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={category === key}
              className={`tab-button ${category === key ? 'active' : ''}`}
              onClick={() => setCategory(key)}
            >
              {categoryLabels[key]}
            </button>
          ))}
        </div>
        <label className="search-box">
          <Search aria-hidden="true" />
          <input
            type="search"
            placeholder="搜索标题、摘要或来源"
            value={query}
            onChange={event => setQuery(event.target.value)}
            aria-label="搜索资讯"
          />
        </label>
      </div>

      {error ? <p role="alert" className="form-error">{error}</p> : null}
      {!feed && !error ? <p role="status">正在加载今日资讯…</p> : null}
      {feed && visible.length === 0 ? <p role="status">这个分类暂时没有内容，换个分类或关键词试试。</p> : null}

      <ol className="news-list">
        {visible.map(item => (
          <li key={item.id} className={`news-card glass ${readIds.has(item.id) ? 'read' : ''}`}>
            <div className="news-meta">
              <span className="news-category">{categoryLabels[item.category]}</span>
              <span>{item.source}</span>
              <time dateTime={item.publishedAt}>{formatRelativeTime(item.publishedAt)}</time>
            </div>
            <h3>{item.title}</h3>
            {item.summary ? <p>{item.summary}</p> : null}
            <div className="news-actions">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => void markArticle(item.id, { read: true })}
              >
                <ExternalLink aria-hidden="true" />
                阅读原文
              </a>
              <button
                type="button"
                className="link-button"
                aria-pressed={savedIds.has(item.id)}
                onClick={() => void markArticle(item.id, { saved: !savedIds.has(item.id) })}
              >
                {savedIds.has(item.id) ? <BookmarkCheck aria-hidden="true" /> : <Bookmark aria-hidden="true" />}
                {savedIds.has(item.id) ? '已收藏' : '收藏'}
              </button>
            </div>
          </li>
        ))}
      </ol>

      {feed && feed.sourceHealth.some(source => !source.ok) ? (
        <details className="source-health">
          <summary>数据源状态（{feed.sourceHealth.filter(source => source.ok).length}/{feed.sourceHealth.length} 正常）</summary>
          <ul>
            {feed.sourceHealth.map(source => (
              <li key={source.name}>
                {source.ok ? '✅' : '⚠️'} {source.name}
                {source.ok ? `（${source.itemCount} 条）` : `（${source.error ?? '不可用'}）`}
              </li>
            ))}
          </ul>
        </details>
      ) : null}
    </section>
  )
}
