// Routing.
//
// The scroll behaviour here is the one that produced a visible bug: moving from a
// scrolled page to a new one left the reader part-way down it.

import { describe, it, expect } from 'vitest'

import router from '../../src/router/index.js'

describe('routes', () => {
  const paths = () => router.getRoutes().map(r => r.path)

  it('serves the three pages', () => {
    for (const path of ['/', '/about', '/portfolio']) {
      expect(paths()).toContain(path)
    }
  })

  it('gives each route a name', () => {
    for (const route of router.getRoutes()) {
      expect(route.name).toBeTruthy()
    }
  })
})

describe('scroll position on navigation', () => {
  // Regression. Without a scrollBehaviour, moving from a scrolled Home to Portfolio
  // kept the previous scroll position — measured at 430px down, with the page
  // heading hidden behind the header.
  it('starts a new page at the top', () => {
    expect(router.options.scrollBehavior).toBeTypeOf('function')

    const position = router.options.scrollBehavior({}, {}, null)

    expect(position).toEqual({ top: 0 })
  })

  // Going back should return the reader where they were, which is what the browser's
  // back button is expected to do.
  it('restores the previous position when going back', () => {
    const saved = { top: 250 }

    expect(router.options.scrollBehavior({}, {}, saved)).toEqual(saved)
  })
})
