import test from 'node:test'
import assert from 'node:assert/strict'
import { canonicalizeUrl, deduplicate, normalizeFeed, stripHtml, fetchSource } from './fetch-news.mjs'

const RSS = `<?xml version="1.0"?>
<rss version="2.0"><channel>
  <title>Example</title>
  <item>
    <title>AI breakthrough &amp; what's next</title>
    <link>https://example.com/news/ai-breakthrough?utm_source=feed#top</link>
    <description>&lt;p&gt;A &lt;b&gt;bold&lt;/b&gt; result.&lt;/p&gt;</description>
    <pubDate>Sat, 18 Jul 2026 08:00:00 GMT</pubDate>
  </item>
  <item>
    <title>Bad link item</title>
    <link>http://insecure.example.com/nope</link>
    <pubDate>Sat, 18 Jul 2026 09:00:00 GMT</pubDate>
  </item>
</channel></rss>`

test('canonicalizeUrl strips tracking params, fragments, and enforces https', () => {
  assert.equal(
    canonicalizeUrl('HTTPS://Example.com/Path/?utm_source=x&id=3#frag'),
    'https://example.com/path?id=3',
  )
  assert.equal(canonicalizeUrl('http://example.com/insecure'), null)
  assert.equal(canonicalizeUrl('not a url'), null)
})

test('deduplicate canonical URLs and keeps the newer item', () => {
  const older = {
    id: 'https://example.com/a', title: 'Old', canonicalUrl: 'https://example.com/a',
    publishedAt: '2026-07-18T06:00:00.000Z',
  }
  const result = deduplicate([older, { ...older, publishedAt: '2026-07-18T08:00:00.000Z', title: 'Updated' }])
  assert.equal(result.length, 1)
  assert.equal(result[0].title, 'Updated')
})

test('deduplicate falls back to normalized title without a URL match', () => {
  const a = { id: '1', title: 'Same  Story!', canonicalUrl: 'https://x.com/1', publishedAt: '2026-07-18T01:00:00.000Z' }
  const b = { id: '2', title: 'same story!', canonicalUrl: 'https://y.com/2', publishedAt: '2026-07-18T02:00:00.000Z' }
  // Different canonical URLs stay separate items.
  assert.equal(deduplicate([a, b]).length, 2)
})

test('stripHtml removes tags and decodes entities', () => {
  assert.equal(stripHtml('<p>Hello &amp; <b>world</b></p>'), 'Hello & world')
})

test('normalizeFeed parses RSS, keeps https items only', () => {
  const items = normalizeFeed(RSS, { name: 'Example', category: 'ai' })
  assert.equal(items.length, 1)
  assert.equal(items[0].canonicalUrl, 'https://example.com/news/ai-breakthrough')
  assert.equal(items[0].category, 'ai')
  assert.equal(items[0].summary, 'A bold result.')
})

test('normalizeFeed parses Atom feeds', () => {
  const atom = `<?xml version="1.0"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <entry>
      <title>Atom item</title>
      <link rel="alternate" href="https://example.com/atom/1"/>
      <updated>2026-07-18T10:00:00Z</updated>
      <summary>Atom summary</summary>
    </entry>
  </feed>`
  const items = normalizeFeed(atom, { name: 'Atom', category: 'general' })
  assert.equal(items.length, 1)
  assert.equal(items[0].title, 'Atom item')
  assert.equal(items[0].publishedAt, '2026-07-18T10:00:00.000Z')
})

test('fetchSource isolates failures', async () => {
  const failing = await fetchSource({ name: 'X', url: 'https://x.test/rss', category: 'ai' }, async () => {
    throw new Error('network down')
  })
  assert.equal(failing.ok, false)
  assert.equal(failing.items.length, 0)
  assert.match(failing.error, /network down/)

  const ok = await fetchSource(
    { name: 'X', url: 'https://x.test/rss', category: 'ai' },
    async () => ({ ok: true, text: async () => RSS }),
  )
  assert.equal(ok.ok, true)
  assert.equal(ok.items.length, 1)
})

test('fetchSource treats non-2xx as failure', async () => {
  const result = await fetchSource({ name: 'X', url: 'https://x.test/rss', category: 'ai' }, async () => ({
    ok: false,
    status: 503,
  }))
  assert.equal(result.ok, false)
  assert.match(result.error, /503/)
})
