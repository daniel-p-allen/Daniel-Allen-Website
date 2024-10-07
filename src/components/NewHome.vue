<script setup>
// Imports required
import ContactForm from './contact.vue'; 

</script>

<template>
<div class="about-card">
  <div class="card-title">

    <img class="avatar" height="150px" src="../assets/dan.jpeg" alt="Photo of Daniel Allen" />
    <div class="title-text-content">  
      <h1>Home Page Welcome</h1>
      
    </div>

  </div>
  <div class="card-content">
    <p>Welcome to my portfolio, built with precision using the Vue framework. Here, you'll find a curated showcase of my current projects from Deakin University alongside past creations that stemmed from my personal passion for programming. Delve in to explore both my academic and hobbyist endeavors.</p>
    
    <h3>Explore Further</h3>
    <p>Feel free to navigate through the website to see my accomplishments. For direct communication, make use of the contact form provided below. Additionally, you'll find links to my social media profiles. I'm eager to connect and discuss potential collaboration, employment, or placement opportunities.</p>
  </div>
 
  <div class="card-content">
    <h3>Contact Me</h3>
    <p>Feel free to contact me via the form below. I'll endeavour to respond to your message as soon as possible.</p>
    <!-- Main contact form and example for all of the various coding options -->
    <div class="card-content">
    <ContactForm />
    </div>

  </div>   
 
</div>
</template>

<style scoped>
.about-card {
  min-height: calc(100vh - 150px);
  background: #333;
  padding: 2em;
  border-radius: 10px;
  color: white;
}

.about-card .card-title {
  display: flex;
  padding: 0.5em;
  align-items: center;
  background: #222;
  border-radius: 20px;
}

.about-card .card-title .avatar {
  height: 150px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 30%;
  margin: 0 30px;
}

.about-card .title-text-content p {
  margin-bottom: 0;
  color: rgb(210, 210, 210);
}

.about-card .title-text-content h2 {
  margin-top: 0;
}

.card-content p {
  line-height: 1.5;
  margin: 30px auto;
}

a {
  color: white;
  text-decoration: none;
} 

a:hover {
  text-decoration: underline;
  font-size: 1.2em;
}

@media screen and (max-width: 530px) {
  .about-card {
    padding: 1em;
  }

  .about-card .card-title h2 {
    font-size: 1.3em;
  }
}

</style>