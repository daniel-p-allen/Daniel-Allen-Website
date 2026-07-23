// The site in a real browser, against the real production build.
//
// These cover the things unit tests cannot see: whether pages actually load, whether
// the layout survives a phone-sized screen, and whether anything errors at runtime.

import { test, expect } from '@playwright/test'

const PAGES = [
  { path: '/', heading: /Daniel Allen/ },
  { path: '/about', heading: /Daniel Allen/ },
  { path: '/portfolio', heading: /Daniel Allen/ }
]

test.describe('every page loads', () => {
  for (const page_ of PAGES) {
    test(`${page_.path} renders`, async ({ page }) => {
      await page.goto(page_.path)

      await expect(page.locator('h1')).toContainText(page_.heading)
      await expect(page.locator('h2.welcome-headline')).toBeVisible()
    })
  }
})

// Regression. The layout must not scroll sideways. This is the check that the README
// has always implied by claiming a responsive, mobile-first layout, and the one a
// reviewer performs in four seconds by dragging their window.
test.describe('no horizontal overflow', () => {
  for (const { path } of PAGES) {
    test(`${path} fits its viewport`, async ({ page }) => {
      await page.goto(path)

      const overflow = await page.evaluate(() => {
        const de = document.documentElement
        return { scrollWidth: de.scrollWidth, clientWidth: de.clientWidth }
      })

      // One pixel of slack for sub-pixel rounding.
      expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1)
    })
  }
})

// Regression. On a narrow screen the heading band stacks into a column, and the
// flex-basis written for width then applies to height — reserving 300px of empty
// space under the heading. Nothing about horizontal overflow catches this, so it is
// measured directly: the block holding the heading should be about as tall as the
// heading, not hundreds of pixels taller.
test.describe('the heading band has no dead space', () => {
  for (const { path } of PAGES) {
    test(`${path} sizes its heading block to its content`, async ({ page }) => {
      await page.goto(path)

      const slack = await page.evaluate(() => {
        const block = document.querySelector('.title-text-content')
        const heading = document.querySelector('.title-text-content .welcome-headline')
        return block.getBoundingClientRect().height - heading.getBoundingClientRect().height
      })

      expect(slack).toBeLessThan(40)
    })
  }
})

// Regression. Navigating used to keep the previous page's scroll position, so moving
// from a scrolled Home to Portfolio landed 430px down with the heading hidden behind
// the header.
test('changing page starts at the top', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => window.scrollTo(0, 400))
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(100)

  await page.getByRole('link', { name: 'Portfolio', exact: true }).click()
  await expect(page).toHaveURL(/\/portfolio$/)

  expect(await page.evaluate(() => window.scrollY)).toBeLessThan(5)
})

// The header is sticky, so the heading of a freshly opened page must not sit behind
// it. This is what "content tucked under the navigation" looked like before.
test('the page heading is not hidden behind the header', async ({ page }) => {
  await page.goto('/portfolio')

  const clear = await page.evaluate(() => {
    const header = document.querySelector('.site-header').getBoundingClientRect()
    const heading = document.querySelector('h2.welcome-headline').getBoundingClientRect()
    return heading.top >= header.bottom
  })

  expect(clear).toBe(true)
})

test('the pages are reachable from the navigation', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('link', { name: 'About', exact: true }).click()
  await expect(page).toHaveURL(/\/about$/)

  await page.getByRole('link', { name: 'Portfolio', exact: true }).click()
  await expect(page).toHaveURL(/\/portfolio$/)

  await page.getByRole('link', { name: 'Home', exact: true }).click()
  await expect(page).toHaveURL(/\/$/)
})

test.describe('nothing errors at runtime', () => {
  for (const { path } of PAGES) {
    test(`${path} logs no console errors`, async ({ page }) => {
      const errors = []
      page.on('console', message => {
        if (message.type() === 'error') errors.push(message.text())
      })
      page.on('pageerror', error => errors.push(error.message))

      await page.goto(path)
      await page.waitForLoadState('networkidle')

      expect(errors).toEqual([])
    })
  }
})

test('the page describes itself for search and link previews', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/Daniel Allen/)

  const description = await page.locator('meta[name="description"]').getAttribute('content')
  expect(description).toBeTruthy()
  expect(description.length).toBeGreaterThan(50)

  const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content')
  expect(ogTitle).toBeTruthy()
})

// The video this replaced was 7.3MB and played on every page load.
test('no video is loaded', async ({ page }) => {
  const media = []
  page.on('request', request => {
    if (/\.(mp4|webm|mov)$/i.test(request.url())) media.push(request.url())
  })

  await page.goto('/')
  await page.waitForLoadState('networkidle')

  expect(media).toEqual([])
})
