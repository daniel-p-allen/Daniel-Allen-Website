#!/usr/bin/env node
//
// Refuse to ship a bloated site.
//
// This repository once carried an 11MB video that nothing referenced, and served a
// 7.3MB autoplaying video to every visitor before they saw any content — while the
// entire rest of the build was under 100KB. Nothing caught it, because nothing was
// looking. This is what looks.
//
// It is deliberately the same shape as the credential scanners in my other repos:
// a small committed check, wired into the build entry point and into CI, written for
// the failure this particular repository actually has.
//
// Usage: node scripts/check-build-size.mjs   (run after `npm run build`)

import { readdirSync, statSync, existsSync } from 'node:fs'
import { join, extname } from 'node:path'

const DIST = 'dist'

// Chosen against the real build, which is about 250KB. Generous enough that ordinary
// work never trips it, tight enough that a stray video cannot slip through.
const LIMITS = {
  totalKB: 600,
  singleFileKB: 250
}

// Media that has no business being in a static portfolio build. Video is what went
// wrong here before; the rest are listed because they fail the same way.
const BANNED_EXTENSIONS = ['.mp4', '.mov', '.avi', '.webm', '.mkv', '.zip']

function walk(dir) {
  const found = []
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry)
    const stats = statSync(path)
    if (stats.isDirectory()) {
      found.push(...walk(path))
    } else {
      found.push({ path, kb: stats.size / 1024 })
    }
  }
  return found
}

if (!existsSync(DIST)) {
  console.error(`No ${DIST}/ directory. Run "npm run build" first.`)
  process.exit(1)
}

const files = walk(DIST)
const totalKB = files.reduce((sum, f) => sum + f.kb, 0)
const problems = []

if (totalKB > LIMITS.totalKB) {
  problems.push(
    `the build is ${totalKB.toFixed(0)}KB, over the ${LIMITS.totalKB}KB limit`
  )
}

for (const file of files) {
  if (file.kb > LIMITS.singleFileKB) {
    problems.push(
      `${file.path} is ${file.kb.toFixed(0)}KB, over the ${LIMITS.singleFileKB}KB per-file limit`
    )
  }
  if (BANNED_EXTENSIONS.includes(extname(file.path).toLowerCase())) {
    problems.push(`${file.path} is a media type that does not belong in the build`)
  }
}

console.log(`Checking ${DIST}/ — ${files.length} files, ${totalKB.toFixed(0)}KB total.`)

if (problems.length > 0) {
  console.error('\nBuild size check FAILED:')
  for (const problem of problems) console.error(`  - ${problem}`)
  console.error(
    '\nIf the growth is deliberate, raise the limit in this script in the same commit,' +
    '\nso the decision is visible in the history rather than silently absorbed.'
  )
  process.exit(1)
}

console.log(`OK — under ${LIMITS.totalKB}KB, no oversized or banned files.`)
