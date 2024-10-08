<script setup>
// Imports required
import ContactForm from './contact.vue'; 

</script>

<template>
<div class="about-card">
  <div class="card-title">

    <img class="avatar" height="150px" src="../assets/dan.jpeg" alt="Photo of Daniel Allen" />
    <div class="title-text-content">  
      <h1>Thanks for the visit!</h1>
      
    </div>

  </div>
  <div class="card-content">
    <p>Take a quick look at the About page for some information about myself and my recent journey. Whilst I am currently updating this site, please feel free to bookmark the page and take a look a bit down the track to see the finished version.</p>
    
    <h3>Explore My GitHub</h3>
    <a href="https://github.com/daniel-p-allen/" onclick="window.open(this.href, '_blank', 'width=800,height=600'); return false;">Visit My GitHub Repository</a>

  </div>
 
  <!-- <div class="card-content">
    <h3>Contact:</h3>
    <div class="card-content">
    <ContactForm />
    </div>

  </div>    -->
 
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