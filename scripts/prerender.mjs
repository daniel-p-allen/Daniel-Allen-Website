#!/usr/bin/env node
//
// Turns each route into a real HTML file.
//
// Why this exists: the site is a single-page app, so the built index.html contains an
// empty <div id="app"> and nothing else. Every word is written by JavaScript once the
// browser runs it. Google will execute that, on a slower second pass — but the AI
// crawlers will not. GPTBot, ClaudeBot and PerplexityBot fetch the raw HTML and move
// on, so before this script the site was invisible to them entirely.
//
// It also fixes a second problem: one built index.html meant all three pages shared a
// single title and description, so a search engine could not tell them apart.
//
// The approach is deliberately boring. Playwright is already a dependency for the
// tests, so this borrows it: serve the build, visit each route, wait for it to render,
// and write the resulting HTML back out with that page's own tags. No new packages,
// and nothing that can conflict with the build tooling.

import { writeFileSync, mkdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { spawn } from 'node:child_process'

import { chromium } from '@playwright/test'

import { PAGES, SITE_URL, schemaFor } from '../src/site-meta.js'

const DIST = 'dist'
const PORT = 4179
const ORIGIN = `http://localhost:${PORT}`

// Replace the contents of a single tag in the document head.
function setTag(html, pattern, replacement) {
  return pattern.test(html) ? html.replace(pattern, replacement) : html
}

function applyMeta(html, page) {
  const url = SITE_URL + page.path
  const escape = s => s.replace(/"/g, '&quot;')

  html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${page.title}</title>`)

  html = setTag(
    html,
    /<meta name="description" content="[\s\S]*?">/,
    `<meta name="description" content="${escape(page.description)}">`
  )

  html = setTag(
    html,
    /<meta property="og:title" content="[\s\S]*?">/,
    `<meta property="og:title" content="${escape(page.title)}">`
  )

  html = setTag(
    html,
    /<meta property="og:description" content="[\s\S]*?">/,
    `<meta property="og:description" content="${escape(page.description)}">`
  )

  html = setTag(
    html,
    /<meta property="og:url" content="[\s\S]*?">/,
    `<meta property="og:url" content="${url}">`
  )

  // Canonical: without it, the same page reachable as www / non-www / with a trailing
  // slash looks like several competing copies.
  html = setTag(
    html,
    /<link rel="canonical" href="[\s\S]*?">/,
    `<link rel="canonical" href="${url}">`
  )

  // Structured data for this specific page.
  const schema = JSON.stringify(schemaFor(page), null, 2)
  html = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n${schema}\n    </script>`
  )

  return html
}

function startServer() {
  const server = spawn('npx', ['vite', 'preview', '--port', String(PORT)], {
    stdio: 'ignore',
    detached: false
  })
  return server
}

async function waitForServer(timeoutMs = 30000) {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    try {
      const response = await fetch(ORIGIN)
      if (response.ok) return
    } catch {
      // not up yet
    }
    await new Promise(resolve => setTimeout(resolve, 250))
  }
  throw new Error(`Preview server did not start on ${ORIGIN}`)
}

const server = startServer()
let browser

try {
  await waitForServer()
  browser = await chromium.launch()
  const page = await browser.newPage()

  for (const route of PAGES) {
    await page.goto(ORIGIN + route.path, { waitUntil: 'networkidle' })

    // The app has rendered when the heading is present. Waiting on a real element
    // rather than a timer means a slow machine cannot produce a half-empty page.
    await page.waitForSelector('h2.welcome-headline', { timeout: 15000 })

    let html = await page.content()
    html = applyMeta(html, route)

    const target = join(DIST, route.file)
    mkdirSync(dirname(target), { recursive: true })
    writeFileSync(target, html)

    const text = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ')
    const words = text.split(/\s+/).filter(Boolean).length
    console.log(`  ${route.path.padEnd(11)} -> ${target.padEnd(24)} ${words} words of readable text`)
  }
} finally {
  if (browser) await browser.close()
  server.kill('SIGTERM')
}

console.log(`Prerendered ${PAGES.length} pages.`)
