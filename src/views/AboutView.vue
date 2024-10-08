<template>

<!-- Setting up the About page cards - repeated on all pages -->
<div class="about-card">
  <div class="card-title">

    <img class="avatar" height="150px" src="../assets/dan.jpeg" alt="Photo of Daniel Allen" />
    <div class="title-text-content">  
      <h1>A bit of Info?</h1>
      
    </div>

  </div>
  <div class="card-content">
 
    <p>My career has evolved from a deep foundation in marketing and MarTech to cloud computing and application development, driven by a passion for aligning technology with real business needs. Early in my journey, I gained valuable experience managing client relations, databases, and web development. This work gave me a strong understanding of customer experience, a skill that has continued to inform my approach to IT solutions. As I transitioned fully into the tech space, I pursued certifications and experience in AWS and Salesforce, combining those with tools like Jira, Git, SQL, and MongoDB to enhance my ability to deliver comprehensive cloud-based solutions.</p>

    <p>Working at a Department solidified my technical foundations, where I supported a DevOps team in a cloud-based Salesforce ecosystem running on AWS. This role gave me critical exposure to cloud infrastructure, team collaboration, and system integrations at scale. While I wasn’t directly managing AWS, my work within this environment strengthened my technical understanding of cloud platforms and modern DevOps practices.</p>

    <p>At The Property Platform (A tech business for the realestate industry), I applied these skills to support the creation and implementation of a new financial system across more than 50 franchises. Here, I managed Salesforce administration, performed testing, and leveraged no-code solutions to optimize processes. My crossover skills, from business-focused MarTech to cloud-driven IT, allowed me to deliver a system that not only met technical requirements but also enhanced the user experience and operational efficiency for the franchise network.</p>

    <p>Recently, I returned to education to deepen my technical expertise in object-oriented design and modern frameworks like Vue and Node.js. This return demonstrates my commitment to chasing my dream of becoming a top-tier application developer. The combination of practical experience, academic learning, and a customer-centric mindset uniquely positions me to create IT solutions that are both technically sound and user-driven.</p>
    
    <h3>Explore Further</h3>
    <a href="https://github.com/daniel-p-allen/" onclick="window.open(this.href, '_blank', 'width=800,height=600'); return false;">Visit My GitHub Repository</a>
    
    <!-- <h2>Upcoming Projects</h2>
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
        <td>Uni task to learn about the mechanics of C++ and Splashkit.</td>
        <td class="link"><a href="#">Aug 2023</a></td>
      </tr>

    </table>
    <h3>Further Information</h3> -->
    <p>Please be aware this site is under construction. </p>
    
  
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

