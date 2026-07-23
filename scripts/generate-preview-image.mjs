#!/usr/bin/env node
//
// Builds public/preview.jpg — the 1200x630 card shown when the site's URL is pasted
// into LinkedIn, Slack, a message or a search result preview. Without one, a shared
// link is a bare line of text.
//
// Composed from what the site already uses: the photo and the banner strip. Nothing
// new is invented, so the card looks like the site it links to.
//
// Rendered by screenshotting a small HTML layout with Playwright, which is already a
// dependency for the tests. Run it only when the design or wording changes — the
// result is committed, because a build must not depend on a browser being present.
//
// Usage: node scripts/generate-preview-image.mjs

import { readFileSync, writeFileSync } from 'node:fs'

import { chromium } from '@playwright/test'

const photo = readFileSync('src/assets/dan.jpeg').toString('base64')
const banner = readFileSync('src/assets/banner.jpg').toString('base64')

const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500" rel="stylesheet">
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        width: 1200px; height: 630px;
        font-family: 'Montserrat', Helvetica, Arial, sans-serif;
        background: #1b1b1b; color: #fff;
        display: flex; flex-direction: column;
      }
      .banner {
        height: 120px;
        background-image: url('data:image/jpeg;base64,${banner}');
        background-size: cover; background-position: center;
      }
      .body {
        flex: 1; display: flex; align-items: center;
        gap: 56px; padding: 0 72px;
      }
      .photo {
        width: 260px; height: 260px; flex-shrink: 0;
        border-radius: 30%; object-fit: cover;
        border: 2px solid rgba(255,255,255,0.35);
      }
      h1 { font-size: 62px; font-weight: 500; line-height: 1.1; margin-bottom: 18px; }
      p  { font-size: 29px; font-weight: 300; line-height: 1.4; color: rgb(225,225,225); }
      .rule { height: 6px; width: 130px; margin: 26px 0 22px;
              background: linear-gradient(90deg, rgb(72,171,242), #ff5e62); border-radius: 3px; }
      .url { font-size: 24px; color: rgb(72,171,242); margin-top: 26px; }
    </style>
  </head>
  <body>
    <div class="banner"></div>
    <div class="body">
      <img class="photo" src="data:image/jpeg;base64,${photo}" alt="">
      <div>
        <h1>Daniel Allen</h1>
        <div class="rule"></div>
        <p>Software developer — practical systems,<br>built to be tested and understood.</p>
        <div class="url">danielallen.com.au</div>
      </div>
    </div>
  </body>
</html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })

await page.setContent(html, { waitUntil: 'networkidle' })
const image = await page.screenshot({ type: 'jpeg', quality: 88 })

await browser.close()

writeFileSync('public/preview.jpg', image)

console.log(`Wrote public/preview.jpg — ${(image.length / 1024).toFixed(0)}KB, 1200x630.`)
