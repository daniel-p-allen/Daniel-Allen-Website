# Daniel Allen — personal site

My personal site and portfolio: [danielallen.com.au](https://danielallen.com.au)

A three-page Vue 3 application built with Vite and deployed as a static build. No
backend, no database, no server-side code — it compiles to HTML, CSS, JavaScript and
two images, and any static host can serve it.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173, hot reloads
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build:site` | **Production build** — compiles, then prerenders each page |
| `npm run preview` | Serve the built site locally |
| `npm test` | Unit and component tests |
| `npm run test:e2e` | Browser tests, desktop and a 375px phone viewport |
| `npm run check` | Build, prerender, then fail if the output has grown too large |
| `npm run verify` | All three: unit, size check, browser |
| `npm run preview-image` | Regenerate the social preview card (only when it changes) |

Use `build:site`, not `build`. `build` alone produces a page with no content in its
HTML — see below.

Node 20 or newer.

## Prerendering

The site is a single-page app, so a plain `vite build` produces an `index.html`
containing an empty `<div id="app">`. Every word is written by JavaScript once a
browser runs it.

Google executes JavaScript, on a slower second pass. **AI crawlers do not.** GPTBot,
ClaudeBot and PerplexityBot fetch the raw HTML and move on, so a client-rendered site
is invisible to them.

`scripts/prerender.mjs` fixes that: it serves the build, visits each route in a real
browser, waits for the page to render, and writes the result to its own HTML file with
that page's own title, description, canonical URL and structured data.

```
  src/                     npm run build              npm run prerender
  ├── App.vue                    │                            │
  ├── components/                ▼                            │
  ├── views/               ┌───────────┐                      │
  ├── router/       ──────►│   vite    │──► dist/index.html   │
  └── site-meta.js         └───────────┘    (empty <div id="app">)
        │                                          │          │
        │  titles, descriptions,                   ▼          ▼
        │  canonicals, JSON-LD            ┌────────────────────────┐
        └────────────────────────────────►│  headless browser      │
                                          │  renders each route    │
                                          └───────────┬────────────┘
                                                      ▼
                              dist/index.html      284 words
                              dist/about.html      252 words   ──► upload
                              dist/portfolio.html  983 words
                              dist/sitemap.xml, robots.txt, llms.txt
```

`src/site-meta.js` is the single source of truth: the router reads it to update the tab
title as you move between pages, and the prerender step reads it to write the tags into
the static HTML. One file, so the two cannot drift apart — which is how all three pages
ended up sharing a single title in the first place.

```
/            -> dist/index.html        284 words of readable text
/about       -> dist/about.html        252 words
/portfolio   -> dist/portfolio.html    983 words
```

Before this, all three were 0 words and shared a single title — so a search engine saw
one indistinguishable page rather than three.

It uses the Playwright already installed for the tests, so it adds no dependency. That
mattered: the last dependency added here turned out to be incompatible with the build
tool and only failed in CI.

## Layout

```
src/
  App.vue              Header, banner and the routed page below them
  main.js              Entry point
  router/index.js      The three routes, and scroll behaviour
  components/
    TopNav.vue         Site name and tagline
    NewHome.vue        Home page content
    Portfolio.vue      The project list
  views/
    HomeView.vue       Wraps NewHome
    AboutView.vue      About page content
  assets/
    card.css           The card layout shared by all three pages
    banner.jpg         The strip under the header
    dan.jpeg           Photo
public/
  .htaccess            Apache rules for the host: routing, caching, compression
scripts/
  check-build-size.mjs Refuses to ship a bloated build
tests/                 Unit and browser tests
```

The card layout lives in one stylesheet rather than in each component. It was
previously copied into all three — around 150 lines each — and the copies had already
drifted apart.

## Tests

```bash
npm run verify
```

**39 unit tests** (Vitest + Vue Test Utils) and **90 browser tests** (Playwright,
desktop and 375px), plus a build-size check.

The SEO tests read the raw HTML **without executing it**, using Playwright's `request`
rather than `page`. That distinction is the whole point: driving a real browser would
run the JavaScript and every assertion would pass whether or not the HTML contained
anything at all.

Most exist because something was actually wrong. The site was audited in July 2026 and
several findings were the kind that come back quietly, so each has a test holding it
shut:

| Test | The defect it holds shut |
|---|---|
| never points at the bare profile listing | Six of seven project links went to the profile page rather than to the project |
| opens external links without a popup handler | Links used an `onclick` forcing an 800×600 popup — commonly blocked, and it broke middle-click, cmd-click and keyboard use |
| changing page starts at the top | Navigating kept the previous page's scroll position; Home → Portfolio landed 430px down with the heading hidden |
| the page heading is not hidden behind the header | Content tucked under the fixed navigation |
| no horizontal overflow, at 375px | The mobile layout was never verified — a browser window cannot be dragged below about 550px, so only a real phone viewport catches this |
| no video is loaded | A 7.3MB video autoplayed on every page load |
| build size check | An 11MB video that nothing referenced sat in the repository, and nothing was looking |
| does not restate the project list | Home repeated the portfolio at length, in different words, in two places to maintain |
| contains readable text without JavaScript | The HTML held 0 words; everything was rendered client-side, so AI crawlers saw an empty shell |
| gives every page its own title | All three pages shared one title and description — one page, as far as a search engine was concerned |
| unknown paths return 404 | Every unmatched URL returned 200 with the home page, which search engines treat as a soft 404 |
| robots.txt is a real text file | The catch-all rewrite served it as HTML, so the site had no working crawler rules |

**The suite is verified rather than assumed.** Each defect was reintroduced, one at a
time, in a scratch copy of the repository, and the matching test confirmed to fail. A
suite that has only ever passed proves nothing.

[`tests/README.md`](tests/README.md) covers how to run them and how to add one.

## Deploying

The build is a folder of static files, so deployment is a copy.

```bash
npm run check      # build, prerender, and verify the size
```

Upload the **contents** of `dist/` — not the folder itself — to the web root. That
includes `.htaccess`, which is hidden: cPanel's File Manager will not show it unless
**Settings → Show Hidden Files** is turned on, and without it every page except the
home page returns 404 on refresh.

`.htaccess` does four things, each for a reason met in practice:

- **Maps the two named routes** to their prerendered files, `/about` → `about.html`
  and `/portfolio` → `portfolio.html`.
- **Returns a real 404 for anything else.** There is deliberately no catch-all: an
  earlier version sent every unmatched path to `index.html` with a 200, so typos and
  stale links all reported success. Search engines call that a soft 404.
- **Names `index.html` as the directory index.** Apache prefers `index.php`, and an
  unrelated `index.php` in the web root made the site appear blank.
- **Sets caching.** Asset filenames carry a content hash so they can be cached
  indefinitely; the HTML must never be cached, or visitors keep loading a page that
  points at assets which no longer exist.

`scripts/serve-dist.mjs` mirrors these rules for the tests. If the routing changes,
both must change together — and a browser test will say so if they do not.

## Known limitations

- **Part of the project list is unlinked.** Four entries — Collabaccino, TalkSensei,
  the Moyne Shire bin sensor project and the IoT prototypes — have no public
  repository, so they are titles rather than links. A link to a profile listing tells
  the reader nothing.
- **Deployment is manual.** Build, then upload. There is no pipeline from a push to
  the live site.
- **`llms.txt` is speculative.** It is a proposed convention for describing a site to
  AI tools. No major platform has confirmed it changes retrieval, so it is there as a
  statement of intent, not because it is known to work. Prerendered HTML is what
  actually makes the content readable to those crawlers.

## License

MIT — see [`LICENSE`](LICENSE).

## Development notes

The site was designed and written by me. The July 2026 work — an audit of content,
layout, performance and accessibility, the fixes that followed, and the test suite —
was carried out with the assistance of an AI coding assistant (Claude). The design
decisions, the content, and the review of all resulting work are my own.
