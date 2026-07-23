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
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built site locally |
| `npm test` | Unit and component tests |
| `npm run test:e2e` | Browser tests, desktop and a 375px phone viewport |
| `npm run check` | Build, then fail if the output has grown too large |
| `npm run verify` | All three: unit, size check, browser |

Node 20 or newer.

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

**24 unit tests** (Vitest + Vue Test Utils) and **28 browser tests** (Playwright,
desktop and 375px), plus a build-size check.

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

**The suite is verified rather than assumed.** Each defect was reintroduced, one at a
time, in a scratch copy of the repository, and the matching test confirmed to fail. A
suite that has only ever passed proves nothing.

[`tests/README.md`](tests/README.md) covers how to run them and how to add one.

## Deploying

The build is a folder of static files, so deployment is a copy.

```bash
npm run check      # build, and verify the size
```

Upload the **contents** of `dist/` — not the folder itself — to the web root. That
includes `.htaccess`, which is hidden: cPanel's File Manager will not show it unless
**Settings → Show Hidden Files** is turned on, and without it every page except the
home page returns 404 on refresh.

`.htaccess` does three things, each for a reason met in practice:

- **Serves `index.html` for unknown paths.** The router handles `/about` and
  `/portfolio` in the browser; no files exist at those paths, so Apache would
  otherwise return 404.
- **Names `index.html` as the directory index.** Apache prefers `index.php`, and an
  unrelated `index.php` in the web root made the site appear blank.
- **Sets caching.** Asset filenames carry a content hash so they can be cached
  indefinitely; `index.html` must never be cached, or visitors keep loading a page
  that points at assets which no longer exist.

## Known limitations

- **Part of the project list is unlinked.** Four entries — Collabaccino, TalkSensei,
  the Moyne Shire bin sensor project and the IoT prototypes — have no public
  repository, so they are titles rather than links. A link to a profile listing tells
  the reader nothing.
- **Deployment is manual.** Build, then upload. There is no pipeline from a push to
  the live site.
- **No `og:image`.** Link previews show the title and description but no picture.

## License

MIT — see [`LICENSE`](LICENSE).

## Development notes

The site was designed and written by me. The July 2026 work — an audit of content,
layout, performance and accessibility, the fixes that followed, and the test suite —
was carried out with the assistance of an AI coding assistant (Claude). The design
decisions, the content, and the review of all resulting work are my own.
