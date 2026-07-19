#!/usr/bin/env node
/**
 * Miqi news refresh: fetches several independent RSS sources, normalizes and
 * deduplicates items, classifies them into categories, and writes a static
 * JSON feed to public/data/news.json. Partial source failures are tolerated;
 * total failure keeps the previous feed and marks it stale.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { XMLParser } from 'fast-xml-parser'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUTPUT = join(ROOT, 'public', 'data', 'news.json')
const MAX_ITEMS = 120
const MAX_SUMMARY = 220

export const SOURCES = [
  { name: 'MIT Technology Review · AI', url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed/', category: 'ai' },
  { name: 'The Verge · AI', url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml', category: 'ai' },
  { name: 'CNBC · Finance', url: 'https://www.cnbc.com/id/100003114/device/rss/rss.html', category: 'finance' },
  { name: 'MarketWatch · Top Stories', url: 'https://feeds.content.dowjones.io/public/rss/mw_topstories', category: 'finance' },
  { name: 'BBC Sport', url: 'https://feeds.bbci.co.uk/sport/rss.xml', category: 'sports' },
  { name: 'ESPN', url: 'https://www.espn.com/espn/rss/news', category: 'sports' },
  { name: 'Nature · Latest Research', url: 'https://www.nature.com/nature.rss', category: 'academic' },
  { name: 'ScienceDaily · Top Science', url: 'https://www.sciencedaily.com/rss/top/science.xml', category: 'academic' },
  { name: 'BBC News · World', url: 'https://feeds.bbci.co.uk/news/world/rss.xml', category: 'general' },
  { name: 'NPR · Top Stories', url: 'https://feeds.npr.org/1001/rss.xml', category: 'general' },
]

const TRACKING_PARAMS = /^(utm_|fbclid|gclid|mc_cid|mc_eid|igshid|ref$|spm)/i

export function canonicalizeUrl(rawUrl) {
  try {
    const url = new URL(rawUrl)
    if (url.protocol !== 'https:') return null
    url.hash = ''
    if (url.pathname.length > 1 && url.pathname.endsWith('/')) url.pathname = url.pathname.slice(0, -1)
    const kept = [...url.searchParams.entries()].filter(([key]) => !TRACKING_PARAMS.test(key))
    url.search = new URLSearchParams(kept).toString()
    return url.toString().toLowerCase()
  } catch {
    return null
  }
}

export function normalizeTitle(title) {
  return String(title ?? '').trim().toLowerCase().replace(/\s+/g, ' ')
}

export function deduplicate(items) {
  const byKey = new Map()
  for (const item of items) {
    const key = item.canonicalUrl ?? `title:${normalizeTitle(item.title)}`
    const existing = byKey.get(key)
    if (!existing || new Date(item.publishedAt) > new Date(existing.publishedAt)) {
      byKey.set(key, item)
    }
  }
  return [...byKey.values()]
}

export function stripHtml(html) {
  return String(html ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_SUMMARY)
}

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' })

export function normalizeFeed(xml, source) {
  let document_
  try {
    document_ = parser.parse(xml)
  } catch {
    return []
  }
  const channel = document_?.rss?.channel
  const atom = document_?.feed

  const entries = channel
    ? [channel.item ?? []].flat()
    : atom
      ? [atom.entry ?? []].flat()
      : []

  const items = []
  for (const entry of entries) {
    const rawLink = channel
      ? typeof entry.link === 'string'
        ? entry.link
        : entry.link?.['#text'] ?? entry.guid?.['#text'] ?? entry.guid
      : [entry.link ?? []].flat().find(link => link['@_rel'] === 'alternate' || !link['@_rel'])?.['@_href']
    const canonicalUrl = canonicalizeUrl(String(rawLink ?? ''))
    const title = stripHtml(entry.title?.['#text'] ?? entry.title)
    if (!canonicalUrl || !title) continue

    const dateRaw = entry.pubDate ?? entry.published ?? entry.updated ?? entry['dc:date']
    const publishedAt = new Date(dateRaw ?? Date.now())
    if (Number.isNaN(publishedAt.getTime())) continue

    items.push({
      id: canonicalUrl,
      title,
      summary: stripHtml(entry.description ?? entry.summary?.['#text'] ?? entry.summary ?? entry.content?.['#text'] ?? ''),
      url: canonicalUrl,
      canonicalUrl,
      source: source.name,
      category: source.category,
      publishedAt: publishedAt.toISOString(),
    })
  }
  return items
}

export async function fetchSource(source, fetchImpl = fetch) {
  try {
    const response = await fetchImpl(source.url, {
      headers: { 'user-agent': 'MiqiLearning/1.0 (+https://salvatorebgg.github.io/miqi/)' },
      signal: AbortSignal.timeout(15_000),
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return { ok: true, items: normalizeFeed(await response.text(), source), error: null }
  } catch (error) {
    return { ok: false, items: [], error: String(error) }
  }
}

async function main() {
  const results = await Promise.all(SOURCES.map(source => fetchSource(source)))
  const sourceHealth = results.map((result, index) => ({
    name: SOURCES[index].name,
    ok: result.ok,
    itemCount: result.items.length,
    error: result.error,
  }))

  const allItems = deduplicate(results.flatMap(result => result.items))
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, MAX_ITEMS)

  let previous = null
  try {
    previous = JSON.parse(await readFile(OUTPUT, 'utf8'))
  } catch {
    previous = null
  }

  if (allItems.length === 0) {
    if (previous?.items?.length) {
      const stale = { ...previous, stale: true, sourceHealth }
      await writeFile(OUTPUT, JSON.stringify(stale, null, 2))
      console.warn('All sources failed; kept previous feed and marked it stale.')
      process.exitCode = 0
      return
    }
    console.error('All sources failed and no previous feed exists.')
    process.exitCode = 1
    return
  }

  const feed = {
    generatedAt: new Date().toISOString(),
    stale: false,
    items: allItems,
    sourceHealth,
  }
  await mkdir(dirname(OUTPUT), { recursive: true })
  await writeFile(OUTPUT, JSON.stringify(feed, null, 2))
  console.log(`Wrote ${allItems.length} items from ${sourceHealth.filter(s => s.ok).length}/${SOURCES.length} sources.`)
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch(error => {
    console.error(error)
    process.exitCode = 1
  })
}
