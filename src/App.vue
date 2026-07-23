<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TopNav from './components/TopNav.vue'
</script>

<template>
  <!-- Header and banner travel together and stick to the top as one unit.
       Sticky rather than fixed, so they stay in normal document flow and the page
       content below simply starts underneath them. The previous version positioned
       both fixed and then pushed the content down by hand-tuned offsets, which is why
       content tucked under the navigation whenever the header's height changed. -->
  <div class="site-top">
    <header class="site-header">
      <div class="wrapper">
        <TopNav msg="Daniel Allen" />
        <nav class="main-nav" aria-label="Main">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/portfolio">Portfolio</RouterLink>
        </nav>
      </div>
    </header>

    <!-- A still frame from the original background video, in place of the video
         itself. The video was 7.3MB and autoplayed on every page load; this is the
         same image at 65KB. Decorative, so it is hidden from screen readers. -->
    <div class="banner" aria-hidden="true"></div>
  </div>

  <main class="page-body">
    <RouterView />
  </main>
</template>

<style scoped>
.site-top {
  position: sticky;
  top: 0;
  z-index: 999;
}

/* min-height, not height. A fixed height clipped the navigation as soon as the
   tagline grew long enough to push it past 150px. */
.site-header {
  width: 100%;
  background-color: var(--surface);
  color: var(--text);
  display: flex;
  align-items: flex-start;
  line-height: 1.3;
  border-bottom: 1px solid rgba(255,255,255,0.15);
  min-height: var(--header-height);
  box-sizing: border-box;
  padding: 0 20px 1rem 300px;
}

.wrapper {
  display: flex;
  flex-direction: column;
  color: #fff;
}

.main-nav {
  margin-top: 1rem;
  font-size: 1rem;
}

.main-nav a {
  display: inline-block;
  color: white;
  padding-right: 1rem;
  text-decoration: none;
}

.main-nav a.router-link-exact-active {
  color: rgb(72, 171, 242);
}

.main-nav a.router-link-exact-active:hover {
  background-color: transparent;
}

.banner {
  width: 100%;
  height: var(--banner-height);
  background-color: #120a08;
  background-image: url('./assets/banner.jpg');
  background-size: cover;
  background-position: center;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

/* No header offset needed: the header and banner are in normal flow above this, so
   the content already starts below them whatever height they end up. */
.page-body {
  margin: 0 auto;
  padding: 2rem 1rem 4rem;
  width: 100%;
  max-width: var(--page-max-width);
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif, Helvetica, Arial;
  color: var(--text);
}

@media (max-width: 1200px) {
  .site-header {
    padding-left: 200px;
  }
}

@media (max-width: 800px) {
  .site-header {
    padding-left: 100px;
  }
}

@media (max-width: 600px) {
  .site-header {
    flex-direction: row;
    align-items: flex-start;
    padding: 1rem;
    min-height: 170px;
    padding-left: 40px;
    padding-right: 20px;
  }

  .main-nav {
    font-size: 0.9rem;
    flex-wrap: wrap;
    line-height: 1.6;
  }

  .main-nav a {
    padding-right: 0.75rem;
  }

  .video-strip {
    padding-top: 170px;
    max-height: 150px;
  }

  .page-body {
    margin-top: -30px;
    padding: 1rem;
  }
}
</style>
