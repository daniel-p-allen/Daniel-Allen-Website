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
        <h2 class="welcome-headline">
          Welcome — I’m Daniel Allen, a software application developer focused on building practical, data-driven and AI-assisted systems.
        </h2>
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
        I build practical systems and care about how they hold up once real people use them —
        what happens when the input is malformed, when a service is down, or when someone
        comes back to the code six months later and has to understand it.
      </p>

      <p>
        Most of what I have learned came from finishing things rather than starting them:
        getting a system deployed, writing the tests that stop a fixed bug coming back, and
        writing down the reasoning so it outlives my memory of it. The portfolio has the
        detail on each project, including what broke and what I did about it.
      </p>

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

