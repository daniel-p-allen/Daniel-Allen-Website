# Tests

## Running them

From the repository root:

```bash
npm run verify     # everything: unit, build size, browser
```

Or individually while working:

```bash
npm test                    # unit and component tests
npm run test:watch          # the same, re-running as you edit
npm run check               # build, then check the size of the output
npm run test:e2e            # browser tests
npx vitest run portfolio    # one unit file
npx playwright test --ui    # browser tests with a visual runner
```

The browser tests build the site and start a preview server themselves — nothing to
start first. The first run downloads Chromium, so it is slower than the rest.

## What is here

```
tests/
  unit/
    portfolio.test.js   the project list: links, ordering, structure
    pages.test.js       Home, About, and the header
    router.test.js      the three routes, and scroll behaviour
  e2e/
    site.spec.js        the built site in a real browser
```

## How they are split

**Unit tests** (Vitest + Vue Test Utils) mount a single component and inspect what it
renders. They are fast and precise: a failure names the component and the assertion.
They cannot see layout, because jsdom does not lay anything out — it has no idea how
wide the page is.

**Browser tests** (Playwright) load the real production build in a real browser and
drive it. Slower and blunter, but they are the only ones that can see whether the page
overflows sideways, whether the heading is hidden behind the sticky header, or whether
anything errors at runtime.

Both projects in `playwright.config.js` run every test: `desktop` at 1280px and
`mobile` at 375px. The mobile one matters more than it looks — **a browser window
cannot be dragged narrower than about 550px**, so during the audit the phone layout
could not be checked by hand at all. A 375px viewport is the only way, and it caught a
real bug: the heading band reserved 300px of empty space because a flex-basis meant
for width became a height once the band stacked.

## The build-size check

`scripts/check-build-size.mjs` fails if `dist/` exceeds 600KB, if any single file
exceeds 250KB, or if a video ever appears in the build.

It exists because this repository carried an **11MB video that nothing referenced**,
and shipped a **7.3MB autoplaying video** to every visitor while the entire rest of the
build was under 100KB. Nothing caught it because nothing was looking.

It is deliberately the same shape as the credential scanners in my other repositories:
a small committed check, wired into a build entry point and into CI, written for the
failure this particular repository actually has.

If a build legitimately needs to grow, raise the limit **in the same commit**, so the
decision appears in the history rather than being absorbed silently.

## Why particular tests exist

Most of them pin a defect found during the July 2026 audit. The table in the root
[`README.md`](../README.md) lists each test against the problem it prevents.

The principle: a fix without a test is a fix that comes back. Every defect worth
fixing was worth a test, and each of those tests was checked by putting the defect
back and confirming the test failed.

## Adding a test

1. Decide which kind you need. If it is about **what a component renders**, it is a
   unit test. If it is about **how the page behaves or looks**, it is a browser test.
2. Copy the shape of an existing test in the matching file.
3. Name it as a statement of the behaviour — "changing page starts at the top" rather
   than "test scroll". A failing test should read as a sentence describing what broke.
4. If it guards a bug you just fixed, **reintroduce the bug and confirm the test
   fails** before you commit. In a scratch copy, never in the working tree.

Unit tests stub `RouterLink`, since there is no router outside the app; see the top of
`tests/unit/portfolio.test.js`.
