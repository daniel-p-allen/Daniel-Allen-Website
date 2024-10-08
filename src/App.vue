<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TopNav from './components/TopNav.vue'
import VideoPlayer from './components/VideoPlayer.vue'
</script>
<!-- Setting up the top navigation bar and header for the site -->
<template>
  <header class="header">
    
    <img class="avatar" height="150px" src="./assets/dan.jpeg" alt="Photo of Daniel Allen" />
     
    <div class="wrapper">
      <TopNav msg="Daniel Allen" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/portfolio">Portfolio</RouterLink>
      </nav>
    </div>
    
  </header>
  
  <!-- Including the video effect for the site -->
  <body>
    <div class="video">
    <VideoPlayer class="router-view-cyan"/>
    </div>
    <div class="view-container">
    <!-- This is the encasing div for the router view -->
    <RouterView  />
    </div>
    
  </body>

</template>

<style scoped>
.router-view-cyan {
  background-color: white; 
}

.view-container {
  width: 80%;
  margin-top: 5rem;
  margin-left: 5rem;
  padding: 1.5em;
  box-sizing: border-box;

} 
.avatar {
  height: 150px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 30%;
  margin: 0 30px;
}
.header {
  line-height: 1.3;
  max-height: 100vh;
}

/* This is indicating the active link in the nav bar */
nav a.router-link-exact-active {
  color: rgb(72, 171, 242);
}
/* Not sure why it says no references when these are actually being used... */
nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  color: white;
  padding: 0 1rem;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 400px) {
  header {
    display: flex;
    place-items: center;
  }

  .video {
  width: 100%;
  height: 250px;
  margin-top: 15rem;
  }
  
  .header {
  width: 100%; 
  background-color: #333; 
  color: #fff; 
  position: fixed; 
  top: 0; 
  padding: 10px 0; 
  left: 0; 
  z-index: 999; 
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}

</style>
