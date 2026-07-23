import { createRouter, createWebHistory } from 'vue-router'
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

export default router
