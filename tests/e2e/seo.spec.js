// What a crawler actually receives.
//
// These read the raw HTML over the network without executing it, which is the whole
// point: Google runs JavaScript, but the AI crawlers do not — they fetch the response
// and move on. Before this site was prerendered, that response contained an empty
// <div id="app"> and nothing else, so it was invisible to them.
//
// `request` rather than `page` here is deliberate. `page` would run the JavaScript and
// every assertion would pass whether or not the HTML contained anything.

import { test, expect } from '@playwright/test'

const ROUTES = [
  { path: '/', title: 'Daniel Allen — Software Developer' },
  { path: '/about', title: 'About — Daniel Allen' },
  { path: '/portfolio', title: 'Portfolio — Daniel Allen' }
]

const SITE = 'https://danielallen.com.au'

const fetchHtml = async (request, path) => (await request.get(path)).text()

const tag = (html, pattern) => {
  const match = html.match(pattern)
  return match ? match[1] : null
}

test.describe('the HTML a crawler receives', () => {
  // Regression, and the reason prerendering exists. This measures readable text with
  // the scripts stripped out — the figure was zero before.
  for (const { path } of ROUTES) {
    test(`${path} contains readable text without JavaScript`, async ({ request }) => {
      const html = await fetchHtml(request, path)

      const body = html.split('<body')[1] || ''
      const text = body
        .replace(/<script[\s\S]*?<\/script>/g, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()

      expect(text.split(' ').length).toBeGreaterThan(100)
    })
  }

  for (const { path } of ROUTES) {
    test(`${path} names the person in its raw HTML`, async ({ request }) => {
      expect(await fetchHtml(request, path)).toContain('Daniel Allen')
    })
  }
})

test.describe('per-page tags', () => {
  // Regression. Every page served the same title and description, so a search engine
  // could not tell them apart and none could rank on its own terms.
  for (const { path, title } of ROUTES) {
    test(`${path} has its own title`, async ({ request }) => {
      const html = await fetchHtml(request, path)

      expect(tag(html, /<title>(.*?)<\/title>/s)).toBe(title)
    })
  }

  test('no two pages share a description', async ({ request }) => {
    const descriptions = []

    for (const { path } of ROUTES) {
      const html = await fetchHtml(request, path)
      descriptions.push(tag(html, /<meta name="description" content="(.*?)">/s))
    }

    expect(descriptions.every(Boolean)).toBe(true)
    expect(new Set(descriptions).size).toBe(ROUTES.length)
  })

  for (const { path } of ROUTES) {
    test(`${path} declares its canonical URL`, async ({ request }) => {
      const html = await fetchHtml(request, path)

      expect(tag(html, /<link rel="canonical" href="(.*?)">/)).toBe(SITE + path)
    })
  }
})

test.describe('link previews', () => {
  for (const { path } of ROUTES) {
    test(`${path} carries an image for social previews`, async ({ request }) => {
      const html = await fetchHtml(request, path)

      expect(tag(html, /<meta property="og:image" content="(.*?)">/)).toContain('preview.jpg')
      expect(tag(html, /<meta name="twitter:card" content="(.*?)">/)).toBe('summary_large_image')
    })
  }

  test('the preview image exists and is the right shape', async ({ request }) => {
    const response = await request.get('/preview.jpg')

    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toContain('image')
  })
})

test.describe('structured data', () => {
  for (const { path } of ROUTES) {
    test(`${path} carries valid JSON-LD`, async ({ request }) => {
      const html = await fetchHtml(request, path)
      const raw = tag(html, /application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/)

      expect(raw).toBeTruthy()

      // Invalid JSON here is worse than none: Google discards the whole block.
      const parsed = JSON.parse(raw)
      const types = parsed['@graph'].map(node => node['@type'])

      expect(types).toContain('Person')
      expect(types).toContain('WebSite')
    })
  }
})

test.describe('crawler files', () => {
  // Regression. robots.txt used to be swallowed by the catch-all rewrite and served as
  // an HTML page, so the site effectively had no crawler rules at all.
  test('robots.txt is a real text file', async ({ request }) => {
    const response = await request.get('/robots.txt')

    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toContain('text/plain')

    const body = await response.text()
    expect(body).toContain('User-agent')
    expect(body).toContain('sitemap.xml')
  })

  test('the sitemap lists every page', async ({ request }) => {
    const response = await request.get('/sitemap.xml')
    expect(response.status()).toBe(200)

    const xml = await response.text()
    for (const { path } of ROUTES) {
      expect(xml).toContain(`<loc>${SITE}${path}</loc>`)
    }
  })

  test('llms.txt is served for AI crawlers', async ({ request }) => {
    const response = await request.get('/llms.txt')

    expect(response.status()).toBe(200)
    expect(await response.text()).toContain('Daniel Allen')
  })
})

// Regression. A catch-all rewrite used to hand every unmatched path to index.html with
// a 200, so a typo, a stale link or a crawler probing for WordPress all received a
// successful page. Search engines call that a soft 404 and treat it as a quality
// problem: it means infinitely many URLs claim to be valid pages.
test.describe('unknown paths', () => {
  for (const path of ['/nonsense', '/wp-admin', '/portfolio/extra', '/index.php']) {
    test(`${path} returns 404, not a page pretending to exist`, async ({ request }) => {
      const response = await request.get(path)

      expect(response.status()).toBe(404)
    })
  }

  // A 404 should still be useful to a person who mistyped, so the body is the site
  // rather than a bare server error — but the status tells the truth.
  test('a 404 still shows something useful', async ({ request }) => {
    const response = await request.get('/nonsense')

    expect(await response.text()).toContain('Daniel Allen')
  })
})
