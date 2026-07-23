// Home, About and the header.
//
// Mostly guarding things that are easy to break without noticing: heading structure,
// link safety, and the two pages not drifting back into repeating each other.

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import NewHome from '../../src/components/NewHome.vue'
import AboutView from '../../src/views/AboutView.vue'
import TopNav from '../../src/components/TopNav.vue'

const stubs = { global: { stubs: { RouterLink: { template: '<a><slot /></a>' } } } }

describe('the home page', () => {
  it('introduces who this is', () => {
    expect(mount(NewHome, stubs).text()).toContain('Daniel Allen')
  })

  it('has a real heading element', () => {
    expect(mount(NewHome, stubs).find('h2.welcome-headline').exists()).toBe(true)
  })

  it('sends the reader to the portfolio', () => {
    expect(mount(NewHome, stubs).text().toLowerCase()).toContain('portfolio')
  })

  // The home page used to repeat, at length, the same projects the portfolio lists —
  // two descriptions of the same work, in different words, in two places to maintain.
  it('does not restate the project list', () => {
    const text = mount(NewHome, stubs).text()

    for (const project of ['Collabaccino', 'TalkSensei', 'Bin Boys']) {
      expect(text).not.toContain(project)
    }
  })

  it('opens external links safely', () => {
    for (const link of mount(NewHome, stubs).findAll('a[href^="http"]')) {
      expect(link.attributes('onclick')).toBeUndefined()
      expect(link.attributes('rel')).toContain('noopener')
    }
  })
})

describe('the about page', () => {
  it('has a real heading element', () => {
    expect(mount(AboutView, stubs).find('h2.welcome-headline').exists()).toBe(true)
  })

  it('describes the person, not the website', () => {
    expect(mount(AboutView, stubs).text().length).toBeGreaterThan(300)
  })
})

describe('the site header', () => {
  it('shows the name it is given', () => {
    const wrapper = mount(TopNav, { props: { msg: 'Daniel Allen' } })

    expect(wrapper.find('h1').text()).toBe('Daniel Allen')
  })

  // One h1 per page, and it belongs to the site rather than to a card.
  it('is the only h1', () => {
    const wrapper = mount(TopNav, { props: { msg: 'Daniel Allen' } })

    expect(wrapper.findAll('h1').length).toBe(1)
  })

  // The old tagline described the website rather than the work.
  it('describes the work rather than the site', () => {
    const wrapper = mount(TopNav, { props: { msg: 'Daniel Allen' } })

    expect(wrapper.text().toLowerCase()).not.toContain('minimalist online location')
  })
})
