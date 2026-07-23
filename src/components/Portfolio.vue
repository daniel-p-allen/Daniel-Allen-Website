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
        <h2 class="welcome-headline">
          Portfolio / Selected Work
        </h2>
      </div>
    </div>

    <!-- Callout / context box -->
    <div class="intro-box">
      <p>
        Work across full stack, embedded systems and AI-assisted tooling. The first two are
        the most complete — both carry automated test suites and continuous integration, and
        both document the reasoning behind how they were built.
        <RouterLink to="/about" class="portfolio-link">More background →</RouterLink>
      </p>
    </div>

    <!-- Project list -->
    <div class="card-content">
      <div class="project-list">

        <div class="project-row">
          <div class="project-name">
            <a
              href="https://github.com/daniel-p-allen/llm-anonymizer"
              target="_blank"
              rel="noopener noreferrer"
            >
              LLM Anonymizer — C++ desktop tool
            </a>
          </div>
          <div class="project-desc">
            Lets you use a language model on real email without handing over the contents.
            It finds email addresses, phone numbers and long account references, replaces each
            with a random token, and keeps the mapping on your own machine. You paste the
            scrubbed text into the model, save its reply, and the tool puts the real details
            back — so the model only ever sees tokens while the finished result still reads
            correctly.
            <br><br>
            Written in C++ with a SplashKit review window, because nothing should leave the
            machine without a person seeing it first. Carries 40 automated tests, including a
            round-trip test proving that text comes back byte for byte identical after being
            anonymised and restored. Eight of those tests exist to hold specific defects shut,
            each one written after the defect was found and fixed.
          </div>
        </div>

        <div class="project-row">
          <div class="project-name">
            <a
              href="https://github.com/daniel-p-allen/grocery-management-system"
              target="_blank"
              rel="noopener noreferrer"
            >
              Grocery Management System — IoT stock tracking
            </a>
          </div>
          <div class="project-desc">
            An Arduino keypad scans three-digit product codes onto a pantry, Node services move
            those scans into MongoDB, and an Express interface turns them into stock levels and
            a shopping list. Built as a university IoT project and since brought up to a
            demonstrable standard: one command starts the whole system in Docker with a seeded
            pantry, no hardware and no cloud account required.
            <br><br>
            Covered by 56 automated tests that start the real services as operating system
            processes and drive them from the outside, rather than reaching into the code — so
            what is tested is the running system, not a stand-in for it. The repository also
            refuses to ship if a credential is committed.
          </div>
        </div>

        <div class="project-row">
          <div class="project-name">
            <a
              href="https://github.com/daniel-p-allen/LLM-Powered-Quiz-App"
              target="_blank"
              rel="noopener noreferrer"
            >
              LLM-Powered Quiz Platform – Android Client & Flask Backend
            </a>
          </div>
          <div class="project-desc">
            <strong>Overview:</strong> A full-stack quiz and learning application integrating a large-language-model backend
            with a multi-user Android client. The system demonstrates secure client–server communication, local data persistence,
            API design, and LLM integration through the Hugging Face Gemma 3-27B model.
            <br><br>

            <strong>Frontend (Android):</strong>  
            Built in Java using Android Studio with XML-based layouts and Retrofit2 for network communication.  
            The client handles user authentication, question retrieval, answer submission, and result tracking through a
            REST interface exposed by the Flask API. Local storage and state management are implemented with Room Database
            (DAO architecture), allowing offline caching and session continuity. The UI applies Material Design principles and
            clean separation between data, adapter, and view layers for maintainability.
            <br><br>

            <strong>Backend (Flask + LLM):</strong>  
            Python Flask server exposing REST endpoints for quiz creation, evaluation, and user/session management.
            The backend connects to Hugging Face via the Gemma 3-27B inference API, transforming user requests into structured
            prompts and returning generated questions or reasoning feedback. JWT-style authentication, environment-isolated
            tokens, and CORS-safe responses ensure secure external access.  
            The design mirrors production-grade service layers, demonstrating integration between traditional web APIs and
            transformer-based inference services.
            <br><br>

            <strong>Connection flow:</strong>  
            Android app → Flask API (10.0.2.2:5000 during dev / deployed server in production) → Hugging Face LLM.  
            The architecture separates presentation, logic, and model inference layers for scalability and maintainability.
          </div>
        </div>
        <div class="project-row">
          <div class="project-name">
            <a
              href="https://github.com/daniel-p-allen/NewsAppFinal"
              target="_blank"
              rel="noopener noreferrer"
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
            <span>Collabaccino Project (Project Mgmt. application)</span>
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
              href="https://github.com/daniel-p-allen/Daniel-Allen-Website"
              target="_blank"
              rel="noopener noreferrer"
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
            <span>TalkSensei</span>
          </div>
          <div class="project-desc">
            Concept for a classroom memory-assisting / sentiment feedback app.
            Speech-to-text (real time), tone analysis, and running “memory” of prior sessions to improve recall and engagement.
            Designed for real-time usefulness, not hype.
          </div>
        </div>

        <div class="project-row">
          <div class="project-name">
            <span>Smart Bin Sensor Project - Moyne Shire Council</span>
          </div>
          <div class="project-desc">
            Freelancing Hub project for Moyne Shire Council.
            Technical research, design and vendor analysis for IoT bin sensors, collection optimisation, and cost modelling.
            Real community-facing problem, not just code. Project delivered and funded, September 2025.
          </div>
        </div>

        <div class="project-row">
          <div class="project-name">
            <span>IoT Projects - Pet door & Shopping assistant</span>
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
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit My GitHub Repository
      </a>
      <br /><br />
      <a
        href="https://www.linkedin.com/in/danielpeterallen/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit My LinkedIn Profile
      </a>
    </div>
  </div>
</template>

<style scoped>
/* Only the project list lives here. The card, band, callout and body styles that this
   page shares with Home and About are in src/assets/card.css. */

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
  background: rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem 1.25rem;
}

/* Projects with a public repository are links; the rest are plain titles. Both are
   styled the same so the list reads evenly either way. */
.project-name a,
.project-name span {
  color: var(--accent);
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
  color: rgb(230, 230, 230);
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 300;
}

/* Below this width the two columns become unreadable, so the title sits above its
   description instead. */
@media screen and (max-width: 700px) {
  .project-row {
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
  }
}
</style>
