#!/usr/bin/env node
//
// Serves dist/ the way the web host does, for the browser tests.
//
// `vite preview` cannot be used for this: it falls back to index.html for any unknown
// path, so /about would return the home page and every per-page assertion would pass
// against the wrong document. The tests would look green while proving nothing.
//
// The rules here mirror public/.htaccess deliberately — real files as-is, the two
// named routes mapped to their prerendered files, everything else a genuine 404. If
// the routing changes, both must change together, and a browser test will say so.
//
// Usage: node scripts/serve-dist.mjs [port]

import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { join, extname, normalize } from 'node:path'

const DIST = 'dist'
const PORT = Number(process.argv[2]) || 4173

// Mirrors the RewriteRules in public/.htaccess.
const ROUTES = {
  '/': 'index.html',
  '/about': 'about.html',
  '/portfolio': 'portfolio.html'
}

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
}

const exists = async path => {
  try {
    return (await stat(path)).isFile()
  } catch {
    return false
  }
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url, `http://localhost:${PORT}`)
  // Strip a trailing slash so /about/ and /about resolve the same way, as Apache does.
  const path = url.pathname.replace(/\/+$/, '') || '/'

  // A real file wins, exactly as the -f condition does in .htaccess.
  const direct = join(DIST, normalize(path).replace(/^(\.\.[/\\])+/, ''))
  const target = (await exists(direct)) ? direct : ROUTES[path] && join(DIST, ROUTES[path])

  if (!target || !(await exists(target))) {
    // No catch-all. An unknown path is a 404, which is what the host now returns and
    // what stops search engines seeing endless duplicate pages.
    response.writeHead(404, { 'content-type': 'text/html; charset=utf-8' })
    response.end(await readFile(join(DIST, 'index.html')).catch(() => 'Not found'))
    return
  }

  response.writeHead(200, {
    'content-type': TYPES[extname(target)] || 'application/octet-stream'
  })
  response.end(await readFile(target))
})

server.listen(PORT, () => {
  console.log(`Serving ${DIST}/ on http://localhost:${PORT} with the host's routing rules.`)
})
