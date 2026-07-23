// The portfolio list.
//
// This page is the reason the site exists, so the tests here are mostly about it
// being honest: every link goes somewhere real, and nothing claims a project that
// is not there.

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import Portfolio from '../../src/components/Portfolio.vue'

// RouterLink is not registered outside a real router, so it is replaced with a plain
// anchor. The tests here are about the project list, not about routing.
const mountPortfolio = () =>
  mount(Portfolio, {
    global: { stubs: { RouterLink: { template: '<a><slot /></a>' } } }
  })

describe('the project list', () => {
  // Five projects with a public repository, plus one panel gathering the four that
  // have none. They were separate rows of unlinked text before, which read as four
  // thin entries rather than one group.
  it('renders a row for every project', () => {
    const rows = mountPortfolio().findAll('.project-row')
    expect(rows.length).toBe(6)
  })

  it('gathers the projects without a repository into one panel', () => {
    const wrapper = mountPortfolio()
    const other = wrapper.findAll('.project-row').at(-1)

    expect(other.find('.project-name').text()).toBe('Other Projects')

    // Each of the four is still described, just in one place.
    for (const project of ['Collabaccino', 'Moyne Shire', 'TalkSensei', 'IoT']) {
      expect(other.text()).toContain(project)
    }
  })

  // The site is live, tested and documented, so it belongs with the strongest work
  // rather than halfway down the page.
  it('places the personal website among the first three', () => {
    const titles = mountPortfolio()
      .findAll('.project-row')
      .slice(0, 3)
      .map(row => row.find('.project-name').text())
      .join(' ')

    expect(titles).toContain('danielallen.com.au')
  })

  it('gives every row a title', () => {
    const rows = mountPortfolio().findAll('.project-row')

    for (const row of rows) {
      const title = row.find('.project-name').text().trim()
      expect(title.length).toBeGreaterThan(3)
    }
  })

  it('gives every row a description', () => {
    const rows = mountPortfolio().findAll('.project-row')

    for (const row of rows) {
      expect(row.find('.project-desc').text().trim().length).toBeGreaterThan(40)
    }
  })
})

describe('project links', () => {
  const projectLinks = () =>
    mountPortfolio()
      .findAll('.project-name a')
      .map(a => a.attributes('href'))

  // Regression. Six of the seven projects used to link to the profile listing rather
  // than to the project, so clicking "Full Stack News App" landed the reader on a
  // directory of repositories with no indication which one was meant.
  it('never points at the bare profile listing', () => {
    for (const href of projectLinks()) {
      expect(href).not.toBe('https://github.com/daniel-p-allen/')
    }
  })

  it('points at a specific repository, not just the account', () => {
    for (const href of projectLinks()) {
      expect(href).toMatch(/^https:\/\/github\.com\/daniel-p-allen\/.+/)
    }
  })

  // The two repositories with test suites and CI are the strongest evidence on the
  // page, so they belong on it.
  it('includes the two repositories that carry test suites', () => {
    const hrefs = projectLinks().join(' ')

    expect(hrefs).toContain('llm-anonymizer')
    expect(hrefs).toContain('grocery-management-system')
  })

  it('leads with those two', () => {
    const first = projectLinks().slice(0, 2).join(' ')

    expect(first).toContain('llm-anonymizer')
    expect(first).toContain('grocery-management-system')
  })

  // Regression. Links used to open through an onclick handler that forced an 800x600
  // popup. Popup blockers ate them, and middle-click, cmd-click and keyboard
  // activation all behaved differently from an ordinary link.
  it('opens external links without a popup handler', () => {
    const wrapper = mountPortfolio()

    for (const link of wrapper.findAll('a[href^="http"]')) {
      expect(link.attributes('onclick')).toBeUndefined()
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toContain('noopener')
    }
  })
})

describe('the page heading', () => {
  // The card title used to be a div, leaving the document with a single h1 and no
  // outline beneath it for a screen reader to navigate.
  it('is a real heading element', () => {
    expect(mountPortfolio().find('h2.welcome-headline').exists()).toBe(true)
  })
})

describe('the introduction', () => {
  // The page carried "Note: Still setting up the projects." long after it stopped
  // being true, which reads as an unfinished site.
  it('does not describe the site as unfinished', () => {
    const text = mountPortfolio().text().toLowerCase()

    expect(text).not.toContain('still setting up')
  })
})
