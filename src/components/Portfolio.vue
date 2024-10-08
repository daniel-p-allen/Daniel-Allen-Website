<script setup>
// Imports required
import VideoPlayer from './VideoPlayer2.vue';
</script>
<template>
<div class="about-card">
  <div class="card-title">

    <img class="avatar" height="150px" src="../assets/dan.jpeg" alt="Photo of Daniel Allen" />
    <div class="title-text-content">  
      <h1>Folio</h1>
      
    </div>

  </div>
  <div class="card-content">
    <p>Under construction. Please bookmark the site and return shortly.</p>
    <h3>Explore Further</h3>
    <a href="https://github.com/daniel-p-allen/" onclick="window.open(this.href, '_blank', 'width=800,height=600'); return false;">Visit My GitHub Repository</a>
    <!-- Setting up the table. -->
    <table>
      <tr>
        <th>Project</th>
        <th>Description</th>
        <th>Date</th>
      </tr>
      <tr>
        <td>Prototype Grocery Management System</td>
        <td>Demo of an IOT solution: full stack, microserviced, AWS cloud based, load balanced, multiple nodes utilised. Node.JS, Bash, HTML, CSS, JS</td>
        <td class="link"><a href="#">Sept 2024</a></td>
      </tr>
      <tr>
        <td>Another Project</td>
        <td>To be updated.</td>
        <td class="link"><a href="#">April 2024</a></td>
      </tr>
      <tr>
        <td>Lost In Space Uni Task</td>
        <td>Learning the mechanics of C++ with Splashkit.</td>
        <td class="link"><a href="#">Aug 2023</a></td>
      </tr>

    </table>
   
  
  </div>  
</div>  
</template>


<style scoped>

.video-wrapper {
    position: relative;
    width: 80%;  
    padding-top: 56.25%;  
    overflow: hidden;
    display: flex;
    justify-content: center; /* centers horizontally */
    align-items: center;     /* centers vertically */
}


.movie {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
}


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
  font-family: 'Montserrat', sans-serif, Helvetica, Arial;
  margin-bottom: 0;
  color: rgb(210, 210, 210);
}

.about-card .title-text-content h2 {
  font-family: 'Montserrat', sans-serif, Helvetica, Arial;
  margin-top: 0;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center; 
}

/* Setting up the table and modifying the look */
table {
  border-spacing: 0px;
  margin: 50px auto;
}

table tr th,
table tr td {
  border: 1px solid white;
  border-top: none;
  padding: 10px;
  text-align: center;
}

table tr th:first-of-type,
table tr td:first-of-type {
  border-left: none;
}

table tr th:nth-of-type(3),
table tr td:nth-of-type(3) {
  border-right: none;
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