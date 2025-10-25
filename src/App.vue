<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TopNav from './components/TopNav.vue'
import VideoPlayer from './components/VideoPlayer.vue'
</script>

<template>
  <header class="site-header">
    <div class="wrapper">
      <TopNav msg="Daniel Allen" />
      <nav class="main-nav">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/portfolio">Portfolio</RouterLink>
      </nav>
    </div>
  </header>

  <section class="video-strip">
    <VideoPlayer />
  </section>

  <main class="page-body">
    <RouterView />
  </main>
</template>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  background-color: #333;
  color: #fff;
  display: flex;
  align-items: flex-start;
  line-height: 1.3;
  border-bottom: 1px solid rgba(255,255,255,0.15);
  min-height: 150px;
  box-sizing: border-box;
  padding-right: 20px;
  padding-left: 300px;
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

.video-strip {
  position: relative;
  padding-top: 160px;  /* space equal to or slightly larger than your header height */
  margin-top: 0;       /* remove the negative margin that was pulling it upward */
  max-height: 110px;   /* show a bit more of the video */
  overflow: hidden;
  background: black;
}



.page-body {
  margin-top: -40px;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
  box-sizing: border-box;
  position: relative;
  z-index: 10;
  font-family: 'Montserrat', sans-serif, Helvetica, Arial;
  color: #fff;
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
