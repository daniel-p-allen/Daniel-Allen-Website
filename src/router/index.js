import { createRouter, createWebHistory } from 'vue-router'

import { pageFor, SITE_URL } from '../site-meta.js'
import HomeView from '../views/HomeView.vue'
import Portfolio from '../components/Portfolio.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  // Without this, changing page keeps the scroll position of the previous one — so
  // moving from a scrolled Home to Portfolio landed part-way down the project list
  // with the heading hidden behind the fixed header. Going back still restores where
  // the visitor was, which is what the browser buttons are expected to do.
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  },

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: Portfolio
    }
  ]
})

// Keep the tab title in step with the page. The prerendered HTML already carries the
// right title when a page is first loaded; this handles moving between pages after
// that, when no new document is fetched.
router.afterEach(to => {
  const page = pageFor(to.path)
  document.title = page.title

  const description = document.querySelector('meta[name="description"]')
  if (description) description.setAttribute('content', page.description)

  const canonical = document.querySelector('link[rel="canonical"]')
  if (canonical) canonical.setAttribute('href', SITE_URL + to.path)
})

export default router
