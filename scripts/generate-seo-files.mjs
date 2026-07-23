#!/usr/bin/env node
//
// Writes sitemap.xml into the build.
//
// Generated rather than hand-written so it cannot fall out of step with the routes:
// both come from src/site-meta.js. A sitemap listing a page that no longer exists, or
// missing one that does, is worse than none.

import { writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

import { PAGES, SITE_URL } from '../src/site-meta.js'

const DIST = 'dist'

if (!existsSync(DIST)) {
  console.error(`No ${DIST}/ directory. Run "npm run build" first.`)
  process.exit(1)
}

const today = new Date().toISOString().split('T')[0]

const urls = PAGES.map(page => {
  // The home page is the entry point, so it carries more weight than the others.
  const priority = page.path === '/' ? '1.0' : '0.8'
  return [
    '  <url>',
    `    <loc>${SITE_URL}${page.path}</loc>`,
    `    <lastmod>${today}</lastmod>`,
    '    <changefreq>monthly</changefreq>',
    `    <priority>${priority}</priority>`,
    '  </url>'
  ].join('\n')
}).join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">
${urls}
</urlset>
`.replace('www.sitemap.org', 'www.sitemaps.org')

writeFileSync(join(DIST, 'sitemap.xml'), sitemap)

console.log(`Wrote ${DIST}/sitemap.xml — ${PAGES.length} URLs.`)
