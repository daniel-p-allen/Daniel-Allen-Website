<template>

<!-- Setting up the About page cards - repeated on all pages -->
<div class="about-card">
  <div class="card-title">

    <img class="avatar" height="150px" src="../assets/dan.jpeg" alt="Photo of Daniel Allen" />
    <div class="title-text-content">  
      <h1>About - Daniel Allen</h1>
      
    </div>

  </div>
  <div class="card-content">
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo, pariatur autem suscipit corrupti libero sequi iste atque optio rem eos ad dignissimos, neque, cupiditate aliquam aperiam similique amet. Libero quasi repellat recusandae laudantium, autem ad sequi consequatur aliquam debitis ab? Tempora placeat perferendis beatae ipsam in! Veniam, magni? Accusamus, molestias! </p>
    
    <h2>Upcoming Projects</h2>
    <table>
      <tr>
        <th>Project</th>
        <th>Description</th>
        <th>Date</th>
      </tr>
      <tr>
        <td>Lost In Space Game</td>
        <td>A task to learn about, and adjust the mechanics of a C++ coded game.</td>
        <td class="link"><a href="#">Feb 2024</a></td>
      </tr>
      <tr>
        <td>Another Lost In Space Game</td>
        <td>A task to learn about, and adjust the mechanics of a C++ coded game.</td>
        <td class="link"><a href="#">April 2024</a></td>
      </tr>
      <tr>
        <td>The Last Lost In Space Game</td>
        <td>A task to learn about, and adjust the mechanics of a C++ coded game.</td>
        <td class="link"><a href="#">Jan 2025</a></td>
      </tr>

    </table>
    <h3>Further Information</h3>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo, pariatur autem suscipit corrupti libero sequi iste atque optio rem eos ad dignissimos, neque, cupiditate aliquam aperiam similique amet. Libero quasi repellat recusandae laudantium, autem ad sequi consequatur aliquam debitis ab? Tempora placeat perferendis beatae ipsam in! Veniam, magni? Accusamus, molestias! </p>
    
  
  </div>  
</div>  

</template>

<style scoped>
.about-card {
  min-height: calc(100vh - 150px);
  background: #333;
  padding: 3em;
  border-radius: 10px;
  color: white;
}

.about-card .card-title {
  display: flex;
  padding: 1em;
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

.card-content p {
  line-height: 1.5;
  margin: 30px auto;
}

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

