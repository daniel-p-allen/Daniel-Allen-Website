// Page metadata and structured data.
//
// These check the source of truth rather than the built output — the built files are
// covered by the browser tests, which read the real HTML. The point here is that no
// two pages can end up sharing a title or description again, which is the state the
// site was in before: three pages, one set of tags, indistinguishable to a search
// engine.

import { describe, it, expect } from 'vitest'

import { PAGES, SITE_URL, pageFor, schemaFor } from '../../src/site-meta.js'

describe('page metadata', () => {
  it('covers every route', () => {
    expect(PAGES.map(p => p.path).sort()).toEqual(['/', '/about', '/portfolio'])
  })

  // Regression. All three pages once shared one title, so search engines saw a single
  // page rather than three, and none could rank for anything of its own.
  it('gives every page its own title', () => {
    const titles = PAGES.map(p => p.title)

    expect(new Set(titles).size).toBe(PAGES.length)
  })

  it('gives every page its own description', () => {
    const descriptions = PAGES.map(p => p.description)

    expect(new Set(descriptions).size).toBe(PAGES.length)
  })

  // Search results truncate well outside these bounds, so a title that is too short
  // wastes the slot and one that is too long is cut off mid-word.
  it('keeps titles to a sensible length', () => {
    for (const page of PAGES) {
      expect(page.title.length).toBeGreaterThan(10)
      expect(page.title.length).toBeLessThanOrEqual(60)
    }
  })

  it('keeps descriptions to a sensible length', () => {
    for (const page of PAGES) {
      expect(page.description.length).toBeGreaterThan(70)
      expect(page.description.length).toBeLessThanOrEqual(320)
    }
  })

  it('names the person in every title', () => {
    for (const page of PAGES) {
      expect(page.title).toContain('Daniel Allen')
    }
  })

  it('writes each page to its own file', () => {
    const files = PAGES.map(p => p.file)

    expect(new Set(files).size).toBe(PAGES.length)
  })

  it('falls back to the home page for an unknown path', () => {
    expect(pageFor('/nonsense').path).toBe('/')
  })
})

describe('structured data', () => {
  it('describes the person, the site and the page', () => {
    const types = schemaFor(PAGES[0])['@graph'].map(node => node['@type'])

    expect(types).toContain('Person')
    expect(types).toContain('WebSite')
  })

  // The about page is the one actually about the person, so it gets the more specific
  // type. Google uses this to decide what the page is for.
  it('marks the about page as a profile', () => {
    const about = PAGES.find(p => p.path === '/about')
    const types = schemaFor(about)['@graph'].map(node => node['@type'])

    expect(types).toContain('ProfilePage')
  })

  it('links the external profiles to the same person', () => {
    const person = schemaFor(PAGES[0])['@graph'].find(n => n['@type'] === 'Person')

    expect(person.sameAs).toContain('https://github.com/daniel-p-allen')
    expect(person.sameAs.join(' ')).toContain('linkedin.com')
  })

  // Entities reference each other by @id. Without stable identifiers the three nodes
  // are unrelated objects that happen to sit in the same file.
  it('ties the nodes together by identifier', () => {
    const graph = schemaFor(PAGES[0])['@graph']
    const person = graph.find(n => n['@type'] === 'Person')
    const website = graph.find(n => n['@type'] === 'WebSite')

    expect(person['@id']).toBe(`${SITE_URL}/#person`)
    expect(website.publisher['@id']).toBe(person['@id'])
  })

  it('gives each page its own canonical URL in the graph', () => {
    for (const page of PAGES) {
      const node = schemaFor(page)['@graph'].find(n => n.url === SITE_URL + page.path)

      expect(node).toBeDefined()
    }
  })
})
