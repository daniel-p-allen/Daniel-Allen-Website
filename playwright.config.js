import { defineConfig, devices } from '@playwright/test'

// End-to-end tests run against the real production build, not the dev server, so
// what is tested is what gets uploaded — including the router and asset paths, which
// behave differently once built.
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'list' : 'line',

  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry'
  },

  // Desktop and a real phone viewport. The phone case matters: a browser window
  // cannot be dragged narrower than about 550px, so 375px can only be tested this
  // way — and the README claims a mobile-first layout.
  //
  // A 375px Chromium viewport rather than the iPhone SE descriptor, which selects
  // WebKit and would mean installing and maintaining a second browser in CI. What is
  // being tested here is the layout at that width, not Safari's rendering.
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'mobile',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 375, height: 667 },
        isMobile: false
      }
    }
  ],

  // Builds, prerenders, then serves through a server that mirrors the host's routing.
  // vite preview cannot be used: it falls back to index.html for unknown paths, so
  // /about would quietly return the home page and the per-page tests would pass
  // against the wrong document.
  webServer: {
    command: 'npm run build:site && node scripts/serve-dist.mjs 4173',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000
  }
})
