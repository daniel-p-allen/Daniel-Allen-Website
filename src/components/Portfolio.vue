<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="about-card">
    <!-- Top band with avatar + heading -->
    <div class="card-title">
      <img
        class="avatar"
        src="../assets/dan.jpeg"
        alt="Photo of Daniel Allen"
      />
      <div class="title-text-content">
        <div class="welcome-headline">
          Portfolio / Selected Work
        </div>
      </div>
    </div>

    <!-- Callout / context box -->
    <div class="intro-box">
      <p>
        <br>Note: Still setting up the projects.<br>
        Below are a few projects that represent different parts of what I work on — full stack, collaboration, AI concepts, applied problem solving.
        <RouterLink to="/about" class="portfolio-link">More background →</RouterLink>
      </p>
    </div>

    <!-- Project list -->
    <div class="card-content">
      <div class="project-list">

        <div class="project-row">
          <div class="project-name">
            <a
              href="https://github.com/daniel-p-allen/"
              onclick="window.open(this.href, '_blank', 'width=800,height=600'); return false;"
            >
              Full Stack News App
            </a>
          </div>
          <div class="project-desc">
            A full stack news and newsletter application integrating React on the client side with a Node.js and Express backend hosted on Netlify. 
            It combines multiple live APIs and external services, including Mailchimp for audience management, SendGrid for transactional email automation, and Stripe for payment handling. 
            The project demonstrated end-to-end development, from frontend validation and state management to serverless backend logic for subscription and email workflows. 
            It highlighted the importance of asynchronous request handling, environment variable security, and UX design for user-facing systems.
          </div>
        </div>

        <div class="project-row">
          <div class="project-name">
            <a
              href="https://github.com/daniel-p-allen/"
              onclick="window.open(this.href, '_blank', 'width=800,height=600'); return false;"
            >
              Collabaccino Project (Project Mgmt. application)
            </a>
          </div>
          <div class="project-desc">
            Ongoing build with a senior developer. First hand experience with a coding mgmt. professional.
            Java backend with MongoDB persistence, session/device tracking and access control.
            Svelte + TypeScript client.
            Real code review, real standards, real expectations.
          </div>
        </div>

        <div class="project-row">
          <div class="project-name">
            <a
              href="https://github.com/daniel-p-allen/"
              onclick="window.open(this.href, '_blank', 'width=800,height=600'); return false;"
            >
              Personal Website danielallen.com.au
            </a>
          </div>
          <div class="project-desc">
            This Website, a very minimalist approach to presenting some coding projects in order to showcase a variety of skills.
          </div>
        </div>
        <div class="project-row">
          <div class="project-name">
            <a
              href="https://github.com/daniel-p-allen/"
              onclick="window.open(this.href, '_blank', 'width=800,height=600'); return false;"
            >
              TalkSensei
            </a>
          </div>
          <div class="project-desc">
            Concept for a classroom memory-assisting / sentiment feedback app.
            Speech-to-text (real time), tone analysis, and running “memory” of prior sessions to improve recall and engagement.
            Designed for real-time usefulness, not hype.
          </div>
        </div>

        <div class="project-row">
          <div class="project-name">
            <a
              href="https://github.com/daniel-p-allen/"
              onclick="window.open(this.href, '_blank', 'width=800,height=600'); return false;"
            >
              Smart Bin Sensor Project - Moyne Shire Council
            </a>
          </div>
          <div class="project-desc">
            Freelancing Hub project for Moyne Shire Council.
            Technical research, design and vendor analysis for IoT bin sensors, collection optimisation, and cost modelling.
            Real community-facing problem, not just code. Project delivered and funded, September 2025.
          </div>
        </div>

        <div class="project-row">
          <div class="project-name">
            <a
              href="https://github.com/daniel-p-allen/"
              onclick="window.open(this.href, '_blank', 'width=800,height=600'); return false;"
            >
              IoT Projects - Pet door & Shopping assistant
            </a>
          </div>
          <div class="project-desc">
            Sensor-driven: tracking state, events, behaviour.
            Goal was linking physical triggers (movement, access, usage) to useful data and automation logic. Prototypes designed, built, programmed and tested.
          </div>
        </div>

      </div>

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

/* top band */
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

/* callout box */
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

/* list of projects */
.project-list {
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: grid;
  row-gap: 2rem;
}

.project-row {
  display: grid;
  grid-template-columns: minmax(200px, 300px) 1fr;
  column-gap: 1.5rem;
  align-items: flex-start;
  background: rgba(0,0,0,0.15);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.4);
}

.project-name a {
  color: rgb(72, 171, 242);
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  line-height: 1.4;
  display: inline-block;
}

.project-name a:hover {
  text-decoration: underline;
}

.project-desc {
  color: rgb(230,230,230);
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 300;
}

/* footer links */
.card-content {
  font-family: 'Montserrat', sans-serif, Helvetica, Arial;
  color: #fff;
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

/* responsive */
@media screen and (max-width: 700px) {
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

  .project-row {
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
  }

  .project-name a {
    font-size: 1.05rem;
  }

  .project-desc {
    font-size: 0.95rem;
    line-height: 1.45;
  }
}
</style>
