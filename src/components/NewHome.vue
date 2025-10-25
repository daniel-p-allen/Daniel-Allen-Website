<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="about-card">
    <!-- Top band with avatar and welcome line -->
    <div class="card-title">
      <img
        class="avatar"
        src="../assets/dan.jpeg"
        alt="Photo of Daniel Allen"
      />
      <div class="title-text-content">
        <div class="welcome-headline">
          Welcome — I’m Daniel Allen, a software application developer focused on building practical, data-driven and AI-assisted systems.
        </div>
      </div>
    </div>

    <!-- Highlight / callout box -->
    <div class="intro-box">
      <p>
        Here you’ll find a snapshot of my journey — a selection of projects that shaped how I think and build.
        <RouterLink to="/portfolio" class="portfolio-link">Explore the full portfolio →</RouterLink>
      </p>
    </div>

    <!-- Main body text -->
    <div class="card-content">
      <p>
        I built this space to bring together a few example projects that have shaped my path into software development.
        There’s no shortage of projects to talk about, but a few stand out for what they taught me about how technology, design, and real-world problem-solving connect.
        Together they reflect how I approach development — curious, structured, and grounded in how software actually gets used.
      </p>

      <p>
        A <strong>Full Stack News App</strong> showed the value of well-built architecture — linking an Android front end to a Node.js backend and handling real data feeds, progressively introducing more and more features such as Stripe payments, searches, posting and permissions.
        It reminded me that performance and structure matter more than features alone.
        <strong>Collabaccino</strong>, my ongoing collaboration with an experienced developer (manager), continues to test that discipline; combining a Java backend, MongoDB persistence, and a Svelte + TypeScript client.
        It’s real world experience with a real dev, code management, code reviews, new concepts (dependency injection), and the importance of communication in building scalable systems.
      </p>

      <p>
        Other projects challenged different skills.
        <strong>TalkSensei</strong>, designing my concept for a classroom memory-assisting and sentiment app, explores how AI and user feedback can improve learning in real time.
        The <strong>Bin Boys smart-waste project</strong> for Moyne Shire Council proved that technical thinking and civic outcomes can meet in the same solution, while my smaller IoT prototypes reinforced how sensors, data, and everyday workflows can merge to make tech genuinely useful.
        These are the projects that remind me why I’m doing this — not just to code, but to build systems that make sense, function well, and are grounded in purpose.
      </p>

      <h3 class="other-sites-heading">Other Sites:</h3>
      <a
        href="https://github.com/daniel-p-allen/"
        onclick="window.open(this.href, '_blank', 'width=800,height=600'); return false;"
      >
        Visit My GitHub Repository
      </a>
      <br /><br />
      <a
        href="https://www.linkedin.com/in/danielpeterallen/"
        onclick="window.open(this.href, '_blank', 'width=800,height=600'); return false;"
      >
        Visit My LinkedIn Profile
      </a>
    </div>
  </div>
</template>

<style scoped>
.about-card {
  background: #333;
  color: white;
  border-radius: 10px;
  padding: 2em;
  box-sizing: border-box;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 4rem auto;
  border: 1px solid rgba(255,255,255,0.15);
  font-family: 'Montserrat', sans-serif, Helvetica, Arial;
  line-height: 1.5;
}

/* Top band with avatar + welcome */
.card-title {
  background: #222;
  border-radius: 20px;
  padding: 1em 1.5em;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  color: #fff;
}

.avatar {
  height: 150px;
  width: 150px;
  border-radius: 30%;
  border: 1px solid rgba(255, 255, 255, 0.4);
  flex-shrink: 0;
  margin-right: 1.5rem;
  object-fit: cover;
}

.title-text-content {
  flex: 1 1 300px;
  min-width: 250px;
  color: #fff;
}

.welcome-headline {
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.3;
  margin: 0;
  color: #fff;
  text-align: left;
}

/* Callout box under the band */
.intro-box {
  background: #2a2a2a;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  margin: 2rem auto;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
  max-width: 900px;
  width: 100%;
  text-align: center;
}

.intro-box p {
  margin: 0;
  color: #f0f0f0;
  font-size: 1.15rem;
  line-height: 1.5;
}

.portfolio-link {
  color: rgb(72, 171, 242);
  text-decoration: none;
  font-weight: 500;
  white-space: nowrap;
}

.portfolio-link:hover {
  text-decoration: underline;
}

/* Main body paragraphs */
.card-content {
  font-family: 'Montserrat', sans-serif, Helvetica, Arial;
  color: #fff;
}

.card-content p {
  margin: 2rem 0;
  line-height: 1.5;
  font-size: 1.15rem;
  font-weight: 300;
  color: rgb(230,230,230);
}

.other-sites-heading {
  margin-top: 2.5rem;
  font-size: 1.3rem;
  font-weight: 500;
  color: #fff;
}

a {
  color: white;
  text-decoration: none;
  font-size: 1.05rem;
  line-height: 1.6;
}

a:hover {
  text-decoration: underline;
  font-size: 1.1rem;
}

/* Mobile */
@media screen and (max-width: 600px) {
  .about-card {
    padding: 1em;
  }

  .card-title {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }

  .avatar {
    height: 130px;
    width: 130px;
    margin: 0 0 1rem 0;
  }

  .welcome-headline {
    font-size: 1.2rem;
    line-height: 1.4;
  }

  .intro-box {
    margin: 1.5rem 0 2rem 0;
    padding: 1rem 1rem;
  }

  .intro-box p {
    font-size: 1rem;
    line-height: 1.4;
  }

  .card-content p {
    font-size: 1rem;
    line-height: 1.45;
    margin: 1.5rem 0;
  }
}
</style>
